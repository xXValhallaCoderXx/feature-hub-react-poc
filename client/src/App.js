import logo from "./logo.svg";
import "./App.css";

import { useFeatureHub } from "./hooks/use-feature-hub";

function App() {
  const { btnColor, featureFlag, featureConfig } = useFeatureHub();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button style={{ padding: 5, backgroundColor: btnColor }}>
          Test Buitton
        </button>
      </header>
    </div>
  );
}

export default App;
