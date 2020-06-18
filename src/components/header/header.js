import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import Img from "gatsby-image"

// * Components
import { Text, Image, Flex } from "@chakra-ui/core"

// * Styles
import "../../styles/global.sass"
import "./header.sass"

const Header = ({ pageTitle, subTitle, isLarge, Extras }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const links = {
    as: "li",
    color: "#414141",
    px: [3, 6],
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={data.site.siteMetadata.description} />
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>

      <Flex
        bg="#FCE3D6"
        direction="column"
        justify="space-between"
        w="100%"
        color="FCE3D6"
      >
        <Link to="/">
          <Flex justify={["center", "flex-start"]}>
            <Image
              ml={["0", "16"]}
              pt="6"
              h="80px"
              src="../dropInBlog-logo.png"
              alt="DropInBlog Logo"
              h="auto"
              maxWidth={["200px", "250px", "300px", "350px"]}
              className="logo"
            />
          </Flex>
        </Link>

        {pageTitle && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            h={isLarge ? ["30vh", "40vh", "50vh", "60vh"] : "110%"}
          >
            <Text
              fontSize={["4xl", "5xl", "6xl"]}
              fontWeight="600"
              mb="6"
              mt={isLarge ? ["0px", "25px", "-75px"] : "30px"}
              style={{ fontFamily: "Dosis" }}
            >
              {" "}
              {pageTitle}
            </Text>
            {subTitle && (
              <Text
                fontSize={["lg", "xl", "2xl"]}
                fontWeight="500"
                textAlign="center"
                style={{ fontFamily: "Dosis" }}
              >
                {subTitle}
              </Text>
            )}
          </Flex>
        )}
        {Extras && <Extras />}

        <Flex
          justify="space-between"
          direction={["column", "column", "row"]}
          align="center"
          wrap="wrap"
          mt="50px"
        >
          <Flex
            as="ul"
            w="30vw"
            minW="320px"
            justify="space-around"
            mb="6"
            ml={[0, 0, 16]}
          >
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
          <Flex justify="space-around" w="250px" mb="6" mr={[0, 0, 10]}>
            <a href="https://twitter.com/dropinblog" target="blank">
              <Image src="../twitter.svg" alt="Twitter Logo" h="40px" />
            </a>
            <a
              href="https://github.com/DropInBlog/gatsby-starter-dropinblog.git"
              target="blank"
            >
              <Image src="../github.svg" alt="Github Logo" h="40px" />
            </a>
            <a href="https://m.me/dropinblog" target="blank">
              <Image src="../messenger.svg" alt="Messenger Logo" h="40px" />
            </a>
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}

export default Header
