document.getElementById("addCategoryForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.setItem("saveSuccess", "true");
  location.href = "categories.html";
});

document.getElementById("editCategoryForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.setItem("updateSuccess", "true");
  location.href = "categories.html";
});

window.addEventListener("DOMContentLoaded", function () {
  const updateMsg = document.getElementById("update-success-msg");
  const saveMsg = document.getElementById("save-success-msg");

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
});
document.querySelectorAll('.soft-delete-btn').forEach(button => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const confirmed = confirm("Are you sure you want to move this category to trash?");

    if (confirmed) {
      // Simulate backend call here if needed
      // fetch(`/api/categories/${button.dataset.id}`, { method: 'DELETE' });

      // Show alert
      const alertBox = document.getElementById("delete-success-msg");
      alertBox.classList.remove("d-none");

      // Auto-hide alert after 3 seconds
      setTimeout(() => alertBox.classList.add("d-none"), 3000);

      // Remove row from table
      row.remove();
    }
  });
});

