import React from 'react'
import * as styles from './tags.module.css'
import { Link } from 'gatsby'
import _ from 'lodash'

const Tags = ({ tags }) =>
  tags?.length > 0 && (
    <small className={styles.tags}>
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tags/${_.kebabCase(tag)}/`} // Generate SEO-friendly tag URL
          className={styles.tag}
        >
          {tag}
        </Link>
      ))}
    </small>
  )

export default Tags
