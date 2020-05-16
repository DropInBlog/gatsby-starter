import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

// * Components
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import { Flex, Text, Image } from "@chakra-ui/core"

// * Styles
import "../styles/authors.sass"

const AuthorsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allDibPosts {
        edges {
          node {
            author {
              slug
            }
          }
        }
      }
      allDibAuthors {
        edges {
          node {
            name
            slug
            photo
          }
        }
      }
    }
  `)

  const authors = data.allDibAuthors.edges
  const posts = data.allDibPosts.edges

  console.log(data)

  authors.forEach(author => {
    author.node.numberOfPosts = 0
    posts.forEach(post => {
      if (post.node.author.slug === author.node.slug)
        author.node.numberOfPosts++
    })
  })

  return (
    <div>
      <Header pageTitle="Authors" />
      <Flex flexDirection="column" mt={12}>
        {authors.map((author, index) => {
          return (
            <Link to={"/authors/" + author.node.slug} key={index}>
              <Flex key={index} justify="space-around" my={10}>
                <Flex flexDirection="column" justify="center">
                  <Text
                    fontSize={["4xl", "4xl", "5xl", "6xl"]}
                    fontWeight="bold"
                    color="#414141"
                    style={{ fontFamily: "Dosis" }}
                  >
                    {author.node.name}
                  </Text>
                  <Text
                    fontSize={["lg", "xl", "2xl"]}
                    fontWeight="600"
                    color="#FC8346"
                    style={{ fontFamily: "Dosis" }}
                  >
                    {author.node.numberOfPosts}{" "}
                    {author.node.numberOfPosts > 1 ? "Articles" : "Article"}
                  </Text>
                </Flex>
                <Image
                  src={author.node.photo}
                  size={["100px", "120px", "140px"]}
                  rounded="full"
                />
              </Flex>
            </Link>
          )
        })}
      </Flex>
      <Footer />
    </div>
  )
}

export default AuthorsPage
