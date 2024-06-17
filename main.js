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
      const html = `<li class="list__item" id="${book.id}">
    <h3 class="book__title">${book.title}</h3>
    <h3 class="book__author">${book.author}</h3>
    <h6 class="book__pages">${book.pages}</h3>
    <div class="buttons">
    <button class="btn__read li_btn">${
      book.read ? "Read ✔️" : "Unread ❌"
    }</button>
    <button class="btn__delete li_btn">Delete Book</button>
    </div>
      </li>`;
      list.insertAdjacentHTML("afterbegin", html);
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
  constructor(title, author, pages, read) {
    this.read = read;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = self.crypto.randomUUID();
  }
  changeIsRead() {
    this.read = !this.read;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
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
    if (currentBook.read === true) {
      event.target.textContent = "Unread ❌";
    } else {
      event.target.textContent = "Read ✔️";
    }
  }
});

btnSubmit.addEventListener("click", function () {
  bookManager.addBook(new Book(title, author, number, check));
  bookManager.renderBooks();
  formContainer.style.display = "none";
});
