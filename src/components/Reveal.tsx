import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

/*
 * Appear_Animation wrappers (Requirements 14.1, 14.2, 14.7, 15.1).
 *
 * Two ways to use this, both rendering exactly one DOM node — the one named by
 * `as`, which defaults to `div`:
 *
 * 1. Standalone. One observer per element, no stagger:
 *
 *      <Reveal as="section" className="py-128px">…</Reveal>
 *
 * 2. Grouped — the preferred form for a section, because it costs ONE observer
 *    for N children. `RevealGroup` observes its own wrapper and hands every
 *    direct child its stagger index automatically, so no manual numbering:
 *
 *      <RevealGroup as="ul" className="grid gap-20px">
 *        <Reveal as="li">first, index 0</Reveal>
 *        <Reveal as="li">second, index 1</Reveal>
 *      </RevealGroup>
 *
 *    An explicit `index` prop always wins over the auto-assigned one. The index
 *    is published as the `--reveal-index` custom property and multiplied by the
 *    fixed `--reveal-step` (80ms) in CSS, which is what keeps the stagger to a
 *    single observer (Req 14.2).
 *
 * Neither component sets inline opacity: the initial state is the `.reveal`
 * class and the reduced-motion kill switch is a CSS media query, so content is
 * never hidden by JS that has not run yet.
 */

interface RevealGroupContextValue {
  revealed: boolean;
}

const RevealGroupContext = createContext<RevealGroupContextValue | null>(null);
/** Per-child stagger index, injected by RevealGroup without extra DOM. */
const RevealIndexContext = createContext<number | null>(null);

type RevealOwnProps<T extends ElementType> = {
  /** Element or component to render. Defaults to `div`. */
  as?: T;
  /** Stagger position. Omit inside a RevealGroup to have it assigned. */
  index?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type RevealProps<T extends ElementType = "div"> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export function Reveal<T extends ElementType = "div">({
  as,
  index,
  className,
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const group = useContext(RevealGroupContext);
  const autoIndex = useContext(RevealIndexContext);

  // Inside a group the parent owns the trigger, so this element creates no
  // observer of its own.
  const { ref, revealed: ownRevealed } = useReveal<HTMLElement>({ enabled: !group });
  const revealed = group ? group.revealed : ownRevealed;

  const resolvedIndex = index ?? autoIndex ?? 0;
  const resolvedStyle =
    resolvedIndex > 0
      ? ({ ...style, "--reveal-index": resolvedIndex } as CSSProperties)
      : style;

  return (
    <Component
      {...rest}
      ref={group ? undefined : ref}
      className={cn("reveal", revealed && "reveal-in", className)}
      style={resolvedStyle}
    >
      {children}
    </Component>
  );
}

export type RevealGroupProps<T extends ElementType = "div"> = Omit<RevealProps<T>, "index"> & {
  /** Reveal the wrapper itself as well as its children. Default `false`. */
  revealSelf?: boolean;
};

export function RevealGroup<T extends ElementType = "div">({
  as,
  className,
  style,
  children,
  revealSelf = false,
  ...rest
}: RevealGroupProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const { ref, revealed } = useReveal<HTMLElement>();

  let cursor = 0;
  const indexed = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const value = cursor;
    cursor += 1;
    return <RevealIndexContext.Provider value={value}>{child}</RevealIndexContext.Provider>;
  });

  return (
    <Component
      {...rest}
      ref={ref}
      style={style}
      className={cn(revealSelf && "reveal", revealSelf && revealed && "reveal-in", className)}
    >
      <RevealGroupContext.Provider value={{ revealed }}>{indexed}</RevealGroupContext.Provider>
    </Component>
  );
}

export default Reveal;
