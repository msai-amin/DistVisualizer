import type { Distribution, DistributionStatistics } from '../types';

export const lognormal: Distribution = {
  config: {
    name: 'Lognormal',
    type: 'continuous',
    description:
      'The logarithm of the variable follows a normal distribution. Right-skewed, only positive values, mostly positive with some very large outliers.',
    parameters: [
      {
        name: 'Location',
        symbol: 'μ',
        description: 'Mean of the underlying normal distribution',
        min: -2,
        max: 2,
        step: 0.1,
        default: 0,
      },
      {
        name: 'Scale',
        symbol: 'σ',
        description: 'Standard deviation of the underlying normal distribution',
        min: 0.1,
        max: 2,
        step: 0.1,
        default: 1,
      },
    ],
    defaultParameters: { μ: 0, σ: 1 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const mu = params['μ'] ?? params.mu ?? params.mean ?? 0;
    const sigma = params['σ'] ?? params.sigma ?? params.stdDev ?? 1;
    if (x <= 0) return 0;
    const coefficient = 1 / (x * sigma * Math.sqrt(2 * Math.PI));
    const logX = Math.log(x);
    const exponent = -((logX - mu) * (logX - mu)) / (2 * sigma * sigma);
    return coefficient * Math.exp(exponent);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const mu = params['μ'] ?? params.mu ?? params.mean ?? 0;
    const sigma = params['σ'] ?? params.sigma ?? params.stdDev ?? 1;
    const mean = Math.exp(mu + (sigma * sigma) / 2);
    const variance = (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
    const mode = Math.exp(mu - sigma * sigma);
    return { mean, variance, mode };
  },
  generateData: (params: Record<string, number>) => {
    const mu = params['μ'] ?? params.mu ?? params.mean ?? 0;
    const sigma = params['σ'] ?? params.sigma ?? params.stdDev ?? 1;
    const x: number[] = [];
    const y: number[] = [];
    const maxX = Math.exp(mu + 4 * sigma);
    for (let val = 0.01; val <= maxX; val += maxX / 200) {
      x.push(val);
      y.push(lognormal.pdf(val, params));
    }
    return { x, y };
  },
};

