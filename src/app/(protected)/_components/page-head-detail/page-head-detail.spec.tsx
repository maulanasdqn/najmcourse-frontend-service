import { render, screen, fireEvent } from "@testing-library/react";
import { PageHeadDetail } from "./";
import { MemoryRouter, useNavigate } from "react-router";

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Page Head Detail Component", () => {
  it("Test should render the title", () => {
    render(
      <MemoryRouter>
        <PageHeadDetail title="Session Detail" />
      </MemoryRouter>,
    );
    expect(screen.getByText("Session Detail")).toBeInTheDocument();
  });

  it("Test should navigate back when back button is clicked", () => {
    const mockedNavigate = vi.fn();
    //@ts-expect-error "useNavigate" is not a function
    (useNavigate as unknown as vi.Mock).mockReturnValue(mockedNavigate);

    render(
      <MemoryRouter>
        <PageHeadDetail title="Go Back" />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
