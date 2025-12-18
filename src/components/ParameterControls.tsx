import type { Distribution } from '../distributions/types';

interface ParameterControlsProps {
  distribution: Distribution;
  parameters: Record<string, number>;
  onParametersChange: (params: Record<string, number>) => void;
}

export function ParameterControls({
  distribution,
  parameters,
  onParametersChange,
}: ParameterControlsProps) {
  const handleParameterChange = (
    paramSymbol: string,
    value: number
  ) => {
    const newParams = { ...parameters };
    newParams[paramSymbol] = value;
    onParametersChange(newParams);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Parameters
      </h3>
      <div className="space-y-4">
        {distribution.config.parameters.map((param) => (
          <div key={param.symbol} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                {param.name} ({param.symbol})
              </label>
              <span className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                {parameters[param.symbol]?.toFixed(2) ?? param.default.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={parameters[param.symbol] ?? param.default}
              onChange={(e) =>
                handleParameterChange(
                  param.symbol,
                  parseFloat(e.target.value)
                )
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{param.min}</span>
              <span className="text-xs text-gray-400 italic">
                {param.description}
              </span>
              <span>{param.max}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

