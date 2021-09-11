// Book class:represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class:For display books
class Ui {
    static displayBooks() {
        const storedBooks = Store.getBooks();
        storedBooks.forEach(book => Ui.addToBookList(book));
    };
    static addToBookList(book) {
        const bookList = document.getElementById('book-list');
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        bookList.appendChild(tr);
    };
    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentNode.parentNode.remove();
        }
    }
    // show error message
    static showError() {
        const container = document.querySelector('.container');
        const formContainer = document.getElementById('form-container');
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </symbol>
        </svg>
        <div class="alert alert-danger d-flex align-items-center" role="alert">
       <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
       <div>
        input filed cannot be empty
       </div>
       </div>`
            ;
        container.insertBefore(errorDiv, formContainer);
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000)

    }
    // show success message
    static showSuccess() {
        const container = document.querySelector('.container');
        const formContainer = document.getElementById('form-container');
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        </svg>
        <div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img"   aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
        Book added  to bookmark list
        </div>`
            ;
        container.insertBefore(successDiv, formContainer);
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000)
    }
    // show delete message
    static deleteMessage() {
        const container = document.querySelector('.container');
        const formContainer = document.getElementById('form-container');
        const deleteDiv = document.createElement('div');
        deleteDiv.innerHTML = `
        <div class="alert alert-info d-flex align-items-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <div>
         Book has been deleted successfully 
        </div>
        </div>
        `
            ;
        container.insertBefore(deleteDiv, formContainer);
        setTimeout(() => {
            deleteDiv.style.display = 'none';
        }, 3000)
    }
}
// Store class:Handle storage
class Store {
    // get books
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    };
    // add books
    static addBooksInLocal(book) {
        const books = Store.getBooks();
        books.push(book);
        const booksStringified = JSON.stringify(books);
        localStorage.setItem('books', booksStringified);
    };
    // remove books
    static removeBook(isbn) {
        const books = JSON.parse(localStorage.getItem('books'));
        const remainigBooks = books.filter((book) => book.isbn !== isbn);
        localStorage.setItem('books', JSON.stringify(remainigBooks));

    }
}
// Event:display books
document.addEventListener('DOMContentLoaded', Ui.displayBooks());
// Event:Add Book
document.getElementById('form-container').addEventListener('submit', (e) => {
    // prevent default reload
    e.preventDefault();
    // get form value
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    // validation
    if (title === '' || author === '' || isbn === '') {
        //  show alert for empty field
        Ui.showError();
    }
    else {
        // show success message
        Ui.showSuccess();
        //Create book obj
        const book = new Book(title, author, isbn);
        // Add book in booklist
        Ui.addToBookList(book);
        // add books in local storage
        Store.addBooksInLocal(book);
        // Clearing input fields
        Ui.clearFields();
    }

})
// Event: remove a book
document.getElementById('book-list').addEventListener('click', (e) => {
    // delete book using event delegate
    Ui.deleteBook(e.target);
    // remove from storage
    Store.removeBook(e.target.parentNode.previousElementSibling.innerText);
    // Ui.removeBook();
    // show delete message
    Ui.deleteMessage();
})