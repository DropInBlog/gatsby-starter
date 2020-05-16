import React from "react"
import { graphql, Link } from "gatsby"

// * Components
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import Card from "../../components/card/card"
import { Flex, Text, Grid, Image } from "@chakra-ui/core"

// * Styles
import "./profile.sass"

export const data = graphql`
  query($slug: String!) {
    dibAuthors(slug: { eq: $slug }) {
      name
      slug
      photo
    }
    allDibPosts(filter: { author: { slug: { eq: $slug } } }) {
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

const ProfilePage = props => {
  const author = props.data.dibAuthors
  const posts = props.data.allDibPosts.edges

  const AuthorInfo = () => {
    return (
      <Flex flexDirection="column" alignItems="center">
        <Image
          src={author.photo}
          size={["100px", "120px", "140px"]}
          rounded="full"
          mt="30px"
        />
        <Text
          fontSize="5xl"
          fontWeight="bold"
          color="#414141"
          mt={6}
          textAlign="center"
          style={{ fontFamily: "Dosis" }}
        >
          Posts by {author.name}
        </Text>
      </Flex>
    )
  }

  return (
    <div>
      <Header Extras={AuthorInfo} />
      <Flex mt={16} justify={posts.length > 1 && "center"}>
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
            <Card post={post.node} tab={post.node.categories[0]} />
          ))}
        </Grid>
      </Flex>
      <Footer />
    </div>
  )
}

export default ProfilePage
