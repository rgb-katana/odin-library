let myLibrary = [];

function CreateBook(title, author, pages, isread = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isread = isread;
}

function addBookToLibrary() {}

const addBtn = document.querySelector('.add-book');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const allRadios = document.querySelectorAll('input[name="read-status"]');
const booksContainer = document.querySelector('.books-container');

addBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const curTitle = bookTitle.value;
  const curAuthor = bookAuthor.value;
  const curPages = bookPages.value;
  const radioRead =
    document.querySelector('input[name="read-status"]:checked').value === 'read'
      ? true
      : false;
  console.log(radioRead);

  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';
  Array.from(allRadios).map(radio => (radio.checked = false));

  myLibrary.push(new CreateBook(curTitle, curAuthor, curPages, radioRead));
  booksContainer.innerHTML = '';
  myLibrary.map(book => {
    booksContainer.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="book">
          <h2 class="book-title">
            <span class="cursive">Title: </span>${book.title}
          </h2>
          <h2 class="book-authour">
            <span class="cursive">Author: </span>${book.author}
          </h2>
          <h2 class="book-pages"><span class="cursive">Pages: </span>${
            book.pages
          }</h2>
          <h2 class="book-status">
            <span class="cursive">Read status: </span>${
              book.isread === true ? 'Read' : 'Not read yet'
            }
          </h2>
        </div>
    `
    );
  });
});
