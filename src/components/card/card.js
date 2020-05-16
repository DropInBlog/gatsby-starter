import React from "react"
import { Link } from "gatsby"
import "./card.sass"

// * Components
import { Image, Text, Flex } from "@chakra-ui/core"

const Card = ({ post, tab }) => {
  return (
    <Flex
      flexDirection="column"
      align="center"
      px={8}
      py={[1, 2, 3, 4]}
      maxW="450px"
    >
      <Link to={"posts/" + post.slug}>
        <Image src={post.featuredImage} rounded="5%" />
      </Link>
      <Link to={"tabs/" + tab.slug}>
        <Text
          py={3}
          color="#696969"
          fontSize="lg"
          style={{ "font-family": "Dosis" }}
        >
          {tab.title}
        </Text>
      </Link>
      <Text
        fontSize="2xl"
        fontWeight="500"
        w="80%"
        textAlign="center"
        mb={3}
        style={{ "font-family": "Dosis" }}
      >
        {post.title}
      </Text>
      <Text fontFamily="Roboto" fontWeight="200" fontSize="md">
        {post.summary}
      </Text>

      <Flex align="center" justify="space-between" w="100%" m={3}>
        <Link to={"/authors/" + post.author.slug}>
          <Flex align="center">
            <Image src={post.author.photo} size="50px" rounded="full" mr={3} />
            <Text fontSize="md" color="#545454">
              {post.author.name}· {post.publishedAt}
            </Text>
          </Flex>
        </Link>

        <Text fontSize="sm" color="#545454">
          {post.readtime}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Card
