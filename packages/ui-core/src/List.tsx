import React from 'react';
import styled from 'styled-components';
// import { Box, getVariantProps } from '@leanjs/ui-core';
import { Box } from './Box';
import { getVariantProps } from './utils';

interface UlProps {
  variant?: string;
  variants?: string[];
}

// const StyledUl = styled(Box)<UlProps>`
//   ${({ variant, variants = [] }) =>
//     (variant === 'unstyled' || variants.find((v) => v === 'unstyled')) &&
//     `
//     list-style-type: none;
//   `};
//   ${({ variant, variants = [] }) =>
//     (variant === 'inline' || variants.find((v) => v === 'inline')) &&
//     `
//     display: 'inline-block'
//     > li {
//       :first-child {
//         padding-left: 0;
//       }
//       :last-child {
//         padding-right: 0;
//       }
//     }
//   `};
// `;

const Ul = ({ sx = {}, children, ...rest }) => (
  <Box
    as="ul"
    sx={{
      ...getVariantProps(rest.variant || rest.variants, ulVariantSxProp),
      ...sx,
    }}
    {...rest}
    children={React.Children.map(children, (child) =>
      child && typeof child === 'object'
        ? React.cloneElement(child, {
            variant: rest.variant,
            variants: rest.variants,
          })
        : child
    )}
  />
);

const Ol = (props) => <Ul as="ol" {...props} />;

const ulVariantSxProp = {
  inline: {
    m: 0,
    p: 0,
  },
  unstyled: {
    ml: 0,
  },
};

const liVariantSxProp = {
  inline: {
    p: '8px',
    m: 0,
    display: 'inline-block',
    // TODO the following doesn't work, should we create a styled system function?
    '> li': {
      backgroundColor: 'red',
    },
    // should we instead create a function for
    // firstChildML : 0
    // should we instead create a function for
    // firstChild : { // concern this make composability more difficult
    //     mt: 0
    // }
  },
  unstyled: {
    // TODO the following doesn't work, should we create a styled system function?
    // listStyleType: 'none',
    mb: '7px',
  },
};

const Li = ({ sx = {}, ...rest }) => (
  <Box
    as="li"
    sx={{
      ...getVariantProps(rest.variant || rest.variants, liVariantSxProp),
      ...sx,
    }}
    {...rest}
  />
);

export { Ul, Ol, Li };
