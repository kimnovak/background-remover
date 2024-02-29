import BackgrounRemover from "./features/BackgroundRemover/BackgroundRemover";
import { StoreProvider } from "./store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <BackgrounRemover />
      </div>
    </StoreProvider>
  );
}

export default App;
