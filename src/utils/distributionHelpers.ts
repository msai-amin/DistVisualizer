// Factorial function
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Binomial coefficient C(n, k)
export function binomialCoefficient(n: number, k: number): number {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k); // Use symmetry
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

// Gamma function (Stirling's approximation for large values)
export function gamma(z: number): number {
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  }
  z -= 1;
  const x =
    0.99999999999980993 +
    676.5203681218851 / (z + 1) -
    1259.1392167224028 / (z + 2) +
    771.32342877765313 / (z + 3) -
    176.61502916214059 / (z + 4) +
    12.507343278686905 / (z + 5) -
    0.13857109526572012 / (z + 6) +
    9.9843695780195716e-6 / (z + 7) +
    1.5056327351493116e-7 / (z + 8);
  const t = z + 7.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Error function (approximation)
export function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

// Normal CDF approximation
export function normalCDF(x: number, mean: number, stdDev: number): number {
  return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}

// Generate range of values for plotting
export function generateRange(
  min: number,
  max: number,
  step: number,
  isDiscrete: boolean
): number[] {
  const values: number[] = [];
  if (isDiscrete) {
    for (let i = Math.ceil(min); i <= Math.floor(max); i++) {
      values.push(i);
    }
  } else {
    for (let x = min; x <= max; x += step) {
      values.push(x);
    }
  }
  return values;
}

