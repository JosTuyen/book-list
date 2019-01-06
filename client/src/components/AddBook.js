import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_AUTHOR_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY } from '../queries/queries';

export class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      genre:'',
      authorId:''
    };
  }
  render() {
    return (
      <Fragment>
        <Mutation mutation={ADD_BOOK_MUTATION}>
        {
          (addBook,{data}) => (
          <form id="add-book" onSubmit={e => {
            e.preventDefault();
            addBook({
              variables:{
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
              },
              refetchQueries:[{ query:GET_BOOKS_QUERY }]
            });
          }}>
            <div className="field">
              <label>Book name:</label>
              <input type="text" onChange={e => this.setState({name: e.target.value})} />
            </div>
            <div className="field">
              <label>Genre:</label>
              <input type="text" onChange={e => this.setState({genre: e.target.value})} />
            </div>
            <div className="field">
              <label>Author:</label>
              <select onChange={e => this.setState({authorId: e.target.value})}>
                <option>Select author</option>
                <Query query={GET_AUTHOR_QUERY}>
                  {
                    ({loading, error, data}) => {
                      if (loading) return <option>Loading authors...</option>
                      if (error) console.log(error);

                      return<Fragment>
                        {
                          data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
                        }
                      </Fragment>
                    }
                  }
                </Query>
              </select>
            </div>
            <button>+</button>
          </form>
          )
        }
        </Mutation>
      </Fragment>
    )
  }
}

export default AddBook
