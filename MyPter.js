const wishlistBtn = document.getElementById("wishlistBtn");
const wishlistModal = document.getElementById("wishlistModal");
const closeModal = document.getElementById("closeModal");
const submitBtn = document.getElementById("submitWishlist");
const message = document.getElementById("message");

// Open modal
wishlistBtn.addEventListener("click", () => {
  wishlistModal.style.display = "flex";
  message.textContent = "";
});

// Close modal
closeModal.addEventListener("click", () => {
  wishlistModal.style.display = "none";
});

// Close when clicking outside
wishlistModal.addEventListener("click", (e) => {
  if (e.target === wishlistModal) wishlistModal.style.display = "none";
});

// Submit form
submitBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const country = document.getElementById("country").value.trim();
  const language = document.getElementById("language").value;
  const role = document.getElementById("role").value;

  if (!name || !email || !country || !language || !role) {
    message.textContent = "⚠️ Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  const data = { name, email, country, language, role, source: "L" };
  message.textContent = "Submitting...";
  message.style.color = "black";

  try {
    const res = await fetch(
      "https://waiting-page-my-pter.onrender.com/api/waitlist",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      message.textContent = "🎉 You’ve successfully joined the wishlist!";
      message.style.color = "green";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("country").value = "";
      document.getElementById("language").value = "";
      document.getElementById("role").value = "";
      setTimeout(() => {
        wishlistModal.style.display = "none";
      }, 1500);
    } else {
      message.textContent = "❌ Something went wrong. Try again.";
      message.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "⚠️ Network error. Try again later.";
    message.style.color = "red";
  }
});

// Background sound toggle
// const bgMusic = document.getElementById("bgMusic");
// const soundToggle = document.getElementById("soundToggle");
// let isPlaying = true;

// soundToggle.addEventListener("click", () => {
//   if (isPlaying) {
//     bgMusic.pause();
//     soundToggle.textContent = "🔇 Unmute";
//   } else {
//     bgMusic.play();
//     soundToggle.textContent = "🔈 Mute";
//   }
//   isPlaying = !isPlaying;
// });
