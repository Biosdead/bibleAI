// import * as fs from 'node:fs';
// var fs = require("fs");
const book = document.getElementById('book');
const chapter = document.getElementById('chapter');
const linkhref = document.getElementById('link');
const divChapters = document.getElementById("divChapters");
const divVerses = document.getElementById("divVerses");

    

// Array contendo os nomes dos livros da Bíblia
const booksOfBible = [
    "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
    "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
    "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras",
    "Neemias", "Ester", "Jó", "Salmos", "Provérbios",
    "Eclesiastes", "Cânticos", "Isaías", "Jeremias                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ", "Lamentações",
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

window.onload = function(){
    // Chamada da função para preencher o cabeçalho com os nomes dos livros da Bíblia
    populateBookList();
    // Desabilita o menu de contexto
    disableContextMenu();

    book.innerHTML = bible[0].name;
    chapter.innerHTML = bible[0].name + " 1";
    renderBookAndChapter(0,0);
    hideVerses();
    // for (let i = 0; i < bible[0].chapters[0].length; i++) {
    //     let verse = i + 1;
    //     let para = document.createElement("p");
    //     para.innerHTML = verse + ". " + bible[0].chapters[0][i];
    //     book.appendChild(para);
    //     if (verse == 2){
    //         let realIndexBook = 1;
    //         let realIndexChapter = 1;
    //         let realIndexVerse = verse;
    //         let image = "./imgs/"+realIndexBook+"_"+realIndexChapter+"_"+realIndexVerse+".jpg";
    //         para.classList.add("ilustrated");
    //         let img = document.createElement("img");
    //         img.setAttribute("src", image);
    //         img.setAttribute("id", "img"+i);
    //         img.setAttribute("onclick", "zoom(img"+i+")");
    //         book.appendChild(img);
    //     }
    //     if (verse == 3){
    //         let realIndexBook = 1;
    //         let realIndexChapter = 1;
    //         let realIndexVerse = verse;
    //         let image = "./imgs/"+realIndexBook+"_"+realIndexChapter+"_"+realIndexVerse+".jpg";
    //         para.classList.add("ilustrated");
    //         let img = document.createElement("img");
    //         img.setAttribute("src", image);
    //         img.setAttribute("id", "img"+i);
    //         img.setAttribute("onclick", "zoom(img"+i+")");
    //         book.appendChild(img);
    //     }
    // }
    
}


function OldMode(){
    linkhref.href = "index.css";
}

function FutureMode(){
    linkhref.href = "modernStyle.css";
}

function zoom(id){
    console.log("img" + id);
    // document.getElementById(""+id).style.transform = "scale(2,2)";

}




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
        link.setAttribute('onclick','populateChapters('+i+')');
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

function renderBook(livro){ // Posso apagar
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
    populateChapters(livro);
}

function renderBookAndChapter(livro, chap){
    removeChildrenNodes(chapter);
    let realIndexBook = livro + 1;
    let realIndexChapter = chap + 1;
    // const divChapters = document.getElementById("divChapters");
    hideDiv(divChapters);
    let cap = chap;
    book.innerHTML = bible[livro].name;
    chapter.innerHTML = " Capítulo " + realIndexChapter;
    for (let i = 0; i < bible[livro].chapters[cap].length; i++) {
        let verse = i + 1;
        let image = "./imgs/"+realIndexBook+"_"+realIndexChapter+"_"+verse+".jpg";
        let para = document.createElement("p");
        para.innerHTML = verse + ". " + bible[livro].chapters[cap][i];
        para.setAttribute("id","v"+i);
        chapter.appendChild(para);
        let img = document.createElement("object");
        img.setAttribute("data", image);
        chapter.appendChild(img);
        // para.classList.add("ilustrated");
        // img.setAttribute("src", image);
        // img.setAttribute("id", "img"+i);
        // img.setAttribute("onclick", "zoom(img"+i+")");
        // img.setAttribute("onload", "load()");
            
        
        // if (img.onload) {    
            // img.setAttribute("src", image);
            // img.setAttribute("id", "img"+i);
            // img.setAttribute("onclick", "zoom(img"+i+")");
            // img.setAttribute("onload", "load()");
            
           
    }
    populateVerses(livro,chap);
}

function HideOldTestament() {
    var old_testament_books = document.getElementById("old-testament");
    if (old_testament_books.style.display === "none") {
        old_testament_books.style.display = "inline-flex";
    } else {
        old_testament_books.style.display = "none";
    }
  }

  function HideNewTestament() {
    var new_testament_books = document.getElementById("new-testament");
    if (new_testament_books.style.display === "none") {
        new_testament_books.style.display = "inline-flex";
    } else {
        new_testament_books.style.display = "none";
    }
  }

  function populateChapters(livro) {
    showDiv(divChapters);
    HideOldandNewTestament();
    const capitulos = document.getElementById("chapters");
    const bookName = document.getElementById("bookName");
    removeChildrenNodes(capitulos);
    bookName.innerHTML = bible[livro].name;
    let book = bible[livro].chapters; 
    let i = 0;
    book.forEach(chapter => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = '#';
        link.textContent = i+1;
        link.setAttribute('onclick','renderBookAndChapter('+livro+','+i+')');
        listItem.appendChild(link);
        capitulos.appendChild(listItem);
       i++;
    });
  }

  function populateVerses(livro,capitulo) {
    showDiv(divVerses);
    HideOldandNewTestament();
    const bookName = document.getElementById("bookNameChapter");
    const versesUl = document.getElementById("verses");
    removeChildrenNodes(versesUl);
    let TrueChapter = capitulo + 1;
    bookName.innerHTML = bible[livro].name+" - " + TrueChapter;
    let verses = bible[livro].chapters[capitulo]; 
    let i = 0;
    verses.forEach(verse => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = i+1;
        link.href = '#v'+i;
        link.setAttribute('onclick','hideVerses()');
        listItem.appendChild(link);
        versesUl.appendChild(listItem);
       i++;
    });
  }

//   function zoom() {
//     var img = document.getElementById("img");
//     if (img.style.display === "none") {
//         img.style.display = "block";
//     } else {
//         img.style.display = "none";
//     }
//   }

function HideOldandNewTestament(){
    var old_testament_books = document.getElementById("old-testament");
    old_testament_books.style.display = "none";
    var new_testament_books = document.getElementById("new-testament");
    new_testament_books.style.display = "none";
}

function removeChildrenNodes(node){
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
      }
}

function disableContextMenu(){ // desabilita o segundo Clique do btn esquerdo.
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault(); 
    });
}

function showDiv(div){
    div.style.display = "flex";
}

function hideDiv(div){
    div.style.display = "none";
}

function hideChapters(){
    divChapters.style.display = "none";
}

function hideVerses(){
    divVerses.style.display = "none";
}