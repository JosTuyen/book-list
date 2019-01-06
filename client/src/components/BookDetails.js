import React, { Component, Fragment } from 'react';
import {GET_BOOK_QUERY} from '../queries/queries';
import {Query} from 'react-apollo';

export class BookDetails extends Component {
  render() {
    let id = this.props.bookId;
    if (id) {
        return (
            <div id="book-details">
              <Query query={GET_BOOK_QUERY} variables={{id}} skip={!id}>
                  {
                      ({loading, error, data}) => {
                          if (loading) return <div>Loading book details...</div>
                          if (error) console.log(error);
                              const {book} = data;
                              return<Fragment>
                                  <h2>{book.name}</h2>
                                  <p>{book.genre}</p>
                                  <p>{book.author.name}</p>
                                  <p>All books by this author:</p>
                                  <ul className="other-books">
                                      {book.author.books.map(e => {
                                          return <li key={e.id}>{e.name}</li>
                                      })}
                                  </ul>
                              </Fragment>
                      }
                  }
              </Query>
            </div>
          )
        } else {
            return(
                <h2>No book selected...</h2>
            )
        }
    }
}

export default BookDetails
