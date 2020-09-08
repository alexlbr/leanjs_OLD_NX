export const DARK_BLUE = 'rgba(0,41,56, 1)';
export const DARK_GREY = '#4a4a4a';

const heading = {
  color: 'text',
  fontFamily: 'heading',
  lineHeight: 'heading',
  mt: 0,
};

export const theme = {
  space: [
    '0', // 0
    '0.25rem', // 1
    '0.5rem', // 2
    '0.75rem', // 3
    '1rem', // 4
    '1.25rem', // 5
    '1.5rem', // 6
    '2rem', // 7
    '3rem', // 8
    '4rem', // 9
    '5rem', // 10
    '6rem', // 11
    '8rem', // 12
    '10rem', // 13
    '12rem', // 14
    '14rem', // 15
    '16rem', // 16
  ],
  breakpoints: ['40em', '52em', '64em'],
  fonts: {
    body: `'Barlow', sans-serif`,
    heading: 'inherit',
    monospace: 'Courier New,Courier,monospace;',
  },

  // fontSizes: [12, 14, 16,18, 20, 24, 32, 48, 64, 96],
  fontSizes: [
    '0.8rem', // 0
    '0.9rem', // 1
    '1rem', // 2
    '1.15rem', // 3
    '1.25rem', // 4
    '1.563rem', // 5
    '1.953rem', // 6
    '2.441rem', // 7
    '2.77rem', // 8
  ],
  fontWeights: {
    body: 400,
    bold: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: DARK_GREY,
    // lightText: '#fff',
    inverseText: '#fff',
    // darkBackground: 'rgba(0,41,56, 1)',
    background: '#fff',
    inverseBackground: 'rgba(0,41,56, 1)',
    primary: '#C0392B',
    secondary: 'rgba(0,41,56, 1)',
    danger: 'rgb(243, 136, 162)',
    react: 'rgba(97, 218, 251, 1)'
  },
  sizes: {
    container: '64rem',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  fontShadows: {
    light: '0 18px 29px -2px rgba(0, 0, 0, 0.26)',
  },
  shadows: {
    thin: '0 2px 2px 0 rgba(0, 0, 0, 0.45), 0 0 2px 0 rgba(0, 0, 0, 0.12)',
    light: '0 18px 29px -2px rgba(0, 0, 0, 0.26)',
    bold: 'rgb(74, 74, 74) 0px 0px 1px',
    box: '0 -2px 24px 0 rgba(0, 0, 0, 0.24), 0 2px 24px 0 rgba(0, 0, 0, 0.12)',
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      ...heading,
      fontSize: 8,
      fontWeight: 'bold',
    },
    h2: {
      ...heading,
      fontWeight: 'bold',
      fontSize: 6,
      // my: 8,
      mt: 8,
      mb: 8,
    },
    h3: {
      ...heading,
      fontSize: 5,
      mt: 7,
      mb: 7,
    },
    h4: {
      ...heading,
      fontSize: 4,
      mt: 6,
      mb: 6,
    },
    h5: {
      ...heading,
      fontSize: 3,
      mt: 5,
      mb: 5,
    },
    h6: {
      ...heading,
      fontSize: 2,
      mt: 4,
      mb: 4,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      cursor: 'pointer',
      ":not([role='button'])": {
        textDecoration: 'underline',
      },
      textShadow: '0px 0px 1px',
      color: 'text',
      '&:link': {
        color: 'text',
      },
      '&:visited': {
        color: 'text',
      },
      '&:active': {
        color: 'text',
      },
      '&:hover': {
        color: 'text',
      },
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
  sections: {
    top: {
      mt: '-50px',
    },
    secondary: { bg: 'secondary', py: 9 },
  },
  buttons: {
    primary: {
      color: 'inverseText',
      bg: 'primary',
      fontWeight: 'bold',
    },
    secondary: {
      color: 'inverseText',
      backgroundColor: 'secondary',
    },
    default: {
      color: 'text',
      bg: 'background',
      boxShadow: 'thin',
      border: '1px solid',
      textShadow: 'bold',
      borderColor: 'secondary',
    },
  },
};

export default theme;
