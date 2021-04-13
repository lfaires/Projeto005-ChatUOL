const sentMessages = [];

function activeScreen(){
    const activeParticipants = document.querySelector(".active-screen")
    const activeScreenBack = document.querySelector(".active-screen-back")
    activeParticipants.classList.toggle("hide")
    activeScreenBack.classList.toggle("hide")
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
