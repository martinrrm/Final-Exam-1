import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      books: [],
      error: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const value = document.querySelector('#text').value
    
    fetch(`${API_URL}${value}`)
      .then((res) => {return res.json()})
      .then(data => {
        console.log(data)
        if(data.totalItems > 0){
          this.setState({
            books: data.items,
            error: ""
          })
        } else {
          this.setState({
            books: [],
            error: "Books not found"
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render(){
    const { books, error } = this.state
    return(
      <div>
        <BookForm handleSubmit={this.handleSubmit}/>
        {error && <h1>{error}</h1>}
        {books && books.map((book, i) => 
          <Book {...book} key={i}/>
      )}
      </div>
    )
  }

}

export default App;
