import React from 'react';
import styled from 'styled-components';

import { Li } from '../Text/Ul';
import Text from '../Text/Text';
import Link from './Link';

const Item = styled(Li)`
  display: flex;
`;

interface IStyledTextProps {
  isOpen: boolean;
}
const StyledText = styled(Text)`
  margin: 0 1rem 0 2rem;
  opacity: ${(props: IStyledTextProps) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.1s ease-in, width 0.3s ease-in-out;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: ${(props: IStyledTextProps) => (props.isOpen ? 'auto' : '0rem')};
  overflow: hidden;
`;

const StyledLink = styled(Link)`
  display: flex;
`;

interface IMenuItemProps {
  icon?: React.ReactNode;
  isOpen: boolean;
  to?: string;
  component?: any;
  onClick?: (args: any) => void;
}

const MenuItem: React.SFC<IMenuItemProps> = ({
  icon,
  children,
  isOpen,
  component: Component = StyledLink,
  ...rest
}) => (
  <Item>
    <Component {...rest}>
      {icon}
      <StyledText fontSize={2} isOpen={isOpen}>
        {children}
      </StyledText>
    </Component>
  </Item>
);

export default MenuItem;
