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
  title?: string | null;
  description?: string | null;
  image?: string | null;
  url?: string | null;
  noIndex?: boolean;
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

const imageUrl = (base: string, path: string | null) => {
  if (!path) return null;
  return `${base}${path}`;
};

export default function Layout({ children, title: customTitle = '', description: customDescription, image, url, noIndex }: Props) {
  const { site, portrait } = useStaticQuery(query);
  const { title, description, keywords, language, siteUrl } = site.siteMetadata;
  const metaImage = imageUrl(siteUrl, image || oc(portrait).childImageSharp.fixed.src());
  const currentUrl = `${siteUrl}${url && '/'}${url || ''}`;

  return (
    <StyledLayout>
      <Global styles={globalCss} />
      <Helmet title={customTitle || title}>
        <html lang={language} />
        <title>{customTitle || title}</title>
        <meta name="description" content={customDescription || description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={customTitle || title} />
        <meta property="twitter:title" content={customTitle || title} />
        <meta property="og:description" content={customDescription || description} />
        <meta property="twitter:description" content={customDescription || description} />
        {metaImage ? <meta property="og:image" content={metaImage} /> : null}
        {metaImage ? <meta property="twitter:image" content={metaImage} /> : null}
        {noIndex ? <meta name="robots" content="noindex" /> : null}
      </Helmet>
      <Main>{children}</Main>
    </StyledLayout>
  );
}
