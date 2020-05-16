import React from "react"
import { graphql, useStaticQuery } from "gatsby"

// * Components
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Card from "../components/card/card"
import { Flex, Grid } from "@chakra-ui/core"

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      allDibPosts {
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
  `)

  const posts = data.allDibPosts.edges
  return (
    <div>
      <Header
        pageTitle="DiB in Gatsby"
        subTitle="Add a blog to any site in only 3 minutes"
        isLarge
      />
      <Flex justify="space-around" mt={12}>
        <Grid
          templateColumns={[
            "repeat(auto-fit, minmax(300px, 1fr))",
            "repeat(auto-fit, minmax(320px, 1fr))",
            "repeat(auto-fit, minmax(450px, 1fr))",
          ]}
          px={[0, 0, 0, 32]}
          justifyItems="center"
          autoFlow="row"
          gap={[8, 8, 4, 1]}
          className="container"
        >
          {posts.map((post, index) => (
            <Card post={post.node} tab={post.node.categories[0]} key={index} />
          ))}
        </Grid>
      </Flex>
      <Footer />
      <div className="dib-posts"></div>
    </div>
  )
}

export default Home
