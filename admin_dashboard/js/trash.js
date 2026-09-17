document.addEventListener("DOMContentLoaded", function () {
  const restoreMsg = document.getElementById("restore-success-msg");
  const deleteMsg = document.getElementById("delete-success-msg");

  // Show messages if present
  if (localStorage.getItem("restoreSuccess") === "true") {
    restoreMsg.classList.remove("d-none");
    setTimeout(() => restoreMsg.classList.add("d-none"), 2000);
    localStorage.removeItem("restoreSuccess");
  }

  if (localStorage.getItem("permanentDeleteSuccess") === "true") {
    deleteMsg.classList.remove("d-none");
    setTimeout(() => deleteMsg.classList.add("d-none"), 2000);
    localStorage.removeItem("permanentDeleteSuccess");
  }

  // Handle Restore
  document.querySelectorAll(".restore-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      if (confirm("Restore this project?")) {
        try {
          // await fetch(`/api/projects/${id}/restore`, { method: 'POST' });

          // Remove the row manually
          button.closest("tr").remove();

          // Show alert
          restoreMsg.classList.remove("d-none");
          setTimeout(() => restoreMsg.classList.add("d-none"), 2000);
        } catch (error) {
          alert("Something went wrong while restoring.");
        }
      }
    });
  });

  // Handle Permanent Delete
  document.querySelectorAll(".delete-forever-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      if (confirm("⚠️ Permanently delete this project?")) {
        try {
          // await fetch(`/api/projects/${id}`, { method: 'DELETE' });

          // Remove the row manually
          button.closest("tr").remove();

          // Show alert
          deleteMsg.classList.remove("d-none");
          setTimeout(() => deleteMsg.classList.add("d-none"), 2000);
        } catch (error) {
          alert("Failed to delete permanently.");
        }
      }
    });
  });
  // Category Alerts
const catRestoreMsg = document.getElementById("category-restore-msg");
const catDeleteMsg = document.getElementById("category-delete-msg");

// Restore Category
document.querySelectorAll(".restore-category-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;
    if (confirm("Restore this category?")) {
      try {
        // await fetch(`/api/categories/${id}/restore`, { method: 'POST' });

        button.closest("tr").remove();

        catRestoreMsg.classList.remove("d-none");
        setTimeout(() => catRestoreMsg.classList.add("d-none"), 2000);
      } catch (error) {
        alert("Something went wrong while restoring the category.");
      }
    }
  });
});

// Permanently Delete Category
document.querySelectorAll(".delete-category-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;
    if (confirm("⚠️ Permanently delete this category?")) {
      try {
        // await fetch(`/api/categories/${id}`, { method: 'DELETE' });

        button.closest("tr").remove();

        catDeleteMsg.classList.remove("d-none");
        setTimeout(() => catDeleteMsg.classList.add("d-none"), 2000);
      } catch (error) {
        alert("Failed to permanently delete the category.");
      }
    }
  });
});

});

