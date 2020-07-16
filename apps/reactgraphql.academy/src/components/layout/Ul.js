import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import { getVariantProps } from '../utils';

const StyledUl = styled(Box)`
  ${({ variant, variants = [] }) =>
    (variant === 'unstyled' || variants.find((v) => v === 'unstyled')) &&
    `
    list-style-type: none;
  `};
  ${({ variant, variants = [] }) =>
    (variant === 'inline' || variants.find((v) => v === 'inline')) &&
    `
    > li {
      :first-child {
        padding-left: 0;
      }
      :last-child {
        padding-right: 0;
      }
    }
  `};
`;

const Ul = ({ sx = {}, children, ...rest }) => (
  <StyledUl
    box="ul"
    sx={{
      mt: 0,
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

const Ol = (props) => <Ul box="ol" {...props} />;

const ulVariantSxProp = {
  inline: {
    m: 0,
    p: 0,
    '> li': {
      p: '8px',
      m: 0,
      display: 'inline-block',
    },
  },
  unstyled: {
    ml: 0,
    pl: 0,
    '> li': {
      mb: '7px',
    },
  },
};

// const liVariantSxProp = {
//   inline: {
//     p: '8px',
//     m: 0,
//     display: 'inline-block',
//     // TODO the following doesn't work, should we create a styled system function?
//     // '> li': {
//     //   backgroundColor: 'red',
//     // },
//     // should we instead create a function for
//     // firstChildML : 0
//     // should we instead create a function for
//     // firstChild : { // concern this make composability more difficult
//     //     mt: 0
//     // }
//   },
//   //   unstyled: {
//   //     mb: '7px',
//   //   },
// };

const Li = ({ sx = {}, ...rest }) => (
  <Box
    box="li"
    sx={{
      mb: 2,
      // ...getVariantProps(rest.variant || rest.variants, liVariantSxProp),
      ...sx,
    }}
    {...rest}
  />
);

export { Ul, Ol, Li };
export default Ul;
