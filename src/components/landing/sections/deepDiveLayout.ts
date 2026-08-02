/**
 * Shared column contract for the four "deep dive" sections — Arcade, Privacy,
 * Calling and Anonymous chat.
 *
 * ## The problem this solves
 *
 * Each deep dive is a text column beside a phone mockup, alternating sides down
 * the page. When those two columns collapse into one on a phone or tablet, the
 * section's mockup ends up adjacent to the NEXT section's mockup — `privacy`
 * closed with its two-phone pair and `calling` opened with another one, so four
 * frames stacked back to back with only a band change between them, and the two
 * sections read as a single strip of screenshots.
 *
 * Putting the whole text column first fixes the adjacency but strands the
 * visual: on a 375px screen you scroll past 150–180 words of lead plus three or
 * four sub-headed blocks before the screenshot appears.
 *
 * ## The layout
 *
 * So the collapsed order interleaves them — heading + lead, then the mockup,
 * then the detail blocks. That is the ordinary editorial rhythm (headline,
 * standfirst, image, body), and it puts the mockup in the MIDDLE of every
 * section, so one section's mockup can never touch the next one's. The fix is
 * structural rather than a convention every section has to remember.
 *
 * ## Why `display: contents` rather than row spans
 *
 * The desktop composition must stay exactly as it was: ONE text column
 * vertically centred beside ONE mockup column.
 *
 * The obvious implementation — three grid children, with the mockup spanning
 * two rows — does not preserve that. A spanning item contributes its height to
 * the rows it spans, so the tall phone frame (a 9:19.5 frame is ~690px at the
 * `md` cap, against ~490px of copy) inflates BOTH text rows, and
 * `align-items: center` then centres each text block inside its own inflated
 * row. The result is a ~150px hole between the lead and the detail blocks.
 *
 * Instead the two text blocks stay wrapped in a single element that is
 * `display: contents` below Breakpoint_Small and a plain block above it:
 *
 * - Below bp810 the wrapper generates no box, so `lead` and `details` are
 *   promoted to grid items in their own right and `order-*` can interleave the
 *   mockup between them.
 * - At and above bp810 the wrapper is a normal block, so the grid sees exactly
 *   two children again — text column and mockup column — and `items-center`
 *   centres the text group as a whole, byte-for-byte the previous layout.
 *
 * The wrapper is a plain `div` with no semantics, so `display: contents`
 * removing its box costs nothing in the accessibility tree.
 *
 * Vertical rhythm: `gap-y-32px` spaces the three stacked blocks on mobile; at
 * bp810 the row gap is zeroed and `details` takes its own `mt-32px`, which is
 * the gap the text column already had between its lead and its detail list.
 */

/**
 * Grid wrapper. Pair with `textGroup` / `lead` / `mockup` / `details`.
 *
 * `items-start` is deliberately NOT used: `items-center` is what vertically
 * centres the text column against the taller phone frame on desktop.
 */
const CONTAINER =
  "grid grid-cols-1 gap-y-32px bp810:grid-cols-2 bp810:items-center bp810:gap-x-64px bp810:gap-y-0";

/**
 * The `lead` + `details` wrapper: transparent to the grid on mobile so the two
 * blocks can be ordered around the mockup, a real column from bp810 up.
 */
const TEXT_GROUP = "contents bp810:block";

/** Mobile stacking order — lead, then the mockup, then the detail blocks. */
const LEAD = "order-1";
const MOCKUP = "order-2";
const DETAILS = "order-3 bp810:mt-32px";

/** Text on the left, mockup on the right (Arcade, Privacy). */
export const DEEP_DIVE = {
  container: CONTAINER,
  textGroup: `${TEXT_GROUP} bp810:col-start-1 bp810:row-start-1`,
  lead: LEAD,
  details: DETAILS,
  mockup: `${MOCKUP} bp810:col-start-2 bp810:row-start-1`,
} as const;

/** Mockup on the left, text on the right (Calling, Anonymous chat). */
export const DEEP_DIVE_MIRRORED = {
  container: CONTAINER,
  textGroup: `${TEXT_GROUP} bp810:col-start-2 bp810:row-start-1`,
  lead: LEAD,
  details: DETAILS,
  mockup: `${MOCKUP} bp810:col-start-1 bp810:row-start-1`,
} as const;
