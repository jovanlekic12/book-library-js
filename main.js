"use strict";

import "./style.css";

const btnNewBook = document.querySelector(".button__new__book");
const formContainer = document.querySelector(".form__container");
const form = document.querySelector(".form");
const btnSubmit = document.querySelector(".submit");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#n-pages");
const checkBox = document.querySelector("#checkRead");
const closeIcon = document.querySelector(".x__icon");
const list = document.querySelector(".ul__list");
let title;
let author;
let number;
let check;
let editTitle;
let editAuthor;
class BookManager {
  books;
  constructor() {
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }

  deleteBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  renderBooks() {
    list.innerHTML = "";
    this.books.forEach(function (book) {
      if (book.isEditing) {
        const html = `<li class="list__item" id="${book.id}">
        <div class="editing_inputs">
        <input type="text" value="${
          book.title
        }" class="edit_input edit_title" />
        <input type="text" value="${
          book.author
        }" class="edit_input edit_author" />
        <input type="number" value="${
          book.pages
        }" class="edit_input edit_pages" />
        </div>
         <div class="buttons">
        <button class="btn__read li_btn">${
          book.read ? "Read ✔️" : "Unread ❌"
        }</button>
          <button class="btn__delete li_btn">Delete Book</button>
          <button type="submit" class="btn__edit li_btn burek">Edit</button>
          </div>
        </li>`;
        list.insertAdjacentHTML("afterbegin", html);
      } else {
        const html = `<li class="list__item" id="${book.id}">
        <h3 class="book__title">${book.title}</h3>
        <h3 class="book__author">${book.author}</h3>
        <h6 class="book__pages">${book.pages} pages</h3>
        <div class="buttons">
        <button class="btn__read li_btn">${
          book.read ? "Read ✔️" : "Unread ❌"
        }</button>
          <button class="btn__delete li_btn">Delete Book</button>
          <button class="btn__edit li_btn">Edit</button>
          </div>
          </li>`;
        list.insertAdjacentHTML("afterbegin", html);
      }
    });
  }
}

const bookManager = new BookManager();

class Book {
  title;
  author;
  pages;
  id;
  read;
  isEditing;
  constructor(title, author, pages, read) {
    this.id = self.crypto.randomUUID();
    this.isEditing = false;
    this.read = read;
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
  changeIsRead() {
    this.read = !this.read;
  }
  changeIsEdit() {
    this.isEditing = !this.isEditing;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  bookManager.addBook(new Book(title, author, number, check));
  bookManager.renderBooks();
  formContainer.style.display = "none";
  authorInput.value = "";
  titleInput.value = "";
  pagesInput.value = "";
});

btnNewBook.addEventListener("click", function () {
  formContainer.style.display = "block";
});

closeIcon.addEventListener("click", function () {
  formContainer.style.display = "none";
});

titleInput.addEventListener("input", function () {
  title = titleInput.value;
});

authorInput.addEventListener("input", function () {
  author = authorInput.value;
});

pagesInput.addEventListener("change", function () {
  number = pagesInput.value;
});

checkBox.addEventListener("change", function () {
  check = checkBox.checked;
});

list.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn__delete")) {
    const li = event.target.closest("li");
    const id = li.id;
    bookManager.deleteBook(id);
    li.remove();
  }
  if (event.target.classList.contains("btn__read")) {
    const li = event.target.closest("li");
    const id = li.id;
    const currentBook = bookManager.books.find((book) => id === book.id);
    currentBook.changeIsRead();
    currentBook.read
      ? (event.target.textContent = "Read ✔️")
      : (event.target.textContent = "Unread ❌");
  }
  if (event.target.classList.contains("btn__edit")) {
    const li = event.target.closest("li");
    const id = li.id;
    const currentBook = bookManager.books.find((book) => id === book.id);
    const restOfBooks = bookManager.books.filter((book) => book.id !== id);
    restOfBooks.forEach((book) => (book.isEditing = false));
    currentBook.changeIsEdit();
    bookManager.renderBooks();
    if (currentBook.isEditing) {
      const editTitleInput = document.querySelector(".edit_title");
      editTitleInput.addEventListener("input", function () {
        editTitle = editTitleInput.value;
        currentBook.title = editTitle;
      });
      const editAuthorInput = document.querySelector(".edit_author");
      editAuthorInput.addEventListener("input", function () {
        editAuthor = editAuthorInput.value;
        currentBook.author = editAuthor;
      });
      const editPagesInput = document.querySelector(".edit_pages");
      editPagesInput.addEventListener("input", function () {
        currentBook.pages = editPagesInput.value;
      });
    }
  }
});
