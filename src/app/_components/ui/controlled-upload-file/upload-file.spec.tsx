import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { ControlledUploadFile } from "./";
import { vi } from "vitest";

vi.mock("@/api/storage/api", () => ({
  postUploadFile: vi.fn().mockResolvedValue({
    data: { file_url: "https://example.com/file.png" },
  }),
}));

type FormValues = {
  photo: string;
};

const Wrapper = () => {
  const methods = useForm<FormValues>({
    defaultValues: { photo: "" },
  });
  return (
    <FormProvider {...methods}>
      <ControlledUploadFile<FormValues>
        name="photo"
        control={methods.control}
        label="Upload Photo"
      />
    </FormProvider>
  );
};

describe("Controlled Upload File Component", () => {
  it("Test renders upload button with label", () => {
    render(<Wrapper />);
    expect(screen.getByText("Upload Photo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /upload file/i })).toBeInTheDocument();
  });

  it("Test handles successful upload and shows image preview", async () => {
    render(<Wrapper />);
    const file = new File(["dummy content"], "photo.png", { type: "image/png" });
    const uploadButton = screen.getByRole("button", { name: /upload file/i });
    const parent = uploadButton.parentElement;
    expect(parent).not.toBeNull();
    const input = parent?.querySelector("input[type='file']");
    expect(input).toBeInstanceOf(HTMLInputElement);
    fireEvent.change(input as HTMLInputElement, { target: { files: [file] } });
    const preview = await screen.findByAltText("Uploaded preview");
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute("src", "https://example.com/file.png");
  });

  it("Test allows removing uploaded image", async () => {
    render(<Wrapper />);
    const file = new File(["dummy content"], "photo.png", { type: "image/png" });
    const uploadButton = screen.getByRole("button", { name: /upload file/i });
    const parent = uploadButton.parentElement;
    expect(parent).not.toBeNull();
    const input = parent?.querySelector("input[type='file']");
    expect(input).toBeInstanceOf(HTMLInputElement);
    fireEvent.change(input as HTMLInputElement, { target: { files: [file] } });
    const image = await screen.findByAltText("Uploaded preview");
    expect(image).toBeInTheDocument();
    const removeBtn = screen.getByRole("button", { name: /remove photo/i });
    fireEvent.click(removeBtn);
    await waitFor(() => {
      expect(screen.queryByAltText("Uploaded preview")).not.toBeInTheDocument();
    });
  });
});
