/// <reference types="vite/client" />

declare module 'plotly.js-dist-min' {
  import { Data, Layout, Config } from 'plotly.js';
  
  interface PlotlyStatic {
    newPlot(
      root: HTMLElement,
      data: Partial<Data>[],
      layout?: Partial<Layout>,
      config?: Partial<Config>
    ): Promise<void>;
    purge(root: HTMLElement): void;
  }
  
  const Plotly: PlotlyStatic;
  export default Plotly;
  export = Plotly;
  
  export namespace Plotly {
    export type PlotData = Partial<Data>;
    export type Layout = Partial<Layout>;
    export type Config = Partial<Config>;
  }
}

