# TASK DECOMPOSITION - Web App Development Lab 1

## WBS Task T-01: Semantic DOM Architecture & A11y Contract
- **Mục tiêu:** Xây dựng cấu trúc HTML5 thuần ngữ nghĩa (Semantic HTML), loại bỏ hoàn toàn thẻ `<div>`, đảm bảo khả năng tiếp cận (A11y) và phân cấp landmark rõ ràng.
- **Sản phẩm bàn giao:**
  - Thẻ skip-link cho phép người dùng bàn phím bỏ qua menu điều hướng.
  - Các thẻ cấu trúc: `<header>`, `<nav>`, `<main>`, `<section>`.
  - Các thuộc tính ARIA (Accessible Rich Internet Applications) phù hợp.

## Landmark Hierarchy Contract (Hợp đồng phân cấp Landmark)
1. **Quy tắc cốt lõi:** Không sử dụng bất kỳ thẻ `<div>` nào trong toàn bộ tài liệu HTML.
2. **Cấu trúc phân cấp:**
   - `<a>`: Skip-link (trỏ đến `#main-content`).
   - `<header role="banner">`: Chứa tiêu đề cấp 1 (`<h1>`).
   - `<nav role="navigation" aria-label="Primary">`: Chứa danh sách điều hướng chính.
   - `<main id="main-content" role="main">`: Chứa nội dung chính của trang, bao gồm các `<section>`.
3. **Ràng buộc kỹ thuật (Constraints):**
   - Không được gộp CSS chung với HTML trong cùng một commit (Atomic Commit).
   - Commit message bắt buộc: `feat(html): semantic landmark tree`.