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
