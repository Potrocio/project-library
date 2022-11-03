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

titleToElementClass('the Planet Book')
function createInputDiv(book) {
    const content = document.createElement('div');
    content.classList.add(book.className);
    content.textContent = book.title;
    htmlBooks.appendChild(content);
}

function createAuthorDiv(book){
    const content = document.createElement('div');
    content.classList.add(book.className);
    content.textContent = book.author;
    htmlBooks.appendChild(content);
}

// function createStatusDiv()
// function createButtonDiv()

addBookButton.addEventListener('click', () => {
    if (titleInput.value.length !== 0 && authorInput.value.length !==0) {
        let newBook = new Book(titleInput.value,authorInput.value,readBookInput.value);
        newBook.className = titleToElementClass(titleInput.value);
        myLibrary.push(newBook);
        createInputDiv(newBook);
        createAuthorDiv(newBook);
    };
})

