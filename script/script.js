function activeScreen(){
    const activeParticipants = document.querySelector(".active-screen")
    const activeScreenBack = document.querySelector(".active-screen-back")
    activeParticipants.classList.toggle("hide")
    activeScreenBack.classList.toggle("hide")
}