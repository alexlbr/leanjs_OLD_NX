/* eslint no-restricted-globals: 0 */

import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import { Link as DefaultLinkScroll, scroller } from 'react-scroll';
import { StyledBox } from '../layout/Box';

export const DEFAULT_SCROLL_OFFSET = -125;
export const DEFAULT_SCROLL_DURATION = 500;

const StyledLink = styled(StyledBox)`
  cursor: pointer;
  text-shadow: 0px 0px 1px
    ${({ theme = {} }) => (theme.colors ? theme.colors.text : '')};
  text-decoration: ${({ underline = true }) =>
    underline ? 'underline' : 'none'};
  ${({ sx = {} }) =>
    sx.textDecoration && `text-decoration: ${sx.textDecoration}; `}
`;

export const styleChildLinkColor = (color, isImportant) => {
  const important = isImportant ? ' !important' : '';

  return `
  a:not([role='button']) {
    color: ${color} ${important};
    text-shadow: 0px 0px 1px ${color} ${important};
    &:link {
      color: ${color} ${important};
    }
    &:visited {
      color: ${color} ${important};
    }
    &:hover {
      color: ${color} ${important};
    }
    &:active {
      color: ${color} ${important};
    }
  }
`;
};

DefaultLinkScroll.defaultProps = {
  smooth: true,
  duration: DEFAULT_SCROLL_DURATION,
  offset: DEFAULT_SCROLL_OFFSET,
  box: DefaultLinkScroll,
};

class Link extends React.Component {
  componentDidMount() {
    const hash = location.hash.substr(1);
    if (hash && hash === this.props.name && typeof window !== 'undefined') {
      // adds smooth scrolling to anchor links
      setTimeout(() => {
        window && window.scrollTo && window.scrollTo(0, 0);
        scroller.scrollTo(hash, {
          smooth: true,
          duration: DEFAULT_SCROLL_DURATION,
          offset: DEFAULT_SCROLL_OFFSET,
        });
      }, 100);
    }
  }

  render() {
    const { to = '', children = '', ...rest } = this.props;
    const toHref = to || rest.href || '';

    if (toHref && toHref.match(/^(https:\/\/*|http:\/\/*|mailto:*)/)) {
      const { target = '_blank' } = rest;
      rest.rel = target === '_blank' ? 'noopener' : undefined;
      return (
        <StyledLink box="a" target={target} href={toHref} {...rest}>
          {children}
        </StyledLink>
      );
    } else if (toHref && toHref[0] === '#') {
      const { onClick, ...restLinkScrollProps } = rest;

      return (
        <StyledLink
          onClick={(e) => {
            onClick && onClick(e);
          }}
          to={toHref.substr(1)}
          href={toHref}
          box={DefaultLinkScroll}
          {...restLinkScrollProps}
        >
          {children}
        </StyledLink>
      );
    } else if (!toHref) {
      return (
        <StyledLink box="a" {...rest}>
          {children}
        </StyledLink>
      );
    } else {
      // The destination URLs need to have trailing slashes for Gatsby prefetching to happen
      const dest =
        toHref.slice(-1) === '/' ||
        toHref.indexOf('?') > -1 ||
        toHref.indexOf('#') > -1
          ? toHref
          : toHref + '/';

      return (
        <StyledLink to={dest} box={GatsbyLink} {...rest}>
          {children}
        </StyledLink>
      );
    }
  }
}

export default React.memo(Link);
