const registrationModal = document.getElementById("registrationModal");
const modalOverlay = document.getElementById("modalOverlay");
const openModalBtns = document.querySelectorAll(".homeSignUpBtn"); // ✅ to‘g‘risi shu
const closeModalBtn = document.getElementById("closeModalBtn");
const registrationForm = document.getElementById("registrationForm");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");
const submitBtn = document.getElementById("submitBtn");
const submitBtnText = document.getElementById("submitBtnText");
const homePage = document.getElementById("homePage");
const subscribePage = document.getElementById("subscribePage");
const timerDisplay = document.getElementById("timer");

let isSubmitting = false;

// 🔹 MODAL FUNCTIONLAR
function openModal() {
  if (registrationModal) registrationModal.style.display = "flex";
}

function closeModal() {
  if (registrationModal) registrationModal.style.display = "none";
}

// 🔹 TELEFON FORMAT
function formatPhoneNumber(value) {
  const digits = value.replace(/[^\d+]/g, "");
  if (digits.startsWith("+998")) {
    const numberPart = digits.slice(4);
    if (numberPart.length <= 2) return `+998 ${numberPart}`;
    else if (numberPart.length <= 5) return `+998 ${numberPart.slice(0, 2)}-${numberPart.slice(2)}`;
    else if (numberPart.length <= 7) return `+998 ${numberPart.slice(0, 2)}-${numberPart.slice(2, 5)}-${numberPart.slice(5)}`;
    else return `+998 ${numberPart.slice(0, 2)}-${numberPart.slice(2, 5)}-${numberPart.slice(5, 7)}-${numberPart.slice(7, 9)}`;
  }
  return digits;
}

function validatePhoneNumber(value) {
  const phoneRegex = /^\+998 \d{2}-\d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(value);
}

// 🔹 FORM SUBMIT
function handleSubmit(e) {
  e.preventDefault();
  if (isSubmitting) return;
  if (!validatePhoneNumber(phoneInput.value)) {
    phoneError.style.display = "block";
    return;
  }
  phoneError.style.display = "none";
  isSubmitting = true;
  submitBtn.disabled = true;

  const now = new Date();
  const formattedDate = now.toLocaleDateString("uz-UZ");
  const formattedTime = now.toLocaleTimeString("uz-UZ");

  const formData = {
    phone: phoneInput.value,
    dateTime: `${formattedDate} - ${formattedTime}`,
  };
  localStorage.setItem("registrationData", JSON.stringify(formData));
  window.location.href = "/thankYou.html";
}

// 🔹 EVENTLARNI QO‘SHISH
document.addEventListener("DOMContentLoaded", function () {
  // ✅ barcha .homeSignUpBtn tugmalariga click event qo‘shamiz
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      const formatted = formatPhoneNumber(e.target.value);
      phoneInput.value = formatted;
      phoneError.style.display = "none";
    });
  }

  if (registrationForm) registrationForm.addEventListener("submit", handleSubmit);

  // 🔹 TIMER
  if (timerDisplay) {
    let time = 120; // 2 daqiqa = 120 soniya
    const countdown = setInterval(() => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;

      timerDisplay.textContent =
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (time <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "TIME UP!";
      }
      time--;
    }, 1000);
  }
});
