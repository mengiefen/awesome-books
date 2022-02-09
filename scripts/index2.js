const bookShelf = document.getElementById("book-shelf");
const addButton = document.getElementById("btn-add");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");

class Book {
  constructor(title, author, id) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  Books = [];

  // Adds a single book and store in Book
  addBook() {
    this.Books.push({
      id: this.id,
      title: this.title,
      author: this.author,
    });
    return this.Books;
  }

  // Reads books from local storage
  readBooks() {
    const bookSaved = JSON.parse(localStorage.getItem("books"));
    if (bookSaved) {
      this.Books = bookSaved;
    }
    return this.Books;
  }

  // Removes a single move from local storage
  removeBook(id) {
    let Books = this.readBooks();
    Books = Books.filter((book) => book.id !== Number(id));
    this.Books = Books;
    this.writeBooks();
    return Books;
  }

  // Writes the books list into the localStorage
  writeBooks() {
    localStorage.setItem("books", JSON.stringify(this.Books));
  }
}

const Buk = new Book();

// Renders each book with single row
const displayBook = (book) => {
  const bookHolderHTML = `  
    <h4 class="book-title"><em>"${book.title}" by <span>${book.author}</span></em> </h4>  
    <button class="btn-remove" id=${book.id}>Remove</button>`;
  const bookHolder = document.createElement("div");
  bookHolder.classList.add("book-holder");
  bookHolder.innerHTML = bookHolderHTML;
  bookShelf.appendChild(bookHolder);
};

// Reads all books from local storage and renders the result
const drawAllBooks = () => {
  bookShelf.innerHTML = "";
  const Books = Buk.readBooks();
  Books.forEach((element, index) => {
    if (index < 25) {
      displayBook(element);
    }
  });
};

drawAllBooks();

const addBook = () => {
  Buk.title = titleInput.value;
  Buk.author = titleInput.value;
  Buk.id = Date.now();
  if (titleInput.value !== "" && authorInput.value !== "") {
    Buk.addBook();
    Buk.writeBooks();
    displayBook({
      title: titleInput.value,
      author: authorInput.value,
    });
    titleInput.value = "";
    authorInput.value = "";
  }
};
// Event listener for 'Add new Button'
addButton.addEventListener("click", addBook);

// Event listener for 'Add new Button'
document.body.addEventListener(
  "click",
  (event) => {
    if (event.target.className === "btn-remove") {
      Buk.removeBook(event.target.id);
      drawAllBooks();
    }
  },
  true
);
