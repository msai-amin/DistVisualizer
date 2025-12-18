export type DistributionType = 'discrete' | 'continuous';

export interface ParameterConfig {
  name: string;
  symbol: string;
  description: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

export interface DistributionConfig {
  name: string;
  type: DistributionType;
  description: string;
  parameters: ParameterConfig[];
  defaultParameters: Record<string, number>;
}

export interface DistributionStatistics {
  mean: number;
  variance: number;
  mode?: number;
}

export type DistributionFunction = (
  x: number,
  parameters: Record<string, number>
) => number;

export interface Distribution {
  config: DistributionConfig;
  pdf: DistributionFunction;
  calculateStats: (parameters: Record<string, number>) => DistributionStatistics;
  generateData: (
    parameters: Record<string, number>,
    range?: { min: number; max: number; step?: number }
  ) => { x: number[]; y: number[] };
}

export type DistributionName =
  // Discrete
  | 'binomial'
  | 'uniformDiscrete'
  | 'geometric'
  | 'negativeBinomial'
  | 'hypergeometric'
  // Continuous
  | 'normal'
  | 'uniform'
  | 'triangular'
  | 'logistic'
  | 'cauchy'
  | 'exponential'
  | 'lognormal'
  | 'gamma'
  | 'weibull'
  | 'minimumExtreme';

