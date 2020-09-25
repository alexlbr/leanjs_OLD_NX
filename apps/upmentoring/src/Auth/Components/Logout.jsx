import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMagic } from '@leanjs/magic-link';

import Link from '../../App/Components/Navigation/Link';
import { deleteSession } from '../Utils';

export default function Logout({ to = '/login', children = 'logout' }) {
  const { loading, loggedIn, logout } = useMagic();
  const history = useHistory();

  if (loading) return '...';

  if (loggedIn)
    return (
      <Link
        onClick={async () => {
          await logout();
          deleteSession();
          history.push(to);
          // TODO clear gql client cache
        }}
      >
        {children}
      </Link>
    );

  return null;
}
