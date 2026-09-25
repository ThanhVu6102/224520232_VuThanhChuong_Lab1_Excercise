# TASK_DECOMPOSITION.md — Lab 1: Modern Web Foundations & AI-Assisted Engineering

> Môn: Phát triển Ứng dụng Web | Ngành: Hệ thống Thông tin
> Exercise 1: Semantic DOM Architecture & A11y Contract

## WBS (Work Breakdown Structure)

| Task ID | Tên Task | Mô tả | Output | Trạng thái |
|---------|----------|-------|--------|------------|
| **T-01** | **Semantic landmark tree (HTML only)** | Dựng cây landmark ngữ nghĩa, KHÔNG dùng thẻ `<div>`, có skip-link chuẩn A11y | `index.html` | ✅ Done (Exercise 1 này) |
| T-02 (dự kiến) | Visual styling | CSS cho skip-link, layout, responsive — LÀM RIÊNG, không gộp chung commit với T-01 | `styles.css` | ⏳ Chưa làm |
| T-03 (dự kiến) | Interactivity | JS tăng cường (nếu đề yêu cầu ở bài sau) | `main.js` | ⏳ Chưa làm |

## STEP 1 — Khai báo WBS Task T-01 (theo Mandatory Rules)

- [x] Khai báo Task T-01 trong file này.
- [x] Phạm vi T-01: CHỈ HTML, KHÔNG CSS, KHÔNG JS (để tránh lỗi "One-shot prompt penalty: Commits combining CSS with HTML get 0 pts").
- [x] Commit nguyên tử (atomic): `feat(html): semantic landmark tree`

## STEP 2 — Landmark Hierarchy Contract (0 thẻ `<div>`)

Cây landmark phải đầy đủ để Chrome DevTools > Accessibility hiển thị đúng:

```
banner (header) ─> Tiêu đề trang, chỉ 1 <h1> duy nhất
navigation (nav, aria-label="Primary") ─> Menu chính
main (main#main-content) ─> Nội dung chính
  ├── region (section#about, có h2 + aria-labelledby)
  └── region (section#projects, có h2 + aria-labelledby)
contentinfo (footer) ─> Thông tin bản quyền / liên hệ
```

Quy tắc:
1. KHÔNG dùng `<div>` hay `<span>` thay thế landmark.
2. Mỗi `section` phải có heading (`h2`) — nếu không, screen reader sẽ báo "unlabeled region".
3. Dùng `role` tường minh (`banner`, `navigation`, `main`, `contentinfo`) để tương thích trình đọc màn hình cũ, dù HTML5 đã ngầm định.
4. Thứ tự heading: `h1` (1 lần) → `h2` (mỗi section) → không nhảy cấp.

## STEP 3 — Accessible Skip-Link Contract

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

- Phải là phần tử focusable ĐẦU TIÊN trong `<body>`.
- `href="#main-content"` phải khớp CHÍNH XÁC `id="main-content"` của `<main>`.
- Mục đích: người dùng bàn phím / screen reader nhấn Tab là gặp ngay, Enter là nhảy qua menu vào nội dung chính.
- Trong T-01 chưa styling (cố ý). Sang T-02 mới thêm CSS để hiện khi `:focus`.

## STEP 4 — Atomic Commit (xem hướng dẫn ở cuối file)

```bash
git init
git add TASK_DECOMPOSITION.md index.html
git commit -m "feat(html): semantic landmark tree"
```

> LƯU Ý ĐIỂM 0: Chỉ add 2 file trên. KHÔNG tạo/không add `*.css`, `*.js` trong commit này.

## VERIFICATION GATE (Cổng kiểm tra trước khi nộp)

1. Mở `index.html` bằng Chrome > F12 > Tab `Elements`.
   - Tìm `div` (Ctrl+F, gõ `div`): phải 0 kết quả.
2. F12 > Tab `Accessibility` (nếu ẩn: F12 > ⋮ > More tools > Accessibility):
   - Phải thấy cây: `banner`, `navigation "Primary"`, `main`, `region "About"`, `region "Projects"`, `contentinfo`.
3. Kiểm tra bàn phím: tải lại trang > nhấn `Tab` > link "Skip to main content" phải được focus đầu tiên > nhấn `Enter` > con trỏ nhảy xuống `<main>`.
4. Chạy lệnh kiểm tra nhanh (PowerShell):
   ```powershell
   Select-String -Path index.html -Pattern "<div" -SimpleMatch
   # Kỳ vọng: không trả về dòng nào = PASS
   ```
