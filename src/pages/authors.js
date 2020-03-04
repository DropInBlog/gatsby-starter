import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

// * Components 
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Card from '../components/card/card'
import { Flex, Text, Image } from '@chakra-ui/core'

// * Styles
import '../styles/authors.sass'
 
const AuthorsPage = () => {
    const data = useStaticQuery(graphql`
    query {
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
    return (
        <div>
            <Header pageTitle="Authors" />
            <Flex flexDirection="column" mt={12} >
            {authors.map((author, index)=> {
                return <Link to={'/authors/' + author.node.slug}>
                    <Flex key={index} justify="space-around" my={10}>
                        <Flex flexDirection="column" justify="center">
                            <Text fontSize="5xl" 
                                fontWeight="bold" 
                                color="#414141"
                                style={{ "font-family": 'Dosis' }}>{author.node.name}</Text>
                            <Text fontSize="2xl"
                                fontWeight="600"
                                color="#FC8346"
                                style={{ "font-family": 'Dosis' }}>3 Articles</Text>
                        </Flex>
                        <Image src={author.node.photo} size="150px" rounded="full"/>
                    </Flex>
                </Link>
                
            })}
            </Flex>
            <Footer />
        </div>
    )
}

export default AuthorsPage