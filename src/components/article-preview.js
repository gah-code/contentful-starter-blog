import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import _ from 'lodash'
import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ posts }) => {
  if (!posts || !Array.isArray(posts)) return null

  return (
    <Container>
      <ul className={styles.articleList}>
        {posts.map((post) => {
          const { slug, heroImage, title, description, publishDate, tags } =
            post

          return (
            <li key={slug} className={styles.articleItem}>
              <Link to={`/blog/${slug}`} className={styles.link}>
                {heroImage && (
                  <GatsbyImage
                    alt={heroImage.title || `Image for ${title}`}
                    image={heroImage.gatsbyImage}
                  />
                )}
                <h2 className={styles.title}>{title}</h2>
              </Link>
              <div className={styles.description}>
                {description?.raw && renderRichText(description)}
              </div>
              <div className={styles.meta}>
                <small className={styles.publishDate}>{publishDate}</small>
                {tags && (
                  <div className={styles.tags}>
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/tags/${_.kebabCase(tag)}/`}
                        className={styles.tagLink}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default ArticlePreview
