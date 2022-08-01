import {gql} from '@apollo/client'

export const ADD_POST = gql`
  mutation MyMutaion(
    $body:String!
    $image:String!
    $subreddit_id:ID!
    $username:String!
    $title:String!
  ) {
    insertPost(
      body:$body
      image:$image
      subreddit_id:$subreddit_id
      title:$title
      username:$username
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation MyMutaion($topic:String!){
    insertSubreddit(topic:$topic){
      id
      topic
      created_at
    }
  }
`

export const ADD_COMMENT = gql`
  mutation MyMutaion(
    $post_id:ID!
    $username:String!
    $text:String!
  ) {
    insertComment(
      post_id:$post_id
      username:$username
      text:$text
    ) {
      post_id
      username
      text
    }
  }
`

export const ADD_VOTE = gql`
  mutation MyMutaion(
    $post_id: ID!
    $upvote: Boolean!
    $username: String!
  ) {
    insertVote(
      post_id:$post_id
      upvote:$upvote
      username:$username
    ) {
      post_id
      upvote
      username
    }
  }
`