import { useState } from 'react';
import type { DistributionName } from '../distributions';
import { distributions } from '../distributions';

interface DecisionNode {
  id: string;
  question: string;
  options: {
    label: string;
    nextNodeId?: string;
    distribution?: DistributionName;
  }[];
}

interface DecisionTreeProps {
  onSelectDistribution: (distName: DistributionName) => void;
}

const decisionTree: DecisionNode[] = [
  {
    id: 'root',
    question: 'Is the data discrete or continuous?',
    options: [
      { label: 'Discrete', nextNodeId: 'discrete' },
      { label: 'Continuous', nextNodeId: 'continuous' },
    ],
  },
  {
    id: 'discrete',
    question: 'Can you estimate outcomes and probabilities?',
    options: [
      { label: 'Yes', nextNodeId: 'discrete-estimate' },
      { label: 'No', nextNodeId: 'discrete-symmetric' },
    ],
  },
  {
    id: 'discrete-estimate',
    question: 'Are the values clustered around a central value?',
    options: [
      { label: 'Yes', distribution: 'binomial' },
      { label: 'No', distribution: 'uniformDiscrete' },
    ],
  },
  {
    id: 'discrete-symmetric',
    question: 'Is the data symmetric or asymmetric?',
    options: [
      { label: 'Symmetric', distribution: 'geometric' },
      { label: 'Asymmetric', nextNodeId: 'discrete-outliers' },
    ],
  },
  {
    id: 'discrete-outliers',
    question: 'Are the outliers positive or negative?',
    options: [
      { label: 'Only positive', distribution: 'negativeBinomial' },
      { label: 'More positive', distribution: 'hypergeometric' },
    ],
  },
  {
    id: 'continuous',
    question: 'Is the data symmetric or asymmetric?',
    options: [
      { label: 'Symmetric', nextNodeId: 'continuous-symmetric' },
      { label: 'Asymmetric', nextNodeId: 'continuous-outliers' },
    ],
  },
  {
    id: 'continuous-symmetric',
    question: 'Is the data clustered around a central value?',
    options: [
      { label: 'Yes', distribution: 'triangular' },
      { label: 'No', distribution: 'uniform' },
    ],
  },
  {
    id: 'continuous-outliers',
    question: 'Where do the outliers lie?',
    options: [
      { label: 'How likely are outliers?', nextNodeId: 'continuous-outlier-likely' },
      { label: 'Only positive', distribution: 'exponential' },
      { label: 'Mostly positive', distribution: 'lognormal' },
      { label: 'Mostly negative', distribution: 'minimumExtreme' },
    ],
  },
  {
    id: 'continuous-outlier-likely',
    question: 'How likely are the outliers?',
    options: [
      { label: 'Very low', distribution: 'normal' },
      { label: 'Low', distribution: 'logistic' },
    ],
  },
];

export function DecisionTree({ onSelectDistribution }: DecisionTreeProps) {
  const [currentNodeId, setCurrentNodeId] = useState<string>('root');
  const [path, setPath] = useState<string[]>(['root']);

  const currentNode = decisionTree.find((node) => node.id === currentNodeId);

  const handleOptionClick = (option: DecisionNode['options'][0]) => {
    if (option.distribution) {
      onSelectDistribution(option.distribution);
    } else if (option.nextNodeId) {
      setCurrentNodeId(option.nextNodeId);
      setPath([...path, option.nextNodeId]);
    }
  };

  const handleBack = () => {
    if (path.length > 1) {
      const newPath = [...path];
      newPath.pop();
      setPath(newPath);
      setCurrentNodeId(newPath[newPath.length - 1]);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('root');
    setPath(['root']);
  };

  const handleDirectDistribution = (distName: DistributionName) => {
    onSelectDistribution(distName);
  };

  if (!currentNode) {
    return <div>Error: Node not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Probability Distribution Selector
            </h1>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>

          {path.length > 1 && (
            <div className="mb-4">
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
              >
                ← Back
              </button>
            </div>
          )}

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentNode.question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentNode.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className="px-6 py-4 bg-white hover:bg-blue-100 border-2 border-blue-300 rounded-lg text-left transition-all hover:shadow-md hover:scale-105"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {option.label}
                  </span>
                  {option.distribution && (
                    <span className="block text-sm text-blue-600 mt-1">
                      → {distributions[option.distribution].config.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Or select a distribution directly:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Object.entries(distributions).map(([key, dist]) => (
                <button
                  key={key}
                  onClick={() => handleDirectDistribution(key as DistributionName)}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-200 text-gray-800 rounded-lg transition-colors text-sm"
                >
                  {dist.config.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Current Path:
          </h3>
          <div className="flex flex-wrap gap-2">
            {path.map((nodeId, idx) => {
              const node = decisionTree.find((n) => n.id === nodeId);
              return (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm ${
                    idx === path.length - 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {node?.question || nodeId}
                  {idx < path.length - 1 && (
                    <span className="ml-2">→</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

