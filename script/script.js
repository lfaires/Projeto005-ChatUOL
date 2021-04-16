const messageSent = [];
let names = [];
let nameInput = document.querySelector(".name").value
let nameTo = "Todos"
let messageStatus = "message"
const loading = document.querySelector(".loading")

/* Entra na sala */
function loggingChat() {
    console.log(nameInput)
    if(nameInput === ""){
        errorLogging("")
        return;   
    }

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
    loading.innerHTML = ""
    getMessages()  
    setInterval(getMessages,3000)
    setInterval(checkConnection,5000)
    setInterval(messageToUser,10000)
}

function errorLogging(errors){
    loading.innerHTML = ""
    nameInput = ""
    if(errors === ""){
        window.location.reload()
        alert("Por favor, insira um nome!")
        return;
    }
    
    const errorNumber = errors.response.status;
    if(errorNumber === 400){
        window.location.reload()
        alert("Por favor, insira outro nome!")
        return;
    }
}

/* BUSCAR MENSAGENS*/
function getMessages(){
    const promiseMessages = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages")

    promiseMessages.then(successGetMessages)
    promiseMessages.catch(errorGetMessages)
}

function successGetMessages(success){
    const messages = success.data;
    const container = document.querySelector(".container")
    container.innerHTML = ""

    for(let i=0;i<messages.length;i++){
        let messe
        if(messages[i].type === "status"){
            container.innerHTML += `<li class="chat status"><span class="time">(${messages[i].time})&nbsp;</span> <strong>${messages[i].from}&nbsp;</strong> ${messages[i].text}</li>`
        }else if (messages[i].type === "private_message") {
            if(messages[i].to === nameInput || messages[i].from === nameInput){
            container.innerHTML += `<li class="chat private"><span class="time">(${messages[i].time})&nbsp;</span> <strong>${messages[i].from}&nbsp;</strong> reservadamente para <strong>&nbsp;${messages[i].to}:&nbsp;</strong> ${messages[i].text}</li>`}
        } else {
            container.innerHTML += `<li class="chat"><span class="time">(${messages[i].time})&nbsp;</span> <strong>${messages[i].from}&nbsp;</strong> para <strong>&nbsp;${messages[i].to}:&nbsp;</strong> ${messages[i].text}</li>`
        }
    }
    automaticScrollDown(container)
    console.log("pegando msg a cada 3s trank")
}

function errorGetMessages(error){
    alert(error.response.status)
    console.log("deu ruim pegando msg a cada 3s trank")
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

/*ENVIAR MENSAGEM*/
function sendMessages(){
    const messageInput = document.querySelector(".message").value;
    const messageSent = {from: nameInput, to: nameTo, text: messageInput, type: messageStatus};
    
    console.log(messageSent)

    const requestMessage = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", messageSent);
  
    requestMessage.then(successSendMesssages)
    requestMessage.catch(errorSendMessages)
}   

function successSendMesssages(success){
    getMessages()
}

function errorSendMessages(error){
    widnow.location.reload()
}

function automaticScrollDown(element){
    const scrollContainer = element.lastChild;
    console.log(scrollContainer)
    scrollContainer.scrollIntoView()
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
    const validationSideBar = document.querySelector(".check.user-todos.active")
    console.log(validationSideBar)
    if(validationSideBar === null){
       sideBar.innerHTML =
        `<div class="activate-users" onclick="chooseUser('user-todos')">
            <div>
                <div><ion-icon name="people-sharp"></ion-icon></div>
                &nbsp;&nbsp;
                <div>Todos</div>
            </div>
            <div class="check user-todos">
                <ion-icon name="checkmark-sharp"></ion-icon>
            </div>
        </div>`
    } else {
        sideBar.innerHTML =
        `<div class="activate-users" onclick="chooseUser('user-todos')">
            <div>
                <div><ion-icon name="people-sharp"></ion-icon></div>
                &nbsp;&nbsp;
                <div>Todos</div>
            </div>
            <div class="check user-todos active">
                <ion-icon name="checkmark-sharp"></ion-icon>
            </div>
        </div>`
    }
    for(let i=0;i<user.length;i++){
        if(nameTo === user[i].name){
            sideBar.innerHTML += `
            <div class="activate-users" onclick="chooseUser('user-${user[i].name}')">
                <div>
                    <div><ion-icon name="person-circle-sharp"></ion-icon></div>
                    &nbsp;&nbsp;
                    <div>${user[i].name}</div>
                </div>
                <div class="check user-${user[i].name} active">
                <ion-icon name="checkmark-sharp"></ion-icon>
                </div>
            </div>`
          } else {
            sideBar.innerHTML += `
            <div class="activate-users" onclick="chooseUser('user-${user[i].name}')">
                <div>
                    <div><ion-icon name="person-circle-sharp"></ion-icon></div>
                    &nbsp;&nbsp;
                    <div>${user[i].name}</div>
                </div>
                <div class="check user-${user[i].name}">
                <ion-icon name="checkmark-sharp"></ion-icon>
                </div>
            </div>`
          }
        }
    }

function errorMessageToUser(){
    window.location.reload()
}

function chooseUser(user){
    const check = document.querySelector(".check." + user)
    const checkActive = document.querySelector(".active")

    if(checkActive !== null) {
        checkActive.classList.remove("active");
    } 

    check.classList.add("active")
    nameTo = user.replace("user-","")
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
    window.location.reload()
    nameInput = ""
    console.log(nameInput)
    console.log("deu ruim checkando conexao")
}

function chooseStatus(status){
    const publicStatus = document.querySelector(".status-public .check")
    const privateStatus = document.querySelector(".status-private .check")
    
    if(status === ".private"){
        messageStatus = "private_message"
        publicStatus.classList.remove("active")
        privateStatus.classList.add("active")
    } else {
        messageStatus = "message"
        privateStatus.classList.remove("active")
        publicStatus.classList.add("active")
    }
}

document.querySelector(".message").addEventListener("keypress",function(event){
    if (event.keyCode === 13){
        event.preventDefault();
        sendMessages();
    }
});


