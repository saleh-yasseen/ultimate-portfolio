# Kaggle & Hugging Face Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a combined "ML & AI Projects" section to the portfolio home page displaying Kaggle notebooks/datasets and Hugging Face models/spaces.

**Architecture:** Two new API client modules (`lib/kaggle.ts`, `lib/huggingface.ts`) following the existing `lib/github.ts` pattern. A single new client component (`ml-activity.tsx`) renders both platforms in one section. Data fetches run in parallel via `Promise.all` in `app/page.tsx`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Framer Motion (`motion/react`), Tailwind CSS, `@tabler/icons-react`

**Spec:** `docs/superpowers/specs/2026-03-24-kaggle-huggingface-integration-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `lib/types/huggingface.ts` | HF API response types + normalized `HFItem` |
| Create | `lib/types/kaggle.ts` | Kaggle API response types + normalized `KaggleItem` |
| Create | `lib/huggingface.ts` | Fetch models + spaces from HF API, normalize to `HFItem[]` |
| Create | `lib/kaggle.ts` | Fetch kernels + datasets from Kaggle API, normalize to `KaggleItem[]` |
| Create | `components/pages/home/ml-activity.tsx` | Client component: combined ML & AI section with card grid |
| Modify | `app/page.tsx` | Add imports, parallel fetch, render `<MLActivity>` |
| Modify | `.env.example` | Add `KAGGLE_USERNAME`, `KAGGLE_KEY`, `HUGGING_FACE_USERNAME` |

---

### Task 1: Hugging Face Types

**Files:**
- Create: `lib/types/huggingface.ts`

- [ ] **Step 1: Create HF type definitions**

```typescript
// lib/types/huggingface.ts

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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/types/huggingface.ts
git commit -m "feat: add Hugging Face type definitions"
```

---

### Task 2: Kaggle Types

**Files:**
- Create: `lib/types/kaggle.ts`

- [ ] **Step 1: Create Kaggle type definitions**

```typescript
// lib/types/kaggle.ts

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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/types/kaggle.ts
git commit -m "feat: add Kaggle type definitions"
```

---

### Task 3: Hugging Face API Client

**Files:**
- Create: `lib/huggingface.ts`
- Reference: `lib/github.ts` (follow this pattern exactly)

- [ ] **Step 1: Create HF API client**

```typescript
// lib/huggingface.ts
import type { HFModel, HFSpace, HFItem } from "./types/huggingface";

