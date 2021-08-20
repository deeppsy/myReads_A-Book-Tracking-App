import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import getAll from "./utils/data";

class BooksApp extends React.Component {
  bookshelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want To Read" },
    { key: "read", name: "Read" },
  ];

  state = {
    books: getAll,
  };
  moveBook = (book, shelf) => {
    const updatedBooks = this.state.books.map((b) => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      return b;
    });
    this.setState({
      books: updatedBooks,
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              bookshelves={this.bookshelves}
              books={books}
              onMove={this.moveBook}
            />
          )}
        />
        <Route path="/search" render={() => <BookSearch books={books} />} />
      </div>
    );
  }
}

class ListBooks extends Component {
  render() {
    const { bookshelves, books, onMove } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <BookCase bookshelves={bookshelves} books={books} onMove={onMove} />
        <OpenSearchButton />
      </div>
    );
  }
}

class BookCase extends Component {
  render() {
    const { bookshelves, books, onMove } = this.props;
    return (
      <div className="list-books-content">
        <div>
          {bookshelves.map((shelf) => (
            <BookShelf
              key={shelf.key}
              shelf={shelf}
              books={books}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
    );
  }
}

class BookShelf extends Component {
  render() {
    const { shelf, books, onMove } = this.props;
    const booksOnThisShelf = books.filter((book) => book.shelf === shelf.key);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnThisShelf.map((book) => (
              <Book
                book={book}
                shelf={shelf.key}
                key={book.id}
                onMove={onMove}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
class Book extends Component {
  render() {
    const { book, shelf, onMove } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`,
              }}
            />
            <BookShelfChanger book={book} shelf={shelf} onMove={onMove} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
      </li>
    );
  }
}
class BookShelfChanger extends Component {
  state = {
    value: this.props.shelf,
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onMove(this.props.book, e.target.value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

class OpenSearchButton extends Component {
  render() {
    return (
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}

// *********************************************
// This is the Search Page
// *********************************************

class BookSearch extends Component {
  render() {
    const { books } = this.props;
    return (
      <div className="search-books">
        <SearchBar />
        <SearchResults books={books} />
      </div>
    );
  }
}

class SearchBar extends Component {
  render() {
    return (
      <div className="search-books-bar">
        <CloseSearchButton />
        <SearchBooksInput />
      </div>
    );
  }
}
class CloseSearchButton extends Component {
  render() {
    return (
      <Link to="/">
        <button className="close-search">Close</button>
      </Link>
    );
  }
}
class SearchBooksInput extends Component {
  render() {
    return (
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" />
      </div>
    );
  }
}

class SearchResults extends Component {
  render() {
    const { books } = this.props;
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} shelf="none" />
          ))}
        </ol>
      </div>
    );
  }
}

export default BooksApp;
