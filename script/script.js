const messageSent = [];
let names = [];


/* Entra na sala */
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
    
    return nameInput;
}

function successLogging(success){
    const initialScreen = document.querySelector(".initial-screen")
    initialScreen.classList.add("hide")  
    searchingMessages()
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

/*----------------------------------------------------------------*/

/*checka conexão*/
/*function checkConnection(name){
    const connection = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status",name)

    connection.then()
    connection.catch()
}*/

/* busca mensagens*/
function searchingMessages(){
    const promiseMessages = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages")

    promiseMessages.then(successSearchingMessages)
    promiseMessages.catch(errorSearchingMessages)
}

function successSearchingMessages(promiseResponse){
    const messages = promiseResponse.data;
    const container = document.querySelector(".container")
    container.innerHTML = ""

    for(let i=0;i<messages.length;i++){
        if(messages[i].type === "status"){
            container.innerHTML += `<li class="chat status"><span class="time">(${messages[i].time})&nbsp;</span> <strong>${messages[i].from}&nbsp;</strong> ${messages[i].text}</li>`
        }else if (messages[i].type === "private_message") {
            container.innerHTML += `<li class="chat private"><span class="time">(${messages[i].time})&nbsp;</span> <strong>${messages[i].from}&nbsp;</strong> reservadamente para <strong>&nbsp;${messages[i].to}</strong>: ${messages[i].text}</li>`
        } else {
            container.innerHTML += `<li class="chat"><span class="time">(${messages[i].time})&nbsp;</span> <strong>${messages[i].from}&nbsp;</strong> para <strong>&nbsp;${messages[i].to}</strong>: ${messages[i].text}</li>`
        }
    }
}

function errorSearchingMessages(promiseResponse){
    alert(promiseResponse.response.status)
}


/* contatos ativos*/
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

/*enviar mensagem*/

function sendingMessages(name){
    const messageInput = document.querySelector(".message").value;
   
    const messageSent = {from: name, to:"Todos", text: messageInput, type: "message"};
    
    console.log(messageSent)

    const requestMessage = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", messageSent);
  
    requestMessage.then(successSendingMesssages)
    requestMessage.catch(errorSendingMessages)
}   

function successSendingMesssages(success){
    console.log(success.response.status)
    searchingMessages()
}

function errorSendingMessages(error){
    console.log(error.response.status)
    alert(error.response.status)
    searchingMessages()
}


function addMessageScreen(text){
    const container = document.querySelector(".container")
    container.innerHTML = ""

    for (i=0;i<messageSent.length;i++){
    const li = `<li class="chat">${messageSent[i].message}</li>`
    container.innerHTML += li
    document.querySelector(".message").value = ""
    }
}
