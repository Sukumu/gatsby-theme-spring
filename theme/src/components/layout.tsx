import React from 'react';
import { oc } from 'ts-optchain';
import { css, Global } from '@emotion/core';
import { Layout as StyledLayout, Main } from 'theme-ui';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import generic from '@styles/generic';
import prism from '@styles/prism';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string | null;
}

const globalCss = css`
  ${generic}
  ${prism}
`;

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
        keywords
        language
        siteUrl
      }
    }
    portrait: file(relativePath: { eq: "img/author.png" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          src
        }
      }
    }
  }
`;

const concatUrl = (base: string, path: string | null) => {
  if (!path) return null;
  return `${base}${path}`;
};

export default function Layout({ children, title: customTitle, description: customDescription, image }: Props) {
  const { site, portrait } = useStaticQuery(query);
  const { title, description, keywords, language, siteUrl } = site.siteMetadata;
  const metaImage = concatUrl(siteUrl, image || oc(portrait).childImageSharp.fixed.src());

  return (
    <StyledLayout>
      <Global styles={globalCss} />
      <Helmet title={customTitle || title}>
        <html lang={language} />
        <title>{customTitle || title}</title>
        <meta name="description" content={customDescription || description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={customTitle || title} />
        <meta property="og:description" content={customDescription || description} />
        {metaImage ? <meta property="og:image" content={metaImage} /> : null}
      </Helmet>
      <Main>{children}</Main>
    </StyledLayout>
  );
}
