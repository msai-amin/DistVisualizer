import type { Distribution, DistributionStatistics } from '../types';

export const exponential: Distribution = {
  config: {
    name: 'Exponential',
    type: 'continuous',
    description:
      'Models time until an event occurs. Only positive values, right-skewed with outliers only positive.',
    parameters: [
      {
        name: 'Rate',
        symbol: 'λ',
        description: 'Rate parameter (events per unit time)',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
      },
    ],
    defaultParameters: { 'λ': 1 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const lambda = params['λ'] ?? params.lambda ?? params.rate ?? 1;
    if (x < 0) return 0;
    return lambda * Math.exp(-lambda * x);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const lambda = params['λ'] ?? params.lambda ?? params.rate ?? 1;
    const mean = 1 / lambda;
    const variance = 1 / (lambda * lambda);
    const mode = 0;
    return { mean, variance, mode };
  },
  generateData: (params: Record<string, number>) => {
    const lambda = params['λ'] ?? params.lambda ?? params.rate ?? 1;
    const x: number[] = [];
    const y: number[] = [];
    const maxX = 5 / lambda; // Cover 5 standard deviations worth
    for (let val = 0; val <= maxX; val += 0.1) {
      x.push(val);
      y.push(exponential.pdf(val, params));
    }
    return { x, y };
  },
};

