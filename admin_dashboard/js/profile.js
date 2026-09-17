document.addEventListener('DOMContentLoaded', function () {
  const editBtn = document.getElementById("editProfileBtn");
  const cancelBtn = document.getElementById("cancelEditBtn");
  const form = document.getElementById("profileForm");
  const inputs = form.querySelectorAll("input[name]");
  const saveGroup = document.getElementById("saveBtnGroup");
  const successMsg = document.getElementById("profile-success-msg");
  const profileImg = document.getElementById("profilePreview"); // For restoring photo
  const photoInput = form.querySelector('input[name="photo"]');

  let originalValues = {}; // store original values
  let originalPhotoSrc = ""; // store original photo

  // Enable edit mode
  editBtn.addEventListener("click", () => {
    inputs.forEach((input) => {
      originalValues[input.name] = input.value;
      input.removeAttribute("readonly");
      input.classList.add("bg-light");
    });

    if (profileImg) {
      originalPhotoSrc = profileImg.src;
    }

    saveGroup.style.display = "block";
    editBtn.style.display = "none";
  });

  // Cancel edit
  cancelBtn.addEventListener("click", () => {
    inputs.forEach(input => {
      input.value = originalValues[input.name];
      input.setAttribute("readonly", true);
      input.classList.remove("bg-light");
    });

    if (profileImg && originalPhotoSrc) {
      profileImg.src = originalPhotoSrc;
    }

    if (photoInput) {
      photoInput.value = "";
    }

    saveGroup.style.display = "none";
    editBtn.style.display = "inline-block";
  });

  // Submit (Save changes)
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value
    };

    try {
      // Fake backend call – replace with real one later
      /*
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Failed to update profile');
      */

      successMsg.classList.remove('d-none');
      setTimeout(() => successMsg.classList.add('d-none'), 3000);

      // Lock fields again
      inputs.forEach(input => {
        input.setAttribute("readonly", true);
        input.classList.remove("bg-light");
      });

      if (photoInput) {
        photoInput.value = "";
      }

      saveGroup.style.display = "none";
      editBtn.style.display = "inline-block";
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  });
});



