function handleSave() {
  localStorage.setItem("saveSuccess", "true");
  window.location.href = "projects.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("created_at_field").value = today;
});

