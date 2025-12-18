import type { Distribution, DistributionStatistics } from '../types';

export const triangular: Distribution = {
  config: {
    name: 'Triangular',
    type: 'continuous',
    description:
      'Triangular-shaped distribution with limits on data and no outliers. Clustered around a central value.',
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
      {
        name: 'Mode',
        symbol: 'c',
        description: 'Peak of the triangle (between a and b)',
        min: -10,
        max: 10,
        step: 0.1,
        default: 5,
      },
    ],
    defaultParameters: { a: 0, b: 10, c: 5 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const a = params.a;
    const b = params.b;
    const c = params.c;
    if (x < a || x > b) return 0;
    if (x < c) {
      return (2 * (x - a)) / ((b - a) * (c - a));
    } else if (x === c) {
      return 2 / (b - a);
    } else {
      return (2 * (b - x)) / ((b - a) * (b - c));
    }
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const a = params.a;
    const b = params.b;
    const c = params.c;
    const mean = (a + b + c) / 3;
    const variance = (a * a + b * b + c * c - a * b - a * c - b * c) / 18;
    return { mean, variance, mode: c };
  },
  generateData: (params: Record<string, number>) => {
    const a = params.a;
    const b = params.b;
    const x: number[] = [];
    const y: number[] = [];
    for (let val = a; val <= b; val += 0.1) {
      x.push(val);
      y.push(triangular.pdf(val, params));
    }
    return { x, y };
  },
};

