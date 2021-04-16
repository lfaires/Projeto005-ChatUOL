const messageSent = [];
let names = [];
const nameInput = document.querySelector(".name").value


/* Entra na sala */
function loggingChat() {
    console.log(nameInput)
    if(nameInput === ""){
        errorLogging("")
        return;   
    }

    const loading = document.querySelector(".loading")
    loading.innerHTML = `<img src="img/loading.gif" alt=""><span>Carregando...</span>`
    
   confirmingUser()
}

function confirmingUser(){
    const name = {name: nameInput};
    const requestName = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants",name)
   
    requestName.then(successLogging)
    requestName.catch(errorLogging)

}


function successLogging(success){
    const initialScreen = document.querySelector(".initial-screen")
    initialScreen.classList.add("hide")  
    searchingMessages()
    setInterval(checkConnection,5000)
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
}

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
            container.innerHTML += `<li class="chat private"><span class="time">(${messages[i].time})&nbsp;</span> <strong>${messages[i].from}&nbsp;</strong> reservadamente para <strong>&nbsp;${messages[i].to}:&nbsp;</strong> ${messages[i].text}</li>`
        } else {
            container.innerHTML += `<li class="chat"><span class="time">(${messages[i].time})&nbsp;</span> <strong>${messages[i].from}&nbsp;</strong> para <strong>&nbsp;${messages[i].to}:&nbsp;</strong> ${messages[i].text}</li>`
        }
    }
    automaticScrollDown(container)
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
    messageToUser()
}

function closeActiveScreen(){
    const activeParticipants = document.querySelector(".active-screen")
    const activeScreenBack = document.querySelector(".active-screen-back")
    activeParticipants.classList.remove("unhide")
    activeScreenBack.classList.remove("unhide")
}

/*enviar mensagem*/

function sendingMessages(){
    const messageInput = document.querySelector(".message").value;
    const messageSent = {from: nameInput, to: "Todos", text: messageInput, type: "message"};
    
    console.log(messageSent)

    const requestMessage = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", messageSent);
  
    requestMessage.then(successSendingMesssages)
    requestMessage.catch(errorSendingMessages)
}   

function successSendingMesssages(success){
    searchingMessages()
    console.log(success)
    
}

function errorSendingMessages(error){
    location.reload()
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

function automaticScrollDown(element){
    const scrollContainer = element.lastChild;
    console.log(scrollContainer)
    scrollContainer.scrollIntoView()

}

function enterKeyEnable(){
    const textInput = document.querySelector(".message")
    textInput.addEventListener()
}

function messageToUser(){
   
    const promiseUserActive = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants")
  
    promiseUserActive.then(successMessageToUser)
    promiseUserActive.catch(errorMessageToUser)
    
}

function successMessageToUser(promiseResponse){
    const user = promiseResponse.data
    console.log(user)
    const sideBar = document.querySelector(".users")

    for(let i=0;i<user.length;i++){
            sideBar.innerHTML += `
            <div class="activate-users" onclick="chooseUser('${user[i].name}')">
                <div>
                    <div><ion-icon name="person-circle-sharp"></ion-icon></div>
                    &nbsp;&nbsp;
                    <div>${user[i].name}</div>
                </div>
                <div class="${user[i].name} check">
                <ion-icon name="checkmark-sharp"></ion-icon>
                </div>
            </div>`
        }
    }

function errorMessageToUser(){
    alert()
}


function chooseUser(user){
    const userName = user;
    console.log(userName)
    const check = document.querySelector("." + userName + ".check")
    const checkActive = document.querySelector(".check .active")
    
    if(checkActive !== null) {
        checkActive.classList.remove("active");
    } 

    check.classList.add("active")
}


/* MANTER CONEXÃO*/
function checkConnection(){
    const name = {name: nameInput};
    const requestCheck = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status",name)

    requestCheck.then(successCheck)
    requestCheck.catch(errorCheck)
}

function successCheck(response){
    console.log(nameInput)
}

function errorCheck(response){
    location.load()
    nameInput = ""
}