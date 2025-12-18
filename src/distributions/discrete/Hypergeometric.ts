import type { Distribution, DistributionStatistics } from '../types';
import { binomialCoefficient } from '../../utils/distributionHelpers';

export const hypergeometric: Distribution = {
  config: {
    name: 'Hypergeometric',
    type: 'discrete',
    description:
      'Models the number of successes in draws without replacement from a finite population.',
    parameters: [
      {
        name: 'Population size',
        symbol: 'N',
        description: 'Total population size',
        min: 10,
        max: 200,
        step: 1,
        default: 100,
      },
      {
        name: 'Number of successes in population',
        symbol: 'K',
        description: 'Number of success items in population',
        min: 1,
        max: 100,
        step: 1,
        default: 30,
      },
      {
        name: 'Sample size',
        symbol: 'n',
        description: 'Number of items drawn',
        min: 1,
        max: 100,
        step: 1,
        default: 20,
      },
    ],
    defaultParameters: { N: 100, K: 30, n: 20 },
  },
  pdf: (x: number, params: Record<string, number>) => {
    const N = Math.floor(params.N);
    const K = Math.floor(params.K);
    const n = Math.floor(params.n);
    if (!Number.isInteger(x) || x < 0 || x > n || x > K) return 0;
    if (n - x > N - K) return 0;
    const numerator = binomialCoefficient(K, x) * binomialCoefficient(N - K, n - x);
    const denominator = binomialCoefficient(N, n);
    return numerator / denominator;
  },
  calculateStats: (params: Record<string, number>): DistributionStatistics => {
    const N = Math.floor(params.N);
    const K = Math.floor(params.K);
    const n = Math.floor(params.n);
    const mean = (n * K) / N;
    const variance = (n * K * (N - K) * (N - n)) / (N * N * (N - 1));
    const mode = Math.floor(((n + 1) * (K + 1)) / (N + 2));
    return { mean, variance, mode };
  },
  generateData: (params: Record<string, number>) => {
    const N = Math.floor(params.N);
    const K = Math.floor(params.K);
    const n = Math.floor(params.n);
    const x: number[] = [];
    const y: number[] = [];
    const maxX = Math.min(n, K);
    const minX = Math.max(0, n - (N - K));
    for (let k = minX; k <= maxX; k++) {
      x.push(k);
      y.push(hypergeometric.pdf(k, params));
    }
    return { x, y };
  },
};

