const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse } = data;
  const output = Math.floor(timeToElapse / 3);

  return {
    data,
    impact: {
      currentlyInfected: reportedCases * 10,
      infectionsByRequestedTime: reportedCases * 10 * 2 ** output
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime: reportedCases * 50 * 2 ** output
    }
  };
};

export default covid19ImpactEstimator;
