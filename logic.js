const myLibrary = [];

//make sure to run library on the first page load

function Book(title,author,read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.className = ''
};

const htmlBooks = document.querySelector('.main-column');
const inputElement = document.querySelectorAll('input');
const titleInput = document.querySelector("input[id='title']");
const authorInput = document.querySelector("input[id='author']");
const addBookButton = document.querySelector('.add-new-book');
const readBookInput = document.querySelector('select');
const editButton = document.querySelector('.edit-book');

inputElement.forEach(element => {
    element.addEventListener('input', (e) => {
        if (e.target.value.length == 0) {
            e.target.setAttribute('style','border: 2px solid red;');
        } else {
            e.target.setAttribute('style','border: 2px solid green;');
        }
    })
});

function titleToElementClass (title) {
    let newTitle = title.toLowerCase();
    newTitle = newTitle.replace(/\s/g,'-');
    console.log(newTitle);
    return newTitle;
}

function createInputDiv(book) {
    const content = document.createElement('div');
    content.classList.add(book.className);
    content.textContent = book.title;
    htmlBooks.appendChild(content);
}

function createAuthorDiv(book) {
    const content = document.createElement('div');
    content.classList.add(book.className);
    content.textContent = book.author;
    htmlBooks.appendChild(content);
}

function createStatusDiv(book) {
    const content = document.createElement('div');
    const contentImage = document.createElement('img');
    content.classList.add(book.className);
    content.appendChild(contentImage);
    htmlBooks.appendChild(content);
    if(book.read === 'read') {
        contentImage.setAttribute('src', "images/checkmark.png");
        contentImage.setAttribute('alt', "checkmark icon");
    } else {
        contentImage.setAttribute('src', "images/x-mark.png"); 
        contentImage.setAttribute('alt', "marked x icon");
    }
}

function createButtonDiv(book) {
    const content = document.createElement('div');
    const editBook = document.createElement('button');
    const deleteBook = document.createElement('button');

    content.classList.add(book.className);
    content.classList.add('edit');
    editBook.classList.add('edit-book');
    editBook.textContent = 'Edit';

    deleteBook.classList.add('delete-book');
    deleteBook.textContent = 'Remove';
    content.appendChild(editBook);
    content.appendChild(deleteBook);
    htmlBooks.appendChild(content);
}

addBookButton.addEventListener('click', () => {
    if (addBookButton.textContent === 'Add book') {
        if (titleInput.value.length !== 0 && authorInput.value.length !==0) {
            let newBook = new Book(titleInput.value,authorInput.value,readBookInput.value);
            newBook.className = titleToElementClass(titleInput.value);
            myLibrary.push(newBook);
            createInputDiv(newBook);
            createAuthorDiv(newBook);
            createStatusDiv(newBook);
            createButtonDiv(newBook);
        } else if(titleInput.value.length == 0 && authorInput.value.length == 0) {
            titleInput.setAttribute('style', 'border: 2px solid red;');
            authorInput.setAttribute('style', 'border: 2px solid red;');    
        } else if(authorInput.value.length == 0) {
            authorInput.setAttribute('style', 'border: 2px solid red;');    
        } else if(titleInput.value.length == 0) {
            titleInput.setAttribute('style', 'border: 2px solid red;');
        }
    } else {
        //update book
    }
})

editButton.addEventListener('click', () => {
    addBookButton.setAttribute('style','background-color: rgb(12, 33, 61);');
    addBookButton.textContent = 'Save';
    titleInput.setAttribute('style', 'background-color: yellow;');
    authorInput.setAttribute('style', 'background-color: yellow;');
})

const bookTest = document.querySelectorAll('.the-planet-book');
function test() {
    bookTest.forEach(() => {
        console.log(12);
        htmlBooks.removeChild(bookTest);
})};

