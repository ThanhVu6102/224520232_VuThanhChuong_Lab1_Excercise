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

// ==========================================================================
// SUB-TASK T-03C: State Machine Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ... (Giữ nguyên code Theme Engine của Ex2 ở trên) ...

    // --- Bắt đầu logic State Machine ---
    const states = {
        LOADING: document.getElementById('state-loading'),
        LIVE_DATA: document.getElementById('state-live'),
        EMPTY: document.getElementById('state-empty'),
        ERROR: document.getElementById('state-error')
    };

    function setState(stateName) {
        // Ẩn tất cả các trạng thái
        Object.values(states).forEach(el => {
            if (el) el.classList.add('hidden');
        });
        // Hiển thị trạng thái được chọn
        if (states[stateName]) {
            states[stateName].classList.remove('hidden');
        }
    }

    // Hàm giả lập fetch dữ liệu
    function fetchData() {
        setState('LOADING');
        
        // Giả lập độ trễ mạng 2 giây
        setTimeout(() => {
            // Thay đổi logic ở đây để test các trạng thái khác nhau
            const randomOutcome = Math.random();
            
            if (randomOutcome < 0.33) {
                setState('LIVE_DATA');
            } else if (randomOutcome < 0.66) {
                setState('EMPTY');
            } else {
                setState('ERROR');
            }
        }, 2000);
    }

    // Gắn sự kiện cho nút Retry
    const emptyRetryBtn = document.getElementById('empty-retry-btn');
    const errorRetryBtn = document.getElementById('error-retry-btn');

    if (emptyRetryBtn) emptyRetryBtn.addEventListener('click', fetchData);
    if (errorRetryBtn) errorRetryBtn.addEventListener('click', fetchData);

    // Khởi chạy fetch dữ liệu lần đầu
    fetchData();
});