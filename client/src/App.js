import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  EdgeFeatureHubConfig,
  Readyness,
  FeatureHubPollingClient,
} from "featurehub-javascript-client-sdk";

let initialized = false;
let fhConfig;
let fhClient;
let fhUrl = "http://localhost:8085";
let fhAppiKey =
  "default/7f1cbc2d-0c3f-471d-939e-becd193f89bc/LyEIMrWnTDCxa3h6RuqCOJGDiyxFkXqiBiAzj5AT";

function App() {
  const [btnColor, setBtnColor] = useState("red");
  useEffect(() => {
    (async () => {
      console.log("INIT APP");
      fhConfig = new EdgeFeatureHubConfig(fhUrl, fhAppiKey);
      // fhClient = await fhConfig.newContext().userKey(user).build();
      fhClient = await fhConfig.newContext().build();
      fhConfig.addReadynessListener((readyness) => {
        if (!initialized) {
          if (readyness === Readyness.Ready) {
            initialized = true;
            const color = fhClient.getString("SUBMIT_COLOR_BUTTON");
            console.log("INIT VALUE - SUBMIT COLOR BUTTON: ", color);
            setBtnColor(color);
          }
        }
      });
      fhClient.feature("SUBMIT_COLOR_BUTTON").addListener((fs) => {
        console.log("UPDATE VALUE - SUBMIT COLOR BUTTON: ", fs.getString());
        setBtnColor(fs.getString());
      });
      return () => {
        console.log("Tidy Up");
        fhConfig.close();
      };
    })();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      <button style={{padding: 5, backgroundColor: btnColor}}>Test Buitton</button>
      </header>
    </div>
  );
}

export default App;
