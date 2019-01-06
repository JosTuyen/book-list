import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_BOOKS_QUERY } from '../queries/queries';
import BookDetails from './BookDetails';

export class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null
    }
  }
  render() {
    return (
      <div>
        <Query query={GET_BOOKS_QUERY}>
          {
            ({loading, error, data}) => {
              if (loading) return <div>Loading books...</div>
              if (error) console.log(error);
              return<Fragment>
                <ul id="book-list">
                {
                  data.books.map(book => <li key={book.id} onClick={e => {this.setState({selected:book.id})}}>{book.name}</li>)
                }
                </ul>
                <BookDetails bookId={this.state.selected}/>
              </Fragment>
            }
          }
        </Query>
      </div>
    )
  }
}

export default BookList
