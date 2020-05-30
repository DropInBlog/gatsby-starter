import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"

// * Components
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import { Flex, Text, Grid, Image, Box } from "@chakra-ui/core"

// * Styles
import "./post.sass"

export const data = graphql`
  query($slug: String!) {
    dibPosts(slug: { eq: $slug }) {
      title
      summary
      slug
      publishedAt
      readtime
      content
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
`

const PostPage = props => {
  const author = props.data.dibPosts.author
  const post = props.data.dibPosts

  console.log(props.data)
  const PostInfo = () => {
    return (
      <Flex flexDirection="column" alignItems="center" justify="space-between">
        <Text
          fontSize={["3xl", "4xl", "5xl"]}
          fontWeight="bold"
          color="#414141"
          mt={6}
          px={6}
          maxWidth="700px"
          textAlign="center"
          style={{ fontFamily: "Dosis" }}
        >
          Posts by {post.title}
        </Text>
        <Link to={`/authors/${author.slug}`}>
          <Image
            src={author.photo}
            size={["80px", "100px", "115px", "125px"]}
            rounded="full"
            mt={6}
          />
        </Link>
        <Text
          fontSize="2xl"
          fontWeight="600"
          mt={4}
          color="#545454"
          style={{ fontFamily: "Dosis" }}
        >
          {author.name} · {post.publishedAt}
        </Text>
        <Text
          fontSize="lg"
          fontWeight="500"
          mt={4}
          textAlign="center"
          color="#545454"
          style={{ fontFamily: "Dosis" }}
        >
          {post.readtime}
        </Text>
      </Flex>
    )
  }

  const textSizing = css`
    h1,
    h2,
    h3,
    h4 {
      font-size: 1.5em;
      font-weight: 600 !important;
      padding: 25px 0 25px 0;
    }
    p,
    ol,
    ul {
      font-size: 1.08em !important;
    }
    a {
      color: #fc8346 !important;
    }
    ul {
      list-style-type: disc;
      padding: 15px 0 15px 30px !important;
    }
    img {
      margin: 25px 0 25px 0;
      padding: 10px;
      border: 6px solid #478dd1 !important;
      border-radius: 25px;
    }
  `
  return (
    <div>
      <Header Extras={PostInfo} />
      <Flex css={textSizing} justify="center" w="screen">
        <Box
          mt={8}
          px={[4, 8, 12, 16]}
          maxWidth="1000px"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></Box>
      </Flex>
      <Footer />
    </div>
  )
}

export default PostPage
