import type { Distribution, DistributionStatistics } from '../types';

export const uniform: Distribution = {
  config: {
    name: 'Uniform',
    type: 'continuous',
    description:
      'All values in a range have equal probability density. Used when there is no preference for any particular value.',
    parameters: [
      {
        name: 'Minimum',
        symbol: 'a',
        description: 'Lower bound',
        min: -10,
        max: 10,
        step: 0.1,
        default: 0,
      },
      {
        name: 'Maximum',
        symbol: 'b',
        description: 'Upper bound',
        min: -10,
        max: 10,
        step: 0.1,
        default: 10,
      },
    ],
    defaultParameters: { a: 0, b: 10 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const a = params.a;
    const b = params.b;
    if (x < a || x > b) return 0;
    return 1 / (b - a);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const a = params.a;
    const b = params.b;
    const mean = (a + b) / 2;
    const variance = ((b - a) * (b - a)) / 12;
    return { mean, variance };
  },
  generateData: (params: Record<string, number>) => {
    const a = params.a;
    const b = params.b;
    const x: number[] = [];
    const y: number[] = [];
    const density = 1 / (b - a);
    for (let val = a; val <= b; val += 0.1) {
      x.push(val);
      y.push(density);
    }
    return { x, y };
  },
};

