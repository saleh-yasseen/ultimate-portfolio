/** Subset of Kaggle /api/v1/kernels/list response — only fields we use */
export interface KaggleKernel {
  title: string;
  ref: string;
  totalVotes: number;
  language: string;
  datasetSources: string[];
}

/** Subset of Kaggle /api/v1/datasets/list response — only fields we use */
export interface KaggleDataset {
  title: string;
  ref: string;
  totalVotes: number;
  subtitle: string;
  totalBytes: number;
}

/** Normalized item for display */
export interface KaggleItem {
  kind: "notebook" | "dataset";
  title: string;
  url: string;
  votes: number;
  meta: string;
}
