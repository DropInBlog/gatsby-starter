const path = require("path")
const { paginate } = require("gatsby-awesome-pagination")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // * Posts
  const postTemplate = path.resolve("./src/templates/post/post.js")
  const posts = await graphql(`
    query {
      allDibPosts {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  // * Archive Pagination
  paginate({
    createPage,
    items: posts.data.allDibPosts.edges,
    itemsPerPage: 3,
    pathPrefix: `/archive`,
    component: path.resolve("src/templates/archive/archive.js"),
  })

  posts.data.allDibPosts.edges.forEach(post => {
    createPage({
      component: postTemplate,
      path: `/posts/${post.node.slug}`,
      context: { slug: post.node.slug },
    })
  })

  // * Categories
  const tabTemplate = path.resolve("./src/templates/tab/tab.js")
  const tabs = await graphql(`
    query {
      allDibCategories {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  tabs.data.allDibCategories.edges.forEach(tab => {
    createPage({
      component: tabTemplate,
      path: `/tabs/${tab.node.slug}`,
      context: { slug: tab.node.slug },
    })
  })

  // * Profiles
  const profileTemplate = path.resolve("./src/templates/profile/profile.js")
  const profiles = await graphql(`
    query {
      allDibAuthors {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  profiles.data.allDibAuthors.edges.forEach(profile => {
    createPage({
      component: profileTemplate,
      path: `/authors/${profile.node.slug}`,
      context: { slug: profile.node.slug },
    })
  })
}
