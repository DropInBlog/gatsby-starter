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
    dibCategories(slug: {eq: $slug}) {
        title
        slug
    }
    allDibPosts(filter: {categories: {elemMatch: {slug: {eq: $slug}}}}) {
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
}`

const TabsPage = props => {
    const posts = props.data.allDibPosts.edges
    const category = props.data.dibCategories
    return (
        <div>
            <Header pageTitle={category.title} />
            <Flex justify="center" mt={12}>
                <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" autoFlow="row" gap={[8, 8, 4, 1]} className='container'>
                    {posts.map(post => <Card post={post.node} tab={category} />)}
                </Grid>
            </Flex>
            <Footer />
        </div>
    )
}


export default TabsPage
