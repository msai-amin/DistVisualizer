import type { Distribution, DistributionStatistics } from '../types';

export const uniformDiscrete: Distribution = {
  config: {
    name: 'Uniform Discrete',
    type: 'discrete',
    description:
      'All outcomes have equal probability. Used when there is no preference for any particular outcome.',
    parameters: [
      {
        name: 'Minimum',
        symbol: 'a',
        description: 'Minimum value',
        min: 0,
        max: 50,
        step: 1,
        default: 1,
      },
      {
        name: 'Maximum',
        symbol: 'b',
        description: 'Maximum value',
        min: 1,
        max: 100,
        step: 1,
        default: 10,
      },
    ],
    defaultParameters: { a: 1, b: 10 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const a = Math.floor(params.a);
    const b = Math.floor(params.b);
    if (!Number.isInteger(x) || x < a || x > b) return 0;
    return 1 / (b - a + 1);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const a = Math.floor(params.a);
    const b = Math.floor(params.b);
    const n = b - a + 1;
    const mean = (a + b) / 2;
    const variance = (n * n - 1) / 12;
    return { mean, variance };
  },
  generateData: (params: Record<string, number>) => {
    const a = Math.floor(params.a);
    const b = Math.floor(params.b);
    const x: number[] = [];
    const y: number[] = [];
    const prob = 1 / (b - a + 1);
    for (let k = a; k <= b; k++) {
      x.push(k);
      y.push(prob);
    }
    return { x, y };
  },
};

