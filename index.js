const book = document.getElementById('book');
const chapter = document.getElementById('chapter');
const linkhref = document.getElementById('link');

window.onload = function(){
    console.log(bible);
    book.innerHTML = bible[0].name;
    chapter.innerHTML = bible[0].chapters[0][0];
    for (let i = 0; i < bible[0].chapters[0].length; i++) {
        let verse = i + 1;
        let para = document.createElement("p");
        para.innerHTML = verse + ". " + bible[0].chapters[0][i];
        book.appendChild(para);
        if (verse == 2){
            let img = document.createElement("img");
            img.setAttribute("src", "./imgs/gen_1_2.jpg");
            img.setAttribute("width", "80%");
            book.appendChild(img);
        }
        if (verse == 3){
            let img = document.createElement("img");
            img.setAttribute("src", "./imgs/gen_1_3.jpg");
            img.setAttribute("width", "80%");
            book.appendChild(img);
        }
    }
    
// Chamada da função para preencher o cabeçalho com os nomes dos livros da Bíblia
populateBookList();
}


function OldMode(){
    linkhref.href = "index.css";
}

function FutureMode(){
    linkhref.href = "modernStyle.css";
}


// Array contendo os nomes dos livros da Bíblia
const booksOfBible = [
    "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
    "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
    "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras",
    "Neemias", "Ester", "Jó", "Salmos", "Provérbios",
    "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações",
    "Ezequiel", "Daniel", "Oseias", "Joel", "Amós",
    "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque",
    "Sofonias", "Ageu", "Zacarias", "Malaquias",
    "Mateus", "Marcos", "Lucas", "João", "Atos",
    "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios",
    "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo",
    "2 Timóteo", "Tito", "Filemom", "Hebreus", "Tiago",
    "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João",
    "Judas", "Apocalipse"
];

// Função para preencher o cabeçalho com os nomes dos livros da Bíblia
function populateBookList() {
    let old_testament = true;
    const bookListOld = document.getElementById("old-testament");
    const bookListNew = document.getElementById("new-testament");
    let i = 0;
    booksOfBible.forEach(book => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = '#';
        // link.onclick = () => renderBook(i);
        link.textContent = book;
        link.setAttribute('onclick','renderBook('+i+')');
        listItem.appendChild(link);

        if(book == "Mateus"){
            old_testament = false;
        }

        if (old_testament) {
            bookListOld.appendChild(listItem);
        }else{
            bookListNew.appendChild(listItem);
        }
       i++;
    });
}

function renderBook(livro){
    let cap = 0;
    let TrueChapter = cap + 1;
    book.innerHTML = bible[livro].name;
    chapter.innerHTML = bible[livro].name + " " + TrueChapter;
    for (let i = 0; i < bible[livro].chapters[cap].length; i++) {
        let verse = i + 1;
        let para = document.createElement("p");
        para.innerHTML = verse + ". " + bible[livro].chapters[cap][i];
        chapter.appendChild(para);
    }
}