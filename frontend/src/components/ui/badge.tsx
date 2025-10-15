import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-sm px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        // variants
        primary: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        accent: 'bg-accent text-accent-foreground [a&]:hover:bg-accent/90',
        muted: 'bg-muted text-muted-foreground [a&]:hover:bg-muted/90',
        destructive:
          'bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90',

        // inverse variants
        'primary-inverse':
          'bg-primary-100 text-primary-700 [a&]:hover:bg-primary/90',
        'secondary-inverse':
          'bg-secondary-100 text-secondary-700 [a&]:hover:bg-secondary/90',
        'accent-inverse':
          'bg-accent-100 text-accent-700 [a&]:hover:bg-accent/90',
        'muted-inverse': 'bg-muted-300 text-muted-700 [a&]:hover:bg-muted/90',
        'destructive-inverse':
          'bg-destructive-300 text-destructive-700 [a&]:hover:bg-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...props}
    />
  );
}

export { Badge, badgeVariants };
