import React from "react"
import { Link } from "gatsby"

// * Components
import { Flex, Box } from "@chakra-ui/core"

const Pager = ({ pageContext }) => {
  const { previousPagePath, nextPagePath, numberOfPages } = pageContext
  const pages = Array.from({ length: numberOfPages }, () => [])

  const styles = {
    color: "#FD9C69",
    fontWeight: "600",
    fontSize: "lg",
    mx: "3",
  }

  const pager = {
    border: "4px",
    borderRadius: "md",
    borderColor: "#FD9C69",
    py: "1",
    px: "3",
  }
  return (
    <Flex justify="center" align="center">
      {previousPagePath && (
        <Box {...styles} {...pager}>
          <Link to={previousPagePath}>Previous</Link>
        </Box>
      )}

      {pages.map((page, index) => {
        return (
          <Box {...styles}>
            <Link to={index > 0 ? `archive/${index + 1}` : "archive/"}>
              {index + 1}
            </Link>
          </Box>
        )
      })}

      {nextPagePath && (
        <Box {...styles} {...pager}>
          <Link to={nextPagePath}>Next</Link>
        </Box>
      )}
    </Flex>
  )
}

export default Pager
