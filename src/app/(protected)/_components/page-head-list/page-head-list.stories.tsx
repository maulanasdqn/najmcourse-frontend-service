import type { Meta, StoryObj } from "@storybook/react";
import { PageHeadList } from "./";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof PageHeadList> = {
  title: "Components / Page Head List",
  component: PageHeadList,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PageHeadList>;

export const Default: Story = {
  render: () => (
    <PageHeadList
      createPermission={"create-user-permission"}
      createText="Create User"
      createRoute="/users/create"
      title="List User Page"
    />
  ),
};
