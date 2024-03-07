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
      author{
        name
      },
      id,
      genres  
    }
  }
`
export const ALL_GENRES = gql`
  query {
    allGenre
  }
`

export const CREATE_BOOK = gql`
  mutation addBook(
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
        author{
          name,
          born,
          id
        },
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
export const LOGIN = gql`
  mutation login ($username : String!,$password : String!){
    login(
      username : $username,
      password : $password
    ){
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      favoriteGenre,
      id,
      username
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      published,
      author{
        name,
        id
      },
      id,
      genres  
    }
  }
`