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
