import { collection, addDoc,db ,auth,getDocs,query, where,doc, signOut,deleteDoc,updateDoc,onAuthStateChanged} from "./firebase.config.js"; 



let currentUser = null;


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        getData(); // ✅ Fetch notes only after authentication
    
    } else {
        console.log("User not logged in");
        currentUser = null;
        document.getElementById("note").innerHTML = "<p>Please log in to see your notes.</p>";
    }
});





let getData = async () => {
  

    try {
        const notesQuery = query(collection(db, "users"), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(notesQuery);

        let fetchNotes = document.getElementById("main-content");
        fetchNotes.innerHTML = ""; 
   
        querySnapshot.forEach((docSnap) => {
            let data = docSnap.data();
            let noteId = docSnap.id;

            fetchNotes.innerHTML += `
               <div class="header">
                <div class="welcome-message">Welcome, <span id="userName">${data.name}</span>!</div>
            </div>

            <!-- Profile Information -->
            <div class="profile-card">
            <div class="profile-header">
                        <img src="${data.avatar || ''}" class="profile-avatar" alt="Profile Picture" id="avatarPreview">
                        <input type="file" id="imageUpload" style="display: none;">
                        <button id="editBtn">Edit</button>
                    </div>
                         <h2 class="profile-title" id="profileName">Full Name</h2>
                        <p class="profile-subtitle" id="profileEmail">${data.email}</p>
                    </div>
                </div>

                <h3>Profile Information</h3>
                <div class="profile-info">
                    <div class="info-item">
                        <div class="info-label">Full Name</div>
                        <div class="info-value" id="fullName">${data.name}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value" id="email">${data.email}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Father's Name</div>
                        <div class="info-value" id="fatherName">${data.fatherName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Gender</div>
                        <div class="info-value" id="gender">${data.gender}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">City</div>
                        <div class="info-value" id="city">${data.city}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Qualification</div>
                        <div class="info-value" id="qualification">${data.qualification}</div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="actions">
                    <button class="btn btn-primary" id="editProfileBtn" onclick="updateNote('${noteId}', '${data.qualification}', '${data.name}', '${data.city}', '${data.fatherName}', '${data.email}')">Edit Profile</button>
                   
                </div>
            </div>
        </div>
            `;

            // After inserting HTML with fetchNotes.innerHTML += `...`;
            setTimeout(() => {
                const editBtn = document.getElementById('editBtn');
                const imageUpload = document.getElementById('imageUpload');
                const avatarPreview = document.getElementById('avatarPreview');
    
                if (editBtn && imageUpload && avatarPreview) {
                    editBtn.addEventListener('click', () => {
                        imageUpload.click();
                    });
    
                    imageUpload.addEventListener('change', async function () {
                        const file = this.files[0];
                        if (file) {
                            const formData = new FormData();
                            formData.append("file", file);
                            formData.append("upload_preset", "assests"); // Your preset name
                            formData.append("cloud_name", "dppiotpin"); // Your cloud name
    
                            try {
                                // Upload the image to Cloudinary
                                const response = await fetch("https://api.cloudinary.com/v1_1/dppiotpin/image/upload", {
                                    method: "POST",
                                    body: formData
                                });
    
                                const data = await response.json();
                                const imageUrl = data.secure_url;
    
                                // Update the avatar preview with the uploaded image
                                avatarPreview.src = imageUrl;
    
                                // Update Firestore with the new avatar image URL
                                const notesQuery = query(collection(db, "users"), where("uid", "==", currentUser.uid));
                                const querySnapshot = await getDocs(notesQuery);
    
                                querySnapshot.forEach(async (docSnap) => {
                                    const userRef = doc(db, "users", docSnap.id);
                                    await updateDoc(userRef, { avatar: imageUrl });
                                    console.log("Image URL updated in Firestore!");
                                });
    
                            } catch (error) {
                                console.error("Image upload failed:", error);
                            }
                        }
                    });
                }
            }, 100); // slight delay to ensure DOM is rendered
    

        });

    } catch (error) {
        console.log('Error fetching notes:', error.message);
    }
};







let updateNote = async(noteId,oldName,oldEmail,oldQualification,oldCity,oldFatherName)=>{
    try {
     let newName = prompt("Edit name:", oldName);
     let newEmail = prompt("Edit email:", oldEmail);
     let newqualification = prompt("Edit qualification:", oldQualification);
     let newCity = prompt("Edit city:", oldCity);
     let newFatherName = prompt("Edit father name:", oldFatherName);
     const updateRef = doc(db, "users", noteId);
 
 
 await updateDoc(updateRef, {
    name : newName,
    fatherName : newFatherName,
    email : newEmail,
    qualification : newqualification,
    city : newCity,
   
 });
 alert('update hogya')
 getData()
    } catch (error) {
 alert("upadte nhi hosakta" ,error)
    }
 }
 
 
 
 window.updateNote = updateNote
 
 document.addEventListener('DOMContentLoaded', () => {
     getData();
 });
 




