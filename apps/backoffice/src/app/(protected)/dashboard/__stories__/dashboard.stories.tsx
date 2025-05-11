import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "../page";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/app/_components/providers";

const meta: Meta<typeof Component> = {
  title: "Pages/Dashboard",
  component: Component,
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={["/"]}>
          <SessionProvider>
            <Story />
          </SessionProvider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};
