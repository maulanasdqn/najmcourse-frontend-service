import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "../page";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof Component> = {
  title: "Pages/Sessions/List",
  component: Component,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <Story />
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  render: () => <Component />,
};
