import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { StoreProvider } from "../../../store/StoreProvider";
import CreateFolder from "./CreateFolder";

const setup = () => {
  return render(
    <StoreProvider>
      <CreateFolder />
    </StoreProvider>
  );
};

describe("Create Folder", () => {
  it("Toggles the popover when create folder button is clicked", async () => {
    setup();
    const toggleButton = screen.getByTestId("@create-folder/create-folder-btn");
    const user = userEvent;
    user.click(toggleButton);
    expect(screen.getByTestId('@components/popover')).toBeVisible();
  });
});
