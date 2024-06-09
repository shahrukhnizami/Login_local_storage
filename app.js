var Username = document.getElementById("typeName")
var password = document.getElementById("typePassword")
var userName = document.getElementById("userName")
var note = document.getElementById("note")

 
var login_container = document.getElementById("login_container");
var home_container = document.getElementById("home_container");


function loginUser() {
    if (!Username.value || !password.value )
      return alert("Please Username and password.");
        localStorage.setItem("name", Username.value);
    checkIsUserLogin();
    
    
  }

  function checkIsUserLogin() {
  
    var Username = localStorage.getItem("name");
   
    if (Username) {
      login_container.style.display = "none";
      home_container.style.display = "block";
      userName.innerText = Username;
      displayUserNotes();
      
    } else {
      login_container.style.display = "block";
      home_container.style.display = "none";
    }
  }

  checkIsUserLogin();
  
  function logout(){
    localStorage.removeItem("name")
    checkIsUserLogin();
  }
function submitNote(){
    
    var Username = localStorage.getItem("name");
    
    var obj = {
        name:Username,       
        note:note.value
    }
    
 saveValueToLocalStorage(obj)
 
 //note.value = "";
}

function saveValueToLocalStorage(obj){
    var notes = localStorage.getItem("notes")
    var date = localStorage.getItem("date")
    if(notes){
        notes=JSON.parse(notes)
        
        notes.push(obj)
        console.log(notes);
       localStorage.setItem("notes", JSON.stringify(notes));
       

    }else{
        notes = [obj];
        console.log(notes);
        localStorage.setItem("notes", JSON.stringify(notes));
        
    }

  
 
 
    displayUserNotes()
}


function displayUserNotes(){
    var notes = localStorage.getItem("notes")
    var list = document.getElementById("list")
    var Username = localStorage.getItem("name");
    
    
    if(notes){
        list.innerHTML=""
        notes=JSON.parse(notes)
        
        notes.forEach(function(data,index) {
            if(data.name === Username){
                var liElement=`<li>${data.note}<br>
                            <p> Written by <span class="bg-warning text-dark rounded px-2"> ${data.name}</span></p>
                            </li>
                            `;
            list.innerHTML+=liElement;
            }
            
            
        });
    }
}
displayUserNotes()