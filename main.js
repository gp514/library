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

function addBookToLibrary(title, author, pages, read) {
    const addedBook = new Book(title, author, pages, read);
    myLibrary.push(addedBook);
}

addBookToLibrary("SPQR", "Mary Beard", 498, true);
addBookToLibrary("East of Eden", "John Steinbeck", 515, true);
addBookToLibrary("A Calamitous Mirror", "Barbara Tuchman", 603, false);
addBookToLibrary("Antifragile", "Nassim Taleb", 355, false);

const bookFrag = document.createDocumentFragment();

for(let i = 0; i < myLibrary.length; i++) {
    const bookElement = document.createElement("div");
    bookElement.classList.add(".card");
    bookElement.innerHTML = `<div class="content">
    <div class="image">
       <img id="test" class="ui image tiny right floated" src="media/book-illustration.png">
   </div> 
   <div class="header">${myLibrary.title}</div>          
   <div class="meta">
       <span class="pages">515</span> pages
   </div>
   <div class="author">
     John Steinbeck
   </div>
   <div class="read-status">
     <em>Not Read</em>
   </div>
 </div>
 <div class="extra content">
       <div class="ui two buttons">
           <div class="ui basic green button">
               <i class="check icon"></i>
               Mark Read
           </div>
           <div class="ui basic red button">
                   <i class="trash icon"></i>
                   Delete
           </div>
       </div>
 </div>`
}
