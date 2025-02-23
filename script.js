document.addEventListener("DOMContentLoaded", function () {
  const inputBoxes = document.querySelectorAll(".input-box");
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const errorModal = document.getElementById("error-modal");
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.querySelector(".progress");
  const progressBarContainer = document.querySelector(".progress-bar");
  const container = document.querySelector(".container");

  let progress = 0;
  let redirectUrl = "./TSA APP/index.html"; // Link chung cho tất cả trường hợp

  const userMap = {
      "ABC123": { name: "Phạm Đình Tú", examCode: "AKLMHU" },
      "123456": { name: "Thầy Tiến xấu trai", examCode: "API9OY" },
      "ASPH4I": { name: "Phạm Bảo Duy", examCode: "ASPH4I" },
      "ASFMHC": { name: "Nguyễn Thị Quyên", examCode: "ASFMHC" },
      "VCUONG": { name: "Nguyễn Việt Cường", examCode: "A4AWKT" },
      "VANSON": { name: "Nguyễn Văn Sơn", examCode: "AGMRUS" },
      "123ABC": { name: "Anh Em Cây Khế", examCode: "AOHVBM" }
  };

  function enterFullScreen() {
      if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
              console.log(`Lỗi khi vào toàn màn hình: ${err.message}`);
          });
      }
  }

  // Kích hoạt full-screen khi trang tải xong
  setTimeout(() => {
      enterFullScreen();
  }, 500);

  function updateProgressBar() {
    progress += 10;
    progressBar.style.width = progress + '%';
    if (progress < 100) {
      setTimeout(updateProgressBar, 50);
    } else {
      loadingScreen.style.display = "none";
      progressBarContainer.style.display = "none";
      container.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }

  updateProgressBar();

  inputBoxes.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      const sanitizedValue = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      input.value = sanitizedValue;
      
      if (input.value) {
        input.classList.add('bold');
      } else {
        input.classList.remove('bold');
      }

      if (input.value.length === 1 && index < inputBoxes.length - 1) {
        inputBoxes[index + 1].focus();
      }

      const allFilled = Array.from(inputBoxes).every(box => box.value.length === 1);
      inputBoxes.forEach(box => box.classList.toggle('full', allFilled));
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && index > 0 && input.value === '') {
        inputBoxes[index - 1].focus();
      }
    });
  });

  document.getElementById("submit-button").addEventListener("click", () => {
    const code = Array.from(inputBoxes).map(box => box.value).join("");
    if (code.length === inputBoxes.length) {
      if (userMap[code]) {
        modalContent.innerHTML = `
          <p>Đã xác nhận <b>${userMap[code].name}</b> đã đăng nhập hệ thống. Mã dự thi của bạn là <b>${userMap[code].examCode}</b>. Chúc bạn hoàn thành tốt bài thi!</p>
          <button id='confirm-button' class='confirm-btn'>Xác nhận</button>
        `;
        modal.classList.add('show');

        document.getElementById("confirm-button").addEventListener("click", () => {
          window.location.href = redirectUrl;
        });
      } else {
        errorModal.classList.add('show');
        setTimeout(() => errorModal.classList.remove('show'), 1500);
      }
    } else {
      alert("Vui lòng nhập đủ mã trước khi tiếp tục!");
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || (event.ctrlKey && (event.key === 's' || event.key === 'u'))) {
      event.preventDefault();
    }
  });

  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });
});
