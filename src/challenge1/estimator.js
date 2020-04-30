/* eslint-disable max-len */
const periodToDays = (timeToElapse, periodType) => {
  switch (periodType) {
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      return timeToElapse;
  }
};

const covid19ImpactEstimator = (data) => {
  const output = {
    data,
    impact: {},
    severeImpact: {}
  };
  const days = periodToDays(data.timeToElapse, data.periodType);
  output.impact.currentlyInfected = data.reportedCases * 10;
  output.severeImpact.currentlyInfected = data.reportedCases * 50;
  output.impact.infectionsByRequestedTime = output.impact.currentlyInfected * 2 ** Math.trunc(days / 3);
  output.severeImpact.infectionsByRequestedTime = output.severeImpact.currentlyInfected * 2 ** Math.trunc(days / 3);
  return output;
};

export default covid19ImpactEstimator;
