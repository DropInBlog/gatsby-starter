module.exports = {
  siteMetadata: {
    title: `DropInBlog Starter`,
    description: `A quick and simple Gatsby solution for implementing a feature rich blog`,
    author: `Joshua Hall`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-source-custom-api",
      options: {
        rootKey: "posts",
        url: `https://api.dropinblog.com/v1/json/?b=${process.env.DIB_KEY}&includecontent=1`,
      },
    },
    {
      resolve: "gatsby-source-custom-api",
      options: {
        rootKey: "categories",
        url: `https://api.dropinblog.com/v1/json/categories/?b=${process.env.DIB_KEY}`,
      },
    },
    {
      resolve: "gatsby-source-custom-api",
      options: {
        rootKey: "authors",
        url: `https://api.dropinblog.com/v1/json/authors/?b=${process.env.DIB_KEY}`,
      },
    },
  ],
}
