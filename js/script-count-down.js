function updateCountdown() {
    const now = new Date(); // Lấy trực tiếp giờ máy tính người dùng

    const hours = 23 - now.getHours();
    const minutes = 59 - now.getMinutes();
    const seconds = 59 - now.getSeconds();

    const format = n => n.toString().padStart(2, '0');
    const countdownText = `${format(hours)}:${format(minutes)}:${format(seconds)}`;

    const countdownEl = document.getElementById('countdown');
    if (countdownEl) countdownEl.textContent = countdownText;
}

// Cập nhật mỗi giây
setInterval(updateCountdown, 1000);
updateCountdown(); // chạy lần đầu
