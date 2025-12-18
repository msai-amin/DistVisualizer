import type { Distribution, DistributionStatistics } from '../types';

export const minimumExtreme: Distribution = {
  config: {
    name: 'Minimum Extreme (Gumbel Min)',
    type: 'continuous',
    description:
      'Models the minimum of many random variables. Left-skewed, with outliers mostly negative.',
    parameters: [
      {
        name: 'Location',
        symbol: 'μ',
        description: 'Location parameter',
        min: -10,
        max: 10,
        step: 0.1,
        default: 0,
      },
      {
        name: 'Scale',
        symbol: 'β',
        description: 'Scale parameter',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
      },
    ],
    defaultParameters: { μ: 0, 'β': 1 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const mu = params['μ'] ?? params.mu ?? params.location ?? 0;
    const beta = params['β'] ?? params.beta ?? params.scale ?? 1;
    const z = (x - mu) / beta;
    const expZ = Math.exp(z);
    return (1 / beta) * expZ * Math.exp(-expZ);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const mu = params['μ'] ?? params.mu ?? params.location ?? 0;
    const beta = params['β'] ?? params.beta ?? params.scale ?? 1;
    const eulerGamma = 0.5772156649015329; // Euler-Mascheroni constant
    const mean = mu - beta * eulerGamma;
    const variance = (Math.PI * Math.PI * beta * beta) / 6;
    // Mode for Gumbel min is at mu
    const mode = mu;
    return { mean, variance, mode };
  },
  generateData: (params: Record<string, number>) => {
    const mu = params['μ'] ?? params.mu ?? params.location ?? 0;
    const beta = params['β'] ?? params.beta ?? params.scale ?? 1;
    const x: number[] = [];
    const y: number[] = [];
    // Gumbel min can extend quite far to the left
    const range = 5 * beta;
    for (let val = mu - range; val <= mu + range; val += 0.1) {
      x.push(val);
      y.push(minimumExtreme.pdf(val, params));
    }
    return { x, y };
  },
};

