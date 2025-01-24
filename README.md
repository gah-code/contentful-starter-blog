
# Contentful Gatsby Starter Blog

A fully customizable blog built with [Gatsby](https://www.gatsbyjs.com/) and powered by [Contentful](https://www.contentful.com/). Leverages Gatsby's ecosystem for optimized static site generation, seamless content delivery, and responsive image handling.

---

## 🚀 Features

1. **Contentful Integration**: Simplified content management via Contentful's headless CMS.
2. **Dynamic Pages**: Automatic page generation for blog posts and tags.
3. **Optimized Images**: Utilizes Gatsby's `gatsby-plugin-image` for responsive images.
4. **Rich Text Rendering**: Leverages Contentful's rich-text capabilities.
5. **SEO-Optimized**: Metadata, descriptions, and Open Graph support with `react-helmet`.
6. **Modern Architecture**: Component-based React structure for scalability and maintainability.

---

## 📋 Project Overview

This project integrates:

- **Contentful CMS** for managing blog content, authors, and images.
- **Gatsby Image (gatsby-plugin-image)** for optimized image handling.
- **React Components** like `Hero` and `ArticlePreview`.
- **Rich Text Rendering** via `gatsby-source-contentful/rich-text`.

### Key Updates

1. **Query Fixes**: Updated `gatsbyImageData` queries for Home, Blog, and Tag pages.
2. **Hero Component**: Supports `gatsbyImageData` for optimized image rendering.
3. **ArticlePreview Component**: Displays hero images dynamically.

---

## 📁 Directory Structure

```plaintext
gah-code-contentful-starter-blog/
├── README.md
├── LICENSE
├── WHATS-NEXT.md
├── app.json
├── catalog-info.yaml
├── gatsby-config.js
├── gatsby-node.js
├── netlify.toml
├── package.json
├── static.json
├── .babelrc
├── .contentful.json.sample
├── .npmrc
├── .nvmrc
├── .prettierrc
├── .travis.yml
├── bin/
│   ├── hello.js
│   └── setup.js
├── contentful/
│   └── export.json
├── scripts/
│   ├── data-with-about-page.json
│   ├── data.json
│   └── setup.js
├── src/
│   ├── components/
│   │   ├── container.js
│   │   ├── global.css
│   │   ├── layout.js
│   │   ├── seo.js
│   │   ├── tags.js
│   │   ├── tags.module.css
│   │   ├── variables.css
│   │   └── ui/
│   │       ├── About.js
│   │       ├── Footer.js
│   │       ├── Hero.js
│   │       ├── Navigation.js
│   │       ├── article-preview.js
│   │       ├── article-preview.module.css
│   │       ├── footer.module.css
│   │       ├── hero.module.css
│   │       └── navigation.module.css
│   ├── pages/
│   │   ├── 404.js
│   │   ├── about.js
│   │   ├── blog.js
│   │   └── index.js
│   └── templates/
│       ├── blog-post.js
│       ├── blog-post.module.css
│       └── tag.js
├── static/
│   ├── robots.txt
│   └── fonts/
│       ├── Inter-italic.var.woff2
│       ├── Inter-roman.var.woff2
│       └── LICENSE.txt
└── .github/
    └── CODEOWNERS
```

---

## 💻 How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/gah-code/gah-code-contentful-starter-blog.git
   cd gah-code-contentful-starter-blog
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Contentful:
   - Rename `.contentful.json.sample` to `.contentful.json`.
   - Add your Contentful `SPACE_ID` and `ACCESS_TOKEN`.

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open the site at `http://localhost:8000`.

---

## 🧩 Key Components

- **Hero**: Displays hero section with an image, title, and rich text.
- **ArticlePreview**: Lists blog posts with previews (title, image, description, tags).
- **Seo**: Manages metadata and Open Graph tags.
- **Layout**: Wraps pages with global header, footer, and styles.

---

## 🚧 What's Next?

- **Deploy**: Use [Netlify](https://www.netlify.com/) or [Gatsby Cloud](https://www.gatsbyjs.com/products/cloud/).
- **Enhance**:
  - Add search functionality.
  - Implement dark mode.
  - Optimize for accessibility (a11y).

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo.
2. Create a feature branch:

   ```bash
   git checkout -b feature-branch
   ```

3. Commit changes:

   ```bash
   git commit -m "Your message"
   ```

4. Push and submit a Pull Request.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

 🚀
