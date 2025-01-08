import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import ArticlePreview from '../components/ui/article-preview'

const TagTemplate = ({ data, pageContext }) => {
  const posts = data.allContentfulBlogPost.nodes
  const { tag } = pageContext

  return (
    <Layout>
      <Seo title={`Posts tagged "${tag}"`} />
      <h1>Posts tagged: {tag}</h1>
      {posts.length > 0 ? (
        <ArticlePreview posts={posts} />
      ) : (
        <p>No posts found for this tag.</p>
      )}
    </Layout>
  )
}

export const query = graphql`
  query ($tag: String!) {
    allContentfulBlogPost(
      filter: { tags: { eq: $tag } }
      sort: { fields: publishDate, order: DESC }
    ) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
  }
`

export default TagTemplate
