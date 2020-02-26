const path = require("path")

// * Because DropInBlog delivers everything in an array (data) inside a single object, like authors or categories, we're not able to use any of the goodies that Gatsby gives us, like filter. 
//  * To get around this we have to remap the data array onto a custom type. 

exports.createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes } = actions

    // * Authors
    createTypes([`
        interface Authors @nodeInterface {
            id: ID!
            name: String!
            slug: String! 
            photo: String!
        }
    `,
        schema.buildObjectType({
            name: 'dibAuthors',
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

    // * Categories/Tabs
    createTypes([`
        interface Categories @nodeInterface {
            id: ID!
            title: String!
            slug: String! 
        }
    `,
        schema.buildObjectType({
            name: 'dibCategories',
            interfaces: ['Node', 'Categories'],
            fields: {
                id: 'ID!',
                title: {
                    type: 'String!',
                    resolve: async (source, args, ctx, info) => {
                        const parent = await ctx.nodeModel.getNodeById({ id: source.parent })
                        return parent.data[source.place].title
                    }
                },
                slug: {
                    type: 'String!',
                    resolve: async (source, args, ctx, info) => {
                        const parent = await ctx.nodeModel.getNodeById({ id: source.parent })
                        return parent.data[source.place].slug
                    }
                }
            }
        })
    ])

    // * Posts 
    createTypes([`
        interface Posts @nodeInterface {
            id: ID!
            title: String!
            slug: String! 
        }
    `,
        schema.buildObjectType({
            name: 'dibPosts',
            interfaces: ['Node', 'Posts'],
            fields: {
                id: 'ID!',
                title: {
                    type: 'String!',
                    resolve: async (source, args, ctx, info) => {
                        const parent = await ctx.nodeModel.getNodeById({ id: source.parent })
                        return parent.posts[source.place].title
                    }
                },
                slug: {
                    type: 'String!',
                    resolve: async (source, args, ctx, info) => {
                        const parent = await ctx.nodeModel.getNodeById({ id: source.parent })
                        return parent.posts[source.place].slug
                    }
                }
            }
        })
    ])
}

exports.onCreateNode = ({ node, actions, createNodeId }) => {
    const { createNode } = actions

    //  * For Every item in data we'll create a new node, give it an index, then use that index to return the correct item from data.
    const remapNode = (name, node, arr) => {
        for (let i = 0; i < arr.length; i++) {
            createNode({
                id: createNodeId(`dib${name}-${node.id + i}`),
                parent: node.id,
                place: i,
                internal: {
                    type: `dib${name}`,
                    contentDigest: node.internal.contentDigest
                }
            })
        }
    }

    if (node.internal.type === 'authors') remapNode('Authors', node, node.data)
    if (node.internal.type === 'categories') remapNode('Categories', node, node.data)
    if (node.internal.type === 'data') remapNode('Posts', node, node.posts)
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // * Posts
    const postTemplate = path.resolve('./src/templates/post/post.js')
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

    posts.data.allDibPosts.edges.forEach(post => {
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
            path: `/tabs/${tab.slug}`,
            context: { slug: tab.slug }
        })
    })

    // * Profiles
    const profileTemplate = path.resolve('./src/templates/profile/profile.js')
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
            path: `/authors/${profile.slug}`,
            context: { slug: profile.slug }
        })
    })
}

