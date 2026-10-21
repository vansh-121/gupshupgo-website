import ComparisonPage from "@/components/compare/ComparisonPage";
import { getComparison } from "@/data/comparisons";

/**
 * `/gupshupgo-vs-whatsapp` — SEO comparison page.
 *
 * All content and structured data come from `src/data/comparisons.ts` and are
 * rendered by the shared `ComparisonPage`, so this file only selects the data.
 */
const comparison = getComparison("gupshupgo-vs-whatsapp")!;

export default function CompareWhatsApp() {
  return <ComparisonPage comparison={comparison} />;
}
