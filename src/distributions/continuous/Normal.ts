import type { Distribution, DistributionStatistics } from '../types';

export const normal: Distribution = {
  config: {
    name: 'Normal',
    type: 'continuous',
    description:
      'The classic bell curve. Used when data is symmetric, clustered around a central value, with outliers very unlikely.',
    parameters: [
      {
        name: 'Mean',
        symbol: 'μ',
        description: 'Center of the distribution',
        min: -10,
        max: 10,
        step: 0.1,
        default: 0,
      },
      {
        name: 'Standard deviation',
        symbol: 'σ',
        description: 'Spread of the distribution',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
      },
    ],
    defaultParameters: { μ: 0, σ: 1 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const mean = params['μ'] ?? params.mean ?? 0;
    const stdDev = params['σ'] ?? params.sigma ?? params.stdDev ?? 1;
    const variance = stdDev * stdDev;
    const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
    const exponent = -((x - mean) * (x - mean)) / (2 * variance);
    return coefficient * Math.exp(exponent);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const mean = params['μ'] ?? params.mean ?? 0;
    const stdDev = params['σ'] ?? params.sigma ?? params.stdDev ?? 1;
    const variance = stdDev * stdDev;
    return { mean, variance, mode: mean };
  },
  generateData: (params: Record<string, number>) => {
    const mean = params['μ'] ?? params.mean ?? 0;
    const stdDev = params['σ'] ?? params.sigma ?? params.stdDev ?? 1;
    const x: number[] = [];
    const y: number[] = [];
    const range = mean + 4 * stdDev;
    for (let val = mean - 4 * stdDev; val <= range; val += 0.1) {
      x.push(val);
      y.push(normal.pdf(val, params));
    }
    return { x, y };
  },
};

