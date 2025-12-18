import type { Distribution, DistributionName } from './types';
import { binomial } from './discrete/Binomial';
import { uniformDiscrete } from './discrete/UniformDiscrete';
import { geometric } from './discrete/Geometric';
import { negativeBinomial } from './discrete/NegativeBinomial';
import { hypergeometric } from './discrete/Hypergeometric';
import { normal } from './continuous/Normal';
import { uniform } from './continuous/Uniform';
import { triangular } from './continuous/Triangular';
import { logistic } from './continuous/Logistic';
import { cauchy } from './continuous/Cauchy';
import { exponential } from './continuous/Exponential';
import { lognormal } from './continuous/Lognormal';
import { gammaDist } from './continuous/Gamma';
import { weibull } from './continuous/Weibull';
import { minimumExtreme } from './continuous/MinimumExtreme';

export const distributions: Record<DistributionName, Distribution> = {
  binomial,
  uniformDiscrete,
  geometric,
  negativeBinomial,
  hypergeometric,
  normal,
  uniform,
  triangular,
  logistic,
  cauchy,
  exponential,
  lognormal,
  gamma: gammaDist,
  weibull,
  minimumExtreme,
};

export * from './types';
export {
  binomial,
  uniformDiscrete,
  geometric,
  negativeBinomial,
  hypergeometric,
  normal,
  uniform,
  triangular,
  logistic,
  cauchy,
  exponential,
  lognormal,
  gammaDist as gamma,
  weibull,
  minimumExtreme,
};

