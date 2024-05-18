const book = document.getElementById('book');
const loader = document.getElementById('loader');
const chapter = document.getElementById('chapter');
const divChapters = document.getElementById("divChapters");
const divVerses = document.getElementById("divVerses");
var globalChapter = 0; // shows the current chapter
var globalBook = 0; // shows the current book
var darkModeBtn = document.getElementById('darkMode');
// var darkModeOn = (localStorage.getItem('darkMode')!=null)?localStorage.getItem('darkMode'):true; // switchs between the dark mode and light mode
var darkModeOn = false; // switchs between the dark mode and light mode
var r = document.querySelector(':root'); // select the root element to change the css variables.



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
    populateBookList(); // Chamada da função para preencher o cabeçalho com os nomes dos livros da Bíblia
    disableContextMenu(); // Desabilita o menu de contexto
    console.log("🚀 ~ saveDarkMode ~ darkModeOn Antes:", darkModeOn);
    console.log("🚀 ~ saveDarkMode ~ darkModeLoad:", localStorage.getItem('darkMode'));
    // darkMode();
    // loadDarkMode(); // carregar o estado atual do darkmode
    console.log("🚀 ~ saveDarkMode ~ darkModeOn Depois:", darkModeOn);
    loadData();
    renderBookAndChapter(globalBook,globalChapter);
    hideVerses();
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
        // link.classList.add('chapter');
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
    globalBook = livro;
    globalChapter = chap;
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
    saveData();
    undisplayLoader(); 
    populateVerses(livro,chap);
}

function renderBookChapterVerse(livro, chap, ver){
    let realIndexChapter = chap + 1;
    let realIndexVerse = ver + 1;
    let bookchapverse = document.createElement("p");
    bookchapverse.innerHTML = bible[livro].name + " - " + realIndexChapter + " : " + realIndexVerse;
    let para = document.createElement("p");
    para.innerHTML = realIndexVerse + ". " + bible[livro].chapters[chap][ver];
    chapter.appendChild(para);
    chapter.appendChild(bookchapverse); 
}


