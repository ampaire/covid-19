import { onCovid19 } from "./index";
import estimator from "./estimator.example";

const lagosNG = {
  reportedCases: 111,
  population: 22000000
};

// With on-covid-19 API. 
// This is the reccomended way to go!
let result = onCovid19(lagosNG, estimator)
  .estimateImpactAfter(30)
  .days();
console.dir(result);

// Without on-covid-19 API. Requires 
// lagosNG input data to have all required fields
// normally added by on-covid-19 API
result = estimator(lagosNG);
console.dir(result);