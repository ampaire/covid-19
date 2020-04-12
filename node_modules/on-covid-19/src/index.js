/** @module on-covid-19
 *
 * A fluent programming interface for users
 * and tools to easily make novelty estimations
 * of the impact of covid-19 infections.
 */

/** 
 *  Durations to estimate impact over
 */
export const PERIOD = {
  /** Estimate impact in days */
  DAYS: "DAYS",

  /** Estimate impact in weeks */
  WEEKS: "WEEKS",

  /** Estimate impact in months */
  MONTHS: "MONTHS"
};

/**
 * A defult configuration map providing
 * values for all input data fields. This
 * lets you call the on-covid-19 API with
 * just the input data you care about
 *
 * @see defaultEstimator
 */
const defaultConfig = {
  /** Data fields for the region / continent */
  region: {
    /** Name of the region */
    name: "Africa",

    /** Avergae age in the reggion */
    avgAge: 19.7,

    /** Average daily income in the region, in USD */
    avgDailyIncomeInUSD: 3,

    /** The size of the region's popluation earning the average daily income */
    avgDailyIncomePopulation: 0.56
  },

  /** Currently reported / confirmed cases according to the authorities */
  reportedCases: 1992,

  /** The population you want to estimate the impact for */
  population: 48437107,

  /** The number of hospital / health facility beds availabe to the population you want to estimate for */
  totalHospitalBeds: 858331
};

/**
 * A default estimator function that gets used
 * if the on-covid-19 API is called without one.
 *
 * @param {Object} data a map of input fields and values for the estimation. Default to defaultConfig
 * @see defaultConfig
 * @returns It just returns a template data structure
 */
const defaultEstimator = (data = defaultConfig) => {
  return {
    data,
    impact: {},
    severeImpact: {}
  };
};

const estimateAs = (config, timeToElapse, estimator) => {
  const estimateFor = periodType => () => {
    const data = {
      ...defaultConfig,
      ...{ timeToElapse, periodType },
      ...config
    };
    return estimator(data);
  };

  return {
    days: estimateFor(PERIOD.DAYS),
    week: estimateFor(PERIOD.WEEKS),
    weeks: estimateFor(PERIOD.WEEKS),
    month: estimateFor(PERIOD.MONTHS),
    months: estimateFor(PERIOD.MONTHS)
  };
};

/**
 * The onCovid19 api entrypoint function. 
 * 
 * @param {Object} config the input data
 * @param {Function} estimator the function handling estimation
 * @returns {Object} An object on which you can call `estimateImpactAfter(..)` with the duration to estimate for.
 * Calling `estimateImpactAfter(..)` then produces an object on which you can call `days()`, `week()`, `weeks()`, `month()', or `months()` on, 
 * allowing you indicate the period to estimate for.
 *
 * @example
 * import estimator from 'path/to/estimator.js';
 *
 * const data = { population: 5000000, reportedCases: 247, ... }
 * const estimate = onCovid19(data, estimator)
 *    .estimateImpactAfter(30)
 *    .days();
 */
export const onCovid19 = (config = {}, estimator = defaultEstimator) => {
  return {
    estimateImpactAfter: timeToElapse =>
      estimateAs(config, timeToElapse, estimator)
  };
};

/**
  * Given an initial number value, this function lets you compute the percent of another value on the initial value
  * 
  * @example
  * const salary = 1500000;
  * const whatPercentOfPay = whatPercentOf(salary);
  * const airtimeBurden = whatPercentOfPay.is(25000);
  * const tvSubscriptionBurden = whatPercentOfPay.is(20000);
  * 
  * @see whatIs
  * 
  * @param {Number} divisor the divisor of your percentage computation
  * @returns {Object} An object on which you can call an "is" function with the (dividend) figure you want to compute it percentage. Calling the "is" function returns the final computed percentage value
  */
 export const whatPercentOf = divisor => {
  return { 
    is: dividend => dividend / divisor
   };
};

/**
 * Declaratively compute the percentage of any value
 *
 * @example
 * const salary = 1000000;
 * const vat = whatIs('7.5%').of(salary);
 * 
 * @see whatPercentOf
 *
 * @param {String} percent A string representing the percentage you want to calculate. e.g '7.5%'
 * @returns {Object} An object on which you can call an "of" function with the figure you want the percentage computed for. Calling the "of" function returns the final computed percentage value
 */
export const whatIs = percent => {
  return {
    of: figure => (parseFloat(percent) / 100) * figure
  };
};

/**
 * Makes it super easy to build your estimation as a list of sequencial function
 * that all take an input, which could be coming from the previously called function
 * in the sequence, and returns an output which might be the final estimation or one that
 * gets passed to the next function in the sequence
 *
 * @example
 * const stepOne = ({data}) => {};
 * const stepTwo = ({data}) => {};
 * const stepThree = ({data}) => {};
 *
 * const covid19ImpactEstimator = data => {
 *   const estimatorFactory = chain(stepOne, stepTwo, stepThree);
 *   return estimatorFactory({data});
 * }
 *
 * const lagosNG = {reportedCases: 111, ...};
 * const estimate = onCovid19(lagosNG, covid19ImpactEstimator)
 *   .estimateImpactAfter(30)
 *   .days();
 *
 * @param  {...Function} fns
 * @returns {Function} A single function that calls your sequence of chained functions with the input data it receives
 */
export const chain = (...fns) => {
  return payload => fns.reduce((partial, fn) => fn(partial), payload);
};
