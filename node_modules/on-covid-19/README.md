# on-covid-19

An overly simplified COVID-19 infections spread estimation API. Think of this as a simple and intuitive programming interface that allows you to take in data and own estimating the impact of Covid-19 infections for a population, over a given period of time.

Using this tiny utility, you have the foundation to be able to astimate and say the following:

> Given the Nigerian population, [five hospital beds per 10,000 people](https://www.rvo.nl/sites/default/files/Market_Study_Health_Nigeria.pdf), and total reported cases of 150, in **40 days from now there'll likely be 79 unallocated hospital / isolation centre beds left to treat ~1,500 severe COVID-19 cases** who require hospitalization to recover - unless we collectively practice active social distancing and proper hand hygine.

> How do we intend to **care for the remianing 1,403 patients in severe condition** who require hospitalization to recover? With that number, we would need more than 12 additional isolation centres with the capacity of the one GTBank donated to Lagos State, each with 110 beds!

Please note that while this API provides and programming interface and some input data, the client code is soely responsible for the final estimation, and all of this is just to demonstrate what is possible. Unless you can support your estimation with the right input parameters and data, as well as the right analysis, your estimation is not meant to be a statement of fact or an authority. 

Unless authorised by a credible body, we reccomend you treat all estimations as observations for healthy discussions

---

## Installation & Setup

1.  Install the package
    ```
    npm -i on-covid-19
    ```
    ```
    yarn add on-covid-19
    ```
2.  Import and use the api's utilities
    ```javascript
    // src/estimator.js
    import { PERIOD, whatPercentOf, whatIs } from 'on-covid-19';

    ```
3.  Import and use the core api
    ```javascript
    // src/app.js
    import { onCovid19 } from 'on-covid-19';

    ```   


## Usage

Below is how this library could be used. See the [API documentation](https://chalu.github.io/on-covid-19/) for more details

```javascript
// src/estimator.js
import { PERIOD, whatPercentOf, whatIs } from 'on-covid-19';
const covid19ImpactEstimator = data => {
  // this is where the estimation 
  // will happen, using all that is in 
  // the input data parameter object

  return {};
};

export default covid19ImpactEstimator;

// src/app.js
import estimator from "./estimator.js";
import { onCovid19 } from "on-covid-19";

const lagosNG = {
  ...,
  reportedCases: 50,
  population: 22000000
};

const result = onCovid19(lagosNG, estimator)
  .estimateImpactAfter(30)
  .days();

console.dir(result);

```
