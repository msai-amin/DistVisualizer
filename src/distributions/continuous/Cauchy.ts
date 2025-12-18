import type { Distribution, DistributionStatistics } from '../types';

export const cauchy: Distribution = {
  config: {
    name: 'Cauchy',
    type: 'continuous',
    description:
      'Heavy-tailed distribution, similar to Logistic but even heavier tails. Outliers are low probability but possible.',
    parameters: [
      {
        name: 'Location',
        symbol: 'x₀',
        description: 'Location parameter',
        min: -10,
        max: 10,
        step: 0.1,
        default: 0,
      },
      {
        name: 'Scale',
        symbol: 'γ',
        description: 'Scale parameter',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
      },
    ],
    defaultParameters: { 'x₀': 0, 'γ': 1 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const x0 = params['x₀'] ?? params.x0 ?? params.location ?? 0;
    const gamma = params['γ'] ?? params.gamma ?? params.scale ?? 1;
    const diff = x - x0;
    return 1 / (Math.PI * gamma * (1 + (diff * diff) / (gamma * gamma)));
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    // Cauchy distribution has undefined mean and variance
    const x0 = params['x₀'] ?? params.x0 ?? params.location ?? 0;
    return { mean: NaN, variance: NaN, mode: x0 };
  },
  generateData: (params: Record<string, number>) => {
    const x0 = params['x₀'] ?? params.x0 ?? params.location ?? 0;
    const gamma = params['γ'] ?? params.gamma ?? params.scale ?? 1;
    const x: number[] = [];
    const y: number[] = [];
    // Cauchy has heavy tails, so we show a reasonable range
    const range = 5 * gamma;
    for (let val = x0 - range; val <= x0 + range; val += 0.1) {
      x.push(val);
      y.push(cauchy.pdf(val, params));
    }
    return { x, y };
  },
};

