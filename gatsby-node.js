const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // * Posts
    const postTemplate = path.resolve('./src/templates/post/post.js')
    const posts = await graphql(`
        query {
            customApi {
                data {
                    posts {
                      slug
                    }
                  }
              }
          }
        `)

    posts.data.customApi.data.posts.forEach(post => {
        createPage({
            component: postTemplate,
            path: `/archive/${post.slug}`,
            context: { slug: post.slug }
        })
    })

    // * Tabs
    const tabTemplate = path.resolve('./src/templates/tabs/tab.js')
    const tabs = await graphql(`
        query {
            customApi {
                data {
                    posts {
                      categories {
                          slug
                      }
                    }
                  }
              }
          }
        `)

    tabs.data.customApi.data.posts.forEach(tab => {
        createPage({
            component: tabTemplate,
            path: `/tabs/${tab.categories[0].slug}`,
            context: { slug: tab.categories[0].slug }
        })
    })

    // * Profiles
    const profileTemplate = path.resolve('./src/templates/profile/profile.js')
    const profiles = await graphql(`
        query {
            customApi {
                data {
                    posts {
                      author {
                          slug
                      }
                    }
                  }
              }
          }
        `)

    profiles.data.customApi.data.posts.forEach(profile => {
        createPage({
            component: profileTemplate,
            path: `/authors/${profile.author.slug}`,
            context: { slug: profile.author.slug }
        })
    })
}

