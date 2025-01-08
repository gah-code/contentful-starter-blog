import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import _ from 'lodash'
import Container from '../container'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ posts }) => {
  if (!posts || !Array.isArray(posts)) return null

  return (
    <Container>
      <ul className={styles.articleList}>
        {posts.map((post) => {
          const { slug, heroImage, title, description, publishDate, tags } =
            post
          const image = heroImage ? getImage(heroImage.gatsbyImageData) : null

          return (
            <li key={slug} className={styles.articleItem}>
              <Link to={`/blog/${slug}`} className={styles.link}>
                {image && (
                  <GatsbyImage
                    alt={heroImage.title || `Image for ${title}`}
                    // image={heroImage.gatsbyImage}
                    image={image}
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
