import React from "react"
import { graphql, useStaticQuery } from 'gatsby'

// * Components 
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Card from '../components/card/card'
import { Flex, Grid } from '@chakra-ui/core'

const Home = () => {
    const data = useStaticQuery(graphql`
    query {
        allDibPosts {
            edges {
                node {
                    title 
                    summary 
                    slug 
                    publishedAt
                    readTime
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
    `)

    const posts = data.allDibPosts.edges
    return (
        <div>
            <Header pageTitle="Dib in Gatsby" subTitle="Instant blog on any site in only 3 minutes" isLarge />
            <Flex justify="center" mt={12}>
                <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" autoFlow="row" gap={[8, 8, 4, 1]} className='container'>
                    {posts.map(post => <Card post={post.node} tab={post.node.categories[0]} />)}
                </Grid>
            </Flex>
            <Footer />
        </div>
    )
}

export default Home

