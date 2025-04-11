document.addEventListener('DOMContentLoaded', function () {
    const planCards = document.querySelectorAll('.plan-card');
    const nextButton = document.getElementById('nextButton');
    let selectedPlan = null;

    planCards.forEach(card => {
        const colorEffect = card.querySelector('.color-effect');

        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Lấy màu nền tại vị trí chuột
            const bgColor = getBackgroundColorAtPoint(card, x, y);
            
            // Cập nhật màu và vị trí hiệu ứng
            colorEffect.style.backgroundColor = bgColor;
            colorEffect.style.transform = `translate(${x - 75}px, ${y - 75}px)`;
        });

        card.addEventListener('mouseenter', function () {
            colorEffect.style.opacity = '0.7';
        });

        card.addEventListener('mouseleave', function () {
            colorEffect.style.opacity = '0';
        });

        card.addEventListener('click', function () {
            planCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            nextButton.disabled = false;
            selectedPlan = this.getAttribute('data-plan');
        });
    });

    nextButton.addEventListener('click', function () {
        if (selectedPlan) {
            console.log('Bạn đã chọn gói ' + selectedPlan.toUpperCase());
        }
    });
    
    // Hàm lấy màu nền tại một điểm
    function getBackgroundColorAtPoint(element, x, y) {
        // Xác định thẻ plan card nào đang được hover
        if (element.classList.contains('plan-basic')) {
            return '#FFA806'; // Màu vàng cam cho basic
        } else if (element.classList.contains('plan-family')) {
            return '#AA0000'; // Màu đỏ cho family
        } else if (element.classList.contains('plan-pro')) {
            return '#6600AA'; // Màu tím cho pro
        }
        return '#FFFFFF'; // Màu mặc định
    }
});