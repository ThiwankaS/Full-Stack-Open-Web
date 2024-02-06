import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name,
      born,
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks{
      title,
      published,
      author,
      id,
      genres  
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook(
    $title : String!,
    $author : String!,
    $published : Int!,
    $genres : [String!]! ){
      addBook(
        title : $title, 
        author : $author,
        published : $published,
        genres : $genres
      ){
        title, 
        author,
        published,
        genres,
        id
      }
    }
`
export const UPDATE_AUTHOUR = gql`
  mutation eidtAuthor(
    $name : String!,
    $year : Int!
  ){
    editAuthor(
      name : $name,
      setBornTo : $year
    ){
      name,
      born,
      bookCount
    }
  }
`