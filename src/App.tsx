import { useState } from 'react';
import { DecisionTree } from './components/DecisionTree';
import { DistributionViewer } from './components/DistributionViewer';
import type { DistributionName } from './distributions';
import { distributions } from './distributions';

function App() {
  const [selectedDistribution, setSelectedDistribution] = useState<DistributionName | null>(null);

  const handleSelectDistribution = (distName: DistributionName) => {
    setSelectedDistribution(distName);
  };

  const handleBackToTree = () => {
    setSelectedDistribution(null);
  };

  if (selectedDistribution) {
    return (
      <DistributionViewer
        distribution={distributions[selectedDistribution]}
        onBack={handleBackToTree}
      />
    );
  }

  return <DecisionTree onSelectDistribution={handleSelectDistribution} />;
}

export default App;
