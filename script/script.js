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
    const initialScreen = document.querySelector(".initial-screen")
    initialScreen.classList.add("hide")  
    searchMessages()
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

/*function checkConnection(name){
    const connection = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status",name)

    connection.then()
    connection.catch()
}*/


function searchMessages(){
    const promiseMessages = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages")

    promiseMessages.then(successMessages)
    promiseMessages.catch(errorMessages)
}

function successMessages(promiseResponse){
    const messages = promiseResponse.data;
    const container = document.querySelector(".container")
    container.innerHTML = ""

    for(let i=0;i<messages.length;i++){
        if(messages[i].text === "entra na sala..."){
            container.innerHTML += `<li class="chat"> ${messages[i].time} ${messages[i].from} ${messages[i].text}</li>`
        }else {
            container.innerHTML += `<li class="chat">${messages[i].time} ${messages[i].from} para ${messages[i].to}: ${messages[i].text}</li>`
        }
    }
}

function errorMessages(){
    alert("ERRO")
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

/*function sendMessage(){
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
}*/
