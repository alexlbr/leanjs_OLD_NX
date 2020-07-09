/* eslint-disable @typescript-eslint/no-var-requires */

const {
  api: { projectId: sanityProjectId, dataset: sanityDataset },
} = require('../rga.studio/sanity.json');

// `hyperscript` is a way to build HTML known as hyperscript
// See https://github.com/hyperhype/hyperscript for more info
const algoliaQueries = require('./src/search/algoliaQueries');

const {
  getPostsFromNodes,
  postsToHtml,
} = require('./src/components/blog/utils');

require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: 'React & GraphQL Expert Training | React GraphQL Academy',
    description:
      'Looking for React and GraphQL expert training? React GraphQL Academy offers in-person real-world training by our experts. Contact us now!',
    siteUrl: `https://reactgraphql.academy/`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'UpMentoring',
        fieldName: 'upmentoring',
        url: 'https://api2.upmentoring.com/graphql',
        // url:
        //  'https://europe-west1-upmentoring-api.cloudfunctions.net/api/graphql',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-root-import',
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: false,
        ref: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 650,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://reactgraphql.academy/',
        sitemap: 'https://reactgraphql.academy/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-MVK4HZS',
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images/`,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: sanityProjectId,
        dataset: sanityDataset,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
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
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `reactgraphql.academy`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/logo.png`,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        analyzerPort: 3334,
        production: true,
        disable: true,
      },
    },
    'gatsby-source-sanity-transform-images',
    {
      resolve: `gatsby-transform-portable-text`,
      options: {
        extendTypes: [{ typeName: `SanityPost`, contentFieldName: 'body' }],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: algoliaQueries,
        chunkSize: 2000, // default: 1000
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
            `,
        feeds: [
          {
            serialize: ({
              query: { site, allSanityPost = [], allSanityImageAsset },
            }) => {
              const posts = getPostsFromNodes({
                sanityNodes: allSanityPost.nodes,
              });

              const { siteUrl } = site.siteMetadata;

              const { nodes: bodyImageNodes = [] } = allSanityImageAsset || {};
              const bodyImagePublicURLs = bodyImageNodes.reduce(
                (acc, { localFile = {}, id }) => {
                  const { publicURL = '' } = localFile;
                  acc[id] =
                    publicURL.indexOf('http') === 0 || !siteUrl
                      ? publicURL
                      : `${siteUrl}${publicURL}`;

                  return acc;
                },
                {}
              );

              return postsToHtml({ posts, bodyImagePublicURLs, siteUrl });
            },
            query: `{
                  allSanityPost(sort: {fields: publishedAt, order: DESC}) {
                      nodes {
                        _rawBody(resolveReferences: {maxDepth: 10})
                        id
                        title
                        publishedAt
                        category
                        excerpt
                        slug {
                          current
                        }
                      }
                  }
                  allSanityImageAsset {
                      nodes {
                        id
                        localFile(width: 650) {
                          publicURL
                        }
                      }
                    }
                }
                `,
            output: '/rss.xml',
            title: 'React GraphQL Academy RSS Feed',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
          },
        ],
      },
    },
  ],
};
