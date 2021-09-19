// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
  import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC49GbQlCFdtLkI_yXhvGG44v1fqhxRhGI",
    authDomain: "chatproject-fd804.firebaseapp.com",
    databaseURL: "https://chatproject-fd804-default-rtdb.firebaseio.com",
    projectId: "chatproject-fd804",
    storageBucket: "chatproject-fd804.appspot.com",
    messagingSenderId: "829117416946",
    appId: "1:829117416946:web:ac1934002588503176176b",
    measurementId: "G-7QM23QCRWT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

let db = rtdb.getDatabase(app);
let titleRef = rtdb.ref(db, "/");
let chatsRef = rtdb.child(titleRef,'chats');
let nameRef = rtdb.child(titleRef,'name');

const msgInput = document.getElementById("msg-input"); 
const username = document.getElementById("username-input"); 
const submitBtn = document.getElementById("submit-btn");
const deleteBtn = document.getElementById("delete-btn");
const msgList = document.getElementById("list-msg");

//push the value from the input box to my database under the key "/chats"
function submitMsg(){
  rtdb.push(chatsRef, msgInput.value );
  rtdb.push(nameRef, username.value );
  //Then clear the box
  msgInput.value = '';
  username.value = '';
}

//Use onValue on a chats ref then add list items to the unordered list for each chat message I push
rtdb.onValue(chatsRef, ss=>{
 let chats = ss.val();
  msgList.innerHTML = '';
  
  for (const msg in chats){
    let displayedMsg = document.createElement('li');
    msgList.appendChild(displayedMsg)
    displayedMsg.innerText = chats[msg]
  }
});

//clear the chats
function deleteMsg(){
  rtdb.set(chatsRef, '')
  rtdb.set(nameRef, '')
}

//Call Functions
submitBtn.addEventListener("click", submitMsg);
deleteBtn.addEventListener("click", deleteMsg);
