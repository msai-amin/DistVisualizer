import { useState } from 'react';
import type { Distribution } from '../distributions/types';
import { DistributionChart } from './DistributionChart';
import { ParameterControls } from './ParameterControls';

interface DistributionViewerProps {
  distribution: Distribution;
  onBack: () => void;
}

export function DistributionViewer({
  distribution,
  onBack,
}: DistributionViewerProps) {
  const [parameters, setParameters] = useState<Record<string, number>>(
    distribution.config.defaultParameters
  );

  const stats = distribution.calculateStats(parameters);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
        >
          ← Back to Decision Tree
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {distribution.config.name} Distribution
          </h1>
          <p className="text-gray-600 mb-4">{distribution.config.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="text-sm text-gray-500">Mean</div>
              <div className="text-lg font-semibold text-gray-900">
                {isNaN(stats.mean) ? 'N/A' : stats.mean.toFixed(3)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Variance</div>
              <div className="text-lg font-semibold text-gray-900">
                {isNaN(stats.variance) ? 'N/A' : stats.variance.toFixed(3)}
              </div>
            </div>
            {stats.mode !== undefined && (
              <div>
                <div className="text-sm text-gray-500">Mode</div>
                <div className="text-lg font-semibold text-gray-900">
                  {stats.mode.toFixed(3)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <DistributionChart
              distribution={distribution}
              parameters={parameters}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <ParameterControls
              distribution={distribution}
              parameters={parameters}
              onParametersChange={setParameters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

