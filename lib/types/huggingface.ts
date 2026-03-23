/** Subset of HuggingFace /api/models response — only fields we use */
export interface HFModel {
  id: string;
  likes: number;
  downloads: number;
  pipeline_tag?: string;  // Not all models have a pipeline tag set
  tags: string[];
}

/** Subset of HuggingFace /api/spaces response — only fields we use */
export interface HFSpace {
  id: string;
  likes: number;
  sdk?: string;
  tags: string[];
}

/** Normalized item for display */
export interface HFItem {
  kind: "model" | "space";
  title: string;
  url: string;
  likes: number;
  downloads?: number;
  meta: string;
  tags: string[];
}
