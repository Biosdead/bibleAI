const book = document.getElementById('book');
const loader = document.getElementById('loader');
const chapter = document.getElementById('chapter');
const divChapters = document.getElementById("divChapters");
const divVerses = document.getElementById("divVerses");
var globalChapter = 0; // shows the current chapter
var globalBook = 0; // shows the current book
var globalFontSize = 0;
var darkModeBtn = document.getElementById('darkMode');
var darkModeOn = 1; // switchs between the dark mode and light mode
var r = document.querySelector(':root'); // select the root element to change the css variables.
// var lblDM = document.getElementById('lblDarkMode'); // change lable to dark and light mode
var searchBar = document.getElementById("busca");
const dialogo = document.querySelector("dialog");
var imgSelected = document.getElementById("imgSelected");
var DialogSrc = "";
var bible = bibleAA;
var globalSelectorIndex = 0;
var selectVersionBtn = document.getElementById("version").selectedIndex;
// document.getElementById("version").selectedIndex = 3;
var shareData;
var imgSouce;
var imgVerse;
var imageVerseNumber;
// var scrollHideDisabled = false;

// function setScrollVisibility(show) {
//     const navbar = document.getElementById("buttonBar");
//     const mainHeader = document.getElementById("mainHeader");
//     if (navbar) {
//         navbar.classList.toggle("hidden", !show);
//     }
//     if (mainHeader) {
//         mainHeader.classList.toggle("hidden", !show);
//     }
// }

// function isVisible(element) {
//     return element && window.getComputedStyle(element).display !== "none";
// }

// function updateScrollHideState() {
//     const oldTestament = document.getElementById("old-testament");
//     const newTestament = document.getElementById("new-testament");
//     const shouldDisable = isVisible(oldTestament) || isVisible(newTestament) || isVisible(divChapters) || isVisible(divVerses);
//     scrollHideDisabled = shouldDisable;
//     if (shouldDisable) {
//         setScrollVisibility(true);
//     }
// }

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
    // disableContextMenu(); // Desabilita o menu de contexto
    loadDarkMode(); // carregar o estado atual do darkmode
    loadData();
    loadBibleVersion();
    loadFontSize();
    hideVerses();
    searchBarListener();
    // setupScrollHide();
}

// function setupScrollHide(){
//     const navbar = document.getElementById("buttonBar");
//     const mainHeader = document.getElementById("mainHeader");
//     if (!navbar && !mainHeader) {
//         return;
//     }
//     let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     let scrollTimeout = null;
//     setScrollVisibility(true);
//     window.addEventListener("scroll", function() {
//         if (scrollHideDisabled) {
//             setScrollVisibility(true);
//             return;
//         }
//         const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
//         if (currentScroll <= 0) {
//             setScrollVisibility(true);
//             lastScrollTop = 0;
//             return;
//         }
//         if (currentScroll > lastScrollTop + 2) {
//             setScrollVisibility(false);
//         } else if (currentScroll < lastScrollTop - 2) {
//             setScrollVisibility(true);
//         }
//         lastScrollTop = currentScroll;
//         if (scrollTimeout) {
//             clearTimeout(scrollTimeout);
//         }
//         scrollTimeout = setTimeout(function() {
//             setScrollVisibility(true);
//         }, 350);
//     });
// }


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

    // const buttonBar = document.getElementById("buttonBar");
    // buttonBar.classList.add("hidden");
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
    displayLoader();
    globalBook = livro;
    globalChapter = chap;
    removeChildrenNodes(chapter);
    let realIndexBook = livro + 1;
    let realIndexChapter = chap + 1;
    hideDiv(divChapters);
    let cap = chap;
    book.innerHTML = bible[livro].name;
    chapter.innerHTML = " Capítulo " + realIndexChapter;

    let elementsToAppend = [];
    let promises = [];

    for (let i = 0; i < bible[livro].chapters[cap].length; i++) {
        let verse = i + 1;
        let image = "./imgs/"+realIndexBook+"_"+realIndexChapter+"_"+verse+".jpg";
        let para = document.createElement("p");
        para.innerHTML = verse + ". " + bible[livro].chapters[cap][i];
        para.setAttribute("id", "v" + i);
        let img = document.createElement("img");
        let promise = fetch(image).then(response => {
            if (response.ok) {
                img.setAttribute("src", image);
                // img.setAttribute("onclick", "fullscreen('"+"imagem"+i+"')");
                img.setAttribute("onclick", "fullscreen('"+image+"','"+para.innerHTML+"','"+verse+"')");
                img.setAttribute("id", "imagem"+i);
                para.classList.add("ilustrated");
                para.appendChild(img);
            }
        }).catch(error => {
            console.log("Imagem não encontrada: " + image);
        });

        elementsToAppend.push({para: para, promise: promise});
    }

    // Aguardar todas as promessas serem resolvidas e depois adicionar os elementos ao DOM na ordem correta
    Promise.all(elementsToAppend.map(element => element.promise)).then(() => {
        elementsToAppend.forEach(element => {
            chapter.appendChild(element.para);
        });
    });

    saveData();
    undisplayLoader(); 
    populateVerses(livro, chap);
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
    // updateScrollHideState();
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
    // updateScrollHideState();
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
    const btnHide = document.createElement("button");
    btnHide.textContent = "Minimizar";
    btnHide.setAttribute('onclick','hideChapters()');
    btnHide.classList.add("chapterSpecial");
    capitulos.appendChild(btnHide);
    // updateScrollHideState();
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
    const btnHide = document.createElement("button");
    btnHide.textContent = "Minimizar";
    btnHide.setAttribute('onclick','hideVerses()');
    btnHide.classList.add("chapterSpecial");
    versesUl.appendChild(btnHide);
    // updateScrollHideState();
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
    // updateScrollHideState();
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
    // updateScrollHideState();
}

