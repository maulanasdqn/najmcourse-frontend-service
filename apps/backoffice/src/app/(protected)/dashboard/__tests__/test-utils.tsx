import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { ConfigProvider } from "antd";
import { SessionProvider } from "@/shared/components/providers";
import type { TLoginItem } from "@/shared/apis/auth/type";
import type { TUserItem } from "@/shared/apis/users/type";

// Create a test-specific QueryClient with disabled retries for faster tests
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

// Mock session data for testing
export const mockAdminSession: TLoginItem = {
  user: {
    id: "admin-user-id",
    role: {
      id: "admin-role-id",
      name: "Admin",
      permissions: [
        { id: "read-dashboard-id", name: "Read Dashboard" },
        { id: "read-users-id", name: "Read Users" },
      ],
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    fullname: "Test Admin",
    email: "admin@test.com",
    avatar: null,
    phone_number: "1234567890",
    referred_by: null,
    referral_code: null,
    student_type: "admin",
    is_active: true,
    is_profile_completed: true,
    is_payment_completed: true,
    identity_number: null,
    religion: null,
    gender: null,
    birthdate: null,
    updated_at: "2024-01-01T00:00:00Z",
    created_at: "2024-01-01T00:00:00Z",
  },
  token: {
    access_token: "mock-access-token",
    refresh_token: "mock-refresh-token",
  },
};

export const mockStudentSession: TLoginItem = {
  ...mockAdminSession,
  user: {
    ...mockAdminSession.user!,
    role: {
      id: "student-role-id", 
      name: "Student",
      permissions: [
        { id: "read-profile-id", name: "Read Profile" },
      ],
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    student_type: "student",
  },
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
  session?: TLoginItem | null;
  sessionStatus?: "loading" | "authenticated" | "unauthenticated";
}

// Custom render function with all necessary providers
export const renderWithProviders = (
  ui: ReactElement,
  {
    queryClient = createTestQueryClient(),
    session = mockAdminSession,
    sessionStatus = "authenticated",
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider>
          <SessionProvider
            value={{
              session,
              status: sessionStatus,
              signIn: vi.fn(),
              signOut: vi.fn(),
              isLoading: sessionStatus === "loading",
            }}
          >
            {children}
          </SessionProvider>
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Utility function to wait for loading states to complete
export const waitForLoadingToFinish = async () => {
  await vi.waitFor(
    () => {
      const loadingElements = document.querySelectorAll('.ant-spin-spinning');
      expect(loadingElements).toHaveLength(0);
    },
    { timeout: 3000 }
  );
};

// Utility function to check if an element contains specific text
export const expectToContainText = (element: Element, text: string) => {
  expect(element.textContent).toContain(text);
};

// Recharts components are mocked globally in vitest.setup.ts

// Mock window.matchMedia for responsive tests
export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

// Custom assertion for statistics cards
export const expectStatisticCard = (container: Element, title: string, value: string | number) => {
  const titleElement = container.querySelector('.ant-statistic-title');
  const valueElement = container.querySelector('.ant-statistic-content-value');
  
  expect(titleElement).toHaveTextContent(title);
  expect(valueElement).toHaveTextContent(value.toString());
};

// Test helper for error states
export const expectErrorState = (container: Element, errorMessage?: string) => {
  const alertElement = container.querySelector('.ant-alert-error');
  expect(alertElement).toBeInTheDocument();
  
  if (errorMessage) {
    expect(alertElement).toHaveTextContent(errorMessage);
  }
};

// Test helper for loading states
export const expectLoadingState = (container: Element) => {
  const spinElement = container.querySelector('.ant-spin-spinning');
  expect(spinElement).toBeInTheDocument();
  expect(container).toHaveTextContent('Loading dashboard statistics...');
};