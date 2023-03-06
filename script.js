let myLibrary = [];

class CreateBook {
    constructor(title, author, pages, isread = false, booknum) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isread = isread;
        this.booknum = booknum;
    }
}

// function CreateBook(title, author, pages, isread = false, booknum) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.isread = isread;
//   this.booknum = booknum;
// }

function addBookToLibrary() {}

const addBtn = document.querySelector(".add-book");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const allRadios = document.querySelectorAll('input[name="read-status"]');
const booksContainer = document.querySelector(".books-container");

bookcounter = 0;

function renderBooks() {
    myLibrary.map((book) => {
        if (!book.deleted) {
            booksContainer.insertAdjacentHTML(
                "afterbegin",
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
            <span class="cursive">Read status: </span><span class='current-status-${
                book.booknum
            }'>${book.isread === true ? "Read" : "Not read yet"}</span>
          </h2>

          <div class="book__controls">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="finish__book"
              data-finish='${book.booknum}'
          >
              <title>book-open-variant</title>
              <path
                  d="M17.5 14.33C18.29 14.33 19.13 14.41 20 14.57V16.07C19.38 15.91 18.54 15.83 17.5 15.83C15.6 15.83 14.11 16.16 13 16.82V15.13C14.17 14.6 15.67 14.33 17.5 14.33M13 12.46C14.29 11.93 15.79 11.67 17.5 11.67C18.29 11.67 19.13 11.74 20 11.9V13.4C19.38 13.24 18.54 13.16 17.5 13.16C15.6 13.16 14.11 13.5 13 14.15M17.5 10.5C15.6 10.5 14.11 10.82 13 11.5V9.84C14.23 9.28 15.73 9 17.5 9C18.29 9 19.13 9.08 20 9.23V10.78C19.26 10.59 18.41 10.5 17.5 10.5M21 18.5V7C19.96 6.67 18.79 6.5 17.5 6.5C15.45 6.5 13.62 7 12 8V19.5C13.62 18.5 15.45 18 17.5 18C18.69 18 19.86 18.16 21 18.5M17.5 4.5C19.85 4.5 21.69 5 23 6V20.56C23 20.68 22.95 20.8 22.84 20.91C22.73 21 22.61 21.08 22.5 21.08C22.39 21.08 22.31 21.06 22.25 21.03C20.97 20.34 19.38 20 17.5 20C15.45 20 13.62 20.5 12 21.5C10.66 20.5 8.83 20 6.5 20C4.84 20 3.25 20.36 1.75 21.07C1.72 21.08 1.68 21.08 1.63 21.1C1.59 21.11 1.55 21.12 1.5 21.12C1.39 21.12 1.27 21.08 1.16 21C1.05 20.89 1 20.78 1 20.65V6C2.34 5 4.18 4.5 6.5 4.5C8.83 4.5 10.66 5 12 6C13.34 5 15.17 4.5 17.5 4.5Z"
              />
          </svg>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="delete__book"
              data-deleter='${book.booknum}'
          >
              <title>trash-can-outline</title>
              <path
                  d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
              />
          </svg>
      </div>
        </div>
    `
            );
        }
    });
}

function checkForEmpty(array) {
    flag = false;
    array.map((item) => {
        if (item === null || item === undefined || item === "") flag = true;
    });
    console.log(flag);
    return flag;
}

booksContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "svg" || e.target.tagName === "path") {
        if (e.target.closest("svg").dataset.deleter) {
            const id = e.target.closest("svg").dataset.deleter;
            myLibrary[id].deleted = true;
            booksContainer.innerHTML = "";
            renderBooks();
        }

        if (e.target.closest("svg").dataset.finish) {
            const id = e.target.closest("svg").dataset.finish;
            if (myLibrary[id].isread === true) {
                myLibrary[
                    e.target.closest("svg").dataset.finish
                ].isread = false;
                document.querySelector(`.current-status-${id}`).innerText =
                    "Not read yet";
            } else if (myLibrary[id].isread === false) {
                myLibrary[id].isread = true;
                document.querySelector(`.current-status-${id}`).innerText =
                    "Read";
            }
        }
    }
});

addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const curTitle = bookTitle.value;
    const curAuthor = bookAuthor.value;
    const curPages = bookPages.value;
    const radioRead =
        document.querySelector('input[name="read-status"]:checked')?.value ===
        "read"
            ? true
            : false;

    if (checkForEmpty([curTitle, curAuthor, curPages, radioRead])) return;

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    Array.from(allRadios).map((radio) => (radio.checked = false));

    console.log(bookcounter);
    myLibrary.push(
        new CreateBook(curTitle, curAuthor, curPages, radioRead, bookcounter)
    );
    booksContainer.innerHTML = "";
    renderBooks();
    bookcounter++;
});
