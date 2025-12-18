import type { Distribution, DistributionStatistics } from '../types';

export const logistic: Distribution = {
  config: {
    name: 'Logistic',
    type: 'continuous',
    description:
      'Similar to Normal but with heavier tails. Used when outliers are low probability but more likely than Normal.',
    parameters: [
      {
        name: 'Location',
        symbol: 'μ',
        description: 'Center of the distribution',
        min: -10,
        max: 10,
        step: 0.1,
        default: 0,
      },
      {
        name: 'Scale',
        symbol: 's',
        description: 'Scale parameter (related to variance)',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
      },
    ],
    defaultParameters: { μ: 0, s: 1 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const mu = params['μ'] ?? params.mu ?? params.mean ?? 0;
    const s = params.s ?? params.scale ?? 1;
    const z = (x - mu) / s;
    const expZ = Math.exp(-z);
    return expZ / (s * (1 + expZ) * (1 + expZ));
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const mu = params['μ'] ?? params.mu ?? params.mean ?? 0;
    const s = params.s ?? params.scale ?? 1;
    const mean = mu;
    const variance = (Math.PI * Math.PI * s * s) / 3;
    return { mean, variance, mode: mu };
  },
  generateData: (params: Record<string, number>) => {
    const mu = params['μ'] ?? params.mu ?? params.mean ?? 0;
    const s = params.s ?? params.scale ?? 1;
    const x: number[] = [];
    const y: number[] = [];
    const range = 5 * s;
    for (let val = mu - range; val <= mu + range; val += 0.1) {
      x.push(val);
      y.push(logistic.pdf(val, params));
    }
    return { x, y };
  },
};

