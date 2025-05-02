import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "./index";
import { BrowserRouter } from "react-router";

const renderComponent = (props = {}) =>
  render(
    <BrowserRouter>
      <DataTable
        meta={{ page: 1, per_page: 10, total: 50 }}
        dataSource={[]}
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Action", key: "action", render: () => <button>Click</button> },
        ]}
        rowKey="id"
        {...props}
      />
    </BrowserRouter>,
  );

describe("DataTable Component", () => {
  it("Test renders search input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("Test renders pagination and per page select", () => {
    renderComponent();
    expect(screen.getByLabelText("left")).toBeInTheDocument();
    expect(screen.getByLabelText("right")).toBeInTheDocument();
  });

  it("Test calls search on input change", () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "admin" } });
    expect(input).toHaveValue("admin");
  });

  it("Test shows empty table if no data", () => {
    renderComponent();
    const emptyTexts = screen.getAllByText("No data");
    expect(emptyTexts.length).toBeGreaterThan(0);
  });

  it("Test handles no meta prop", () => {
    renderComponent({ meta: undefined });
    expect(screen.queryByLabelText("left")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("right")).not.toBeInTheDocument();
  });

  it("Test handles null dataSource", () => {
    renderComponent({ dataSource: null });
    const emptyTexts = screen.getAllByText("No data");
    expect(emptyTexts.length).toBeGreaterThan(0);
  });

  it("Test renders all column headers", () => {
    renderComponent();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("Test click action button works", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    renderComponent({ dataSource: data });
    const buttons = screen.getAllByText("Click");
    expect(buttons.length).toBe(2);
    fireEvent.click(buttons[0]);
  });

  it("Test handles undefined columns", () => {
    renderComponent({ columns: undefined });
    const emptyTexts = screen.getAllByText("No data");
    expect(emptyTexts.length).toBeGreaterThan(0);
  });
});
