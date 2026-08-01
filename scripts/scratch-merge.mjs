import { extendTailwindMerge } from 'tailwind-merge';

const FONT_SIZES = [
  '8', '9', '10', '11', '12', '13', '14', '16', '19', '21', '23', '24', '25', '33', '39', '42', '48', '57', '68',
  'h1', 'h1-sm', 'h2', 'h2-sm', 'h3', 'lead',
];
const BOX_SHADOWS = [
  'elevation', 'mockup', 'hairline',
  'hairline-08', 'hairline-12', 'hairline-24', 'hairline-56', 'hairline-76',
  'hairline-elevated', 'hairline-08-elevated', 'hairline-12-elevated', 'hairline-24-elevated',
  'hairline-56-elevated', 'hairline-76-elevated',
];
const SPACING = ['2px', '4px', '6px', '8px', '10px', '12px', '16px', '20px', '24px', '28px', '32px', '36px', '40px', '44px', '48px', '60px', '64px', '80px', '112px', '128px', '164px', 'section', 'section-lg', 'gutter'];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: SPACING,
      borderRadius: ['8', 'pill'],
    },
    classGroups: {
      'font-size': [{ text: FONT_SIZES }],
      shadow: [{ shadow: BOX_SHADOWS }],
    },
  },
});

const cn = (...a) => twMerge(a.filter(Boolean).join(' '));

const VARIANT_CLASSES = {
  hero: 'h-14 min-h-[44px] w-full px-32px text-19 sm:w-auto',
  header: 'h-11 min-h-[44px] min-w-[44px] px-16px text-14',
  closing: 'h-[3.25rem] min-h-[44px] px-32px text-19',
};

for (const [variant, vc] of Object.entries(VARIANT_CLASSES)) {
  const out = cn(
    'rounded-pill bg-brand py-0 font-medium leading-100 shadow-elevation',
    'transition duration-200 ease-standard motion-reduce:transition-none',
    'hover:bg-brand-dark',
    vc,
    'text-white dark:bg-brand-dark dark:text-white dark:hover:bg-brand-dark',
  );
  console.log(variant, '=>', out);
  console.log('  has text-white:', /(^| )text-white( |$)/.test(out));
}

const probes = [
  ['text-ink-high text-h2-sm', 'SectionHeading'],
  ['text-13 text-pill-soft-fg', 'Pill'],
  ['text-ink-secondary text-19', 'FeatureOverview'],
  ['shadow-elevation shadow-hairline-12', 'shadow collide'],
  ['shadow-md shadow-elevation', 'shadow value vs custom'],
  ['rounded-lg rounded-8', 'radius'],
  ['rounded-8 rounded-pill', 'radius2'],
  ['p-4 p-8px', 'spacing'],
  ['gap-2 gap-20px', 'spacing gap'],
  ['px-4 px-32px', 'px'],
  ['py-2 py-0', 'py'],
  ['text-hairline-12 text-ink-high', 'hairline colour still colour'],
  ['text-12 text-hairline-12', 'numeric size vs hairline colour'],
];
for (const [s, label] of probes) console.log(label, '|', s, '=>', twMerge(s));