export async function getHFItems(username: string): Promise<HFItem[]> {
  if (!username) return [];

  try {
    const [modelsRes, spacesRes] = await Promise.all([
      fetch(
        `https://huggingface.co/api/models?author=${username}&sort=likes&direction=-1&limit=3`,
        { next: { revalidate: 3600 } }
      ),
      fetch(
        `https://huggingface.co/api/spaces?author=${username}&sort=likes&direction=-1&limit=3`,
        { next: { revalidate: 3600 } }
      ),
    ]);

    const models: HFItem[] = modelsRes.ok
      ? ((await modelsRes.json()) as HFModel[]).map((m) => ({
          kind: "model" as const,
          title: m.id.split("/").pop() || m.id,
          url: `https://huggingface.co/${m.id}`,
          likes: m.likes,
          downloads: m.downloads,
          meta: m.pipeline_tag || "model",
          tags: m.tags?.filter((t) => !t.includes(":")).slice(0, 3) ?? [],
        }))
      : (() => {
          console.warn(`[HF] Models fetch failed: ${modelsRes.status}`);
          return [];
        })();

    const spaces: HFItem[] = spacesRes.ok
      ? ((await spacesRes.json()) as HFSpace[]).map((s) => ({
          kind: "space" as const,
          title: s.id.split("/").pop() || s.id,
          url: `https://huggingface.co/spaces/${s.id}`,
          likes: s.likes,
          meta: s.sdk || "space",
          tags: s.tags?.filter((t) => !t.includes(":")).slice(0, 3) ?? [],
        }))
      : (() => {
          console.warn(`[HF] Spaces fetch failed: ${spacesRes.status}`);
          return [];
        })();

    return [...models, ...spaces];
  } catch (error) {
    console.warn("[HF] Failed to fetch:", error);
    return [];
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Quick smoke test against live API**

Run: `npx tsx -e "import {getHFItems} from './lib/huggingface'; getHFItems('saleen').then(r => console.log(JSON.stringify(r, null, 2)))"`
Expected: JSON array of HFItem objects (or empty array if user has no public items)

- [ ] **Step 4: Commit**

```bash
git add lib/huggingface.ts
git commit -m "feat: add Hugging Face API client"
```

---

### Task 4: Kaggle API Client

**Files:**
- Create: `lib/kaggle.ts`
- Reference: `lib/github.ts` (follow this pattern exactly)

- [ ] **Step 1: Create Kaggle API client**

Note: Kaggle API parameter names are poorly documented. The implementation below uses camelCase params (`pageSize`, `sortBy`). If the API returns errors, try snake_case (`page_size`, `sort_by`). Verify with the smoke test in step 3.

```typescript
// lib/kaggle.ts
import type { KaggleKernel, KaggleDataset, KaggleItem } from "./types/kaggle";

export async function getKaggleItems(
  username: string,
  key: string
): Promise<KaggleItem[]> {
  if (!username || !key) return [];

  try {
    const authHeader = `Basic ${btoa(`${username}:${key}`)}`;
    const headers = { Authorization: authHeader };

    const [kernelsRes, datasetsRes] = await Promise.all([
      fetch(
        `https://www.kaggle.com/api/v1/kernels/list?user=${username}&pageSize=3&sortBy=voteCount`,
        { headers, next: { revalidate: 3600 } }
      ),
      fetch(
        `https://www.kaggle.com/api/v1/datasets/list?user=${username}&pageSize=3&sortBy=votes`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    const notebooks: KaggleItem[] = kernelsRes.ok
      ? ((await kernelsRes.json()) as KaggleKernel[]).map((k) => ({
          kind: "notebook" as const,
          title: k.title,
          url: `https://www.kaggle.com/code/${k.ref}`,
          votes: k.totalVotes,
          meta: k.language || "Python",
        }))
      : (() => {
          console.warn(`[Kaggle] Kernels fetch failed: ${kernelsRes.status}`);
          return [];
        })();

    const datasets: KaggleItem[] = datasetsRes.ok
      ? ((await datasetsRes.json()) as KaggleDataset[]).map((d) => ({
          kind: "dataset" as const,
          title: d.title,
          url: `https://www.kaggle.com/datasets/${d.ref}`,
          votes: d.totalVotes,
          meta: d.subtitle || "Dataset",
        }))
      : (() => {
          console.warn(`[Kaggle] Datasets fetch failed: ${datasetsRes.status}`);
          return [];
        })();

    return [...notebooks, ...datasets];
  } catch (error) {
    console.warn("[Kaggle] Failed to fetch:", error);
    return [];
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Smoke test (requires valid KAGGLE_KEY)**

Run: `KAGGLE_USERNAME=salehyasseensaleen KAGGLE_KEY=<key> npx tsx -e "import {getKaggleItems} from './lib/kaggle'; getKaggleItems(process.env.KAGGLE_USERNAME!, process.env.KAGGLE_KEY!).then(r => console.log(JSON.stringify(r, null, 2)))"`
Expected: JSON array of KaggleItem objects. If you get errors, try changing `pageSize` to `page_size` and `sortBy` to `sort_by` in the fetch URLs.

- [ ] **Step 4: Commit**

```bash
git add lib/kaggle.ts
git commit -m "feat: add Kaggle API client"
```

---

### Task 5: ML Activity Component

**Files:**
- Create: `components/pages/home/ml-activity.tsx`
- Reference: `components/pages/home/github-activity.tsx` (match this pattern)

- [ ] **Step 1: Create the combined ML & AI section component**

```tsx
// components/pages/home/ml-activity.tsx
"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import { motion } from "motion/react";
import type { KaggleItem } from "@/lib/types/kaggle";
import type { HFItem } from "@/lib/types/huggingface";
import {
  IconExternalLink,
  IconThumbUp,
  IconHeart,
  IconDownload,
} from "@tabler/icons-react";

function KaggleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.095.015.186-.09.271l-6.568 6.36 6.898 8.583c.092.118.096.222.015.33z" />
    </svg>
  );
}

function HuggingFaceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.5 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM8.5 9.5c1 0 1.5.5 2 1.5.5-1 1-1.5 2-1.5s1.5.5 2 1.5c.5-1 1-1.5 2-1.5.5 0 .5.5 0 .5-.5 0-1 .5-1.5 1.5-.5 1-1 1.5-2 1.5s-1.5-.5-2-1.5c-.5 1-1 1.5-2 1.5s-1.5-.5-2-1.5C8 10.5 7.5 10 7 10c-.5 0-.5-.5 0-.5 1 0 1 0 1.5 0zm-.5 5c0-.5.5-1 1-1h6c.5 0 1 .5 1 1v1c0 1.5-1.5 3-4 3s-4-1.5-4-3v-1z" />
    </svg>
  );
}

type MLCard =
  | (KaggleItem & { platform: "kaggle" })
  | (HFItem & { platform: "huggingface" });

function KaggleCardMetrics({ item }: { item: KaggleItem }) {
  return (
    <>
      {item.votes > 0 && (
        <span className="flex items-center gap-0.5">
          <IconThumbUp className="w-3.5 h-3.5" />
          {item.votes}
        </span>
      )}
    </>
  );
}

function HFCardMetrics({ item }: { item: HFItem }) {
  return (
    <>
      {item.likes > 0 && (
        <span className="flex items-center gap-0.5">
          <IconHeart className="w-3.5 h-3.5" />
          {item.likes}
        </span>
      )}
      {item.downloads != null && item.downloads > 0 && (
        <span className="flex items-center gap-0.5">
          <IconDownload className="w-3.5 h-3.5" />
          {item.downloads.toLocaleString()}
        </span>
      )}
    </>
  );
}

interface MLActivityProps {
  kaggleItems: KaggleItem[];
  hfItems: HFItem[];
}

export function MLActivity({ kaggleItems, hfItems }: MLActivityProps) {
  const allItems: MLCard[] = [
    ...kaggleItems.map((item) => ({ ...item, platform: "kaggle" as const })),
    ...hfItems.map((item) => ({ ...item, platform: "huggingface" as const })),
  ];

  if (allItems.length === 0) return null;

  return (
    <SectionReveal>
      <section className="container w-full px-6 py-24 md:py-40 flex flex-col gap-12">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-heading">
            ML & AI Projects
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Kaggle notebooks, datasets, and Hugging Face models.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allItems.map((item, index) => (
            <motion.a
              key={`${item.platform}-${item.title}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="group flex flex-col gap-3 glass-card soft-shadow p-5 transition-shadow hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {item.platform === "kaggle" ? (
                    <KaggleIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <HuggingFaceIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                  )}
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {item.title}
                  </h3>
                </div>
                <IconExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <div className="flex items-center gap-1">
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground capitalize">
                  {item.kind}
                </span>
                {item.meta && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {item.meta}
                  </span>
                )}
              </div>

              <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                {item.platform === "kaggle" ? (
                  <KaggleCardMetrics item={item} />
                ) : (
                  <HFCardMetrics item={item} />
                )}
              </div>

              {item.platform === "huggingface" && item.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/pages/home/ml-activity.tsx
git commit -m "feat: add ML & AI Projects section component"
```

---

### Task 6: Wire Up Home Page + Env Vars

**Files:**
- Modify: `app/page.tsx`
- Modify: `.env.example`

- [ ] **Step 1: Update `.env.example`**

Add these lines at the end of `.env.example`, after the existing entries:

```env
# Kaggle API (fetches notebooks and datasets for ML section)
# Get your API key from kaggle.com/settings → API → Create New Token
KAGGLE_USERNAME="salehyasseensaleen"
KAGGLE_KEY=""

# Hugging Face username (fetches models and spaces for ML section)
HUGGING_FACE_USERNAME="saleen"
```

- [ ] **Step 2: Update `app/page.tsx`**

Replace the entire file content with:

```tsx
import ContactSection from "@/components/pages/home/contact";
import { Experience } from "@/components/pages/home/experience";
import { Hero } from "@/components/pages/home/hero";
import { Testimonials } from "@/components/pages/home/testimonials";
import { ProjectsPreview } from "@/components/pages/home/projects";
import { BlogPreview } from "@/components/pages/home/blog-preview";
import { GitHubActivity } from "@/components/pages/home/github-activity";
import { MLActivity } from "@/components/pages/home/ml-activity";
import { getResumeData } from "@/lib/resume-data";
import { getLatestHashnodePosts } from "@/lib/hashnode";
import { getGitHubRepos } from "@/lib/github";
import { getKaggleItems } from "@/lib/kaggle";
import { getHFItems } from "@/lib/huggingface";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [data, latestPosts, repos, kaggleItems, hfItems] = await Promise.all([
    getResumeData(),
    getLatestHashnodePosts(3),
    getGitHubRepos(process.env.GITHUB_USERNAME || ""),
    getKaggleItems(
      process.env.KAGGLE_USERNAME || "",
      process.env.KAGGLE_KEY || ""
    ),
    getHFItems(process.env.HUGGING_FACE_USERNAME || ""),
  ]);
  const resumePath = process.env.RESUME_PDF_PATH || "/resume.pdf";

  return (
    <div className="min-h-screen w-full">
      <Hero data={data} resumePath={resumePath} />
      <GitHubActivity repos={repos} />
      <MLActivity kaggleItems={kaggleItems} hfItems={hfItems} />
      <ProjectsPreview data={data} />
      <Experience data={data} />
      <Testimonials data={data} />
      <BlogPreview posts={latestPosts} />
      <ContactSection data={data} resumePath={resumePath} />
    </div>
  );
}
```

- [ ] **Step 3: Verify the app builds**

Run: `npm run build` (or `yarn build`)
Expected: Build succeeds with no TypeScript or import errors

- [ ] **Step 4: Run dev server and verify visually**

Run: `npm run dev` (or `yarn dev`)
Expected:
- Page loads without errors
- If `HUGGING_FACE_USERNAME=saleen` is set, HF items appear in the ML section
- If Kaggle credentials are missing, Kaggle items are empty (graceful degradation)
- The ML section appears between GitHub and Projects sections

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx .env.example
git commit -m "feat: integrate Kaggle & HuggingFace into home page"
```
