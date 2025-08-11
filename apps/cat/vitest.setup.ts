import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock axios API to prevent any real network calls during tests
vi.mock("../shared/libs/src/axios/api", () => ({
  api: {
    get: vi.fn(() => Promise.resolve({ data: {} })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

// Mock fullscreen API
Object.defineProperty(document, "exitFullscreen", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(document.documentElement, "requestFullscreen", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(document, "fullscreenElement", {
  writable: true,
  value: null,
});

// Mock Recharts (for dashboard charts)
vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
  LineChart: ({ children }: { children: React.ReactNode }) => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'line-chart');
    return div;
  },
  Line: () => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'line');
    return div;
  },
  CartesianGrid: () => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'cartesian-grid');
    return div;
  },
  XAxis: () => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'x-axis');
    return div;
  },
  YAxis: () => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'y-axis');
    return div;
  },
  Tooltip: () => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'tooltip');
    return div;
  },
}));

// Mock html-react-parser (used in exam questions)
vi.mock("html-react-parser", () => ({
  default: (html: string) => html,
}));

// PWA mock - skip for now as it's causing module resolution issues

// Mock dayjs
vi.mock("dayjs", () => {
  const originalDayjs = vi.importActual("dayjs");
  return {
    default: vi.fn(() => ({
      add: vi.fn(() => ({
        diff: vi.fn(() => 3600),
      })),
      diff: vi.fn(() => 3600),
      format: vi.fn(() => "2025-01-01"),
    })),
    ...originalDayjs,
  };
});

// Mock useNavigate and other router hooks
vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: "test-id", testId: "test-id" }),
    generatePath: vi.fn((path: string) => path),
  };
});

// Mock react-hook-form hooks
vi.mock("react-hook-form", async () => {
  const actual: any = await vi.importActual("react-hook-form");
  return {
    ...actual,
    useController: () => ({
      field: {
        name: "test-field",
        value: "",
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
      },
      fieldState: {
        invalid: false,
        isTouched: false,
        isDirty: false,
        error: undefined,
      },
    }),
  };
});

// Setup global test environment
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();
  
  // Reset DOM
  document.body.innerHTML = "";
  
  // Reset fullscreen state
  Object.defineProperty(document, "fullscreenElement", {
    writable: true,
    value: null,
  });
});