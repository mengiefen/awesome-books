const bookShelf = document.getElementById('book-shelf');
const addButton = document.getElementById('btn-add');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

class Book {
  constructor(title, author) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
  }

  Books = []

  addBook() {
    this.Books.push({
      id: this.id,
      title: this.title,
      author: this.author,
    });
    return this.Books;
  }

  readBooks() {
    const bookSaved = JSON.parse(localStorage.getItem('books'));
    if (bookSaved) {
      this.Books = bookSaved;
    }
    return this.Books;
  }
  // Remove a single move from local storage

  removeBook(id) {
    this.Books = this.Books.filter((book) => book.id !== id);
    this.writeBooks();
    return this.Books;
  }

  // Write the books list into the localStorage
  writeBooks() {
    localStorage.setItem('books', JSON.stringify(this.Books));
  }
}

const displayBook = (book) => {
  const bookHolderHTML = `  
    <h4 class="book-title"><em>"${book.title}" by <span>${book.author}</span></em> </h4>  
    <button class="btn-remove" id=${book.id}>Remove</button>`;
  const bookHolder = document.createElement('div');
  bookHolder.classList.add('book-holder');
  bookHolder.innerHTML = bookHolderHTML;
  bookShelf.appendChild(bookHolder);
};

const drawAllBooks = () => {
  bookShelf.innerHTML = '';
  const Books = Book.readBooks();
  Books.forEach((element, index) => {
    if (index < 25) {
      displayBook(element);
    }
  });
};

//drawAllBooks();

const addBook = () => {
  if (titleInput.value !== '' && authorInput.value !== '') {
    const Buk = new Book(titleInput.value, authorInput.value);
    Buk.addBook();
    Buk.writeBooks();
    displayBook({
      title: titleInput.value,
      author: authorInput.value,
    });
    titleInput.value = '';
    authorInput.value = '';
  }
};

addButton.addEventListener('click', addBook);

document.body.addEventListener('click', (evt) => {
  if (evt.target.className === 'btn-remove') {
    Book.removeBook(evt.target.id);
  }
}, false);