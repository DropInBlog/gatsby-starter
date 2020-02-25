import React from 'react'
import { Link } from 'gatsby'
import './header.sass'

// * Components 
import { Text, Image, Flex } from '@chakra-ui/core'

// * Styles 
import '../../styles/global.sass'
import './header.sass'

const Header = ({ pageTitle, subTitle, isLarge }) => {
    const links = {
        as: "li",
        color: "#414141",
        px: [3, 6]
    }

    return (
        <Flex bg="#FCE3D6" direction="column" justify="space-between" w="100%" color="FCE3D6" >
            <Flex justify={["center", "flex-start"]}>
                <Image ml={["0", "16"]}
                    pt="6" h="80px"
                    src="./dropInBlog-logo.png" alt="DropInBlog Logo"
                    className="logo" />
            </Flex>

            {pageTitle && <Flex direction="column" align="center" justify="center" h={isLarge ? "60vh" : "150px"}>
                <Text fontSize={["4xl", "5xl", "6xl"]}
                    fontWeight="600"
                    mb="6" mt={isLarge && "-75px"}
                    style={{ "font-family": 'Dosis' }}> {pageTitle}</Text>
                {subTitle && <Text fontSize={["lg", "xl", "2xl"]}
                    fontWeight="500"
                    style={{ "font-family": 'Dosis' }}>{subTitle}</Text>}
            </Flex>}

            <Flex justify="space-between" direction={["column", "column", "row"]} align="center" wrap="wrap" mt="50px">
                <Flex as="ul" w="30vw" minW="320px" justify="space-around" mb="6" ml={[0, 0, 16]}>
                    <Link to='/'><Text {...links}>Home</Text></Link>
                    <Link to='/'><Text {...links}>Tabs</Text></Link>
                    <Link to='/'><Text {...links}>Authors</Text></Link>
                    <Link to='/'><Text {...links}>Archive</Text></Link>
                    <Link to='/'><Text {...links}>Help</Text></Link>
                </Flex>
                <Flex justify="space-around" w="250px" mb="6" mr={[0, 0, 10]}>
                    <a href="https://twitter.com/dropinblog" target="blank"><Image src="./twitter.svg" alt="Twitter Logo" h="40px" /></a>
                    <a href="https://github.com/DynamisDevelopment/dib-gatsby-starter" target="blank"><Image src="./github.svg" alt="Github Logo" h="40px" /></a>
                    <a href="https://m.me/dropinblog" target="blank"><Image src="./messenger.svg" alt="Messenger Logo" h="40px" /></a>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header