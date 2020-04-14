!(function () {
  return function e(t, n, a) {
    function o(s, c) {
      if (!n[s]) {
        if (!t[s]) {
          const i = typeof require === 'function' && require;
          if (!c && i) return i(s, !0);
          if (r) return r(s, !0);
          const l = new Error(`Cannot find module '${s}'`);
          throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }
        const d = (n[s] = { exports: {} });
        t[s][0].call(
          d.exports,
          (e) => o(t[s][1][e] || e),
          d,
          d.exports,
          e,
          t,
          n,
          a
        );
      }
      return n[s].exports;
    }
    for (
      var r = typeof require === 'function' && require, s = 0;
      s < a.length;
      s++
    ) { o(a[s]); }
    return o;
  };
}())(
  {
    1: [
      function (e, t, n) {
        Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.default = void 0);
        const a = (e) => {
          const t = ((e, t) => {
            let n = null;
            switch (e) {
              case 'days':
                n = t;
                break;
              case 'weeks':
                n = 7 * t;
                break;
              case 'months':
                n = 30 * t;
            }
            return Math.trunc(n);
          })(e.periodType, e.timeToElapse);
          const n = Math.trunc(10 * e.reportedCases);
          const a = Math.trunc(n * 2 ** Math.trunc(t / 3));
          const o = Math.trunc(0.15 * a);
          const r = Math.trunc(0.35 * e.totalHospitalBeds - 0.15 * a);
          const s = Math.trunc(0.05 * a);
          const c = Math.trunc(0.02 * a);
          const i = (a
                * e.region.avgDailyIncomePopulation
                * e.region.avgDailyIncomeInUSD)
              / t;
          const l = {
            currentlyInfected: n,
            infectionsByRequestedTime: a,
            severeCasesByRequestedTime: o,
            hospitalBedsByRequestedTime: r,
            casesForICUByRequestedTime: s,
            casesForVentilatorsByRequestedTime: c,
            dollarsInFlight: Math.trunc(i)
          };
          const d = Math.trunc(50 * e.reportedCases);
          const u = Math.trunc(d * 2 ** Math.trunc(t / 3));
          const m = Math.trunc(0.15 * u);
          const p = Math.trunc(0.35 * e.totalHospitalBeds - 0.15 * u);
          const y = Math.trunc(0.05 * u);
          const h = Math.trunc(0.02 * u);
          const v = (u
                * e.region.avgDailyIncomePopulation
                * e.region.avgDailyIncomeInUSD)
              / t;
          return {
            data: e,
            impact: l,
            severeImpact: {
              currentlyInfected: d,
              infectionsByRequestedTime: u,
              severeCasesByRequestedTime: m,
              hospitalBedsByRequestedTime: p,
              casesForICUByRequestedTime: y,
              casesForVentilatorsByRequestedTime: h,
              dollarsInFlight: Math.trunc(v)
            }
          };
        };
        n.default = a;
      },
      {}
    ],
    2: [
      function (e, t, n) {
        let a;
        (a = e('./estimator')) && a.__esModule;
        const o = document.getElementById('submitBtn');
        const r = document.getElementById('impact');
        const s = document.getElementById('severeImpact');
        const c = document.getElementById('covid-info');
        const i = document.getElementById('error-message');
        o.addEventListener('click', () => {
          const e = {
            population: Number(document.getElementById('population').value),
            timeToElapse: Number(document.getElementById('timeToElapse').value),
            reportedCases: Number(
              document.getElementById('reportedCases').value
            ),
            totalHospitalBeds: Number(
              document.getElementById('noOfBeds').value
            ),
            periodType: document.getElementById('periodType').value,
            region: {
              name: 'Africa',
              avgAge: 19.7,
              avgDailyIncomeInUSD: 4,
              avgDailyIncomePopulation: 0.73
            }
          };
          (i.style.display = 'none'),
          (r.textContent = ''),
          (s.textContent = ''),
          (r.style.display = 'none'),
          (s.style.display = 'none'),
          (c.style.display = 'block'),
          fetch(
            'https://covid19-estimator-backend.herokuapp.com/api/v1/on-covid-19/json',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(e)
            }
          )
            .then((e) => e.json())
            .then((e) => {
              (c.style.display = 'none'),
              (i.style.display = 'none'),
              (r.style.display = 'block'),
              (s.style.display = 'block'),
              Object.keys(e.impact).forEach((t) => {
                n, o, a, s;
                (a.textContent = 'Impact'),
                (o.textContent = `${t}:`),
                (s.textContent = e.impact[t]),
                n.appendChild(o).appendChild(s),
                r.appendChild(n);
              }),
              Object.keys(e.severeImpact).forEach((t) => {
                n, o, a, r;
                (a.textContent = 'Impact'),
                (o.textContent = `${t}:`),
                (r.textContent = e.severeImpact[t]),
                n.appendChild(o).appendChild(r),
                s.appendChild(n);
              });
            })
            .catch(() => {
              (c.style.display = 'none'),
              (r.style.display = 'none'),
              (s.style.display = 'none'),
              (i.style.display = 'block');
            });
        });
      },
      { './estimator': 1 }
    ]
  },
  {},
  [1, 2]
);
