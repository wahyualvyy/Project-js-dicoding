const STORAGE_KEY = "bookshelf_apps";
let books = [];

function refreshData() {
  const uncompletedList = document.getElementById("uncompleted-list");
  const completedList = document.getElementById("completed-list");
  const searchInput = document.getElementById("search").value.toLowerCase();

  uncompletedList.innerHTML = "";
  completedList.innerHTML = "";

  books.filter((book) => {
    const bookInfo = `${book.title} ${book.author} ${book.year}`.toLowerCase();
    if (bookInfo.includes(searchInput)) {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";

      const bookDetails = document.createElement("div");
      bookDetails.innerHTML = `<h4>Judul Buku: ${book.title}</h4>
                               <p>Penulis: ${book.author}</p>
                               <p>Tahun: ${book.year}</p>`;

      const buttonsDiv = document.createElement("div");
      buttonsDiv.className = "mt-2";

      const buttonMove = document.createElement("button");
      buttonMove.className = "btn btn-sm btn-success me-2 my-2";
      buttonMove.innerHTML = book.isComplete
        ? "Belum Selesai Dibaca"
        : "Selesai Dibaca";
      buttonMove.onclick = function () {
        const index = books.findIndex((item) => item.id === book.id);
        books[index].isComplete = !books[index].isComplete;
        refreshData();
        saveData();
      };
      buttonsDiv.appendChild(buttonMove);

      const buttonDelete = document.createElement("button");
      buttonDelete.className = "btn btn-sm btn-danger";
      buttonDelete.innerText = "Hapus";
      buttonDelete.onclick = function () {
        const index = books.findIndex((item) => item.id === book.id);
        books.splice(index, 1);
        refreshData();
        saveData();
      };
      buttonsDiv.appendChild(buttonDelete);

      listItem.appendChild(bookDetails);
      listItem.appendChild(buttonsDiv);

      if (book.isComplete) {
        completedList.appendChild(listItem);
      } else {
        uncompletedList.appendChild(listItem);
      }
    }
  });
}

function addBook() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const yearInput = document.getElementById("year");
  const isCompleteInput = document.getElementById("isComplete");

  const newBook = {
    id: +new Date(),
    title: titleInput.value,
    author: authorInput.value,
    year: parseInt(yearInput.value),
    isComplete: isCompleteInput.checked,
  };

  books.push(newBook);
  refreshData();
  saveData();

  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompleteInput.checked = false;
}

function searchBooks() {
  refreshData();
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    books = JSON.parse(data);
    refreshData();
  }
}

loadData();
