import React from 'react'
import { graphql } from 'gatsby'

// * Components 
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Card from '../../components/card/card'
import { Flex, Grid } from '@chakra-ui/core'

// * Styles
import './tabs.sass'

export const data = graphql`
query($slug: String!) {
    categories(data: {elemMatch: {slug: {eq: $slug}}}) {
        data {
            title
            slug
        }
    }
    posts(data: { posts: { elemMatch: {categories: { elemMatch: {slug: {eq: $slug}}} }}}) {
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
`
const TabsPage = props => {
    console.log(props.data.categories)
    const posts = props.data.posts.data.posts
    const category = props.data.categories.data
    return (
        <div>
            <Header pageTitle={category.title} />
            <Flex justify="center" mt={12}>
                <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" autoFlow="row" gap={[8, 8, 4, 1]} className='container'>
                    {posts.map(post => <Card post={post} tab={post.categories[0]} />)}
                </Grid>
            </Flex>
            <Footer />
        </div>
    )
}


export default TabsPage
