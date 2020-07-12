import React from 'react';
// import SearchIcon from '../../icons/SearchIcon'
import LinkButton from '../../buttons/LinkButton';

export default [
  {
    to: '/react',
    text: 'React',
    children: [
      {
        to: '/react/training',
        text: 'React Training',
      },
      {
        to: '/react/training/corporate',
        text: 'React Corporate Training',
      },
      {
        to: '/react/curriculum',
        text: 'React Curriculum',
      },
    ],
  },
  {
    to: '/graphql',
    text: 'GraphQL',
    children: [
      {
        to: '/graphql/training',
        text: 'GraphQL Training',
      },
      {
        to: '/graphql/training/corporate',
        text: 'GraphQL Corporate Training',
      },
      {
        to: '/graphql/curriculum',
        text: 'GraphQL Curriculum',
      },
      //   {
      //     to: '/graphql/mini-conference',
      //     text: 'GraphQL MiniConf',
      //   },
    ],
  },
  //   {
  //     to: '/leadership',
  //     text: 'Leadership',
  //     children: [
  //       {
  //         to: '/cto-miniconf',
  //         text: 'CTO MiniConf',
  //       },
  //       {
  //         to: '/hiring',
  //         text: 'Hiring',
  //         hideOnMobile: true,
  //       },
  //       {
  //         to: '/consulting-services',
  //         text: 'Consulting services',
  //         hideOnMobile: true,
  //       },
  //     ],
  //   },
  {
    to: '/about-us',
    text: 'About',
    children: [
      {
        to: '/about-us',
        text: 'The Academy',
      },
      {
        to: '/reviews',
        text: 'Reviews',
      },
      {
        to: '/partners',
        text: 'Partners',
        hideOnMobile: true,
      },
      {
        to: '/community',
        text: 'Community',
        hideOnMobile: true,
      },
    ],
  },
  {
    to: '/blog',
    text: 'Blog',
  },
  //   {
  //     to: '/search',
  //     text: 'Search',
  //     icon: <SearchIcon style={{ marginBottom: '-8px' }} />,
  //   },
  {
    to: '#contact-us',
    text: 'Contact',
    component: LinkButton,
    sx: { height: '50px' },
  },
];
