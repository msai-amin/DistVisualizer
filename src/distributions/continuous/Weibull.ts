import type { Distribution, DistributionStatistics } from '../types';
import { gamma as gammaFn } from '../../utils/distributionHelpers';

export const weibull: Distribution = {
  config: {
    name: 'Weibull',
    type: 'continuous',
    description:
      'Flexible distribution for modeling lifetime data. Can be right-skewed, symmetric, or left-skewed depending on parameters. Mostly positive values.',
    parameters: [
      {
        name: 'Scale',
        symbol: 'λ',
        description: 'Scale parameter',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
      },
      {
        name: 'Shape',
        symbol: 'k',
        description: 'Shape parameter',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 2,
      },
    ],
    defaultParameters: { 'λ': 1, k: 2 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const lambda = params['λ'] ?? params.lambda ?? params.scale ?? 1;
    const k = params.k ?? params.shape ?? 2;
    if (x < 0) return 0;
    if (x === 0 && k < 1) return Infinity;
    if (x === 0 && k === 1) return k / lambda;
    if (x === 0 && k > 1) return 0;
    const term1 = (k / lambda) * Math.pow(x / lambda, k - 1);
    const term2 = Math.exp(-Math.pow(x / lambda, k));
    return term1 * term2;
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const lambda = params['λ'] ?? params.lambda ?? params.scale ?? 1;
    const k = params.k ?? params.shape ?? 2;
    // Using gamma function approximations for mean and variance
    const gamma1 = gammaFn(1 + 1 / k);
    const gamma2 = gammaFn(1 + 2 / k);
    const mean = lambda * gamma1;
    const variance = lambda * lambda * (gamma2 - gamma1 * gamma1);
    const mode = k > 1 ? lambda * Math.pow((k - 1) / k, 1 / k) : 0;
    return { mean, variance, mode };
  },
  generateData: (params: Record<string, number>) => {
    const lambda = params['λ'] ?? params.lambda ?? params.scale ?? 1;
    const x: number[] = [];
    const y: number[] = [];
    const maxX = lambda * 5;
    for (let val = 0; val <= maxX; val += maxX / 200) {
      x.push(val);
      y.push(weibull.pdf(val, params));
    }
    return { x, y };
  },
};

