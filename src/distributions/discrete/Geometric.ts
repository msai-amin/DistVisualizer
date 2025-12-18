import type { Distribution, DistributionStatistics } from '../types';

export const geometric: Distribution = {
  config: {
    name: 'Geometric',
    type: 'discrete',
    description:
      'Models the number of failures before the first success in a sequence of independent trials.',
    parameters: [
      {
        name: 'Probability of success',
        symbol: 'p',
        description: 'Probability of success in each trial',
        min: 0.01,
        max: 0.99,
        step: 0.01,
        default: 0.3,
      },
    ],
    defaultParameters: { p: 0.3 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const p = params.p;
    if (!Number.isInteger(x) || x < 0) return 0;
    return p * Math.pow(1 - p, x);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const p = params.p;
    const mean = (1 - p) / p;
    const variance = (1 - p) / (p * p);
    const mode = 0;
    return { mean, variance, mode };
  },
  generateData: (params: Record<string, number>) => {
    const p = params.p;
    const x: number[] = [];
    const y: number[] = [];
    // Generate up to where probability becomes very small
    const maxX = Math.min(100, Math.ceil(10 / p));
    for (let k = 0; k <= maxX; k++) {
      x.push(k);
      y.push(geometric.pdf(k, params));
    }
    return { x, y };
  },
};