function hideDiv(div){
    div.style.display = "none";
    // updateScrollHideState();
}

function hideChapters(){
    divChapters.style.display = "none";
    // updateScrollHideState();
}

function hideVerses(){
    divVerses.style.display = "none";
    // updateScrollHideState();
}

function NextChapter(){
    if (globalChapter < bible[globalBook].chapters.length-1) {
        globalChapter++;
    } else if (globalBook < bible.length-1) {
        globalBook++;
        globalChapter = 0;
    }else{
        globalBook = 0;
        globalChapter = 0;
    }
    renderBookAndChapter(globalBook,globalChapter);
    hideVerses();
}

function PreviousChapter(){
    if (globalChapter > 0) {
        globalChapter--;
    } else if (globalBook > 0) {
        globalBook--;
        globalChapter = bible[globalBook].chapters.length-1;
    }else{
        globalBook = bible.length-1;
        globalChapter = bible[globalBook].chapters.length-1;
    }
    renderBookAndChapter(globalBook,globalChapter);
    hideVerses();
}

function undisplayLoader(){
    loader.style.display = "none";
}

function displayLoader(){
    loader.style.display = "flex";
}

function search(){
    let search = document.getElementById("busca").value;
    if (search == ""){
        alert("Insira um texto no campo Procurar...");
        renderBookAndChapter(globalBook,globalChapter);
        hideVerses();
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
                }
            }
                
                
        }
    }
    if (encontrado == false) {
        alert("Nenhum resultado encontrado");
        renderBookAndChapter(globalBook,globalChapter);
        hideVerses();
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

function saveBibleVersion(){
    // localStorage.setItem("bible", bible);
    localStorage.setItem("selectorIndex", globalSelectorIndex);
}

function loadBibleVersion(){
    if (localStorage.getItem("selectorIndex") != null) {
    globalSelectorIndex = parseInt(localStorage.getItem("selectorIndex"));
    document.getElementById("version").selectedIndex = globalSelectorIndex;
    bibleTranslation();
    }else{
        globalSelectorIndex = 0; 
        document.getElementById("version").selectedIndex = globalSelectorIndex;
        bibleTranslation();
    }
}

function darkMode() {
    darkModeOn = (darkModeOn==1)?0:1;
    if (darkModeOn==1) {
        // lblDM.innerText = "Ativar Modo Escuro" + darkModeOn;
        // lblDM.innerText = "Ativar Modo Escuro";
        darkModeBtn.classList.remove('lamp-off');
        darkModeBtn.classList.add('lamp-on');
        lightMode();
    }else if (darkModeOn==0){
        // lblDM.innerText = "Ativar Modo Claro" + darkModeOn;
        // lblDM.innerText = "Ativar Modo Claro";
        darkModeBtn.classList.remove('lamp-on');
        darkModeBtn.classList.add('lamp-off');
        shadowMode();
    }
    saveDarkMode(darkModeOn);
}



function darkModeChage(){
    if (darkModeOn==1) {
        // lblDM.innerText = "Ativar Modo Escuro" + darkModeOn;
        // lblDM.innerText = "Ativar Modo Escuro";
        darkModeBtn.classList.remove('lamp-off');
        darkModeBtn.classList.add('lamp-on');
        lightMode();
    }else if (darkModeOn==0){
        // lblDM.innerText = "Ativar Modo Claro" + darkModeOn;
        // lblDM.innerText = "Ativar Modo Claro";
        darkModeBtn.classList.remove('lamp-on');
        darkModeBtn.classList.add('lamp-off');
        shadowMode();
    }
}


function lightMode(){
    r.style.setProperty('--font-family', '"Atkinson Hyperlegible", "Manrope", sans-serif');
    r.style.setProperty('--backgorund-color', "#f7f7fb");
    r.style.setProperty('--page-bg', 'radial-gradient(circle at 15% 15%, rgba(120, 180, 255, 0.35), transparent 45%), radial-gradient(circle at 85% 5%, rgba(120, 220, 255, 0.25), transparent 55%), linear-gradient(160deg, #f7f7fb 0%, #eef1f7 60%, #e7edf5 100%)');
    r.style.setProperty('--font-color', '#1a1d24');
    r.style.setProperty('--footer-color', 'rgba(255, 255, 255, 0.7)');
    r.style.setProperty('--footer-border', 'rgba(0, 0, 0, 0.08)');
    r.style.setProperty('--contraster-color', '#2f7bff');
    r.style.setProperty('--contraster-color2', '#54b6ff');
    r.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.65)');
    r.style.setProperty('--glass-strong', 'rgba(255, 255, 255, 0.85)');
    r.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.75)');
    r.style.setProperty('--glass-shadow', '0 20px 45px rgba(0, 0, 0, 0.12)');
    r.style.setProperty('--glass-blur', '18px');
}

