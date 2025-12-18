import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import type { Distribution } from '../distributions/types';

interface DistributionChartProps {
  distribution: Distribution;
  parameters: Record<string, number>;
}

export function DistributionChart({
  distribution,
  parameters,
}: DistributionChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const data = distribution.generateData(parameters);
    const isDiscrete = distribution.config.type === 'discrete';

    const plotData: any = isDiscrete
      ? {
          type: 'bar',
          x: data.x,
          y: data.y,
          marker: {
            color: 'rgb(59, 130, 246)',
            line: {
              color: 'rgb(37, 99, 235)',
              width: 1,
            },
          },
          name: 'PMF',
        }
      : {
          type: 'scatter',
          mode: 'lines',
          x: data.x,
          y: data.y,
          line: {
            color: 'rgb(59, 130, 246)',
            width: 2,
          },
          name: 'PDF',
          fill: 'tozeroy',
          fillcolor: 'rgba(59, 130, 246, 0.1)',
        };

    const layout: any = {
      title: distribution.config.name,
      xaxis: {
        title: 'x',
        showgrid: true,
        zeroline: true,
      },
      yaxis: {
        title: isDiscrete ? 'Probability Mass' : 'Probability Density',
        showgrid: true,
        zeroline: true,
      },
      margin: { l: 60, r: 30, t: 60, b: 50 },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      font: {
        color: '#1f2937',
      },
      hovermode: 'closest',
    };

    const config: any = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    };

    Plotly.newPlot(chartRef.current, [plotData], layout, config);

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [distribution, parameters]);

  return (
    <div className="w-full h-full min-h-[500px]">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
}

