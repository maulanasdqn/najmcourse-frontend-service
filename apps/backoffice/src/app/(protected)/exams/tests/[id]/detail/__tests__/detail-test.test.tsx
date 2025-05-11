/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Component } from "../page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { useGetDetailTest } from "../../_hooks/use-get-detail-test";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: () => ({ id: "test-id-1" }),
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../_hooks/use-get-detail-test");

const renderPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </QueryClientProvider>,
  );

describe("Detail Test Page", () => {
  beforeEach(() => {
    // @ts-expect-error: mocking external hook
    (useGetDetailTest as unknown as vi.Mock).mockReturnValue({
      data: {
        data: {
          id: "test-id-1",
          name: "Create User",
          created_at: "2025-05-01T10:00:00Z",
          updated_at: "2025-05-02T14:30:00Z",
          questions: [
            {
              id: "q1",
              question: "What is React?",
              discussion: "React is a library.",
              question_image_url: "https://example.com/question.png",
              discussion_image_url: "https://example.com/discussion.png",
              options: [
                {
                  id: "o1",
                  label: "Library",
                  points: 10,
                  image_url: "https://example.com/option1.png",
                },
              ],
            },
          ],
        },
      },
    });

    mockNavigate.mockClear();
  });

  it("Test should render the basic test details", () => {
    renderPage();
    expect(screen.getByText("Detail Session")).toBeInTheDocument();
    expect(screen.getByText("test-id-1")).toBeInTheDocument();
    expect(screen.getByText("Create User")).toBeInTheDocument();
    expect(screen.getByText("01/05/2025 17:00")).toBeInTheDocument();
    expect(screen.getByText("02/05/2025 21:30")).toBeInTheDocument();
  });

  it("Test should render description labels", () => {
    renderPage();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Registered Questions")).toBeInTheDocument();
    expect(screen.getByText("Created At")).toBeInTheDocument();
    expect(screen.getByText("Updated At")).toBeInTheDocument();
  });

  it("Test should render questions, images, and options", async () => {
    renderPage();

    expect(await screen.findByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("ID:")).toBeInTheDocument();
    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("React is a library.")).toBeInTheDocument();
    expect(screen.getByAltText("image")).toBeInTheDocument();
    expect(screen.getByText("Label:")).toBeInTheDocument();
    expect(screen.getByText("Library")).toBeInTheDocument();
    expect(screen.getByText("Points:")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("Test should navigate back when back button is clicked", () => {
    renderPage();
    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
