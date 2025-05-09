import { describe, it, expect, vi } from "vitest";
import { useSession } from "../providers";
import { render } from "@testing-library/react";
import { Guard } from "./";

vi.mock("../providers", () => ({
  useSession: vi.fn(),
}));

const mockUseSession = useSession as unknown as ReturnType<typeof vi.fn>;

describe("Guard Component", () => {
  it("Test renders children if user has required permissions", () => {
    mockUseSession.mockReturnValue({
      session: {
        user: {
          role: {
            permissions: [{ name: "read" }, { name: "write" }],
          },
        },
      },
    });
    const { getByText } = render(
      <Guard permissions={["read"]}>
        <div>Allowed Content</div>
      </Guard>,
    );
    expect(getByText("Allowed Content")).toBeTruthy();
  });

  it("Test renders fallback if user does not have required permissions", () => {
    mockUseSession.mockReturnValue({
      session: {
        user: {
          role: {
            permissions: [{ name: "read" }],
          },
        },
      },
    });
    const { getByText } = render(
      <Guard permissions={["write"]} fallback={<div>Access Denied</div>}>
        <div>Restricted Content</div>
      </Guard>,
    );
    expect(getByText("Access Denied")).toBeTruthy();
  });

  it("Test renders null if fallback is not provided and permission denied", () => {
    mockUseSession.mockReturnValue({
      session: {
        user: {
          role: {
            permissions: [{ name: "read" }],
          },
        },
      },
    });
    const { container } = render(
      <Guard permissions={["admin"]}>
        <div>Should Not Appear</div>
      </Guard>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("Test renders null if session is undefined", () => {
    mockUseSession.mockReturnValue({ session: undefined });
    const { container } = render(
      <Guard permissions={["read"]}>
        <div>Blocked</div>
      </Guard>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
