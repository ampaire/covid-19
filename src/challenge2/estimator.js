const covid19ImpactEstimator = (data) => {
  function getDays(periodType, timeToElapse) {
    let days = timeToElapse;

    switch (periodType) {
      case 'weeks':
        days = 7 * timeToElapse;
        return Math.trunc(days / 3);

      case 'months':
        days = 30 * timeToElapse;
        return Math.trunc(days / 3);

      default:
        return Math.trunc(days / 3);
    }
  }

  const currentlyInfected = (reportedCases, num) => reportedCases * num;
  const infectionsByTime = (reportedCases, num, output) => reportedCases * num * 2 ** output;
  const severeByTime = () => Math.trunc((15 / 100) * infectionsByTime);
  const bedsByTime = (availableBeds) => {
    const severeCases = severeByTime;
    return Math.trunc(availableBeds - severeCases);
  };

  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds
  } = data;
  const output = getDays(periodType, timeToElapse);
  const availableBeds = (35 / 100) * totalHospitalBeds;

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected(reportedCases, 10),
      infectionsByRequestedTime: infectionsByTime(reportedCases, 10, output),
      severeCasesByRequestedTime: severeByTime(reportedCases, 10, output),
      hospitalBedsByRequestedTime: bedsByTime(
        availableBeds,
        reportedCases,
        10,
        output
      )
    },
    severeImpact: {
      currentlyInfected: currentlyInfected(reportedCases, 50),
      infectionsByRequestedTime: infectionsByTime(reportedCases, 50, output),
      severeCasesByRequestedTime: severeByTime(reportedCases, 50, output),
      hospitalBedsByRequestedTime: bedsByTime(
        availableBeds,
        reportedCases,
        50,
        output
      )
    }
  };
};

export default covid19ImpactEstimator;
