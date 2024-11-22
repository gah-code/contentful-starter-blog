// const path = require('path')

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions

//   // Define a template for blog post
//   const blogPost = path.resolve('./src/templates/blog-post.js')

//   const result = await graphql(
//     `
//       {
//         allContentfulBlogPost {
//           nodes {
//             title
//             slug
//           }
//         }
//       }
//     `
//   )

//   if (result.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your Contentful posts`,
//       result.errors
//     )
//     return
//   }

//   const posts = result.data.allContentfulBlogPost.nodes

//   // Create blog posts pages
//   // But only if there's at least one blog post found in Contentful
//   // `context` is available in the template as a prop and as a variable in GraphQL

//   if (posts.length > 0) {
//     posts.forEach((post, index) => {
//       const previousPostSlug = index === 0 ? null : posts[index - 1].slug
//       const nextPostSlug =
//         index === posts.length - 1 ? null : posts[index + 1].slug

//       createPage({
//         path: `/blog/${post.slug}/`,
//         component: blogPost,
//         context: {
//           slug: post.slug,
//           previousPostSlug,
//           nextPostSlug,
//         },
//       })
//     })
//   }
// }

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const result = await graphql(`
//     query {
//       allContentfulBlogPost {
//         nodes {
//           tags
//         }
//       }
//     }
//   `)

//   // Extract unique tags
//   const tags = _.uniq(
//     _.flatten(result.data.allContentfulBlogPost.nodes.map((post) => post.tags))
//   )

//   // Create a page for each tag
//   tags.forEach((tag) => {
//     createPage({
//       path: `/tags/${_.kebabCase(tag)}/`,
//       component: path.resolve('./src/templates/tag.js'),
//       context: {
//         tag,
//       },
//     })
//   })
// }

// const path = require('path')
// const slugify = require('slugify') // Ensure slugify is installed: `npm install slugify`

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   // Combined GraphQL query to fetch all blog post tags
//   const result = await graphql(`
//     {
//       allContentfulBlogPost {
//         nodes {
//           tags
//           slug
//         }
//       }
//     }
//   `)

//   if (result.errors) {
//     console.error('Error fetching data', result.errors)
//     throw new Error('Error fetching data')
//   }

//   // Extract blog posts
//   const blogPosts = result.data.allContentfulBlogPost.nodes

//   // Function to create tag pages
//   const createTagPages = (items, templatePath, basePath) => {
//     const uniqueTags = new Set()

//     // Collect all unique tags
//     items.forEach((item) => {
//       item.tags.forEach((tag) => {
//         uniqueTags.add(tag)
//       })
//     })

//     // Create a page for each unique tag
//     uniqueTags.forEach((tag) => {
//       const tagSlug = slugify(tag, { lower: true })
//       createPage({
//         path: `/${basePath}/${tagSlug}`, // e.g., /tags/javascript
//         component: path.resolve(templatePath),
//         context: {
//           tag: tag,
//         },
//       })
//     })
//   }

//   // Create tag pages for blog posts
//   createTagPages(blogPosts, './src/templates/tag.js', 'tags')
// }

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
