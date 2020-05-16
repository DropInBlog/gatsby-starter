import React from "react"
import { graphql } from "gatsby"

// * Components
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import Card from "../../components/card/card"
import { Flex, Grid } from "@chakra-ui/core"

// * Styles
import "./tabs.sass"

export const data = graphql`
  query($slug: String!) {
    dibCategories(slug: { eq: $slug }) {
      title
      slug
    }
    allDibPosts(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          title
          summary
          slug
          publishedAt
          readtime
          featuredImage
          categories {
            title
            slug
          }
          author {
            name
            slug
            photo
          }
        }
      }
    }
  }
`

const TabsPage = props => {
  const posts = props.data.allDibPosts.edges
  const category = props.data.dibCategories
  return (
    <div>
      <Header pageTitle={category.title} />
      <Flex mt={12} justify={posts.length > 1 && "center"}>
        <Grid
          w="100vw"
          templateColumns={[
            "repeat(auto-fit, minmax(300px, 1fr))",
            "repeat(auto-fit, minmax(320px, 1fr))",
            "repeat(auto-fit, minmax(450px, 1fr))",
          ]}
          px={[0, 0, 0, 32]}
          justifyItems="center"
          autoFlow="row"
          gap={[8, 8, 4, 1]}
          className={posts.length > 1 && "container"}
        >
          {posts.map(post => (
            <Card post={post.node} tab={category} />
          ))}
        </Grid>
      </Flex>
      <Footer />
    </div>
  )
}

export default TabsPage
