let myLead = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
const tabBtn = document.getElementById("tab-btn")


if (leadsFromLocalStorage){
    myLead = leadsFromLocalStorage
    render(myLead)
}


tabBtn.addEventListener("click", function(){
    //get current tab url for chrome extension
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLead.push(tabs[0].url)
    localStorage.setItem("mylead", JSON.stringify (myLead) )
    render(myLead)
})
})

function render(leads){
    let listItem = ""
    for(let i=0; i < leads.length; i++){
        listItem += `
        <li>
            <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
            </a>
        </li>
          `
    }
    ulEl.innerHTML = listItem
}


deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myLead = [] 
    render(myLead)
})

inputBtn.addEventListener("click", function(){
    myLead.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)

    console.log( localStorage.getItem("myLead"))

})



