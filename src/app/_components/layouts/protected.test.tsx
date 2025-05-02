/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ProtectedLayout } from "./protected";
import { useSession } from "../providers";

vi.mock("../providers", () => ({
  useSession: vi.fn(),
}));

vi.mock("@/utils/permission", async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    filterPermission: vi.fn((items, predicate) => items.filter(predicate)),
  };
});

vi.mock("antd", async () => {
  const antd = await vi.importActual<any>("antd");
  return {
    ...antd,
    Grid: {
      ...antd.Grid,
      useBreakpoint: () => ({ md: true }),
    },
  };
});

vi.mock("@/commons/constants/sidebar", () => ({
  SIDEBAR_ITEMS: [
    { key: "dashboard", label: "Dashboard", permissions: ["read"] },
    { key: "admin", label: "Admin Panel", permissions: ["admin"] },
  ],
}));

const mockUseSession = useSession as unknown as ReturnType<typeof vi.fn>;

describe("Protected Layout", async () => {
  it("Test renders sidebar and content if user has permissions", async () => {
    mockUseSession.mockReturnValue({
      session: {
        user: {
          role: {
            permissions: [{ name: "read" }],
          },
        },
      },
    });
    let getAllByText: any, getByText: any;
    await act(async () => {
      const utils = render(
        <MemoryRouter>
          <ProtectedLayout />
        </MemoryRouter>,
      );
      getAllByText = utils.getAllByText;
      getByText = utils.getByText;
    });
    const titles = getAllByText("Vite Admiral");
    expect(titles.length).toBeGreaterThanOrEqual(2);
    expect(getByText("Dashboard")).toBeTruthy();
    expect(() => getByText("Admin Panel")).toThrow();
  });

  it("Test renders all items if user has all permissions", async () => {
    mockUseSession.mockReturnValue({
      session: {
        user: {
          role: {
            permissions: [{ name: "read" }, { name: "admin" }],
          },
        },
      },
    });
    let getByText: any;
    await act(async () => {
      const utils = render(
        <MemoryRouter>
          <ProtectedLayout />
        </MemoryRouter>,
      );
      getByText = utils.getByText;
    });
    expect(getByText("Dashboard")).toBeTruthy();
    expect(getByText("Admin Panel")).toBeTruthy();
  });

  it("Test renders no sidebar items if user has no permissions", async () => {
    mockUseSession.mockReturnValue({
      session: {
        user: {
          role: {
            permissions: [],
          },
        },
      },
    });
    let queryByText: any;
    await act(async () => {
      const utils = render(
        <MemoryRouter>
          <ProtectedLayout />
        </MemoryRouter>,
      );
      queryByText = utils.queryByText;
    });
    expect(queryByText("Dashboard")).toBeNull();
    expect(queryByText("Admin Panel")).toBeNull();
  });
});
