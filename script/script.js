const sentMessages = [];
let names = [];

function loggingChat() {
    const nameInput = document.querySelector(".name").value
   
    if(nameInput === ""){
        errorLogging("")
        return;   
    }
    
    const name = {name: nameInput};
    names.push(name)
    
    const requestName = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants",name)
   
    requestName.then(successLogging)
    requestName.catch(errorLogging)
}

function successLogging(success){
    const intialScreen = document.querySelector(".initial-screen")
    initialScreen.classList.add("hide")  
}

function errorLogging(errors){
    if(errors === ""){
        alert("Por favor, insira um nome!")
        return;
    }
    
    const errorNumber = errors.response.status;
    if(errorNumber === 400){
        alert("Por favor, insira outro nome!")
        return;
    }
    /*const sdjk = document.querySelector(".error")
    sdjk.innerHTML = `<img src="https://http.cat/${errorNumber}.jpg" alt=""></img>`*/
}


function activeScreen(){
    const activeParticipants = document.querySelector(".active-screen")
    const activeScreenBack = document.querySelector(".active-screen-back")
    activeParticipants.classList.add("unhide")
    activeScreenBack.classList.add("unhide")
}

function closeActiveScreen(){
    const activeParticipants = document.querySelector(".active-screen")
    const activeScreenBack = document.querySelector(".active-screen-back")
    activeParticipants.classList.remove("unhide")
    activeScreenBack.classList.remove("unhide")
}

function sendMessage(){
    const nameInput = document.querySelector(".name")
    const messageInput = document.querySelector(".message")
    const name = nameInput.value
    const message = messageInput.value
    
    sentMessages.push({name: name, message: message})
      
    addMessageScreen(message)
}   

function addMessageScreen(text){
    const container = document.querySelector(".container")
    container.innerHTML = ""

    for (i=0;i<sentMessages.length;i++){
    const li = `<li class="chat">${sentMessages[i].message}</li>`
    container.innerHTML += li
    document.querySelector(".message").value = ""
    }
}
