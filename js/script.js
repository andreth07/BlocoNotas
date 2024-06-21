/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

/**
 * ===================== EVENTOS  =================================
 */

addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.style.display = "block";
    addNote.style.display = "none";
    notes.style.display = "none";
    console.log(notes);
})


btnCloseModal.addEventListener("click", (evt) => {
    evt.preventDefault ();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
})

btnSaveNote.addEventListener("click" , (evt) => {
    evt.preventDefault ();
    data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value
    }
    savenote(data);
})

btnCloseModal.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
    modalView.style.display = "none";
    
})


/*
================================== Funções ==============================================
*/

const savenote = (note) => {
    
    let notes = loadNotes();
    note.lastTime = new Date().getTime();
    if(note.id.trim().length < 1){
        note.id = new Date().getTime();
        notes.push(note);
        document.querySelector('#input-id').value = note.id;

    } 

    else {
        notes.forEach((item, i) => {
            if (item.id == note.id) {
                notes[i] = note; 
            }
        });
    }
    

        notes = JSON.stringify(notes);
        
        localStorage.setItem('notes', notes);


        listNotes();

};

const loadNotes = () => {
    let notes = localStorage.getItem('notes');

    if(!notes){
        notes = []
    }

    else{
        notes = JSON.parse(notes);
    }
    return notes;
}

const listNotes = () => {
    notes.innerHTML = '';
    let listNotes = loadNotes();
    listNotes.forEach((note) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        let divCardBody = document.createElement('div');
        divCardBody.className = 'card-body'
        divCard.appendChild(divCardBody);
        let h5 = document.createElement('h5')
        h5.innerText = note.title;
        divCardBody.appendChild(h5);
        let pContent = document.createElement('p');
        pContent.innerText = note.content;
        let pLastTime = document.createElement('p');
        pLastTime.innerText = "Atualizado em: "+dateFormat(note.lastTime);
        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);

        notes.appendChild(divCard);

        notes.addEventListener("click" , (evt) => {
            evt.preventDefault ();
            showNote(note);
        
        })
    });
}

const showNote = (note)=>{
    document.querySelector('#controls-note').innerHTML = "";
    notes.style.display = "none";
    modalView.style.display = "block";
    addNote.style.display ="none";
    document.querySelector('#title-note').innerHTML= "<h1>"+note.title+"</h1>";
    document.querySelector('#content-note').innerHTML = `<p>${note.content}</p>
    <p>Ultima alteração: ${dateFormat(note.lastTime)}</p>`

    let divEdit = document.createElement("div");
    let iEdit = document.createElement("i");
    iEdit.className = 'bi bi-pen'
    divEdit.appendChild(iEdit);
    document.querySelector("#controls-note").appendChild(divEdit) ;
    divEdit.addEventListener("click", (evt) =>{
        evt.preventDefault();
        document.querySelector("#input-id").value = note.id;
        document.querySelector("#input-title").value = note.title;
        document.querySelector("#input-content").value = note.content;
        modalView.style.display = "none";
        modal.style.display = "block";
    });



    let divExcluir = document.createElement ("div");
    let eExcluir = document.createElement("e");
    eExcluir.className = 'bi bi-trash3'
    divExcluir.appendChild(eExcluir);
    document.querySelector('#controls-note').appendChild(divExcluir);
    divExcluir.addEventListener("click", (evt) =>{
        evt.preventDefault();
        if (confirm("Tem certeza que deseja excluir esta nota?")) {
            deleteNote(note.id);
        }
     
    })

    
    const deleteNote = (noteId) => {
        let notes = loadNotes();
        notes = notes.filter(note => note.id != noteId);
        notes = JSON.stringify(notes);
        localStorage.setItem('notes', notes);
        listNotes();
    };
};

const editNote = (note) => {
    
    document.querySelector("#content-note").value = note.content;
    document.querySelector("#title-note").value = note.title;
    modalView.style.display = "none";
    modal.style.display = "block";
}



const dateFormat = (timestamp) => {
    let date = new Date(timestamp);
    date = date.toLocaleDateString("pt-BR");
    return date;
};


listNotes();