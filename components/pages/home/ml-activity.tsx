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
              key={item.url}
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
