export const DEFAULT_HTML_APP = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 디지털 리터러시 수업 허브</title>
    <!-- 아이콘 사용을 위해 FontAwesome 최신 버전 추가 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- 웹폰트: Pretendard & Noto Sans KR & Plus Jakarta Sans -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&family=Noto+Sans+KR:wght@500;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css" />
    <!-- html2canvas 라이브러리 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        :root {
            /* 메인 컬러 팔레트 (캔바 기획서) */
            --clipboard-bg: #2b3a67;
            --board-bg: #f8fafc;
            --text-main: #1e293b;
            --text-sub: #475569;
            --purple-glow: rgba(167, 139, 250, 0.4);
            --purple-border: #c4b5fd;
            
            /* 그라데이션 팔레트 */
            --bg-gradient: radial-gradient(circle at 10% 20%, #e4eaff 0%, #f4e8ff 50%, #e0f7fa 100%);
            --header-purple-light: linear-gradient(90deg, #eaddff, #f3e8ff);
            --header-purple-dark: linear-gradient(90deg, #d8b4fe, #eaddff);
            --header-mint: linear-gradient(90deg, #bbf7d0, #ccfbf1);
            --header-cyan: linear-gradient(90deg, #a5f3fc, #cffafe);
            --profile-bg: linear-gradient(90deg, #f3e8ff 0%, #e0e7ff 50%, #e0f2fe 100%);
            
            /* 버튼 그라데이션 */
            --btn-copy: linear-gradient(135deg, #10b981, #059669);
            --btn-canva: linear-gradient(135deg, #3b82f6, #2563eb);

            /* 팝아트 스타일 (투닝 스토리보드) */
            --pop-black: #1a1a1a;
            --pop-white: #ffffff;
            --pop-yellow: #FFD60A;
            --pop-red: #FF453A;
            --pop-blue: #0A84FF;
            --pop-green: #30D158;
            --pop-cyan: #64D2FF;
            
            --border-thick: 4px solid #1a1a1a;
            --border-thin: 2px solid #1a1a1a;
            --shadow-solid: 6px 6px 0px #1a1a1a;
            --shadow-small: 3px 3px 0px #1a1a1a;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
            background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
            color: #1e293b;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
        }

        /* 뷰 전환 래퍼 */
        .page-view {
            display: none;
            width: 100%;
            animation: fadeIn 0.3s ease;
        }
        .page-view.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* 상단 네비게이션 고정바 (서브페이지용) */
        .top-nav-bar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 12px 20px;
            border-radius: 16px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            border: 1.5px solid #ffffff;
            max-width: 1600px;
            margin-left: auto;
            margin-right: auto;
        }
        .back-btn {
            background: #6c5ce7;
            color: white;
            border: none;
            padding: 9px 18px;
            border-radius: 12px;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(108, 92, 231, 0.25);
        }
        .back-btn:hover {
            background: #5b4bc4;
            transform: translateY(-2px);
        }

        /* ==================== 1. 메인 허브 스타일 ==================== */
        .hub-container {
            max-width: 1500px;
            width: 100%;
            margin: 0 auto;
            text-align: center;
            display: flex;
            flex-direction: column;
            min-height: calc(100vh - 80px);
        }
        .header-title-wrapper {
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        .header-title {
            font-size: 2.8rem; 
            font-weight: 900; 
            letter-spacing: -1.5px;
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            padding: 18px 40px;
            margin: 0;
        }
        .header-title::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-radius: 60px;
            border: 2px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 15px 35px rgba(255, 118, 117, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.7);
            z-index: -1;
        }
        .title-icon {
            font-size: 2.5rem;
            animation: float 3s ease-in-out infinite;
        }
        .icon-left { color: #ff7675; filter: drop-shadow(0 4px 6px rgba(255, 118, 117, 0.4)); }
        .icon-right { color: #fdcb6e; filter: drop-shadow(0 4px 6px rgba(253, 203, 110, 0.4)); animation-delay: 1.5s; }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
        }

        .header-title-text {
            background: linear-gradient(120deg, #ff6b6b, #6c5ce7, #0984e3, #ff6b6b);
            background-size: 300% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
            animation: shineText 4s linear infinite;
        }

        @keyframes shineText {
            to { background-position: 300% center; }
        }

        .header-sub {
            font-size: 1.2rem; 
            color: #2c3e50; 
            margin-bottom: 40px; 
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
            letter-spacing: -0.3px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        .sub-icon { color: #e17055; font-size: 1.1rem; }

        .horizontal-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }

        @media (max-width: 1200px) {
            .horizontal-grid {
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            }
        }

        .lesson-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 26px 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-top: 8px solid;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            text-align: left;
        }
        .lesson-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 35px rgba(0,0,0,0.25);
        }

        .group-1 { background: linear-gradient(145deg, #ffffff, #ffe4e6); border-top-color: #f43f5e; }
        .group-2 { background: linear-gradient(145deg, #ffffff, #dcfce7); border-top-color: #16a34a; }
        .group-3 { background: linear-gradient(145deg, #ffffff, #f3e8ff); border-top-color: #9333ea; }

        .lesson-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .badge {
            background-color: rgba(0, 0, 0, 0.06);
            color: #334155;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
        }

        .lesson-info h3 { font-size: 1.35rem; color: #0f172a; margin-bottom: 10px; font-weight: 800; line-height: 1.35; }
        .lesson-info p { font-size: 0.95rem; color: #475569; margin-bottom: 22px; line-height: 1.5; }

        .btn-group { display: flex; flex-direction: column; gap: 10px; margin-top: auto; }
        .btn { background-color: #f43f5e; color: white; padding: 12px 16px; border-radius: 8px; font-size: 0.95rem; font-weight: 700; text-decoration: none; transition: background-color 0.2s; display: block; text-align: center; box-shadow: 0 4px 10px rgba(244, 63, 94, 0.25); cursor: pointer; border: none; }
        .btn:hover { background-color: #e11d48; }
        .btn-green { background-color: #16a34a; color: white; padding: 12px 16px; border-radius: 8px; font-size: 0.95rem; font-weight: 700; text-decoration: none; transition: background-color 0.2s; display: block; text-align: center; box-shadow: 0 4px 10px rgba(22, 163, 74, 0.25); cursor: pointer; border: none; }
        .btn-green:hover { background-color: #15803d; }
        .btn-purple { background-color: #9333ea; color: white; padding: 12px 16px; border-radius: 8px; font-size: 0.95rem; font-weight: 700; text-decoration: none; transition: background-color 0.2s; display: block; text-align: center; box-shadow: 0 4px 10px rgba(147, 51, 234, 0.25); cursor: pointer; border: none; }
        .btn-purple:hover { background-color: #7e22ce; }

        footer {
            margin-top: auto;
            margin-bottom: 15px;
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 0.95rem;
            color: #334155;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.9);
            padding: 14px 35px;
            border-radius: 40px;
            display: inline-block;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(12px);
            border: 1.5px solid rgba(255, 255, 255, 1);
            align-self: center;
        }
        footer span.highlight {
            background: linear-gradient(135deg, #ff6b6b, #ff8e53);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
        }

        /* ==================== 2. 바이브 코딩 기획서 (클립보드 스타일) ==================== */
        .clipboard-frame {
            background-color: var(--clipboard-bg);
            padding: 16px;
            border-radius: 28px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2), inset 0 2px 10px rgba(255,255,255,0.1);
            position: relative;
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
            min-height: 85vh;
            display: flex;
            flex-direction: column;
            margin-top: 15px;
        }

        .clipboard-clip {
            position: absolute;
            top: -22px;
            left: 50%;
            transform: translateX(-50%);
            width: 220px;
            height: 40px;
            background: linear-gradient(to bottom, #ffffff, #cbd5e1);
            border-radius: 24px;
            border: 2px solid #94a3b8;
            box-shadow: 0 8px 16px rgba(0,0,0,0.25), inset 0 3px 6px white;
            z-index: 10;
        }

        .planner-board {
            background-color: var(--board-bg);
            border-radius: 20px;
            padding: 25px 35px 20px 35px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            flex: 1;
        }

        .planner-header-area {
            text-align: center;
            margin-bottom: 5px;
            margin-top: 10px;
        }
        
        .planner-header-area h1 {
            color: #1e3a8a;
            font-size: 48px;
            font-weight: 900;
            letter-spacing: -1.5px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            -webkit-text-stroke: 4px #ffffff;
            paint-order: stroke fill;
            text-shadow: 0 8px 15px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.05);
        }
        @media (max-width: 768px) {
            .planner-header-area h1 { font-size: 28px; -webkit-text-stroke: 2px #ffffff; }
        }
        
        .planner-header-area .subtitle {
            color: var(--text-main);
            font-size: 18px;
            font-weight: 700;
        }

        /* 크리에이터 프로필 */
        .creator-profile {
            background: var(--profile-bg);
            border-radius: 20px;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            gap: 24px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.06);
            border: 2px solid #ffffff;
        }
        @media (max-width: 900px) {
            .creator-profile { flex-direction: column; gap: 12px; }
        }
        
        .profile-title {
            font-weight: 900;
            font-size: 17px;
            color: var(--text-main);
            line-height: 1.3;
            width: 100px;
            text-align: center;
        }
        
        .profile-inputs {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            flex: 1;
            width: 100%;
        }
        @media (max-width: 600px) {
            .profile-inputs { grid-template-columns: repeat(2, 1fr); }
        }
        
        .profile-inputs input {
            width: 100%;
            padding: 14px;
            border: 2px solid #ffffff;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            font-weight: 700;
            color: var(--text-main);
            outline: none;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            transition: all 0.2s;
        }
        
        .profile-inputs input:focus {
            background: #ffffff;
            border-color: #8b5cf6;
            box-shadow: 0 0 0 4px var(--purple-glow);
        }

        /* 메인 레이아웃 */
        .layout-grid {
            display: flex;
            gap: 24px;
            align-items: stretch;
            flex: 1;
        }
        @media (max-width: 1024px) {
            .layout-grid { flex-direction: column; }
        }
        
        .left-panel {
            flex: 1.4;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }
        
        .left-top-grid {
            display: flex;
            gap: 24px;
            flex: 1;
        }
        @media (max-width: 768px) {
            .left-top-grid { flex-direction: column; }
        }
        
        .left-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }
        
        .right-panel {
            flex: 1.1;
            display: flex;
            flex-direction: column;
        }

        /* 개별 섹션 카드 */
        .section-card {
            background: #ffffff;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.04);
            display: flex;
            flex-direction: column;
        }
        
        .section-card.full-height { height: 100%; }
        
        .section-header {
            padding: 14px 20px;
            font-size: 16px;
            font-weight: 800;
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.5);
        }
        .header-purple-light { background: var(--header-purple-light); }
        .header-purple-dark { background: var(--header-purple-dark); }
        .header-mint { background: var(--header-mint); }
        .header-cyan { background: var(--header-cyan); }
        .header-prompt { background: var(--header-cyan); }

        .section-body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            flex: 1;
            background: rgba(255,255,255,0.6);
        }

        /* 입력 필드 */
        .input-box {
            width: 100%;
            padding: 16px;
            border: 2px solid transparent;
            border-radius: 14px;
            background: #f1f5f9;
            font-size: 16px;
            font-weight: 600;
            outline: none;
            box-shadow: 0 0 0 1px #cbd5e1;
            transition: all 0.2s;
        }
        .input-box:focus {
            background: #fff;
            box-shadow: 0 0 0 3px var(--purple-glow), 0 0 0 1px #8b5cf6;
        }
        .input-box::placeholder { color: #94a3b8; font-weight: 500; }

        /* 넘버링 리스트 디자인 */
        .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .feature-item span {
            font-weight: 800;
            color: var(--text-main);
            font-size: 17px;
            width: 20px;
        }

        /* 프롬프트 입력 영역 */
        .prompt-textarea {
            width: 100%;
            flex: 1;
            min-height: 250px;
            padding: 20px;
            border: 2px solid transparent;
            border-radius: 16px;
            background: #f1f5f9;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.7;
            outline: none;
            resize: none;
            box-shadow: 0 0 0 1px #cbd5e1;
            transition: all 0.2s;
        }
        .prompt-textarea:focus {
            background: #fff;
            box-shadow: 0 0 0 3px var(--purple-glow), 0 0 0 1px #8b5cf6;
        }

        /* 버튼 그룹 */
        .button-group {
            display: flex;
            gap: 16px;
            margin-top: 20px;
        }
        
        .action-btn {
            flex: 1;
            padding: 18px;
            border: none;
            border-radius: 16px;
            color: white;
            font-size: 18px;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            text-decoration: none;
            box-shadow: 0 6px 16px rgba(0,0,0,0.15);
            transition: transform 0.2s, filter 0.2s, box-shadow 0.2s;
        }
        .action-btn:active { transform: translateY(2px); box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
        .action-btn:hover { filter: brightness(1.1); }
        
        .copy-btn { background: var(--btn-copy); }
        .canva-btn { background: var(--btn-canva); }

        .footer-tip {
            text-align: center;
            font-size: 16px;
            color: var(--text-sub);
            font-weight: 700;
            margin-top: 5px;
        }

        /* 💡 중앙 배치 토스트 팝업 스타일 */
        #toastPopup {
            visibility: hidden;
            min-width: 480px;
            background-color: #ffffff;
            color: var(--text-main);
            border-radius: 24px;
            padding: 40px 30px;
            position: fixed;
            z-index: 9999;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            box-shadow: 0 30px 60px rgba(0,0,0,0.25);
            border: 5px solid #10b981;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 20px;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @media (max-width: 550px) {
            #toastPopup { min-width: 90%; padding: 25px 15px; }
        }
        
        #toastPopup.show {
            visibility: visible;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .toast-icon {
            background: #10b981;
            color: white;
            width: 76px;
            height: 76px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            margin-top: -10px;
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
        }
        
        .toast-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .toast-title {
            font-weight: 900;
            margin-bottom: 12px;
            font-size: 32px;
            color: #10b981;
            letter-spacing: -1px;
        }

        #toastMessage {
            font-size: 20px;
            font-weight: 700;
            line-height: 1.6;
            color: #334155;
            word-break: keep-all;
        }
        
        #toastMessage b {
            color: #2563eb;
            background: #eff6ff;
            padding: 2px 8px;
            border-radius: 6px;
            border: 1px solid #bfdbfe;
        }

        /* ==================== 3. 속담툰 스토리보드 (팝아트 스타일) ==================== */
        .storyboard-container {
            max-width: 1400px;
            width: 100%;
            background: #ffffff;
            margin: 0 auto;
            padding: 25px 30px;
            border: var(--border-thick);
            border-radius: 16px;
            box-shadow: 10px 10px 0px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .sb-header-box {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 5px solid #1a1a1a;
            padding-bottom: 15px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .sb-header-left {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .sb-header-left h2 {
            margin: 0;
            color: #ffffff;
            font-size: clamp(24px, 2.5vw, 30px);
            font-weight: 900;
            letter-spacing: -1px;
            -webkit-text-stroke: 2px #1a1a1a;
            text-shadow: 3px 3px 0px #1a1a1a;
            background: #FFD60A;
            padding: 4px 14px;
            border: var(--border-thick);
            border-radius: 12px;
            transform: rotate(-1deg);
            display: inline-block;
        }

        .sb-student-info {
            background: #64D2FF;
            border: var(--border-thick);
            box-shadow: var(--shadow-small);
            border-radius: 10px;
            padding: 8px 16px;
            display: flex;
            gap: 12px;
            align-items: center;
            font-size: 15px;
            font-weight: 900;
            color: #1a1a1a;
        }

        .field-group {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .sb-student-info input {
            border: var(--border-thin);
            border-radius: 6px;
            background: #ffffff;
            padding: 4px 6px;
            font-size: 15px;
            font-weight: 900;
            outline: none;
            text-align: center;
            color: #1a1a1a;
            box-shadow: inset 2px 2px 0px rgba(0,0,0,0.1);
        }
        .sb-student-info input:focus { background: #fff9db; }

        .sb-btn-container {
            display: flex;
            gap: 14px;
            align-items: center;
            flex-wrap: wrap;
        }

        .sb-action-btn {
            color: #1a1a1a;
            border: var(--border-thick);
            box-shadow: var(--shadow-solid);
            padding: 14px 24px;
            font-size: 19px;
            font-weight: 900;
            font-family: inherit;
            border-radius: 12px;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.1s ease;
            letter-spacing: 0.5px;
        }

        .sb-action-btn:active {
            transform: translate(4px, 4px);
            box-shadow: 2px 2px 0px #1a1a1a;
        }

        .sb-copy-btn {
            background-color: #FFD60A;
            color: #1a1a1a;
        }

        .sb-padlet-btn {
            background-color: #30D158;
            color: #ffffff;
            -webkit-text-stroke: 1.5px #1a1a1a;
            text-shadow: 2px 2px 0px #1a1a1a;
        }

        .sb-tooning-btn {
            background-color: #FF453A;
            color: #ffffff;
            -webkit-text-stroke: 1.5px #1a1a1a;
            text-shadow: 2px 2px 0px #1a1a1a;
        }

        .sb-meta-container {
            display: flex;
            flex-direction: row;
            gap: 20px;
        }
        @media (max-width: 768px) {
            .sb-meta-container { flex-direction: column; }
        }

        .sb-meta-field {
            flex: 1;
            background: #ffffff;
            padding: 12px 16px 12px 30px;
            border-radius: 12px;
            border: var(--border-thick);
            box-shadow: 5px 5px 0px #1a1a1a;
            font-size: 15px;
            font-weight: 900;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
            position: relative;
        }

        .sb-meta-field::before {
            content: '📌';
            position: absolute;
            left: -12px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            background: #ffffff;
            border: 3px solid #1a1a1a;
            border-radius: 50%;
            width: 34px; height: 34px;
            display: flex; justify-content: center; align-items: center;
        }

        .sb-meta-field.lesson::before { content: '💡'; }

        .sb-meta-field input {
            flex: 1;
            border: var(--border-thin);
            border-radius: 8px;
            padding: 8px 12px;
            background: #f8f9fa;
            font-size: 15px;
            font-weight: 800;
            outline: none;
            color: #1a1a1a;
        }

        .sb-grid-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
        }
        @media (max-width: 900px) {
            .sb-grid-container { grid-template-columns: repeat(2, 1fr); }
        }

        .cut-box {
            background: #ffffff;
            border: var(--border-thick);
            box-shadow: 5px 5px 0px #1a1a1a;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .cut-title {
            font-weight: 900;
            color: #1a1a1a;
            font-size: 15px;
            background: #FFD60A;
            padding: 8px;
            border-bottom: var(--border-thick);
            text-align: center;
        }

        .drawing-tools {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 10px;
            background: #f1f3f5;
            border-bottom: var(--border-thin);
            font-size: 11px;
            font-weight: 800;
        }

        .drawing-tools button {
            background: #FF453A;
            color: white;
            border: 2px solid #1a1a1a;
            padding: 3px 8px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 11px;
            font-weight: 900;
            box-shadow: 2px 2px 0px #1a1a1a;
        }

        .drawing-area {
            position: relative;
            height: 220px;
            background: #ffffff;
            cursor: crosshair;
        }

        canvas {
            display: block;
            touch-action: none;
            width: 100%;
            height: 100%;
        }

        .script-area {
            border-top: var(--border-thick);
            background: #f8f9fa;
        }

        .script-area textarea {
            resize: none;
            height: 65px;
            padding: 8px;
            border: none;
            background: transparent;
            font-size: 13px;
            font-weight: 800;
            outline: none;
            width: 100%;
            line-height: 1.4;
        }

        /* 스토리보드 성공 모달 */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 9999;
            justify-content: center; align-items: center;
        }

        .modal-box {
            background: #ffffff; 
            padding: 40px; 
            border-radius: 20px;
            text-align: center; 
            max-width: 480px; 
            width: 90%;
            border: 6px solid #1a1a1a;
            box-shadow: 15px 15px 0px #1a1a1a;
        }

        .modal-box h3 { 
            margin-top: 0; 
            color: #1a1a1a; 
            font-size: 32px; 
            font-weight: 900; 
            background: #FFD60A;
            display: inline-block;
            padding: 6px 20px;
            border: var(--border-thick);
            transform: rotate(-2deg);
        }

        .modal-box p { font-size: 18px; font-weight: 800; color: #1a1a1a; line-height: 1.6; margin: 25px 0; }
        .modal-box .highlight { color: #0A84FF; font-size: 20px; text-decoration: underline; text-underline-offset: 4px; }
        
        .modal-btn-group { display: flex; gap: 15px; justify-content: center; margin-top: 25px; }
        
        .modal-btn { 
            padding: 14px 24px; font-size: 18px; font-weight: 900; 
            border-radius: 12px; cursor: pointer; border: var(--border-thick); 
            box-shadow: 5px 5px 0px #1a1a1a; text-decoration: none; color: #1a1a1a;
        }
        .modal-btn.primary { background-color: #30D158; color: white; -webkit-text-stroke: 1px #1a1a1a; }
        .modal-btn.secondary { background-color: #e9ecef; }
    </style>
</head>
<body>

    <!-- ==================== PAGE 1: 메인 허브 ==================== -->
    <div id="view-hub" class="page-view active">
        <div class="hub-container">
            <div class="header-title-wrapper">
                <h1 class="header-title">
                    <i class="fa-solid fa-rocket title-icon icon-left"></i>
                    <span class="header-title-text">상상이 현실이 되는 AI 창작소</span>
                    <i class="fa-solid fa-star title-icon icon-right"></i>
                </h1>
            </div>
            
            <div class="header-sub">
                <i class="fa-solid fa-trophy sub-icon"></i>
                <span>발명품 디자인부터 속담 웹툰, 캔바 바이브 코딩까지 멋진 작품들을 차근차근 완성해 보자!</span>
            </div>

            <div class="horizontal-grid">
                <!-- 1차시 -->
                <div class="lesson-card group-1">
                    <div>
                        <div class="lesson-top"><span class="badge">1차시</span></div>
                        <div class="lesson-info">
                            <h3>캔바 매직미디어 AI</h3>
                            <p>캔바 AI 기능을 활용하여 나만의 멋진 이미지 생성하기</p>
                        </div>
                    </div>
                    <div class="btn-group">
                        <a href="https://www.canva.com" target="_blank" class="btn">캔바 바로가기 ↗</a>
                    </div>
                </div>

                <!-- 2차시 -->
                <div class="lesson-card group-2">
                    <div>
                        <div class="lesson-top"><span class="badge">2차시</span></div>
                        <div class="lesson-info">
                            <h3>투닝 스토리보드</h3>
                            <p>4컷 만화 속담툰 구성 및 기능 익히기</p>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button onclick="showView('tooning')" class="btn-green">✏️ 스토리보드 열기</button>
                    </div>
                </div>

                <!-- 3차시 -->
                <div class="lesson-card group-2">
                    <div>
                        <div class="lesson-top"><span class="badge">3차시</span></div>
                        <div class="lesson-info">
                            <h3>속담툰 전시하기</h3>
                            <p>완성된 4컷 속담툰 패들렛 전시 및 감상</p>
                        </div>
                    </div>
                    <div class="btn-group">
                        <a href="https://padlet.com/dlrka0131/6-bwwl5nvlo6ohxm4h" target="_blank" class="btn-green">📌 패들렛 전시관 ↗</a>
                    </div>
                </div>

                <!-- 4차시 -->
                <div class="lesson-card group-3">
                    <div>
                        <div class="lesson-top"><span class="badge">4차시</span></div>
                        <div class="lesson-info">
                            <h3>웹페이지 기획서</h3>
                            <p>추천 주제를 참고하여 나만의 웹 앱 기획서 작성하기</p>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button onclick="showView('canva')" class="btn-purple">✨ 나의 바이브코딩 기획서</button>
                    </div>
                </div>

                <!-- 5차시 -->
                <div class="lesson-card group-3">
                    <div>
                        <div class="lesson-top"><span class="badge">5차시</span></div>
                        <div class="lesson-info">
                            <h3>바이브코딩 공유</h3>
                            <p>캔바 AI와 바이브코딩으로 웹페이지 완성하기</p>
                        </div>
                    </div>
                    <div class="btn-group">
                        <a href="https://padlet.com/dlrka0131/6-bwwl5nvlo6ohxm4h" target="_blank" class="btn-purple">📌 패들렛 공유관 ↗</a>
                    </div>
                </div>
            </div>

            <footer>
                ✨ <span class="highlight">AI 창작소</span> &nbsp;|&nbsp; Designed & Created by 김정이 선생님 💕
            </footer>
        </div>
    </div>


    <!-- ==================== PAGE 2: 캔바 기획서 (클립보드 디자인) ==================== -->
    <div id="view-canva" class="page-view">
        <div class="top-nav-bar">
            <button onclick="showView('hub')" class="back-btn">
                <i class="fa-solid fa-house"></i> 🏠 메인 수업 허브로 돌아가기
            </button>
            <span style="font-weight: 800; color: #2b3a67; font-size: 15px;">✨ 4차시: 나의 바이브 코딩 기획서</span>
        </div>

        <!-- 클립보드 디자인 래퍼 -->
        <div class="clipboard-frame">
            <div class="clipboard-clip"></div>
            
            <div class="planner-board">
                
                <!-- 상단 타이틀 -->
                <div class="planner-header-area">
                    <h1>✨ 나의 바이브 코딩 기획서</h1>
                    <div class="subtitle">AI와 함께 웹앱을 만들기 전, 내 머릿속 아이디어를 구체화하는 창작 설계도.</div>
                </div>

                <!-- 크리에이터 프로필 -->
                <div class="creator-profile">
                    <div class="profile-title">크리에이터<br>프로필</div>
                    <div class="profile-inputs">
                        <input type="text" id="studentGrade" placeholder="🎓 학년 (예: 6)">
                        <input type="text" id="studentClass" placeholder="🏫 반 (예: 3)">
                        <input type="text" id="studentNumber" placeholder="🔢 번호 (예: 15)">
                        <input type="text" id="studentName" placeholder="👤 이름 (예: 김철수)">
                    </div>
                </div>

                <!-- 메인 콘텐츠 레이아웃 -->
                <div class="layout-grid">
                    
                    <!-- 왼쪽 패널 -->
                    <div class="left-panel">
                        <div class="left-top-grid">
                            
                            <!-- 컨셉 & 타겟 -->
                            <div class="left-col">
                                <div class="section-card">
                                    <div class="section-header header-purple-light">
                                        <span>📌 1. 프로젝트 컨셉</span>
                                        <span>💡</span>
                                    </div>
                                    <div class="section-body">
                                        <input type="text" id="projectTitle" class="input-box" placeholder="예시: 구구단 마스터 게임">
                                    </div>
                                </div>

                                <div class="section-card" style="flex: 1;">
                                    <div class="section-header header-mint">
                                        <span>🎯 3. 타겟 사용자 및 용도</span>
                                    </div>
                                    <div class="section-body">
                                        <input type="text" id="targetUser" class="input-box" placeholder="예시: 초등학생, 자녀 학습용">
                                    </div>
                                </div>
                            </div>

                            <!-- 핵심 기능 TOP 3 -->
                            <div class="left-col">
                                <div class="section-card full-height">
                                    <div class="section-header header-purple-dark">
                                        <span>💡 2. 꼭 넣고 싶은 핵심 기능 (TOP 3)</span>
                                        <span>🎚️</span>
                                    </div>
                                    <div class="section-body" style="justify-content: space-around;">
                                        <div class="feature-item">
                                            <span>1.</span>
                                            <input type="text" id="feature1" class="input-box" placeholder="기능 1 작성">
                                        </div>
                                        <div class="feature-item">
                                            <span>2.</span>
                                            <input type="text" id="feature2" class="input-box" placeholder="기능 2 작성">
                                        </div>
                                        <div class="feature-item">
                                            <span>3.</span>
                                            <input type="text" id="feature3" class="input-box" placeholder="기능 3 작성">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- 바이브 & 컬러 -->
                        <div class="section-card">
                            <div class="section-header header-cyan">
                                <span>🎨 4. 나만의 바이브 (디자인 & 컬러)</span>
                                <span>🖌️</span>
                            </div>
                            <div class="section-body" style="flex-direction: row; gap: 20px;">
                                <input type="text" id="vibeConcept" class="input-box" placeholder="📈 바이브 컨셉 (예: 귀여운, 우주느낌)">
                                <input type="text" id="vibeColor" class="input-box" placeholder="🌈 메인 컬러 (예: 진한 남색)" style="flex: 1;">
                            </div>
                        </div>
                    </div>

                    <!-- 오른쪽 패널 (AI 프롬프트 작업실) -->
                    <div class="right-panel">
                        <div class="section-card full-height">
                            <div class="section-header header-prompt">
                                <span>🤖 5. AI 프롬프트 작업실</span>
                                <span style="background: #1e293b; color: white; padding: 3px 8px; border-radius: 6px; font-size: 13px;">>_</span>
                            </div>
                            <div class="section-body">
                                <textarea id="promptText" class="prompt-textarea" placeholder="[예시] 제목이 '구구단 마스터 게임'인 웹 앱을 만들어줘.
1. 시작 버튼을 누르면 랜덤 구구단 문제가 나온다.
2. 사용자가 정답을 입력하고 확인 버튼을 누르면 정답 여부를 알려준다.
3. 맞힌 개수에 따라 점수가 올라가고 최종 점수가 뜨도록 디자인해줘."></textarea>
                                
                                <div class="button-group">
                                    <button type="button" class="action-btn copy-btn" onclick="copyPrompt()">
                                        📋 프롬프트 복사하기
                                    </button>
                                    <a href="https://www.canva.com" target="_blank" class="action-btn canva-btn">
                                        ✨ 캔바로 이동하기 ↗
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- 하단 안내 문구 -->
                <div class="footer-tip">
                    이 설계도를 완성했다면 이제 프롬프트를 복사하고 캔바로 출동할 시간! 🚀
                </div>

            </div>
        </div>
    </div>


    <!-- ==================== PAGE 3: 투닝 스토리보드 (팝아트 스타일) ==================== -->
    <div id="view-tooning" class="page-view">
        <div class="top-nav-bar">
            <button onclick="showView('hub')" class="back-btn">
                <i class="fa-solid fa-house"></i> 🏠 메인 수업 허브로 돌아가기
            </button>
            <span style="font-weight: 800; color: #1d3557; font-size: 15px;">🎨 2차시: 투닝 4컷 속담툰 기획서</span>
        </div>

        <div class="storyboard-container" id="captureArea">
            <div class="sb-header-box">
                <div class="sb-header-left">
                    <h2>💥 투닝(Tooning) 4컷 속담툰</h2>
                    <div class="sb-student-info">
                        <div class="field-group">
                            <input type="text" style="width: 35px;" placeholder="6">학년
                        </div>
                        <div class="field-group">
                            <input type="text" style="width: 35px;" placeholder="3">반
                        </div>
                        <div class="field-group">
                            <input type="text" style="width: 35px;" placeholder="12">번
                        </div>
                        <div class="field-group" style="margin-left: 5px;">
                            이름: <input type="text" style="width: 80px;" placeholder="홍길동">
                        </div>
                    </div>
                </div>
                <div class="sb-btn-container">
                    <button class="sb-action-btn sb-copy-btn" onclick="copyToClipboard()">📸 기획서 복사</button>
                    <a href="https://padlet.com/dlrka0131/6-bwwl5nvlo6ohxm4h" target="_blank" class="sb-action-btn sb-padlet-btn">📌 패들렛 가기</a>
                    <a href="https://tooning.io" target="_blank" class="sb-action-btn sb-tooning-btn">🚀 투닝 가기</a>
                </div>
            </div>

            <div class="sb-meta-container">
                <div class="sb-meta-field">
                    내가 선택한 속담은?
                    <input type="text" placeholder="예: 개구리 올챙이 적 생각 못 한다">
                </div>
                <div class="sb-meta-field lesson" style="background-color: #FFD60A;">
                    이 속담이 주는 교훈!
                    <input type="text" placeholder="예: 남이 실수할 때 나의 지난날을 떠올리자!">
                </div>
            </div>

            <div class="sb-grid-container">
                <div class="cut-box">
                    <div class="cut-title">🎬 1컷 (기 - 시작)</div>
                    <div class="drawing-tools"><span>마우스로 쓱쓱~✏️</span><button onclick="clearCanvas('canvas1')">지우기</button></div>
                    <div class="drawing-area"><canvas id="canvas1"></canvas></div>
                    <div class="script-area"><textarea placeholder="어떤 장면인가요? 대사나 지문을 적어주세요!"></textarea></div>
                </div>
                <div class="cut-box">
                    <div class="cut-title">🔥 2컷 (승 - 전개)</div>
                    <div class="drawing-tools"><span>마우스로 쓱쓱~✏️</span><button onclick="clearCanvas('canvas2')">지우기</button></div>
                    <div class="drawing-area"><canvas id="canvas2"></canvas></div>
                    <div class="script-area"><textarea placeholder="어떤 장면인가요? 대사나 지문을 적어주세요!"></textarea></div>
                </div>
                <div class="cut-box">
                    <div class="cut-title">⚡ 3컷 (전 - 위기/반전)</div>
                    <div class="drawing-tools"><span>마우스로 쓱쓱~✏️</span><button onclick="clearCanvas('canvas3')">지우기</button></div>
                    <div class="drawing-area"><canvas id="canvas3"></canvas></div>
                    <div class="script-area"><textarea placeholder="어떤 장면인가요? 대사나 지문을 적어주세요!"></textarea></div>
                </div>
                <div class="cut-box">
                    <div class="cut-title">✨ 4컷 (결 - 결말/교훈)</div>
                    <div class="drawing-tools"><span>마우스로 쓱쓱~✏️</span><button onclick="clearCanvas('canvas4')">지우기</button></div>
                    <div class="drawing-area"><canvas id="canvas4"></canvas></div>
                    <div class="script-area"><textarea placeholder="어떤 장면인가요? 대사나 지문을 적어주세요!"></textarea></div>
                </div>
            </div>
        </div>
    </div>

    <!-- 토스트 팝업 (캔바 기획서용 중앙 스케일 애니메이션) -->
    <div id="toastPopup">
        <div class="toast-icon">✔</div>
        <div class="toast-content">
            <div class="toast-title">복사 완료!</div>
            <div id="toastMessage">프롬프트를 성공적으로 복사했습니다.<br>캔바(Canva) AI 창에 <b>Ctrl + V</b> 로 붙여넣으세요!</div>
        </div>
    </div>

    <!-- 스토리보드 성공 모달 -->
    <div class="modal-overlay" id="successModal">
        <div class="modal-box">
            <h3>🎉 캡쳐 완료! BAM!</h3>
            <p>기획서가 이미지로 복사되었습니다!<br><br>👉 <span class="highlight">패들렛(Padlet)</span> 창으로 이동해서<br>글쓰기 칸에 <b>Ctrl + V</b>를 눌러 붙여넣으세요!</p>
            <div class="modal-btn-group">
                <a href="https://padlet.com/dlrka0131/6-bwwl5nvlo6ohxm4h" target="_blank" class="modal-btn primary" onclick="closeModal()">패들렛 출동!</a>
                <button class="modal-btn secondary" onclick="closeModal()">닫기</button>
            </div>
        </div>
    </div>


    <!-- ==================== JavaScript 스크립트 ==================== -->
    <script>
        // Page view navigation switcher
        function showView(viewName) {
            document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
            const targetView = document.getElementById('view-' + viewName);
            if (targetView) {
                targetView.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            if (viewName === 'tooning') {
                setTimeout(resizeAllCanvases, 100);
            }
        }

        // Toast popup
        function showToast(message) {
            const toast = document.getElementById('toastPopup');
            const msgDiv = document.getElementById('toastMessage');
            
            if (message) {
                msgDiv.innerHTML = message;
            } else {
                msgDiv.innerHTML = "프롬프트를 성공적으로 복사했습니다.<br>캔바(Canva) AI 창에 <b>Ctrl + V</b> 로 붙여넣으세요!";
            }
            
            toast.className = "show";
            setTimeout(() => {
                toast.className = toast.className.replace("show", "");
            }, 3000);
        }

        // Copy prompt
        function copyPrompt() {
            const promptInput = document.getElementById('promptText');
            const toastPopup = document.getElementById('toastPopup');
            const toastIcon = document.querySelector('.toast-icon');
            const toastTitle = document.querySelector('.toast-title');

            if (promptInput.value.trim() === "") {
                if (toastPopup) toastPopup.style.borderColor = "#ef4444";
                if (toastIcon) {
                    toastIcon.style.background = "#ef4444";
                    toastIcon.innerText = "!";
                }
                if (toastTitle) {
                    toastTitle.innerText = "알림";
                    toastTitle.style.color = "#ef4444";
                }
                showToast("프롬프트 내용이 비어있어요!<br>내용을 먼저 입력해 주세요.");
                return;
            }
            
            if (toastPopup) toastPopup.style.borderColor = "#10b981";
            if (toastIcon) {
                toastIcon.style.background = "#10b981";
                toastIcon.innerText = "✔";
            }
            if (toastTitle) {
                toastTitle.innerText = "복사 완료!";
                toastTitle.style.color = "#10b981";
            }

            navigator.clipboard.writeText(promptInput.value).then(() => {
                showToast();
            }).catch(err => {
                showToast("복사에 실패했어요.<br>직접 텍스트를 드래그해서 복사해 주세요.");
            });
        }

        // Canvas Drawing Engine
        const canvases = ['canvas1', 'canvas2', 'canvas3', 'canvas4'];
        
        function initCanvas(id) {
            const canvas = document.getElementById(id);
            if (!canvas) return;
            const container = canvas.parentElement;
            const ctx = canvas.getContext('2d');

            function resize() {
                if (container.clientWidth > 0 && container.clientHeight > 0) {
                    canvas.width = container.clientWidth;
                    canvas.height = container.clientHeight;
                    ctx.strokeStyle = '#1a1a1a';
                    ctx.lineWidth = 4;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                }
            }

            resize();
            canvas._resizeFunc = resize;

            let painting = false;

            function startPosition(e) {
                painting = true;
                draw(e);
            }

            function endPosition() {
                painting = false;
                ctx.beginPath();
            }

            function draw(e) {
                if (!painting) return;
                const rect = canvas.getBoundingClientRect();
                let clientX = e.clientX || (e.touches && e.touches[0].clientX);
                let clientY = e.clientY || (e.touches && e.touches[0].clientY);
                let x = clientX - rect.left;
                let y = clientY - rect.top;

                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            }

            canvas.addEventListener('mousedown', startPosition);
            canvas.addEventListener('mouseup', endPosition);
            canvas.addEventListener('mousemove', draw);

            canvas.addEventListener('touchstart', (e) => { startPosition(e); }, { passive: true });
            canvas.addEventListener('touchend', endPosition);
            canvas.addEventListener('touchmove', (e) => { draw(e); }, { passive: true });
        }

        function resizeAllCanvases() {
            canvases.forEach(id => {
                const canvas = document.getElementById(id);
                if (canvas && canvas._resizeFunc) canvas._resizeFunc();
            });
        }

        function clearCanvas(id) {
            const canvas = document.getElementById(id);
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        function copyToClipboard() {
            document.querySelectorAll('textarea').forEach(ta => {
                ta.innerHTML = ta.value;
            });

            const target = document.getElementById('captureArea');
            if (window.html2canvas) {
                html2canvas(target, { scale: 2, backgroundColor: '#ffffff' }).then(canvas => {
                    canvas.toBlob(blob => {
                        try {
                            const item = new ClipboardItem({ "image/png": blob });
                            navigator.clipboard.write([item]).then(() => {
                                document.getElementById('successModal').style.display = 'flex';
                            }).catch(() => {
                                alert("복사에 실패했습니다. 브라우저 권한을 확인해주세요.");
                            });
                        } catch (e) {
                            alert("이 브라우저는 클립보드 직접 복사를 지원하지 않습니다.");
                        }
                    });
                });
            } else {
                alert("이미지 생성 라이브러리가 로드되지 않았습니다.");
            }
        }

        function closeModal() {
            document.getElementById('successModal').style.display = 'none';
        }

        window.onload = function() {
            canvases.forEach(id => initCanvas(id));
        };
    </script>
</body>
</html>`;
