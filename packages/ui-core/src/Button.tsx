import React, { ReactNode, MouseEvent } from 'react';
import { Box, LeanProps, As } from './Box';

interface ButtonProps {
  variant?: keyof typeof buttonVariantProps;
  loadingElement?: ReactNode;
  disabled?: boolean;
  type?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const buttonDefaultSxProp = {
  py: 1,
  px: 4,
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: 'light',
  borderRadius: 2,
  border: 0,
  textAlign: 'center' as AlignSetting, // is there a better way to fix the type here?
  fontSize: 2,
  letterSpacing: '0.6px',
};

// TODO add styles for disabled prop true
export const buttonVariantProps = {
  primary: {
    color: 'lightText',
    bg: 'primary',
    fontWeight: 'bold',
  },
  secondary: {
    color: 'lightText',
    backgroundColor: 'secondary',
  },
  default: {
    color: 'text',
    bg: 'background',
    boxShadow: 'thin',
    border: '1px solid',
    textShadow: 'bold',
    borderColor: 'secondary',
  },
};

export const Button = React.memo(function <T extends As = 'button'>({
  children,
  loadingElement,
  onClick,
  variant = 'default',
  sx = {},
  as = 'button',
  ref,
  ...rest
}: LeanProps<T, ButtonProps>) {
  const extendedProps = {
    ...rest,
    onClick: rest.disabled ? undefined : onClick,
  };

  return (
    <Box
      type="button"
      as={as}
      sx={{
        ...buttonDefaultSxProp,
        ...(buttonVariantProps[variant] || {}),
        ...sx,
      }}
      {...extendedProps}
    >
      {loadingElement ? loadingElement : children}
    </Box>
  );
});

Button.displayName = 'Button';
