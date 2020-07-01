/* eslint-disable @typescript-eslint/no-var-requires */

const { slugify, removeTrailingSlash } = require('../utils/text');
const PortableText = require('@sanity/block-content-to-html');
const hyperscript = PortableText.h;

function getPostDataFromSanityPostNode({
  slug,
  category,
  mainImage,
  title,
  excerpt,
  _rawBody,
  publishedAt,
}) {
  const sanityLocalFile =
    mainImage && mainImage.asset && mainImage.asset.localFile;

  return {
    path: `/${category}/${slug ? slug.current : ''}`,
    imageUrl: sanityLocalFile && sanityLocalFile.publicURL,
    fluidImage:
      sanityLocalFile &&
      sanityLocalFile.childImageSharp &&
      sanityLocalFile.childImageSharp.fluid,
    title,
    excerpt,
    _rawBody,
    publishedAt,
  };
}

function getPostDataFromMarkdownNode({ fields, frontmatter, ...rest }) {
  return {
    path: fields.slug,
    imageUrl: frontmatter.imageUrl,
    title: frontmatter.title,
    ...rest,
  };
}

function getPostsFromNodes({ markdownNodes, sanityNodes }) {
  const sanityPosts =
    sanityNodes &&
    sanityNodes.map &&
    sanityNodes.map(getPostDataFromSanityPostNode);

  const markdownPosts =
    markdownNodes &&
    markdownNodes.map &&
    markdownNodes.map(getPostDataFromMarkdownNode);

  return [...(sanityPosts || []), ...(markdownPosts || [])];
}

function getContents({ rawBody, path }) {
  return rawBody.reduce((accContents, currentBlock) => {
    if (currentBlock.style === 'h2') {
      const text = currentBlock.children
        .map(({ text }) => text)
        .join(' ')
        .trim();
      const internalLink = `#${slugify(text)}`;

      accContents.push({
        text,
        slug: internalLink,
        path: `${path}${internalLink}`,
      });
    }

    return accContents;
  }, []);
}

function getHeadings({ rawBody, types = ['h2', 'h3'] }) {
  return rawBody.reduce((accHeadings, currentBlock) => {
    if (types.find((type) => type === currentBlock.style)) {
      const text = currentBlock.children
        .map(({ text }) => text)
        .join(' ')
        .trim();

      accHeadings.push(text);
    }
    return accHeadings;
  }, []);
}

const createPortableTextListItem = ({ text, path }) => {
  const key1 = Math.random().toString();
  const key2 = Math.random().toString();
  const key3 = Math.random().toString();
  const key4 = Math.random().toString();

  return {
    _key: key1,
    _type: 'block',
    children: [
      {
        _key: key2,
        _type: 'span',
        marks: [],
        text: `${text}, `,
      },
      {
        _key: key3,
        _type: 'span',
        marks: [key4],
        text: ' go to canonical section',
      },
    ],
    level: 1,
    listItem: 'bullet',
    markDefs: [
      {
        _key: key4,
        _type: 'link',
        href: path,
      },
    ],
    style: 'normal',
  };
};

function postBodyToHtml({ rawBody, bodyImagePublicURLs = {}, siteUrl = '' }) {
  return PortableText({
    blocks: rawBody,
    serializers: {
      marks: {
        link: ({ mark, children }) => {
          const baseUrl = removeTrailingSlash(siteUrl);

          let href;
          if (
            mark.href &&
            mark.href.match(/^(https:\/\/*|http:\/\/*|mailto:*)/)
          ) {
            href = mark.href;
          } else if (mark.href && mark.href.slice(0, 1) !== '/') {
            href = `${baseUrl}/${mark.href}`;
          } else if (mark.href) {
            href = `${baseUrl}${mark.href}`;
          } else {
            href = '';
          }

          return hyperscript(
            'a',
            {
              href,
            },
            children
          );
        },
      },
      types: {
        image: ({ node }) => {
          return hyperscript('img', {
            src: bodyImagePublicURLs[node.asset.id],
          });
        },
        code: ({ node }) =>
          hyperscript(
            'pre',
            hyperscript('code', { lang: node.language }, node.code)
          ),
        mainImage: ({ node }) =>
          hyperscript('img', {
            src: node.fluidImage.src,
          }),
        tweet: ({ node }) =>
          hyperscript(
            'p',
            {},
            hyperscript('a', {
              href: `https://twitter.com/user/status/${node.id}`,
              innerHTML: 'Look at the tweet.',
            })
          ),
        tedvideo: ({ node }) =>
          hyperscript(
            'p',
            {},
            hyperscript('a', {
              href: node.embedUrl,
              innerHTML: `Related Ted video ${
                node.description ? `about: "${node.description}"` : ''
              }.`,
            })
          ),
        youtube: ({ node }) =>
          hyperscript(
            'p',
            {},
            hyperscript('a', {
              href: `https://www.youtube.com/watch?v=${node.videoId}${
                node.startSecond ? `&start=${node.startSecond}` : ''
              }`,
              innerHTML: `Related video ${
                node.description ? `about: "${node.description}"` : ''
              }.`,
            })
          ),
        codesandbox: ({ node }) =>
          hyperscript(
            'p',
            {},
            hyperscript('a', {
              href: `https://codesandbox.io/s/${node.id}`,
              innerHTML: `Look at this codesandbox`,
            })
          ),
        form: () => '',
      },
    },
  });
}

function postToHtml({ node, bodyImagePublicURLs = {}, siteUrl = '' }) {
  const { title, publishedAt, _rawBody, excerpt, path } = node;
  const url = siteUrl + path;
  const contentsBlockList = getContents({
    rawBody: _rawBody,
    path,
  }).map(createPortableTextListItem);

  const rawBodyWithContents = [
    {
      _key: Math.random.toString(),
      _type: 'block',
      children: [
        {
          _key: Math.random.toString(),
          _type: 'span',
          marks: [],
          text: 'Table of contents:',
        },
      ],
      level: 1,
      markDefs: [],
      style: 'normal',
    },
    ...contentsBlockList,
    ..._rawBody,
  ];

  return {
    title: title,
    date: publishedAt,
    description: excerpt,
    url,
    guid: url,
    custom_elements: [
      {
        'content:encoded': postBodyToHtml({
          rawBody: rawBodyWithContents,
          bodyImagePublicURLs,
          siteUrl,
        }),
      },
    ],
  };
}

// TODO ADD A E2E TO TEST THIS. Probably checking the /rss.xml feed
function postsToHtml({ posts, bodyImagePublicURLs, siteUrl }) {
  return posts.map((node) =>
    postToHtml({ node, bodyImagePublicURLs, siteUrl })
  );
}

const findIndexFromTagName = (tagName) => (acc, { name: tag }) => {
  if (acc) {
    return acc;
  }

  if (tag.lastIndexOf(tagName, 0) === 0) {
    return parseInt(tag.replace(tagName, ''));
  }
};

const sortingPostsByTag = (tagName) => (a, b) => {
  const featuredA = a.tags.reduce(findIndexFromTagName(tagName), null);
  const featuredB = b.tags.reduce(findIndexFromTagName(tagName), null);

  return featuredA - featuredB;
};

module.exports = {
  getPostsFromNodes,
  getContents,
  createPortableTextListItem,
  postsToHtml,
  postToHtml,
  postBodyToHtml,
  getHeadings,
  getPostDataFromMarkdownNode,
  getPostDataFromSanityPostNode,
  findIndexFromTagName,
  sortingPostsByTag,
};
