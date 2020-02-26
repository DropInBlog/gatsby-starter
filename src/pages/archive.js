import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

// * Components 
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Card from '../components/card/card'
import { Flex, Grid } from '@chakra-ui/core'

// * Styles
import '../styles/archive.sass'

const ArchivePage = () => {
    const data = useStaticQuery(graphql`
    query {
        posts {
            data {
                posts {
                    title 
                    summary 
                    slug 
                    publishedAt
                    readtime
                    featuredImage
                    categories {
                        title
                        slug
                    }
                    author {
                        name
                        photo
                        slug
                    }
                }
            }
        }
        }
    `)

    const posts = data.posts.data.posts

    return (
        <div>
            <Header pageTitle="Archive" />
            <Flex justify="center" mt={12}>
                <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" autoFlow="row" gap={[8, 8, 4, 1]} className='container'>
                    {posts.map(post => <Card post={post} tab={post.categories[0]} />)}
                </Grid>
            </Flex>
            <Footer />
        </div>
    )
}

export default ArchivePage