const path = require('path')
const slugify = require('slugify') // Ensure slugify is installed: `npm install slugify`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Combined GraphQL query to fetch all blog posts and tags
  const result = await graphql(`
    {
      allContentfulBlogPost {
        nodes {
          slug
          tags
        }
      }
    }
  `)

  if (result.errors) {
    console.error('Error fetching data', result.errors)
    throw new Error('Error fetching data')
  }

  // Extract blog posts and tags
  const blogPosts = result.data.allContentfulBlogPost.nodes

  // Create blog post pages
  blogPosts.forEach((post) => {
    createPage({
      path: `/blog/${post.slug}`, // Define the blog post path
      component: path.resolve('./src/templates/blog-post.js'), // Path to your blog post template
      context: {
        slug: post.slug, // Pass the slug to the template
      },
    })
  })

  // Create tag pages
  const uniqueTags = new Set()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      uniqueTags.add(tag)
    })
  })

  uniqueTags.forEach((tag) => {
    const tagSlug = slugify(tag, { lower: true })
    createPage({
      path: `/tags/${tagSlug}`, // Define the tag path
      component: path.resolve('./src/templates/tag.js'), // Path to your tag template
      context: {
        tag: tag, // Pass the tag to the template
      },
    })
  })
}
