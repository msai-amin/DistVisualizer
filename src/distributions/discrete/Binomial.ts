import type { Distribution, DistributionStatistics } from '../types';
import { binomialCoefficient } from '../../utils/distributionHelpers';

export const binomial: Distribution = {
  config: {
    name: 'Binomial',
    type: 'discrete',
    description:
      'Models the number of successes in a fixed number of independent trials, each with the same probability of success.',
    parameters: [
      {
        name: 'Number of trials',
        symbol: 'n',
        description: 'Total number of independent trials',
        min: 1,
        max: 100,
        step: 1,
        default: 20,
      },
      {
        name: 'Probability of success',
        symbol: 'p',
        description: 'Probability of success in each trial',
        min: 0.01,
        max: 0.99,
        step: 0.01,
        default: 0.5,
      },
    ],
    defaultParameters: { n: 20, p: 0.5 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const n = params.n;
    const p = params.p;
    if (!Number.isInteger(x) || x < 0 || x > n) return 0;
    const coeff = binomialCoefficient(n, x);
    return coeff * Math.pow(p, x) * Math.pow(1 - p, n - x);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const n = params.n;
    const p = params.p;
    const mean = n * p;
    const variance = n * p * (1 - p);
    const mode = Math.floor((n + 1) * p);
    return { mean, variance, mode };
  },
  generateData: (params: Record<string, number>) => {
    const n = params.n;
    const x: number[] = [];
    const y: number[] = [];
    for (let k = 0; k <= n; k++) {
      x.push(k);
      y.push(binomial.pdf(k, params));
    }
    return { x, y };
  },
};

