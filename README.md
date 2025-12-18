# Probability Distribution Visualizer

An interactive educational tool that guides students through a decision tree to identify appropriate probability distributions, with real-time parameter adjustment and visualization.

## Features

- **Interactive Decision Tree**: Navigate through questions to identify the appropriate probability distribution for your data
- **15 Probability Distributions**: 
  - **Discrete**: Binomial, Uniform Discrete, Geometric, Negative Binomial, Hypergeometric
  - **Continuous**: Normal, Uniform, Triangular, Logistic, Cauchy, Exponential, Lognormal, Gamma, Weibull, Minimum Extreme (Gumbel Min)
- **Real-time Parameter Controls**: Adjust distribution parameters with sliders and see immediate visual feedback
- **Interactive Charts**: Powered by Plotly.js with zoom, pan, and hover tooltips
- **Distribution Statistics**: View mean, variance, and mode calculations in real-time
- **Educational Content**: Each distribution includes descriptions and common use cases

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Start by answering the decision tree questions about your data characteristics
2. Follow the path through the tree to identify the appropriate distribution
3. Alternatively, select a distribution directly from the list
4. Adjust the distribution parameters using the sliders
5. Observe how the probability distribution changes in real-time
6. View the calculated statistics (mean, variance, mode) for the current parameters

## Technology Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Plotly.js** for interactive chart visualizations
- **Tailwind CSS v4** for modern, responsive styling

## Project Structure

```
src/
├── components/
│   ├── DecisionTree.tsx          # Interactive decision tree navigation
│   ├── DistributionViewer.tsx    # Main viewer with controls and chart
│   ├── ParameterControls.tsx     # Slider controls for parameters
│   └── DistributionChart.tsx     # Plotly chart wrapper
├── distributions/
│   ├── discrete/                 # Discrete distribution implementations
│   ├── continuous/               # Continuous distribution implementations
│   ├── types.ts                  # Type definitions
│   └── index.ts                  # Distribution registry
└── utils/
    └── distributionHelpers.ts    # Mathematical helper functions
```

## License

MIT
