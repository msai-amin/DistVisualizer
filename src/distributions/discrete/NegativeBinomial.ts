import type { Distribution, DistributionStatistics } from '../types';
import { binomialCoefficient } from '../../utils/distributionHelpers';

export const negativeBinomial: Distribution = {
  config: {
    name: 'Negative Binomial',
    type: 'discrete',
    description:
      'Models the number of failures before achieving r successes in a sequence of independent trials.',
    parameters: [
      {
        name: 'Number of successes',
        symbol: 'r',
        description: 'Target number of successes',
        min: 1,
        max: 20,
        step: 1,
        default: 3,
      },
      {
        name: 'Probability of success',
        symbol: 'p',
        description: 'Probability of success in each trial',
        min: 0.01,
        max: 0.99,
        step: 0.01,
        default: 0.4,
      },
    ],
    defaultParameters: { r: 3, p: 0.4 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const r = params.r;
    const p = params.p;
    if (!Number.isInteger(x) || x < 0) return 0;
    const coeff = binomialCoefficient(x + r - 1, r - 1);
    return coeff * Math.pow(p, r) * Math.pow(1 - p, x);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const r = params.r;
    const p = params.p;
    const mean = (r * (1 - p)) / p;
    const variance = (r * (1 - p)) / (p * p);
    const mode = Math.floor((r - 1) * (1 - p) / p);
    return { mean, variance, mode: mode >= 0 ? mode : 0 };
  },
  generateData: (params: Record<string, number>) => {
    const r = params.r;
    const p = params.p;
    const x: number[] = [];
    const y: number[] = [];
    const maxX = Math.min(100, Math.ceil(r * 10 / p));
    for (let k = 0; k <= maxX; k++) {
      x.push(k);
      y.push(negativeBinomial.pdf(k, params));
    }
    return { x, y };
  },
};

