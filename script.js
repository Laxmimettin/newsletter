const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("newsletterForm");
const email = document.getElementById("email");
const error = document.getElementById("error");
const success = document.getElementById("success");
const doneBtn = document.getElementById("doneBtn");
let previousFocus = null;
function showModal() {
  if (localStorage.getItem("newsletterDismissed") === "true") return;
  previousFocus = document.activeElement;
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => email.focus(), 350);
}
function hideModal() {
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  localStorage.setItem("newsletterDismissed", "true");
  if (previousFocus && previousFocus.focus) previousFocus.focus();
}
if (localStorage.getItem("newsletterDismissed") !== "true") {
  setTimeout(showModal, 3000);
}
openBtn.addEventListener("click", showModal);
closeBtn.addEventListener("click", hideModal);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) hideModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("active"))
    hideModal();
});
email.addEventListener("input", () => {
  error.textContent = "";
  email.setAttribute("aria-invalid", "false");
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = email.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!value) {
    error.textContent = "Please enter your email address.";
    email.setAttribute("aria-invalid", "true");
    email.focus();
    return;
  }
  if (!pattern.test(value)) {
    error.textContent = "Please enter a valid email address.";
    email.setAttribute("aria-invalid", "true");
    email.focus();
    return;
  }
  error.textContent = "";
  email.setAttribute("aria-invalid", "false");
  form.style.display = "none";
  success.classList.add("show");
  localStorage.setItem("newsletterDismissed", "true");
});
doneBtn.addEventListener("click", hideModal);
