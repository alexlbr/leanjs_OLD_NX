/* eslint-disable @typescript-eslint/no-var-requires */

const {
  api: { projectId: sanityProjectId, dataset: sanityDataset },
} = require('../rga.studio/sanity.json');

module.exports = {
  siteMetadata: {
    title: 'Online Courses | React GraphQL Academy',
    description: 'Online React and GraphQL courses by React GraphQL Academy',
    siteUrl: `https://online.reactgraphql.academy/`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: false,
        ref: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: __dirname,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `online.reactgraphql.academy`,
        start_url: `/`,
        icon: `src/images/logo.png`,
        lang: `en`,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'UpMentoring',
        fieldName: 'upmentoring',
        url:
          `${process.env.GATSBY_UPMENTORING_GRAPHQL_API_BASE_URL}/graphql` ||
          'https://api2.upmentoring.com/graphql',
        headers: {
          'x-um-orgid': '@VVNFOjVhYWE5YjA3ZjE0NmU1Y2ZhZmFkMTg5ZQ==',
          'x-um-app': process.env.UPMENTORING_APP_TOKEN,
        },
      },
    },
    // current version 1.0.4 doesn't work
    // {
    //   resolve: `gatsby-plugin-autopilot`,
    //   options: {
    //     // apiUrl: "", // Your unique api URL, found in your tracking code settings in your Autopilot dashboard.
    //     trackingId: "ec24be3b2c6348a48c647a446b08bb8402fda7caa24b43d3950598d3fef58486", // Your unique tracking ID, also found in your tracking code settings.
    //     app: false, // Determines whether to load webpage or app tracking code.
    //     // exclude: ['/signup', '/about'], // optional
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-google-tagmanager`,
    //   options: {
    //     id: 'GTM-NZ66MZT',
    //     includeInDevelopment: false,
    //   },
    // },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleTagManager: {
          trackingId: 'GTM-NZ66MZT', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-tagmanager', // default
          dataLayerName: 'dataLayer', // default
        },
        // Defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development'],
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: sanityProjectId,
        dataset: process.env.GATSBY_SANITY_DATASET || sanityDataset,
        token: process.env.SANITY_TOKEN,
      },
    },
    'um-video',
    'gatsby-source-sanity-transform-images',
  ],
};
