
var myLeads=[];
// myLeads =JSON.parse(myLeads); //To turn string array to normal array
// myLeads.push("www.hoks.com") //Now we can push in normal array using push
// myLeads= JSON.stringify(myLeads)//To turn normal array to string array
// console.log(myLeads)

const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")


//localStorage.setItem("myLeads","www.example.com"); //To store some info in local storage of crome
//console.log(localStorage.getItem("myLeads")) //To get the link saved in local storage
//localStorage.clear() //To clear the local storage



tabBtn.addEventListener("click",function(){
// grab the url of current tab
chrome.tabs.query({active: true, currentWindow: true},function(tabs){
  //Since only one tab should be active and in the current window at once
  //the return variable should only have one entry
  myLeads.push(tabs[0].url)
  localStorage.setItem("myLeads",JSON.stringify(myLeads))
  render(myLeads)
})

  
})

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
  myLeads=leadsFromLocalStorage
  render(myLeads)
}

function render(leads){
  var listItems="";
  for(let i=0 ; i<leads.length ;i++){
       //template strings/literals :- Using backtick we can make a sentence string an then using $ and curly braces put any variazble if u want
       
      listItems +=`        
      <li>
        <a href='${leads[i]}' target='_blank'>
        ${leads[i]}
        </a>
      </li> `; 
  }
  ulEl.innerHTML=listItems;
  }

 deleteBtn.addEventListener("dblclick",function(){ //To clear all previous data
     console.log("double clicked!")
     localStorage.clear()
     myLeads=[]
     ulEl.innerHTML=""  //or render(myLeads)

  })

inputBtn.addEventListener("click", function(){
   myLeads.push(inputEl.value);
   inputEl.value=''; //Clear input field after adding input in array
   
   localStorage.setItem("myLeads",JSON.stringify(myLeads))
   console.log(localStorage.getItem("myLeads"))
   
   render(myLeads);
   
});



