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
      resolve: "gatsby-source-dropinblog",
      options: {
        id: "ZG3Y933NSM6KL74J983Y",
      },
    },
  ],
}