function shadowMode(){
    r.style.setProperty('--font-family', '"Atkinson Hyperlegible", "Manrope", sans-serif');
    r.style.setProperty('--backgorund-color', '#0e1116');
    r.style.setProperty('--page-bg', 'radial-gradient(circle at 20% 20%, rgba(70, 120, 255, 0.18), transparent 45%), radial-gradient(circle at 80% 10%, rgba(0, 200, 255, 0.12), transparent 50%), linear-gradient(160deg, #0b0d10 0%, #12161d 60%, #1a2028 100%)');
    r.style.setProperty('--font-color', '#f5f5f7');
    r.style.setProperty('--footer-color', 'rgba(18, 20, 24, 0.75)');
    r.style.setProperty('--footer-border', 'rgba(255, 255, 255, 0.12)');
    r.style.setProperty('--contraster-color', '#8fd3ff');  
    r.style.setProperty('--contraster-color2', '#5fb3ff');  
    r.style.setProperty('--glass-bg', 'rgba(25, 28, 34, 0.6)');
    r.style.setProperty('--glass-strong', 'rgba(32, 36, 44, 0.75)');
    r.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.18)');
    r.style.setProperty('--glass-shadow', '0 20px 45px rgba(0, 0, 0, 0.35)');
    r.style.setProperty('--glass-blur', '18px');
}

function saveDarkMode(d) {
    localStorage.setItem("darkMode", d);   
}

function loadDarkMode() {
    if (localStorage.getItem("darkMode") != null) {
        darkModeOn = parseInt(localStorage.getItem('darkMode'));
    }else {
        darkModeOn = 0;
    }
    darkModeChage();
}


function searchBarListener() {
    if (!searchBar) {
        return;
    }
    // Execute a function when the user presses a key on the keyboard
    searchBar.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        // event.preventDefault();
        // Trigger the button element with a click
        search();
      }
    });
}

function openDialog() {
    dialogo.showModal();
}

function closeDialog() {
    dialogo.close();
}

function fullscreen(fonteDaImg,versiculo,numero) {
    imgSelected.setAttribute('src',fonteDaImg);
    document.getElementById("legenda").innerHTML = versiculo;
    imgSouce = fonteDaImg;
    imgVerse = versiculo;
    imageVerseNumber = numero;
    openDialog();
}


