const bookshelf = document.querySelector(".bookshelf"); 
const submitForm = document.querySelector("button");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readPhrase = "";
        this.read ? readPhrase = "already read" : readPhrase = "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readPhrase}`;
    } 
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const addedBook = new Book(title, author, pages, read);
    myLibrary.push(addedBook);
}

addBookToLibrary("SPQR", "Mary Beard", 498, true);
addBookToLibrary("East of Eden", "John Steinbeck", 515, true);
addBookToLibrary("A Calamitous Mirror", "Barbara Tuchman", 603, false);
addBookToLibrary("Antifragile", "Nassim Taleb", 355, false);


render();

function render() {
    bookshelf.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++) {
        createCard(i);
    }
}

function createCard(index) {

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("data-cardNum", index);

    const title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = myLibrary[index].title;

    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = myLibrary[index].author;

    const pages = document.createElement("p");
    pages.classList.add("pages");
    pages.textContent = myLibrary[index].pages;

    const readState = document.createElement("p");
    readState.classList.add("readState");
    readState.textContent = myLibrary[index].read;
    readState.addEventListener("click", toggleRead);

    const trash = document.createElement("i");
    trash.classList.add("fas", "fa-trash");
    trash.style.float = "right";
    trash.addEventListener("click", removeBook);

    newCard.append(title, author, pages, readState, trash);
    bookshelf.appendChild(newCard);
}

submitForm.addEventListener("click", addBook);

function addBook() {
    if(!validateInput(document.forms["bookInput"]["title"].value, document.forms["bookInput"]["author"].value, document.forms["bookInput"]["pages"].value)) {
        return false;
    }
    addBookToLibrary(document.forms["bookInput"]["title"].value, document.forms["bookInput"]["author"].value, document.forms["bookInput"]["pages"].value, document.forms["bookInput"]["readState"].value);  
    render();
    clearForm();
}

// remove book from array based on book that was clicked and re-render cards
function removeBook(event) {
    myLibrary.splice(event.path[1].getAttribute("data-cardNum"), 1);
    render();
}

function toggleRead(event) {
    myLibrary[event.path[1].getAttribute("data-cardNum")].toggleRead();
    render();
}

function validateInput(...args) {
    for(let i = 0; i < args.length; i++) {
        if(!args[i]) return false
    }
    return true;
}

function clearForm() {
    document.forms["bookInput"]["title"].value = "";
    document.forms["bookInput"]["author"].value = "";
    document.forms["bookInput"]["pages"].value = null;
    document.forms["bookInput"]["readState"].checked = false;
}
