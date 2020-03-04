import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

// * Components 
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Card from '../components/card/card'
import { Flex, Grid } from '@chakra-ui/core'

// * Styles 
import '../styles/tabs.sass'

const Tabs = () => {
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
            <Header pageTitle="Categories" />
            <Flex justify="space-around" mt={12}>
                <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" autoFlow="row" gap={[8, 8, 4, 1]} className='container'>
                    {posts.map((post, index) => <Card post={post.node} tab={post.node.categories[0]} key={index} />)}
                </Grid>
            </Flex>
            <Footer />
        </div>
    )
}

export default Tabs