function bibleTranslation() {
    let version = document.getElementById("version").selectedIndex;
    switch (version) {
        case 0:
            bible = bibleAA;
            renderBookAndChapter(globalBook,globalChapter);
            hideVerses();
            globalSelectorIndex = 0;
            saveBibleVersion();
            document.getElementById("version").selectedIndex = globalSelectorIndex;
            break;
        case 1:
            bible = bibleARA;
            renderBookAndChapter(globalBook,globalChapter);
            hideVerses();
            globalSelectorIndex = 1;
            saveBibleVersion();
            document.getElementById("version").selectedIndex = globalSelectorIndex;
            break;
        case 2:
            bible = bibleACF;
            renderBookAndChapter(globalBook,globalChapter);
            hideVerses();
            globalSelectorIndex = 2;
            saveBibleVersion();
            document.getElementById("version").selectedIndex = globalSelectorIndex;
            break;
        case 3:
            bible = bibleNVI;
            renderBookAndChapter(globalBook,globalChapter);
            hideVerses();
            globalSelectorIndex = 3;
            saveBibleVersion();
            document.getElementById("version").selectedIndex = globalSelectorIndex;
            break;      
        default:
            bible = bibleAA;
            renderBookAndChapter(globalBook,globalChapter);
            hideVerses();
            globalSelectorIndex = 0;
            saveBibleVersion();
            document.getElementById("version").selectedIndex = globalSelectorIndex;
            break;
    }
}

function biblia() {
    bible = bibleNVI;
    renderBookAndChapter(globalBook,globalChapter);
    hideVerses();
}

async function shareDialog() {

    let livroNome = bible[globalBook].name;
    let capNumero = globalChapter +1;
    const response = await fetch(imgSouce);
    const blob = await response.blob();
    
    const filesArray = [
    new File(
      [blob],
      livroNome+''+capNumero+''+imageVerseNumber+'.jpg',
      {
        type: "image/jpg",
        lastModified: new Date().getTime()
      }
   )
  ];

    shareData = {
        title: "Bíblia Ilustrada por IA",
        text: livroNome + " : " + capNumero + " - " + imgVerse,
        url: "https://biosdead.github.io/bibleAI/"
        // files: filesArray,
    }


    if (navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData);
    } else {
        alert("Sem suporte ao compartilhamento");
    }

    try {
        await navigator.share(shareData);
   } catch (err) {
       console.log(`Error: ${err}`);
       console.log("Sem suporte ao compartilhamento");
     }
}

function EraseUserData() {
    localStorage.clear();
    alert("All user data was erased");
    window.location="./index.html";
    // setTimeout(3000,backToBible());
}

function backToBible(){
    window.location="./index.html";
}

function goToInfo(){
    window.location="./info.html";
}

async function shareVerse() {
    let imgElement = document.getElementById("imgSelected"); // Captura a imagem selecionada
    let verseText = document.getElementById("legenda").innerText; // Captura o versículo
    let livroNome = bible[globalBook].name;
    let capNumero = globalChapter +1;

    const response = await fetch(imgElement.src);
  const blob = await response.blob();
  const filesArray = [
    new File(
      [blob],
      'Genesis.jpg',
      {
        type: "image/jpeg",
        lastModified: new Date().getTime()
      }
   )
  ];



    if (navigator.share) {
        navigator.share({
            files: filesArray,
            title: "Bible Illustrated by AI",
            // text:verseText,
            text:livroNome + " - " + capNumero + ":" + verseText,
            // file: imgElement.src,
            url: "https://www.bibleillustratedbyai.com" // Compartilha o link da imagem
        }).then(() => {
            console.log("Compartilhamento bem-sucedido");
        }).catch((error) => {
            console.error("Erro ao compartilhar:", error);
        });
    } else {
        alert("O compartilhamento não é suportado neste navegador.");
    }
}


function saveFontSize(){
    localStorage.setItem("fontSize", globalFontSize);
}

function loadFontSize(){
    if (localStorage.getItem("fontSize") != null) {
    globalFontSize = parseInt(localStorage.getItem("fontSize"));
    changeFontSize();
    }else{
        globalFontSize = 0; 
    }
}


function increaseFontSize(){
    if(globalFontSize == 0){
        globalFontSize = 1;
    }else if(globalFontSize == 1){
        globalFontSize = 2;
    }else if(globalFontSize == 2){
        globalFontSize = 3;
    }
    saveFontSize();
    changeFontSize();
}

function decreaseFontSize(){
    if(globalFontSize == 3){
        globalFontSize = 2;
    }else if(globalFontSize == 2){
        globalFontSize = 1;
    }else if(globalFontSize == 1){
        globalFontSize = 0;
    }
    saveFontSize();
    changeFontSize();
}

function changeFontSize(){
    if(globalFontSize == 0){
        r.style.setProperty('--fontSizeP', "1.4rem");
    }else if(globalFontSize == 1){
        r.style.setProperty('--fontSizeP', "2rem");
    }else if(globalFontSize == 2){
        r.style.setProperty('--fontSizeP', "2.5rem");
    }else if( globalFontSize == 3){
        r.style.setProperty('--fontSizeP', "3rem");
        // document.getElementById("increaseFontSizeBtn").disabled = true;
    }
}
