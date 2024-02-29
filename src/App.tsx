import Sidebar from "./components/Sidebar/Sidebar";
import BackgrounRemover from "./features/BackgroundRemover/BackgroundRemover";
import { StoreProvider } from "./store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Sidebar>
          test
        </Sidebar>
        <BackgrounRemover />
      </div>
    </StoreProvider>
  );
}

export default App;
