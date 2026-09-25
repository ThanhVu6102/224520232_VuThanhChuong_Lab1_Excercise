// ==========================================================================
// SUB-TASK T-02C: Theme Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // 1. Kiểm tra trạng thái đã lưu trong localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Nếu có theme đã lưu, áp dụng ngay lập tức để tránh CLS (Cumulative Layout Shift)
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Mặc định là light nếu chưa có gì
        htmlElement.setAttribute('data-theme', 'light');
    }

    // 2. Lắng nghe sự kiện click vào nút
    themeToggleBtn.addEventListener('click', () => {
        // Lấy theme hiện tại
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        // Đổi theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Cập nhật DOM
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Lưu vào localStorage với key chính xác là 'theme'
        localStorage.setItem('theme', newTheme);
    });
});