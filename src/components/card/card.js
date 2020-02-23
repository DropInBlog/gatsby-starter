import React from 'react'
import { Link } from 'gatsby'
import './card.sass'

// * Components 
import { Image, Text, Flex } from '@chakra-ui/core'

const Card = ({ post, tab }) => {
    return (
        <Flex flexDirection="column" align="center" px={8} >
            <Link to={"archive/" + post.slug}>
                <Image src={post.featuredImage} rounded="5%" />
            </Link>
            <Link to={"tabs/" + tab.slug}>
                <Text py={3} color="#696969" fontSize="lg"
                    style={{ "font-family": 'Dosis' }}>{tab.title}</Text>
            </Link>
            <Text
                fontSize="2xl"
                fontWeight="500"
                w="80%"
                textAlign="center"
                mb={3}
                style={{ "font-family": 'Dosis' }}>{post.title}</Text>
            <Text fontFamily="Roboto"
                fontWeight="300"
                fontSize="md">{post.summary}</Text>

            <Flex align="center" justify="space-between" w="100%" m={3}>
                <Flex align="center">
                    <Image src={post.author.photo} size="50px" rounded="full" mr={2} />
                    <Text fontSize="md" color="#545454">{post.author.name} · {post.publishedAt}</Text>
                </Flex>

                <Text fontSize="sm" color="#545454">{post.readtime}</Text>
            </Flex>
        </Flex>
    )
}

export default Card