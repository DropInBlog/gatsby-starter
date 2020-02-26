const path = require("path")

// * Because DropInBlog delivers everything in an array, data, inside a single object, like authors or categories, we're not able to use any of the goodies that Gatsby gives us, like filter. 
//  * To get around this we have to remap the data array onto a custom type. 
//  * For Every item in data we'll create a new node, give it an index, then use that index to return the correct item from data.

exports.createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes } = actions

    createTypes([`
        interface Authors @nodeInterface {
            id: ID!
            name: String!
            slug: String! 
            photo: String!
        }
    `,
        schema.buildObjectType({
            name: 'AuthorsData',
            interfaces: ['Node', 'Authors'],
            fields: {
                id: 'ID!',
                name: {
                    type: 'String!',
                    resolve: async (source, args, ctx, info) => {
                        const parent = await ctx.nodeModel.getNodeById({ id: source.parent })
                        return parent.data[source.place].name
                    }
                },
                slug: {
                    type: 'String!',
                    resolve: async (source, args, ctx, info) => {
                        const parent = await ctx.nodeModel.getNodeById({ id: source.parent })
                        return parent.data[source.place].slug
                    }
                },
                photo: {
                    type: 'String!',
                    resolve: async (source, args, ctx, info) => {
                        const parent = await ctx.nodeModel.getNodeById({ id: source.parent })
                        return parent.data[source.place].photo
                    }
                }
            }
        })
    ])
}

exports.onCreateNode = ({ node, actions, createNodeId }) => {
    const { createNode } = actions
    if (node.internal.type !== 'authors') return

    for (let i = 0; i < node.data.length; i++) {
        createNode({
            id: createNodeId(`AuthorsData-${node.id + i}`),
            parent: node.id,
            place: i,
            internal: {
                type: 'AuthorsData',
                contentDigest: node.internal.contentDigest
            }
        })
    }
}

// module.exports.sourceNodes = ({ actions, schema }) => {
//     const { createTypes } = actions

//     const typeDefs = `
//     type Authors implements Node {
//         name: String
//         slug: String
//     }
//     `
//     createTypes(typeDefs)
// }

// exports.createResolvers = ({ createResolvers, schema }) => {
//     createResolvers({
//         Query: {
//             Authors: {
//                 type: `[Authors!]`,
//                 name: {
//                     type: `String!`,
//                     resolve(parent, args, context) {
//                         const authors = context.nodeModel.getAllNodes({
//                             type: =,
//                         })

//                         return authors.map(author => author.name)
//                     }
//                 },
//             }
//         }
//     })
// }

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // * Posts
    const postTemplate = path.resolve('./src/templates/post/post.js')
    const posts = await graphql(`
        query {
            posts {
                data {
                    posts {
                      slug
                    }
                  }
              }
          }
        `)

    posts.data.posts.data.posts.forEach(post => {
        createPage({
            component: postTemplate,
            path: `/posts/${post.slug}`,
            context: { slug: post.slug }
        })
    })

    // * Categories
    const tabTemplate = path.resolve('./src/templates/tab/tab.js')
    const tabs = await graphql(`
        query {
            categories {
                data {
                    slug
                  }
              }
          }
        `)

    tabs.data.categories.data.forEach(tab => {
        createPage({
            component: tabTemplate,
            path: `/tabs/${tab.slug}`,
            context: { slug: tab.slug }
        })
    })

    // * Profiles
    const profileTemplate = path.resolve('./src/templates/profile/profile.js')
    const profiles = await graphql(`
        query {
            authors {
                data {
                    slug
                  }
              }
          }
        `)

    profiles.data.authors.data.forEach(profile => {
        createPage({
            component: profileTemplate,
            path: `/authors/${profile.slug}`,
            context: { slug: profile.slug }
        })
    })
}

