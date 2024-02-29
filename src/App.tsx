import Sidebar from "./components/Sidebar/Sidebar";
import BackgrounRemover from "./features/BackgroundRemover/BackgroundRemover";
import FileManager from "./features/FileManager/FileManager";
import { StoreProvider } from "./store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <Sidebar>
        <FileManager />
      </Sidebar>
      <BackgrounRemover />
    </StoreProvider>
  );
}

export default App;
