import { createContext, useContext, useEffect, useState } from "react";
import {
  EdgeFeatureHubConfig,
  Readyness,
  FeatureHubPollingClient,
} from "featurehub-javascript-client-sdk";

const FeatureHubCtx = createContext(null);
let initialized = false;
let fhConfig;
let fhClient;
let fhUrl = "http://localhost:8085";
let fhAppiKey =
  "default/7f1cbc2d-0c3f-471d-939e-becd193f89bc/LyEIMrWnTDCxa3h6RuqCOJGDiyxFkXqiBiAzj5AT";

const FeatureHubProvider = ({ children }) => {
  const [btnColor, setBtnColor] = useState("red");
  const [featureFlag, setFeatureFlag] = useState(false);
  const [featureConfig, setFeatureConfig] = useState({});
  useEffect(() => {
    (async () => {
      console.log("INIT APP");
      fhConfig = new EdgeFeatureHubConfig(fhUrl, fhAppiKey);
      fhConfig.edgeServiceProvider(
        (repo, c) => new FeatureHubPollingClient(repo, c, 5000)
      );
      // Showing features based on a certain user - Send some user context to feature hub so you can filter on dashboard
      // fhClient = await fhConfig.newContext().userKey(user).build(); - User key can be like an email to help FeatureHub identify user
      // fhClient = await fhConfig.newContext().attribute_value('user-type', 'dev').build(); or you can make custom ones like this

      // Info - https://github.com/featurehub-io/featurehub-javascript-sdk#rollout-strategies-and-client-context

      // BASIC
      fhClient = await fhConfig.newContext().build();
      fhConfig.addReadynessListener((readyness) => {
        if (!initialized) {
          if (readyness === Readyness.Ready) {
            initialized = true;
            // Initial values of features
            const color = fhClient.getString("SUBMIT_COLOR_BUTTON");
            console.log("INIT VALUE - SUBMIT COLOR BUTTON: ", color);
            setBtnColor(color);

            const flag = fhClient.getBoolean("FEATURE_FLAG");
            console.log("INIT VALUE - FEATURE_FLAG: ", flag);
            setFeatureFlag(flag);

            const config = fhClient.getRawJson("FEATURE_CONFIG");
            console.log("INIT VALUE - FEATURE_CONFIG: ", JSON.parse(config));
            setFeatureConfig(JSON.parse(config));
          }
        }
      });
      // Add listeners for your features to update state
      fhClient.feature("SUBMIT_COLOR_BUTTON").addListener((fs) => {
        console.log("UPDATE VALUE - SUBMIT COLOR BUTTON: ", fs.getString());
        setBtnColor(fs.getString());
      });

      fhClient.feature("FEATURE_FLAG").addListener((fs) => {
        console.log("UPDATE VALUE - FEATURE_FLAG: ", fs.getBoolean());
        setBtnColor(fs.getString());
      });

      fhClient.feature("FEATURE_CONFIG").addListener((fs) => {
        console.log("UPDATE VALUE - FEATURE_CONFIG: ", fs.getRawJson());
        setBtnColor(fs.getString());
      });
      return () => {
        console.log("Tidy Up");
        fhConfig.close();
      };
    })();
  }, []);
  return (
    <FeatureHubCtx.Provider value={{ btnColor, featureFlag, featureConfig }}>
      {children}
    </FeatureHubCtx.Provider>
  );
};

const useFeatureHub = () => useContext(FeatureHubCtx);

export { FeatureHubProvider, useFeatureHub };
