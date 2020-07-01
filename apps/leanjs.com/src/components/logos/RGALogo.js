import React from 'react';
import Link from '../navigation/Link';
import './RGALogo.css';
import Box from '../layout/Box';

const RGALogo = ({ className, ...rest }) => (
  <Link
    {...rest}
    className={`${className} navigation`}
    to="/"
    title="React GraphQL Academy"
  >
    <div className="rga-logo" />
  </Link>
);

const StyledLogo = (props) => <Box box={RGALogo} {...props} />;

export default StyledLogo;
