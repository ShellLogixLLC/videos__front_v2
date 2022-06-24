import Typography from './index';

type TypoType =
  | 'Tiny'
  | 'Semi'
  | 'Bold'
  | 'Small'
  | 'Large'
  | 'Extra'
  | 'Medium'
  | 'Regular'
  | 'Semibold';

type Variant = 'Text' | 'Heading' | 'Button' | 'Link';

type Align = 'right' | 'left' | 'center' | 'justify';

export type TypographyProps = {
  children: any;
  align?: Align;
  type?: TypoType;
  variant?: Variant;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
};

export type TypographyTypeof = typeof Typography;
