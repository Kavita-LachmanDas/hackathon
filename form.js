import { db, collection, addDoc } from './firebase.config.js'; // ✅ correct import

// Initialize EmailJS (only once, with your public API key)
emailjs.init("YzBu6IhmZcuZ1g3__");  // Replace this with your actual public API key

document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const assignedEmail = document.getElementById("assignedEmail").value;
  const status = document.getElementById("taskStatus").value;  // Get the task status
  try {
    // Add task data to Firestore
    await addDoc(collection(db, "tasks"), {
      title,
      description,
      assignedTo: assignedEmail,
      status,  // Add the status
      createdAt: new Date()
    });

    alert("Task created successfully!");

    // Send email notification
    sendEmailNotification(assignedEmail, title, description,status);

    // Reset form
    document.getElementById("taskForm").reset();
  } catch (error) {
    console.error("Error adding task: ", error);
    alert("Error adding task");
  }
});

function sendEmailNotification(email, title, description,status) {
  console.log("Sending email to:", email);
  console.log("Task Title:", title);
  console.log("Task Description:", description);
  console.log("Task Status:", status);
  // Try sending email through EmailJS (with the 2.6.4 SDK)
  emailjs.send("service_zjyljta", "template_6yv44im", {
    to_email: email,               // recipient email
    task_title: title,             // task title
    task_description: description,  // task description
    task_status: status   
  })
  .then(() => {
    console.log("Email sent successfully!");
    window.location.href='./fetchh.html'
  }, (error) => {
    console.error("Error sending email: ", error);
    if (error.text) {
      console.error("Error text:", error.text);
    }
    alert(`Error sending email notification: ${error.text || error}`);
  });
}
