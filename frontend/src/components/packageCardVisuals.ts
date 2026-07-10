type CardVisual = { gradient: string; overlay: string };

const VISUALS: Record<string, CardVisual> = {
  Family: {
    gradient: "bg-gradient-to-br from-[#5dcaa5] via-[#1d9e75] to-[#0f6e56]",
    overlay: "bg-gradient-to-t from-[#04342c]/55 to-transparent",
  },
  Group: {
    gradient: "bg-gradient-to-br from-[#85b7eb] via-[#378add] to-[#185fa5]",
    overlay: "bg-gradient-to-t from-[#042c53]/50 to-transparent",
  },
};

const DEFAULT_VISUAL = VISUALS.Family;

export function getCardVisual(category: string): CardVisual {
  return VISUALS[category] ?? DEFAULT_VISUAL;
}
