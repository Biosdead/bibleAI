const book = document.getElementById('book');
const chapter = document.getElementById('chapter');
const linkhref = document.getElementById('link');

window.onload = function(){
    // console.log(bible);
    book.innerHTML = bible[0].name;
    chapter.innerHTML = bible[0].chapters[0][0];
    for (let i = 0; i < bible[0].chapters[0].length; i++) {
        let verse = i + 1;
        let para = document.createElement("p");
        para.innerHTML = verse + ". " + bible[0].chapters[0][i];
        book.appendChild(para);
        if (verse == 3){
            let img = document.createElement("img");
            img.setAttribute("src", "./imgs/gen_1_3.jpg");
            img.setAttribute("width", "80%");
            book.appendChild(img);
        }
    }
}


function OldMode(){
    linkhref.href = "index.css";
}

function FutureMode(){
    linkhref.href = "modernStyle.css";
}