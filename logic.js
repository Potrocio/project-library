let myLibrary = [];
let bookToBeEdited = '';
let currentBookObject = '';

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
const deleteButton = document.querySelector('.delete-book');

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

function deleteBooks(book) {
    for (let i = 0; i<4;i++) {
        const bookTest = document.querySelector('.'+ book);
        htmlBooks.removeChild(bookTest)
    };
};

function createButtonDiv(book) {
    const content = document.createElement('div');
    const editBook = document.createElement('button');
    let deleteBook = document.createElement('button');

    content.classList.add(book.className);
    content.classList.add('edit');
    editBook.classList.add('edit-book');
    editBook.textContent = 'Edit';
    editBook.addEventListener('click', () => {
        bookToBeEdited = editBook;
        addBookButton.setAttribute('style','background-color: rgb(12, 33, 61);');
        addBookButton.textContent = 'Save';
        titleInput.setAttribute('style', 'background-color: yellow;');
        authorInput.setAttribute('style', 'background-color: yellow;');
        titleInput.value = editBook.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        authorInput.value = editBook.parentElement.previousElementSibling.previousElementSibling.innerHTML;
    });

    deleteBook.classList.add('delete-book');
    deleteBook.textContent = 'Remove';
    deleteBook.addEventListener('click', () => {
        currentBookObject = myLibrary.find((book)=> book.className === deleteBook.parentElement.previousElementSibling.className);
        myLibrary = myLibrary.filter((book) => {
            if (book !== currentBookObject) {
                return true;
            }});

        if (addBookButton.textContent === 'Save') {
            addBookButton.setAttribute('style','background-color: rgb(63, 83, 37);');
            addBookButton.textContent = 'Add book';
            titleInput.setAttribute('style', 'background-color: white;');
            authorInput.setAttribute('style', 'background-color: white;');
            titleInput.value = '';
            authorInput.value = '';
            let bookClassName = deleteBook.parentElement.previousElementSibling.className;
            deleteBooks(bookClassName);
        } else {
            let bookClassName = deleteBook.parentElement.previousElementSibling.className;
            deleteBooks(bookClassName);
        }
    });

    content.appendChild(editBook);
    content.appendChild(deleteBook);
    htmlBooks.appendChild(content);
}

function updateStatusDiv(statusDiv, statusDivContent) {
    statusDiv.removeChild(statusDivContent)
    const contentImage = document.createElement('img');
    statusDiv.appendChild(contentImage);
    if(currentBookObject.read === 'read') {  
        contentImage.setAttribute('src', "images/checkmark.png");
        contentImage.setAttribute('alt', "checkmark icon");
    } else {
        contentImage.setAttribute('src', "images/x-mark.png"); 
        contentImage.setAttribute('alt', "marked x icon");
    }

}

addBookButton.addEventListener('click', (e) => {
    // add book
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
        // edit book
        let titleDivContent = bookToBeEdited.parentElement.previousElementSibling.previousElementSibling.previousElementSibling;
        let authorDivContent = bookToBeEdited.parentElement.previousElementSibling.previousElementSibling;
        let statusDiv = bookToBeEdited.parentElement.previousElementSibling;
        let statusDivContent = bookToBeEdited.parentElement.previousElementSibling.firstElementChild;
        currentBookObject = myLibrary.find((book)=> book.className === bookToBeEdited.parentElement.previousElementSibling.className);

        currentBookObject.read = readBookInput.value;
        currentBookObject.title = titleInput.value;
        currentBookObject.author = authorInput.value;
        currentBookObject.className = titleToElementClass(currentBookObject.title);

        bookToBeEdited.parentElement.className = currentBookObject.className+ ' edit';
        bookToBeEdited.parentElement.previousElementSibling.className = currentBookObject.className;
        bookToBeEdited.parentElement.previousElementSibling.previousElementSibling.className = currentBookObject.className;
        bookToBeEdited.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.className = currentBookObject.className;

        updateStatusDiv(statusDiv,statusDivContent);
        titleDivContent.textContent = titleInput.value;
        authorDivContent.textContent = authorInput.value;
        
        addBookButton.setAttribute('style','background-color: rgb(63, 83, 37);');
        addBookButton.textContent = 'Add book';
        titleInput.setAttribute('style', 'background-color: white;');
        authorInput.setAttribute('style', 'background-color: white;');
        titleInput.value = '';
        authorInput.value = '';
    }
})

let bookTest = new Book('Title example', 'Author example', 'read');
bookTest.className = 'title-example';
myLibrary.push(bookTest);

myLibrary.forEach((myLibrary) => {
    currentBookObject = bookTest;
    createInputDiv(myLibrary);
    createAuthorDiv(myLibrary);
    createStatusDiv(myLibrary);
    createButtonDiv(myLibrary);
});