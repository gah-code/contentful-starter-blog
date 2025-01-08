import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/ui/Hero'
import ArticlePreview from '../components/ui/article-preview'
import { GatsbyImage } from 'gatsby-plugin-image'

import * as styles from '../components/ui/hero.module.css'
class aboutPage extends React.Component {
  render() {
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    // const [author] = get(this, 'props.data.allContentfulPerson.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="About" />
        <Hero title="About" />
        <GatsbyImage />
        <div className={styles.details}>
          <h1 className={styles.hero}>test</h1>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet molestiae quaerat ducimus quae, quod facere asperiores, illum
            doloribus maxime quas id ipsa aperiam voluptate dolores a repellat
            dolorum, eaque maiores. At omnis ut, sint facilis animi nihil a
            quod.
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem, modi! Fugit assumenda et maiores aperiam aspernatur
            iusto blanditiis, asperiores, dolor consectetur necessitatibus
            velit.{' '}
          </p>
        </div>
        {/* <ArticlePreview posts={posts} /> */}
      </Layout>
    )
  }
}

export default aboutPage
