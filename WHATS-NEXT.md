## Deploy the blog

A blog on your local machine is nice to have, but a blog on the internet is even better. Return to the [tutorial doc](https://www.contentful.com/developers/docs/tutorials/general/get-started/#deploy-the-starter-gatsby-blog), select a hosting service (Gatsby Cloud, Netlify, or Heroku) and follow the instructions to deploy.

## Explore the blog content structure

Return to the [tutorial doc](https://www.contentful.com/developers/docs/tutorials/general/get-started/#explore-how-the-sample-website-is-built-with-contentful) to view the relationship between the blog content and the data model.

## Modify content and redeploy

Follow this [tutorial](https://www.contentful.com/developers/docs/tutorials/general/automate-site-builds-with-webhooks/) to learn how to use webhooks to automate the process of redeploying your site after publishing new content.

Here’s a section in your `README.md` to outline **TODOs** for adding new features like rich text body code formatting:

---

## 📝 TODO: Planned Testing Features and Enhancements

### 🎯 New Features

1. **Rich Text Body Code Formatting**
   - **Objective**: Enhance the `gatsby-source-contentful/rich-text` rendering to support code block formatting in the blog body.
   - **Steps**:
     1. Customize the `renderNode` options in `gatsby-source-contentful/rich-text` to render `code` blocks with a syntax highlighter.
     2. Use libraries like [`Prism.js`](https://prismjs.com/) or [`react-syntax-highlighter`](https://github.com/react-syntax-highlighter/react-syntax-highlighter).
     3. Example setup for code block rendering:

        ```jsx
        import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
        import { renderRichText } from "gatsby-source-contentful/rich-text";
        import { BLOCKS } from "@contentful/rich-text-types";

        const options = {
          renderNode: {
            [BLOCKS.CODE]: (node) => (
              <SyntaxHighlighter language={node.data.language || "javascript"}>
                {node.content[0].value}
              </SyntaxHighlighter>
            ),
          },
        };

        const RichTextRenderer = ({ content }) => {
          return <div>{renderRichText(content, options)}</div>;
        };
        ```

---

2. **Dark Mode Support**
   - **Objective**: Add a theme toggle for dark and light modes.
   - **Steps**:
     1. Use a state management library (or React Context API) to store the current theme.
     2. Leverage CSS variables for dynamic theming.
     3. Update global styles (`global.css`) to reflect dark mode values.

---

3. **Pagination for Blog Posts**
   - **Objective**: Introduce pagination for the blog page to improve navigation.
   - **Steps**:
     1. Use Gatsby’s `createPages` API to paginate query results.
     2. Add a pagination component with next/previous navigation.
     3. Example GraphQL query:

        ```graphql
        query PaginatedPosts($skip: Int!, $limit: Int!) {
          allContentfulBlogPost(skip: $skip, limit: $limit) {
            nodes {
              title
              slug
            }
          }
        }
        ```

---

4. **Search Functionality**
   - **Objective**: Enable search for blog posts by title or tags.
   - **Steps**:
     1. Use a library like [`Fuse.js`](https://fusejs.io/) for fuzzy searching.
     2. Create a search bar component and display filtered results dynamically.

---

5. **Enhanced Accessibility (a11y)**
   - **Objective**: Ensure the site meets WCAG 2.1 guidelines for accessibility.
   - **Steps**:
     1. Add `aria-*` attributes to interactive components.
     2. Test the site with tools like [axe](https://www.deque.com/axe/).
     3. Include keyboard navigation and focus management for modal or dropdown components.

---
