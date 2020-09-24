import React from 'react';
import Cookies from 'js-cookie';
import { useMagic } from '@leanjs/magic-link';
import { useClient } from '@leanjs/graphql-client';

import Link from '../navigation/Link';
import { Spinner } from '../display';

export default function AuthLink({ to = `${process.env.GATSBY_UPMENTORING_WEB_BASE_URL || 'https://upmentoring.com'}/login/reactgraphqlacademy` }) {
  const { loggedIn, loading, logout } = useMagic();
  const { clearStore } = useClient();

  return loading ? (
    <Spinner color="#4a4a4a" sx={{ mt: '8px' }} />
  ) : loggedIn === true ? (
    <Link
      onClick={() => {
        Cookies.remove('__user', {
          path: '/',
          domain:
            process.env.NODE_ENV === 'development'
              ? 'localhost'
              : '.upmentoring.com',
        });
        clearStore();
        logout();
      }}
    >
      logout
    </Link>
  ) : (
        <Link target="_self" href={to}>Login</Link>
      );
}
