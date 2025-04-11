document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các poster-card
    const posterCards = document.querySelectorAll('.poster-card, .poster-card-vietnam');
    
    posterCards.forEach(posterCard => {
        let isDragging = false;
        let startX, scrollLeft;
        
        // Sự kiện khi nhấn chuột xuống
        posterCard.addEventListener('mousedown', (e) => {
            isDragging = true;
            posterCard.style.cursor = 'grabbing';
            startX = e.pageX - posterCard.offsetLeft;
            scrollLeft = posterCard.scrollLeft;
            
            // Ngăn chặn hành vi mặc định của trình duyệt
            e.preventDefault();
        });
        
        // Sự kiện khi thả chuột
        posterCard.addEventListener('mouseup', () => {
            isDragging = false;
            posterCard.style.cursor = 'grab';
        });
        
        // Sự kiện khi di chuyển chuột ra khỏi vùng poster-card
        posterCard.addEventListener('mouseleave', () => {
            isDragging = false;
            posterCard.style.cursor = 'grab';
        });
        
        // Sự kiện khi di chuyển chuột
        posterCard.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const x = e.pageX - posterCard.offsetLeft;
            // Tính khoảng cách kéo
            const walk = (x - startX) * 2; // *2 để tăng tốc độ kéo
            
            // Cập nhật vị trí cuộn
            posterCard.scrollLeft = scrollLeft - walk;
        });
        
        // Hỗ trợ cho thiết bị cảm ứng
        posterCard.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - posterCard.offsetLeft;
            scrollLeft = posterCard.scrollLeft;
        });
        
        posterCard.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        posterCard.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const x = e.touches[0].pageX - posterCard.offsetLeft;
            const walk = (x - startX) * 2;
            
            posterCard.scrollLeft = scrollLeft - walk;
            e.preventDefault(); // Ngăn chặn cuộn trang khi kéo
        });
    });
    
    // Đảm bảo hiệu ứng hover không bị ảnh hưởng bởi drag
    const movieBoxes = document.querySelectorAll('.movie-box');
    
    movieBoxes.forEach(movieBox => {
        let mouseMoved = false;
        
        movieBox.addEventListener('mousedown', () => {
            mouseMoved = false;
        });
        
        movieBox.addEventListener('mousemove', () => {
            mouseMoved = true;
        });
        
        movieBox.addEventListener('click', (e) => {
            // Chỉ xử lý sự kiện click nếu không phải là kết quả từ việc kéo
            if (mouseMoved) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
});