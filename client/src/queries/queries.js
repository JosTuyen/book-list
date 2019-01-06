import gql from 'graphql-tag';

const GET_BOOKS_QUERY = gql`
  query BooksQuery{
    books{
      name
      id
    }
  }
`;

const GET_AUTHOR_QUERY = gql`
  query AuthorsQuery{
    authors{
      name
      id
    }
  }
`;

const ADD_BOOK_MUTATION = gql`
  mutation AddBookMutation($name: String!, $genre:String!, $authorId:ID!){
      addBook(name:$name,genre:$genre,authorId:$authorId){
          name
          id
      }
  }
`;

const GET_BOOK_QUERY = gql`
  query GetBookQuery($id: ID){
      book(id:$id){
          id
          name
          genre
          author{
              id
              name
              age
              books{
                  name
                  id
              }
          }
      }
  }
`;

export {GET_BOOKS_QUERY, GET_AUTHOR_QUERY, ADD_BOOK_MUTATION, GET_BOOK_QUERY}