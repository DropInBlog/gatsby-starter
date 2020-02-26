module.exports = {
    siteMetadata: {
        title: `DropInBlog Starter`,
        description: `Instant blog on any site in 5 minutes.`,
        author: `Joshua Hall`,
    },
    plugins: [
        'gatsby-plugin-sass',
        {
            resolve: "gatsby-source-custom-api",
            options: {
                rootKey: 'posts',
                url: `https://api.dropinblog.com/v1/json/?b=${process.env.DIB_KEY}`
            }
        },
        {
            resolve: "gatsby-source-custom-api",
            options: {
                rootKey: 'categories',
                url: `https://api.dropinblog.com/v1/json/categories/?b=${process.env.DIB_KEY}`
            }
        },
        {
            resolve: "gatsby-source-custom-api",
            options: {
                rootKey: 'authors',
                url: `https://api.dropinblog.com/v1/json/authors/?b=${process.env.DIB_KEY}`
            }
        }
    ]
}
