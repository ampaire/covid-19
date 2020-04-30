const getOutput = (periodType, timeToElapse) => {
  let days = timeToElapse;

  switch (periodType) {
    case 'weeks':
      days = 7 * timeToElapse;
      return Math.trunc(days / 3);

    case 'months':
      days = 30 * timeToElapse;
      return Math.trunc(days / 3);

    default:
      return timeToElapse;
  }
};

const currentlyInfected = (reportedCases, num) => reportedCases * num;
const infectionsByTime = (reportedCases, num, output) => reportedCases * num * 2 ** output;
const icuByTime = () => Math.trunc((5 / 100) * infectionsByTime());
const severeByTime = () => Math.trunc((15 / 100) * infectionsByTime());
const bedsByTime = (availableBeds) => {
  const severeCases = severeByTime();
  return Math.trunc(availableBeds - (severeCases + icuByTime));
};


const dollarsInFlight = (
  periodType,
  timeToElapse,
  avgDailyIncomeInUSD,
  avgDailyIncomePopulation
) => {
  infectionsByTime();
  const days = getOutput(periodType, timeToElapse);

  return Math.trunc(
    (infectionsByTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / days
  );
};

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region
  } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  const output = getOutput(periodType, timeToElapse);
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
      ),
      casesForICUByRequestedTime: Math.trunc(
        (5 / 100) * infectionsByTime(reportedCases, 10, output)
      ),
      casesForVentilatorsByRequestedTime: Math.trunc(
        (2 / 100) * infectionsByTime(reportedCases, 10, output)
      ),
      dollarsInFlight: dollarsInFlight(
        reportedCases,
        10,
        output,
        periodType,
        timeToElapse,
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
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
      ),
      casesForICUByRequestedTime: Math.trunc(
        (5 / 100) * infectionsByTime(reportedCases, 50, output)
      ),
      casesForVentilatorsByRequestedTime: Math.trunc(
        (2 / 100) * infectionsByTime(reportedCases, 50, output)
      ),
      dollarsInFlight: dollarsInFlight(
        reportedCases,
        50,
        output,
        periodType,
        timeToElapse,
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
      )
    }
  };
};

export default covid19ImpactEstimator;
