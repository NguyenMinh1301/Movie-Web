// JavaScript cho phần content
document.addEventListener('DOMContentLoaded', function () {
    const planCards = document.querySelectorAll('.plan-card');
    const nextButton = document.getElementById('nextButton');
    let selectedPlan = null;

    // Hiệu ứng di chuyển màu theo chuột
    planCards.forEach(card => {
        const colorEffect = card.querySelector('.color-effect');

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            colorEffect.style.left = x - 75 + 'px';
            colorEffect.style.top = y - 75 + 'px';
        });

        card.addEventListener('mouseenter', function () {
            colorEffect.style.opacity = '0.7';
        });

        card.addEventListener('mouseleave', function () {
            colorEffect.style.opacity = '0';
        });

        card.addEventListener('click', function () {
            // Remove selected class from all cards
            planCards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            this.classList.add('selected');

            // Enable next button
            nextButton.disabled = false;

            // Store selected plan
            selectedPlan = this.getAttribute('data-plan');
        });
    });

    // Xử lý nút "Tiếp theo"
    nextButton.addEventListener('click', function () {
        if (selectedPlan) {
            console.log('Bạn đã chọn gói ' + selectedPlan.toUpperCase());
            // Chuyển sang bước tiếp theo
            // window.location.href = '/step2.html?plan=' + selectedPlan;
        }
    });
});