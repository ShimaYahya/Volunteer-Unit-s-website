document.addEventListener("DOMContentLoaded", function () {
  // Show temporary success messages
  const updateMsg = document.getElementById("update-success-msg");
  const saveMsg = document.getElementById("save-success-msg");
  const deleteMsg = document.getElementById("delete-success-msg");

  if (localStorage.getItem("updateSuccess") === "true") {
    updateMsg.classList.remove("d-none");
    setTimeout(() => updateMsg.classList.add("d-none"), 2000);
    localStorage.removeItem("updateSuccess");
  }

  if (localStorage.getItem("saveSuccess") === "true") {
    saveMsg.classList.remove("d-none");
    setTimeout(() => saveMsg.classList.add("d-none"), 2000);
    localStorage.removeItem("saveSuccess");
  }

  if (localStorage.getItem("deleteSuccess") === "true") {
    deleteMsg.classList.remove("d-none");
    setTimeout(() => deleteMsg.classList.add("d-none"), 2000);
    localStorage.removeItem("deleteSuccess");
  }

  // Delete (move to trash) functionality
document.querySelectorAll('.soft-delete-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const projectId = button.dataset.id;

    if (confirm('Move this project to trash?')) {
      try {
        // Simulate backend call
        button.closest('tr').remove();

        // ✅ Show alert immediately
        const deleteMsg = document.getElementById("delete-success-msg");
        deleteMsg.classList.remove("d-none");
        setTimeout(() => deleteMsg.classList.add("d-none"), 2000);

        // No need to use localStorage or reload
      } catch (error) {
        console.error('Error:', error);
        alert('Deletion failed. Please try again.');
      }
    }
  });
});

});
