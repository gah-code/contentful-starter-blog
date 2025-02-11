import React from 'react'
import { Link, graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/ui/Hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'

const BlogPostTemplate = ({ data }) => {
  const post = data.contentfulBlogPost
  const previous = data.previous
  const next = data.next

  // Calculate plain text content for reading time and SEO description
  const plainTextDescription = documentToPlainTextString(
    JSON.parse(post.description.raw)
  )
  const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
  const { minutes: timeToRead } = readingTime(plainTextBody)

  // Options for rendering embedded assets
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target
        return (
          <GatsbyImage image={getImage(gatsbyImage)} alt={description || ''} />
        )
      },
    },
  }

  return (
    <Layout>
      <Seo
        title={post.title}
        description={plainTextDescription}
        image={`http:${post.heroImage.resize.src}`}
      />
      <Hero
        image={post.heroImage?.gatsbyImage}
        title={post.title}
        content={post.description}
      />
      <div className={styles.container}>
        <span className={styles.meta}>
          {post.author?.name} &middot;{' '}
          <time dateTime={post.rawDate}>{post.publishDate}</time> &ndash;{' '}
          {timeToRead} minute read
        </span>
        <div className={styles.article}>
          <div className={styles.body}>
            {post.body?.raw && renderRichText(post.body, options)}
          </div>
          <Tags tags={post.tags} />
          {(previous || next) && (
            <nav>
              <ul className={styles.articleNavigation}>
                {previous && (
                  <li>
                    <Link to={`/blog/${previous.slug}`} rel="prev">
                      ← {previous.title}
                    </Link>
                  </li>
                )}
                {next && (
                  <li>
                    <Link to={`/blog/${next.slug}`} rel="next">
                      {next.title} →
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw
      }
      tags
      description {
        raw
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`

export default BlogPostTemplate
