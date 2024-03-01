import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { StoreProvider } from "../../store/StoreProvider";
import FileManager from "./FileManager";

const setup = () => {
  return render(
    <StoreProvider>
      <FileManager />
    </StoreProvider>
  );
};

describe("File Manager", () => {
  it("Shows default folder upon loading", async () => {
    setup();
    const fileManagerContainer = screen.getByTestId("@file-manager/container");
    await waitFor(() => {
      expect(
        within(fileManagerContainer).getByText("Untitled Folder")
      ).toBeVisible();
    });
  });
  it("Adds a new folder with the name user typed in", async () => {
    setup();
    const toggleButton = screen.getByTestId("@create-folder/create-folder-btn");
    const user = userEvent;
    user.click(toggleButton);
    expect(screen.getByTestId("@components/popover")).toBeVisible();
    const input = screen.getByTestId("@create-folder/input");
    user.type(input, "New folder");
    const submitBtn = screen.getByTestId("@create-folder/submit-btn");
    user.click(submitBtn);
    const fileManagerContainer = screen.getByTestId("@file-manager/container");
    await waitFor(() => {
      expect(
        within(fileManagerContainer).getByText("New folder")
      ).toBeVisible();
    });
  });
  it("Shows an error message when user tries to submit empty folder name", async () => {
    setup();
    const toggleButton = screen.getByTestId("@create-folder/create-folder-btn");
    const user = userEvent;
    user.click(toggleButton);
    expect(screen.getByTestId("@components/popover")).toBeVisible();
    const input = screen.getByTestId("@create-folder/input");
    expect(input.textContent).toBe("");
    const submitBtn = screen.getByTestId("@create-folder/submit-btn");
    user.click(submitBtn);
    const errorMessage = screen.getByTestId("@create-folder/error-message");
    expect(errorMessage).toBeVisible();
    user.type(input, "New folder 1");
    user.click(submitBtn);
    expect(errorMessage).not.toBeVisible();
  });
});
