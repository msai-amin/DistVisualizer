import type { Distribution, DistributionStatistics } from '../types';
import { gamma } from '../../utils/distributionHelpers';

export const gammaDist: Distribution = {
  config: {
    name: 'Gamma',
    type: 'continuous',
    description:
      'Generalization of exponential distribution. Right-skewed, only positive values, used for waiting times and sizes.',
    parameters: [
      {
        name: 'Shape',
        symbol: 'α',
        description: 'Shape parameter',
        min: 0.1,
        max: 10,
        step: 0.1,
        default: 2,
      },
      {
        name: 'Rate',
        symbol: 'β',
        description: 'Rate parameter',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
      },
    ],
    defaultParameters: { 'α': 2, 'β': 1 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const alpha = params['α'] ?? params.alpha ?? params.shape ?? 2;
    const beta = params['β'] ?? params.beta ?? params.rate ?? 1;
    if (x <= 0) return 0;
    const gammaAlpha = gamma(alpha);
    if (!isFinite(gammaAlpha)) return 0;
    const coefficient = Math.pow(beta, alpha) / gammaAlpha;
    return coefficient * Math.pow(x, alpha - 1) * Math.exp(-beta * x);
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const alpha = params['α'] ?? params.alpha ?? params.shape ?? 2;
    const beta = params['β'] ?? params.beta ?? params.rate ?? 1;
    const mean = alpha / beta;
    const variance = alpha / (beta * beta);
    const mode = alpha > 1 ? (alpha - 1) / beta : 0;
    return { mean, variance, mode };
  },
  generateData: (params: Record<string, number>) => {
    const alpha = params['α'] ?? params.alpha ?? params.shape ?? 2;
    const beta = params['β'] ?? params.beta ?? params.rate ?? 1;
    const x: number[] = [];
    const y: number[] = [];
    const maxX = (alpha / beta) * 4; // Cover most of the distribution
    for (let val = 0; val <= maxX; val += maxX / 200) {
      x.push(val);
      y.push(gammaDist.pdf(val, params));
    }
    return { x, y };
  },
};

