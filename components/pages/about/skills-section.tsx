"use client";

const SKILL_CATEGORIES: Record<string, string[]> = {
  Frontend: ["HTML", "CSS", "React.js", "Next.js", "TailwindCSS", "Shadcn UI", "Magic UI"],
  Mobile: ["React Native", "Expo"],
  Backend: ["Node.js", "Python"],
  "Tools & Services": ["Typescript", "Stripe", "Docker"],
};

interface SkillsSectionProps {
  skills: string[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categorized = Object.entries(SKILL_CATEGORIES).map(
    ([category, categorySkills]) => ({
      category,
      skills: categorySkills.filter((s) =>
        skills.some((sk) => sk.toLowerCase() === s.toLowerCase())
      ),
    })
  );

  const categorizedSkillNames = Object.values(SKILL_CATEGORIES)
    .flat()
    .map((s) => s.toLowerCase());
  const uncategorized = skills.filter(
    (s) => !categorizedSkillNames.includes(s.toLowerCase())
  );

  if (uncategorized.length > 0) {
    categorized.push({ category: "Other", skills: uncategorized });
  }

  return (
    <div className="mt-20">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-heading mb-8">
        Skills & Technologies
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {categorized
          .filter((c) => c.skills.length > 0)
          .map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground font-heading mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full glass-card px-3 py-1.5 text-sm text-muted-foreground hover:border-primary/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
