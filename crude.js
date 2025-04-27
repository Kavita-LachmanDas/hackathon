import { collection, addDoc,db ,auth,getDocs,query, where,doc, deleteDoc,updateDoc,onAuthStateChanged} from "./firebase.config.js"; 



let currentUser = null;

// 🔹 Wait for user authentication before fetching data
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        getData(); //  Fetch notes only after authentication
    } else {
        console.log("User not logged in");
        currentUser = null;
        document.getElementById("note").innerHTML = "<p>Please log in to see your notes.</p>";
    }
});



let adddoc = async()=>{

try {


    let writeTask = document.getElementById('writeTask').value

    if (!writeTask) {
        alert("Please type a task first!");
        return;                    
      }

    const user = auth.currentUser;
  const docRef = await addDoc(collection(db, "addtask"), {
  writeTask,
  uid:user.uid
  });
  alert("Document written with ID: "+ docRef.id);
  getData()
} catch (error) {
 alert( error);
}
}
document.getElementById('add')?.addEventListener('click', adddoc)



let getData = async () => {
  // Clear previous notes to prevent duplicates

    try {  
         const user = auth.currentUser;
        const notesQuery = query(collection(db, "addtask"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(notesQuery);
    
    
    
        let fetchNotes = document.getElementById("task-list");
        fetchNotes.innerHTML = "";
        // const querySnapshot = await getDocs(collection(db, "addtask"));
        querySnapshot.forEach((docSnap) => {
            let data = docSnap.data();
            let noteId = docSnap.id;

            fetchNotes.innerHTML += `
               <div class="task-item">
                <input type="checkbox" class="task-checkbox">
                <span class="task-text">${data.writeTask}</span>
                <button class="delete-btn" onclick="deletedoc('${noteId}')">×</button>
                <button class="action-button" onclick="updateNote('${noteId}', '${data.writeTask}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
            </div>`
        });

    } catch (error) {
        console.log('Error fetching notes:', error.message);
    }
};


window.deletedoc = async (noteId) => {
    try {
        await deleteDoc(doc(db, "addtask", noteId));
        alert("task deleted successfully!");
        getData(); 
    } catch (error) {
        console.log("Error deleting note:", error);
    }
};


// getData();






let updateNote = async(noteId,oldTask)=>{
    try {
     let newTitle = prompt("Edit task:", oldTask);

     const updateRef = doc(db, "addtask", noteId);
 
 
 await updateDoc(updateRef, {
   writeTask : newTitle,
   
   
 });
 alert('update hogya')
 getData()
    } catch (error) {
 alert("upadte nhi hosakta" ,error)
    }
 }
 
 
 
 window.updateNote = updateNote
 
//  document.addEventListener('DOMContentLoaded', () => {
//      getData();
//  });
 






 