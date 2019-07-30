module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme Jam Example Submission',
    description: 'Gatsby Theme Jam Example Description',
    keywords: 'gatsby, theme',
    language: 'en',
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-smartypants',
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 760,
              sizeByPixelDensity: false,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              className: 'header-anchor-link',
              maintainCase: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Source Sans Pro'],
      },
    },
    {
      resolve: 'gatsby-plugin-generate-typings',
      options: {
        dest: './src/types/graphql-types.tsx',
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'tomato',
        showSpinner: false,
      },
    },
  ],
};
