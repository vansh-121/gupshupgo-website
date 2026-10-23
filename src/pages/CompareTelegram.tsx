import ComparisonPage from "@/components/compare/ComparisonPage";
import { getComparison } from "@/data/comparisons";

/**
 * `/gupshupgo-vs-telegram` — SEO comparison page.
 *
 * All content and structured data come from `src/data/comparisons.ts` and are
 * rendered by the shared `ComparisonPage`, so this file only selects the data.
 */
const comparison = getComparison("gupshupgo-vs-telegram")!;

export default function CompareTelegram() {
  return <ComparisonPage comparison={comparison} />;
}
