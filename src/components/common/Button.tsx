import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'whatsapp' | 'outline' | 'white' | 'whiteOutline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  'aria-controls'?: string;
  'aria-expanded'?: boolean;
  title?: string;
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';

const variants: Record<Variant, string> = {
  primary: 'bg-forest-700 text-white shadow-[0_10px_26px_-14px_rgba(11,53,28,0.8)] hover:bg-forest-800 hover:shadow-[0_14px_30px_-14px_rgba(11,53,28,0.75)]',
  whatsapp: 'bg-wa text-white shadow-[0_10px_26px_-14px_rgba(15,123,61,0.8)] hover:bg-wa-dark hover:shadow-[0_14px_30px_-14px_rgba(15,123,61,0.75)]',
  outline: 'border border-forest-700/25 bg-white text-forest-700 shadow-sm hover:border-forest-700/60 hover:bg-leaf-50 hover:shadow-md',
  white: 'bg-white text-forest-800 shadow-md hover:bg-leaf-50 hover:shadow-lg',
  whiteOutline: 'border border-white/50 text-white hover:bg-white/10',
  ghost: 'text-forest-700 hover:bg-leaf-100',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-5 text-[0.95rem]',
  lg: 'min-h-[3.25rem] px-6 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  fullWidth,
  icon,
  iconRight,
  to,
  href,
  external,
  type = 'button',
  disabled,
  onClick,
  ...aria
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {icon ? <span className="shrink-0" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className="shrink-0" aria-hidden="true">{iconRight}</span> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...aria}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        {...aria}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...aria}>
      {content}
    </button>
  );
}
