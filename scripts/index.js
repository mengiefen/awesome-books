let Books = [];
// Book-object
const Book = {
  id: Books.length,
  addOne() {
    Books.push({
      id: Books.length,
      title: this.title,
      author: this.author,
    });
  },
};
// Read the books list from the localStorage
const readBooks = () => {
  const bookSaved = JSON.parse(localStorage.getItem('books'));
  if (!bookSaved) {
    Books = [];
  } else Books = bookSaved;
  return Books;
};

const bookShelf = document.getElementById('book-shelf');
const addButton = document.getElementById('btn-add');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

const displayBook = (book) => {
  const bookHolderHTML = `  
    <h4 class="book-title"><span>Title:</span> ${book.title}</h4>
    <h4 class="book-author"><span>Author:</span> ${book.author}</h4>
    <button class="btn-remove" id=${book.id}>Remove</button>`;
  const bookHolder = document.createElement('div');
  bookHolder.classList.add('book-holder');
  bookHolder.innerHTML = bookHolderHTML;
  bookShelf.appendChild(bookHolder);
};

// Displays all books in the shelf
const drawAllBooks = () => {
  bookShelf.innerHTML = '';
  Books = readBooks();
  Books.forEach((element, index) => {
    if (index < 3) {
      displayBook(element);
    }
  });
};
Books = readBooks();

// Write the books list into the localStorage
const writeBooks = (Books) => {
  localStorage.setItem('books', JSON.stringify(Books));
};

drawAllBooks();

const removeOne = (index) => {
  Books = Books.filter((book) => book.id !== Number(index));
  writeBooks(Books);
  drawAllBooks();
};

const addBook = () => {
  const bTitle = titleInput.value;
  const bAuthor = authorInput.value;
  if (bTitle !== '' && bAuthor !== '') {
    const Buk = Object.create(Book);
    Buk.title = bTitle;
    Buk.author = bAuthor;
    Buk.addOne();
    writeBooks(Books);
    displayBook({
      title: bTitle,
      author: bAuthor,
    });
    titleInput.value = '';
    authorInput.value = '';
  }
};

document.body.addEventListener('click', (evt) => {
  if (evt.target.className === 'btn-remove') {
    removeOne(evt.target.id);
  }
}, false);

addButton.addEventListener('click', addBook);