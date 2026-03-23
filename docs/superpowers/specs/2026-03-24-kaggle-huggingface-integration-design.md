# Kaggle & Hugging Face Integration

## Summary

Add a combined "ML & AI Projects" section to the portfolio home page that fetches and displays highlights from Kaggle (notebooks, datasets) and Hugging Face (models, spaces) via their respective APIs. Follows the existing GitHub integration pattern.

**Usernames:**
- Kaggle: `salehyasseensaleen`
- Hugging Face: `saleen`

## Architecture

### Data Fetching

Two new lib modules following the `lib/github.ts` pattern:

**`lib/kaggle.ts`**
- Export: `getKaggleItems(username: string, key: string): Promise<KaggleItem[]>`
- Endpoint: `https://www.kaggle.com/api/v1/kernels/list?user={username}&pageSize=3&sortBy=voteCount` and `https://www.kaggle.com/api/v1/datasets/list?user={username}&pageSize=3&sortBy=votes`
- Note: Kaggle API is poorly documented. Parameter names may use snake_case (`page_size`, `sort_by`). Verify exact names against a live API call before finalizing. The asymmetry between `sortBy=voteCount` (kernels) and `sortBy=votes` (datasets) is intentional — Kaggle uses different field names.
- Auth: Basic auth (base64-encoded `username:key` in Authorization header). Credentials passed as function arguments.
- Returns: Top 3 notebooks + top 3 datasets, normalized into a single `KaggleItem[]`
- Cache: `next: { revalidate: 3600 }` (1 hour, matching GitHub)
- Error handling: Returns empty array on failure. Log non-200 responses at `console.warn` level with status code and endpoint for debugging.

**`lib/huggingface.ts`**
- Export: `getHFItems(username: string): Promise<HFItem[]>`
- Endpoints: `https://huggingface.co/api/models?author={username}&sort=likes&direction=-1&limit=3` and `https://huggingface.co/api/spaces?author={username}&sort=likes&direction=-1&limit=3`
- Auth: None required (public API). Username passed as function argument.
- Returns: Top 3 models + top 3 spaces, normalized into a single `HFItem[]`
- Cache: `next: { revalidate: 3600 }`
- Error handling: Returns empty array on failure. Log non-200 responses at `console.warn` level.

### Types

**`lib/types/kaggle.ts`**
```typescript
export interface KaggleKernel {
  title: string;
  ref: string;           // e.g. "username/kernel-slug"
  totalVotes: number;
  language: string;      // e.g. "Python"
  datasetSources: string[];
}

export interface KaggleDataset {
  title: string;
  ref: string;           // e.g. "username/dataset-slug"
  totalVotes: number;
  subtitle: string;
  totalBytes: number;
}

export interface KaggleItem {
  kind: "notebook" | "dataset";
  title: string;
  url: string;
  votes: number;
  meta: string;          // language for notebooks, subtitle for datasets
}
```

**`lib/types/huggingface.ts`**
```typescript
export interface HFModel {
  id: string;            // e.g. "saleen/model-name" (API also returns modelId as alias)
  likes: number;
  downloads: number;
  pipeline_tag: string;  // e.g. "text-generation"
  tags: string[];
}

export interface HFSpace {
  id: string;            // e.g. "saleen/space-name"
  likes: number;
  sdk: string;           // e.g. "gradio", "streamlit"
  tags: string[];
}

export interface HFItem {
  kind: "model" | "space";
  title: string;
  url: string;
  likes: number;
  downloads?: number;    // Only present for models
  meta: string;          // pipeline_tag for models, sdk for spaces
  tags: string[];
}
```

### Component

**`components/pages/home/ml-activity.tsx`**

A client component matching the `GitHubActivity` pattern:

- Props: `kaggleItems: KaggleItem[]`, `hfItems: HFItem[]`
- Section heading: "ML & AI Projects"
- Subheading: "Kaggle notebooks, datasets, and Hugging Face models."
- Grid: `md:grid-cols-2 lg:grid-cols-3` (6 cards total)
- Returns `null` if both arrays are empty

Each card displays:
- Platform badge/icon (Kaggle or Hugging Face)
- Title (kernel/dataset/model/space name)
- Kind label (notebook, dataset, model, space)
- Metric (votes for Kaggle, likes for HF)
- Meta info (language, pipeline tag, SDK)
- Tags (up to 3, same style as GitHub topics)
- External link to the item's page

Card styling matches GitHub cards: `glass-card soft-shadow`, motion animations with staggered reveal, hover lift effect.

Icons: Use `IconBrandKaggle` from `@tabler/icons-react` for Kaggle items. For Hugging Face, use an inline SVG based on the official HF logo mark. Tags are only rendered for HF items (Kaggle items have no tags).

### Home Page Integration

In `app/page.tsx`:

1. Import `getKaggleItems` and `getHFItems` from new lib files
2. Import `MLActivity` component
3. Use `Promise.all` to fetch all data in parallel (including existing fetches):
```typescript
const [data, latestPosts, repos, kaggleItems, hfItems] = await Promise.all([
  getResumeData(),
  getLatestHashnodePosts(3),
  getGitHubRepos(process.env.GITHUB_USERNAME || ""),
  getKaggleItems(process.env.KAGGLE_USERNAME || "", process.env.KAGGLE_KEY || ""),
  getHFItems(process.env.HUGGING_FACE_USERNAME || ""),
]);
```
4. Render `<MLActivity>` between `<GitHubActivity>` and `<ProjectsPreview>`

Page section order:
```
Hero → GitHub → ML & AI → Projects → Experience → Testimonials → Blog → Contact
```

### Environment Variables

Add to `.env.example`:
```
KAGGLE_USERNAME=salehyasseensaleen
KAGGLE_KEY=                          # Get from kaggle.com/settings → API → Create New Token
HUGGING_FACE_USERNAME=saleen
```

## Files to Create

| File | Purpose |
|------|---------|
| `lib/kaggle.ts` | Kaggle API client |
| `lib/huggingface.ts` | Hugging Face API client |
| `lib/types/kaggle.ts` | Kaggle type definitions |
| `lib/types/huggingface.ts` | Hugging Face type definitions |
| `components/pages/home/ml-activity.tsx` | Combined ML section component |

## Files to Modify

| File | Change |
|------|--------|
| `app/page.tsx` | Add imports, fetch calls, render MLActivity |
| `.env.example` | Add new env vars |

## Error Handling

- If Kaggle API fails (missing key, rate limit, network): return `[]`, section shows only HF items
- If HuggingFace API fails: return `[]`, section shows only Kaggle items
- If both fail: component returns `null`, section is hidden entirely
- No error UI — graceful degradation matching GitHub pattern

## Caching

All fetches use `next: { revalidate: 3600 }` on individual fetch calls. Note: `app/page.tsx` uses `force-dynamic`, so page-level ISR does not apply. The `revalidate: 3600` still enables the Next.js Data Cache, meaning API responses are cached for 1 hour even though the page re-renders on every request.
