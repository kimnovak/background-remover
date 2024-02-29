import Sidebar from "./components/Sidebar/Sidebar";
import BackgrounRemover from "./features/BackgroundRemover/BackgroundRemover";
import FileManager from "./features/FileManager/FileManager";
import { StoreProvider } from "./store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Sidebar>
          <FileManager />
        </Sidebar>
        <BackgrounRemover />
      </div>
    </StoreProvider>
  );
}

export default App;
