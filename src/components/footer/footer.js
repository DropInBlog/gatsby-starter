import React from "react"
import { Link } from "gatsby"
import "./footer.sass"

//  * Components
import { Flex, Text } from "@chakra-ui/core"

const Footer = () => {
  const links = {
    as: "li",
    color: "#fff",
    fontSize: "lg",
    fontFamily: "Dosis",
  }
  return (
    <Flex
      justify="space-around"
      align="center"
      bg="#FD9C69"
      h="100px"
      wrap="wrap"
      mt={8}
    >
      <Text color="white" fontWeight="600" fontSize="lg">
        DropInBlog & Gatsby © {new Date().getFullYear()}
      </Text>

      <Flex as="ul" minW="320px" w="30vw" justify="space-around" align="center">
        <Link to="/">
          <Text {...links}>Home</Text>
        </Link>
        <Link to="/authors">
          <Text {...links}>Authors</Text>
        </Link>
        <Link to="/archive">
          <Text {...links}>Archive</Text>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Footer