function HideOldTestament() {
    var old_testament_books = document.getElementById("old-testament");
    if (old_testament_books.style.display === "none") {
        old_testament_books.style.display = "inline-flex";
    } else {
        old_testament_books.style.display = "none";
    }
    var new_testament_books = document.getElementById("new-testament");
    new_testament_books.style.display = "none";
    hideChapters();
    hideVerses();
  }

  function HideNewTestament() {
    var new_testament_books = document.getElementById("new-testament");
    if (new_testament_books.style.display === "none") {
        new_testament_books.style.display = "inline-flex";
    } else {
        new_testament_books.style.display = "none";
    }
    var old_testament_books = document.getElementById("old-testament");
    old_testament_books.style.display = "none";
    hideChapters();
    hideVerses();
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

function NextChapter(){
    if (globalChapter < bible[globalBook].chapters.length-1) {
        globalChapter++;
        renderBookAndChapter(globalBook,globalChapter);
    } else if (globalBook < bible[globalBook].length-1) {
        globalBook++;
        globalChapter = 0;
        renderBookAndChapter(globalBook,globalChapter);
    }else{
        globalBook = 0;
        globalChapter = 0;
        renderBookAndChapter(globalBook,globalChapter);
    }
}

function PreviousChapter(){
    if (globalChapter > 0) {
        globalChapter--;
        renderBookAndChapter(globalBook,globalChapter);
    } else if (globalBook > 0) {
        globalBook--;
        globalChapter = bible[globalBook].chapters.length-1;
        renderBookAndChapter(globalBook,globalChapter);
    }else{
        globalBook = bible.length-1;
        globalChapter = bible[globalBook].chapters.length-1;
        renderBookAndChapter(globalBook,globalChapter);
    }
}

function undisplayLoader(){
    loader.style.display = "none";
}

function search(){
    let search = document.getElementById("busca").value;
    if (search == ""){
        alert("Insira um texto no campo Procurar...");
    }else {
    removeChildrenNodes(chapter);
    book.innerHTML = "Resultados";
    chapter.innerHTML = "Procurar por - " + search;
    let encontrado = false;
    let i = 0;
    let j = 0;
    for (let i = 0; i < bible.length; i++) {
        for (let j = 0; j < bible[i].chapters.length; j++) {
            for (let k = 0; k < bible[i].chapters[j].length; k++) {
                if (bible[i].chapters[j][k].toLowerCase().includes(search.toLowerCase())) {
                    encontrado = true;
                    console.log("🚀 ~ search ~ bible[i].chapters[j][k]:", bible[i].chapters[j][k].toLowerCase());
                    console.log("🚀 ~ search ~ search:", search)
                    renderBookChapterVerse(i,j,k);
                    // return;
                }
            }
                
                
        }
    }
    if (encontrado == false) {
        alert("Nenhum resultado encontrado");
        renderBook(globalBook,globalChapter);
    }
}
}

function saveData(){
    localStorage.setItem("book", globalBook);
    localStorage.setItem("chapter", globalChapter);
}

function loadData(){
    if (localStorage.getItem("book") != null) {
    globalBook = parseInt(localStorage.getItem("book"));
    globalChapter = parseInt(localStorage.getItem("chapter"));
    }
}

function darkMode() {
    console.log("🚀 ~ darkMode ~ dentro do dark mode Antes Antes:", darkModeOn)
    darkModeOn = !darkModeOn;
    console.log("🚀 ~ darkMode ~ dentro do dark mode Antes:", darkModeOn)
    if (darkModeOn == true) {
        darkModeBtn.classList.remove('fa-toggle-on');
        darkModeBtn.classList.add('fa-toggle-off');
        lightMode();
    }else{
        darkModeBtn.classList.remove('fa-toggle-off');
        darkModeBtn.classList.add('fa-toggle-on');
        shadowMode();
    }
    saveDarkMode(darkModeOn);
    console.log("🚀 ~ darkMode ~ dentro do dark mode Depois:", darkModeOn)
}

function lightMode(){
    r.style.setProperty('--font-family', "Poetsen One");
    r.style.setProperty('--backgorund-color', "#ffffff");
    r.style.setProperty('--font-color', '#333333');
    r.style.setProperty('--footer-color', '#f8f4e6');
    r.style.setProperty('--footer-border', '#c0c0c0');
    r.style.setProperty('--contraster-color', 'teal');
    r.style.setProperty('--contraster-color2', 'aqua');
}

function shadowMode(){
    // linkhref.href = "modernStyle.css";
    
    r.style.setProperty('--font-family', 'Courgette, cursive');
    r.style.setProperty('--backgorund-color', '#1f1f1f');
    r.style.setProperty('--font-color', '#ffffff');
    r.style.setProperty('--footer-color', '#2c2c2c');
    r.style.setProperty('--footer-border', '#4a4a4a');
    r.style.setProperty('--contraster-color', 'aqua');
    r.style.setProperty('--contraster-color2', 'teal');

    // --background-color: #ffffff; /* Cor de fundo */
    // --font-color: #333333; /* Cor do texto */
    // --footer-color: #f8f4e6; /* Cor do rodapé */
    // --footer-border: #c0c0c0; /* Cor da borda do rodapé */
    // --contraster-color: #008080; /* Cor de destaque */
    // --contraster-color2: #008000; /* Segunda cor de destaque */
}

function saveDarkMode(d) {
    localStorage.setItem('darkMode', d);
    
}

function loadDarkMode() {
    if (localStorage.getItem("darkMode") != null) {
        darkModeOn = localStorage.getItem('darkMode');
        console.log("🚀 ~ loadDarkMode ~ dentro do load:", darkModeOn)
        
    }else {
        darkModeOn = false;
    }
    if (darkModeOn == true) {
        console.log("🚀 ~ Entrou1 ~ darkModeOn:", darkModeOn)
        darkModeBtn.classList.remove('fa-toggle-on');
        darkModeBtn.classList.add('fa-toggle-off');
        lightMode();
    }else if(darkModeOn == false){
        console.log("🚀 ~ Entrou2 ~ darkModeOn:", darkModeOn)
        darkModeBtn.classList.remove('fa-toggle-off');
        darkModeBtn.classList.add('fa-toggle-on');
        shadowMode();
    }
}