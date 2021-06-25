function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
};

function UI(){
};

UI.prototype.addBookToList = function(book){
    let list = document.getElementById('book-list');
    // tr
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td>
                     <td>${book.isbn}</td>
                     <td><a href="#" class="delete">X</a></td> `;
    list.appendChild(row);
};
UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div,form);

    // timeout
    setTimeout(function(){
        document.querySelector('.alert').remove()
    },3000);
}
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};



//event listener
document.getElementById('book-form').addEventListener('submit',function(e){
    // form value
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;


    const book = new Book(title,author,isbn);
    const ui = new UI();

    if(title === '' || author ==='' || isbn ===''){
        ui.showAlert('please fill in all fiels' , 'error');
       
    }else{
        // add book to list
        ui.addBookToList(book);
        ui.showAlert('book added','success')
        ui.clearFields();
    }
    e.preventDefault();
});

// delete item

document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteBook(e.target);

    e.preventDefault();
});