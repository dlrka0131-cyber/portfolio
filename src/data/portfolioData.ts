import { PortfolioCategory, PortfolioItem } from '../types';

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    key: 'grade12',
    title: '초등 1~2학년 커리큘럼',
    icon: '🐣',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    items: [
      {
        id: 'entry-basic',
        title: '1학년 엔트리기초',
        type: 'lesson_plan',
        typeIcon: '🧩',
        categoryKey: 'grade12',
        categoryTitle: '초등 1학년',
        summary: '초등 1학년 맞춤형 8차시 블록코딩 기초 프로젝트',
        targetGrade: '초등 1학년 맞춤',
        schoolLocation: '솔빛초, 청계초 등 출강',
        detailDescription: '마우스 조작부터 애니메이션, 좌표 점프, 조건문, 복제본 활용 오락실 게임까지 8차시에 걸쳐 재미있는 프로젝트로 코딩 기본기를 세웁니다.',
        tags: ['엔트리기초', '8차시완성', '블록코딩', '저학년맞춤'],
        imageUrl: '/grade12.jpg',
        lessonOutline: [
          { lessonNumber: 1, title: '01차시 - 첫수업 마우스 연습', objective: '마우스 클릭, 드래그 & 캐릭터 기본 이동 조작법' },
          { lessonNumber: 2, title: '02차시 - 화면 구성하기', objective: '다양한 엔트리 오브젝트 배치 및 무대 배경 연출' },
          { lessonNumber: 3, title: '03차시 - 공 튕기기', objective: '벽 판정 블록을 활용한 튀어 다니는 공 코딩' },
          { lessonNumber: 4, title: '04차시 - 강아지 산책', objective: '다음 모양 바꾸기 블록으로 귀여운 산책 애니메이션' },
          { lessonNumber: 5, title: '05차시 - 밤 하늘', objective: '도장 찍기 기능을 활용해 반짝이는 밤하늘 아트 코딩' },
          { lessonNumber: 6, title: '06차시 - Y좌표 점프', objective: 'Y좌표 개념 이해 및 스페이스바 점프 동작 구현' },
          { lessonNumber: 7, title: '07차시 - 이상한 나라의 엔트리봇', objective: '만약 ~라면 판단 조건문으로 미로 탈출 로직 완성' },
          { lessonNumber: 8, title: '08차시 - 풍선 터뜨리기', objective: '풍선 복제본 생성 & 클릭 터뜨리기 미니 아케이드 게임' }
        ]
      },
      {
        id: 'solbit-2-grade',
        title: '2학년 엔트리활용',
        type: 'lesson_plan',
        typeIcon: '🎮',
        categoryKey: 'grade12',
        categoryTitle: '초등 2학년',
        summary: '컴퓨팅 사고력(CT) 및 문제 해결력을 함양하는 8차시 실습형 엔트리 블록코딩 프로젝트',
        targetGrade: '초등 2학년 맞춤',
        schoolLocation: '솔빛초, 청계초 등 출강',
        detailDescription: '초등 2학년 학생들의 발달 단계에 맞춘 컴퓨팅 사고력(Computational Thinking) 중심 교육 과정입니다. 마우스 좌표 인식, 키보드 이벤트, 실시간 타이머, 조건 판단문, 변수 데이터 연산, 무작위 난수 및 동적 객체 복제본 알고리즘을 8가지 창의 프로젝트로 익힙니다. 게임을 직접 설계하고 오류를 해결(디버깅)하며 창의적 문제 해결 능력과 논리 구조화 역량을 기릅니다.',
        tags: ['엔트리활용', '컴퓨팅사고력', '8차시완성', '알고리즘', '창의융합'],
        imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
        lessonOutline: [
          { lessonNumber: 1, title: '01차시 - 숨은그림찾기 (좌표 & 클릭 이벤트)', objective: '마우스 X, Y 좌표 구조 이해 및 좌표 감지를 통한 데이터 매칭 알고리즘' },
          { lessonNumber: 2, title: '02차시 - 우주여행 (키보드 이벤트 & 방향 알고리즘)', objective: '키보드 방향키 입력 제어 및 가속도와 방향 전환을 활용한 오브젝트 이동' },
          { lessonNumber: 3, title: '03차시 - 환경보호 분리수거 (오브젝트 충돌 감지)', objective: '오브젝트 간 닿았는가 판단 조건문 및 친환경 주제 연계 데이터 처리' },
          { lessonNumber: 4, title: '04차시 - 두더지잡기 (실시간 타이머 & 난수 알고리즘)', objective: '초시계 기능을 활용한 제어 로직 및 무작위 위치 좌표 출현 알고리즘' },
          { lessonNumber: 5, title: '05차시 - 미로탈출 (다중 조건문 & 예외 처리)', objective: '경계면 벽 충돌 감지 및 초기화 반환 기능을 갖춘 정교한 탈출 알고리즘' },
          { lessonNumber: 6, title: '06차시 - 점핑곰 (변수 연산 & 중력/점프 메커니즘)', objective: '점수 및 체력 변수의 데이터 가공과 Y축 위치 변화를 활용한 물리 점프 로직' },
          { lessonNumber: 7, title: '07차시 - 펭귄게임 (동적 장애물 & 난수 회피)', objective: '상단 낙하 장애물 동적 난수 생성 및 난이도 조절 회피 알고리즘' },
          { lessonNumber: 8, title: '08차시 - 우주전쟁 (동적 객체 복제본 & 신호 제어)', objective: '복제본 생성과 소멸 알고리즘 및 신호 보내기를 활용한 캡스톤 종합 프로젝트' }
        ]
      },
      {
        id: 'delight-3d',
        title: '3D딜라이텍스 VR 메타버스',
        type: 'lesson_plan',
        typeIcon: '🥽',
        categoryKey: 'grade12',
        categoryTitle: '초등 1학년',
        summary: '3D 가상 공간에서 창의 아일랜드와 박물관을 건축하는 5차시 VR 체험',
        targetGrade: '초등 1~2학년 맞춤',
        schoolLocation: '솔빛초등 및 주변 초교',
        detailDescription: '3D 딜라이텍스 플랫폼을 활용하여 시점 이동, 3D 지형 제작, 탐험 아일랜드 구축 및 메타버스 박물관을 만들어 가상 현실 발표회를 진행합니다.',
        tags: ['3D딜라이텍스', 'VR메타버스', '5차시완성', '공간지각력', '가상박물관'],
        imageUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1000&q=80',
        lessonOutline: [
          { lessonNumber: 1, title: '1차시 - VR 소개 및 기본기', objective: 'VR 가상현실 이해, 3D 시점 이동, 카메라, 오브젝트 생성' },
          { lessonNumber: 2, title: '2차시 - 탐험 프로젝트 제작', objective: '3D 지형 디자인 및 다양한 탐험 요소(동물, 보물) 설치' },
          { lessonNumber: 3, title: '3차시 - 탐험 완성 및 발표', objective: '캐릭터 동선 완성 및 나만의 3D 탐험 세계 친구들 시연' },
          { lessonNumber: 4, title: '4차시 - 메타버스 박물관 프로젝트', objective: '3D 공간에 박물관 건설 및 역사/예술/우주 전시품배치' },
          { lessonNumber: 5, title: '5차시 - 메타버스 박물관 도슨트', objective: '3D 박물관 안내 가이드(도슨트) 라이브 발표회' }
        ]
      },
      {
        id: 'hello-maple',
        title: '헬로메이플',
        type: 'lesson_plan',
        typeIcon: '🍁',
        categoryKey: 'grade12',
        categoryTitle: '초등 1~2학년',
        summary: '넥슨 헬로메이플 플랫폼을 활용한 나만의 2D 메타버스 월드 5차시',
        targetGrade: '초등 1~2학년 / 전학년',
        detailDescription: '아바타 커스텀부터 나만의 맵 배경 제작, 음식 먹기 상호작용, 순간이동 포털 코딩 및 공개 맵 배포까지 메타버스 제작의 모든 것을 배웁니다.',
        tags: ['헬로메이플', '넥슨코딩', '5차시완성', '메타버스월드', '아바타'],
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
        lessonOutline: [
          { lessonNumber: 1, title: '01차시 - 헬로메이플 로그인 & 아바타 꾸미기', objective: '나만의 아바타 만들기 (캐릭터 헤어·의상·액세서리 커스텀)', defaultImage: '/images/hellomaple_1.svg' },
          { lessonNumber: 2, title: '02차시 - 화면구성 & 맵꾸미기', objective: '내 맘대로 만드는 메이플 월드 (에디터 구조 & 지형 타일 배치)', defaultImage: '/images/hellomaple_2.svg' },
          { lessonNumber: 3, title: '03차시 - 오브젝트 상호작용 익히기', objective: '아바타와 음식의 상호작용 구현하기 (이펙트 & 스코어 상승)', defaultImage: '/images/hellomaple_3.svg' },
          { lessonNumber: 4, title: '04차시 - 공간 이동 포털 마법 배우기', objective: '\'신호 보내기\'를 활용한 위치 이동 로직 구현하기', defaultImage: '/images/hellomaple_4.svg' },
          { lessonNumber: 5, title: '05차시 - 새로운 월드로 떠나는 장면 전환 코딩', objective: '장면(Map) 추가 및 구성하기 (멀티 스테이지 메타버스 완성)', defaultImage: '/images/hellomaple_5.svg' }
        ]
      },
      {
        id: 'gallery-1',
        title: '활동갤러리',
        type: 'gallery_link',
        typeIcon: '📷',
        categoryKey: 'grade12',
        categoryTitle: '초등 1~2학년',
        summary: '초등 1~2학년 학생들의 생생한 수업 장면과 창작 작품 갤러리',
        targetGrade: '초등 1~2학년',
        detailDescription: '아이들이 집중하고 즐거워하는 수업 모습과 기발한 학생 작품 사진을 확인하세요.',
        tags: ['수업현장', '활동사진', '생생갤러리', '초등1~2학년'],
        imageUrl: '/images/museum (1).JPG'
      }
    ]
  },
  {
    key: 'grade34',
    title: '초등 3~4학년 커리큘럼',
    icon: '🚀',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    items: [
      {
        id: 'entry-coding',
        title: '3학년 엔트리코딩',
        type: 'lesson_plan',
        typeIcon: '💻',
        categoryKey: 'grade34',
        categoryTitle: '초등 3~4학년',
        summary: '조건문, 변수, 신호보내기 등 컴퓨팅 사고력을 넓히는 8차시 게임 심화 과정',
        targetGrade: '초등 3~4학년',
        detailDescription: '엔트리의 신호 보내기/받기, 변수와 조건문을 결합하여 점수 및 타이머가 작동하는 멋진 아케이드 게임, 슈팅 게임 및 인터랙티브 퀴즈를 완성하는 8차시 커리큘럼입니다.',
        tags: ['엔트리코딩', '8차시완성', '게임제작', '변수와조건문', '알고리즘', '초등3~4학년'],
        imageUrl: '/grade34.jpg',
        lessonOutline: [
          { lessonNumber: 1, title: '01차시 - 엔트리 기초 & 좌표 이해', objective: '오브젝트 배치, 이동 방향 및 X/Y 좌표 동작 코딩' },
          { lessonNumber: 2, title: '02차시 - 오브젝트 신호 인터랙션', objective: '신호 보내기/받기로 화면 전환 및 캐릭터 대화 연출' },
          { lessonNumber: 3, title: '03차시 - 조건문 키 컨트롤 & 미로 탐험', objective: '방향키 조작 및 벽/장애물 충돌 감지 조건문 작성' },
          { lessonNumber: 4, title: '04차시 - 변수를 활용한 점수/타이머', objective: '점수 획득, 시간 제한 및 게임오버 처리 로직 완성' },
          { lessonNumber: 5, title: '05차시 - 판단문과 난수(랜덤) 게임', objective: '무작위 난수를 활용한 스피드 반응속도 & 퀴즈 게임' },
          { lessonNumber: 6, title: '06차시 - 복제본 생성과 슈팅 메커니즘', objective: '총알 발사 및 적 오브젝트 무한 복제본 생성 제어' },
          { lessonNumber: 7, title: '07차시 - 아이템 획득 & 보스전 제작', objective: '체력 바 구현, 파워업 아이템 및 보스 패턴 구현' },
          { lessonNumber: 8, title: '08차시 - 나만의 창의 게임 프로젝트 시연', objective: '버그 수정, 사운드 효과 추가 및 친구들과 시연회' }
        ]
      },
      {
        id: 'ai-tech',
        title: '4학년 AI 인공지능',
        type: 'lesson_plan',
        typeIcon: '🤖',
        categoryKey: 'grade34',
        categoryTitle: '초등 3~4학년',
        summary: '카메라 지도학습과 비전/음성인식 기술을 직접 체험하고 개발하는 8차시 미래 AI 수업',
        targetGrade: '초등 3~4학년',
        detailDescription: '웹캠으로 사물과 이미지 데이터를 직접 수집해 인공지능 모델을 훈련시키고, 얼굴 표정 감지 및 음성 명령 제어를 실습하는 8차시 알찬 인공지능 프로젝트입니다.',
        tags: ['4학년 AI 인공지능', '8차시완성', '머신러닝', '비전인식', '음성제어', '미래기술'],
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
        lessonOutline: [
          { lessonNumber: 1, title: '01차시 - 인공지능 첫만남', objective: '인공지능의 개념과 기본 원리, 우리 생활 속 AI 사례 탐구' },
          { lessonNumber: 2, title: '02차시 - 머신러닝 티처블 머신으로 동물상 테스트 만들기', objective: '이미지 데이터 수집 및 티처블 머신 학습으로 나만의 동물상 테스트 제작' },
          { lessonNumber: 3, title: '03차시 - 얼굴인식 AR얼굴 Snow앱 만들기', objective: '얼굴 키포인트 인식 기술로 캐릭터 스티커 및 재미있는 AR 스노우 효과 연출' },
          { lessonNumber: 4, title: '04차시 - 사람인식으로 하늘에서 음식이 내린다면', objective: '카메라 사람 객체 인식으로 하늘에서 떨어지는 음식을 받아먹는 AI 포획 게임' },
          { lessonNumber: 5, title: '05차시 - 동작인식으로 무궁화꽃이 피었습니다', objective: '포즈 감지 머신러닝을 활용해 신체 움직임을 판별하는 인터랙티브 게임' },
          { lessonNumber: 6, title: '06차시 - 문자인식으로 클린봇 만들기', objective: '텍스트 OCR 문자인식과 필터링 로직으로 나쁜 말을 감지하는 클린봇 제작' },
          { lessonNumber: 7, title: '07차시 - 생성형 AI로 나의 미래 모습 제작', objective: '프롬프트와 생성형 인공지능 도구를 활용해 나의 멋진 미래 모습 디자인' },
          { lessonNumber: 8, title: '08차시 - 인공지능 윤리', objective: 'AI 딥페이크, 저작권, 올바른 디지털 인공지능 활용 윤리 탐구' }
        ]
      },
      {
        id: 'padlet-34',
        title: '패들렛 (padlet)',
        type: 'gallery_link',
        typeIcon: '📌',
        categoryKey: 'grade34',
        categoryTitle: '초등 3~4학년',
        summary: '초등 3~4학년 학생들의 수업 과제 및 창작물 공유 패들렛(Padlet) 게시판',
        targetGrade: '초등 3~4학년',
        detailDescription: '학생들의 코딩 과제, 아이디어 구상안, 작품 이미지 및 피드백을 실시간으로 공유하고 소통하는 온라인 활동 패들렛 보드입니다.',
        tags: ['패들렛 (padlet)', 'Padlet', '학생작품모음', '온라인보드', '초등3~4학년'],
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
        fileDownloadUrl: 'https://padlet.com/dlrka0131/ai-c1yapf5jriur6rav'
      },
      {
        id: 'gallery-2',
        title: '활동갤러리',
        type: 'gallery_link',
        typeIcon: '📷',
        categoryKey: 'grade34',
        categoryTitle: '초등 3~4학년',
        summary: '초등 3~4학년 학생들의 생생한 수업 장면과 창작 작품 갤러리',
        targetGrade: '초등 3~4학년',
        detailDescription: '아이들이 집중하고 즐거워하는 수업 모습과 기발한 학생 작품 사진을 확인하세요.',
        tags: ['수업현장', '활동사진', '생생갤러리', '초등3~4학년'],
        imageUrl: '/images/ar (1).jpg'
      }
    ]
  },
  {
    key: 'grade56',
    title: '초등 5~6학년 커리큘럼',
    icon: '⚡',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    items: [
      {
        id: 'hamster-robot',
        title: '햄스터봇 로봇코딩',
        type: 'lesson_plan',
        typeIcon: '🤖',
        categoryKey: 'grade56',
        categoryTitle: '초등 5~6학년',
        summary: '센서 컨트롤과 자율주행 알고리즘을 체득하는 피지컬 로봇 수업',
        targetGrade: '초등 5~6학년',
        detailDescription: '피지컬 로봇 햄스터봇의 근접 센서, 라인 트레이싱 바닥 센서, LED 및 버저 소리를 제어하며 지능형 로봇 및 축구 경기 알고리즘을 만듭니다.',
        tags: ['햄스터봇', '로봇코딩', '자율주행', '라인트레이서', '피지컬SW'],
        imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1000&q=80',
        lessonOutline: [
          { lessonNumber: 1, title: '햄스터 모터 & LED 제어', objective: '블루투스 통신 연결 및 바퀴와 LED 구동' },
          { lessonNumber: 2, title: '지능형 미로 탐험', objective: '근접 센서로 장애물을 감지해 자율 주행 회피' },
          { lessonNumber: 3, title: '라인 트레이서 경주', objective: '바닥 센서 값을 판별하여 곡선 트랙 주행' },
          { lessonNumber: 4, title: '팀 햄스터 로봇 축구 대회', objective: '컨트롤러 조종 및 전략적 모듈 경기 수행' }
        ]
      },
      {
        id: 'neobot-robot',
        title: '네오봇 로봇코딩',
        type: 'lesson_plan',
        typeIcon: '⚙️',
        categoryKey: 'grade56',
        categoryTitle: '초등 5~6학년',
        summary: '초등 6학년 정규 실과 교과서 등재 공인 교구 네오봇 스마트 코딩',
        targetGrade: '초등 5~6학년',
        detailDescription: '전국 초등학교 6학년 실과 교과서에 채택된 네오봇 교구를 결합하여 청소 로봇, 자동 스마트 도어, 라인 주행 로봇 등 실공학적 기구를 구현합니다.',
        tags: ['네오봇', '실과교과서', '초6정규', '스마트로봇', '공학코딩'],
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
        lessonOutline: [
          { lessonNumber: 1, title: '네오봇 메커니즘과 연동', objective: 'CPU 블록, 서보모터 및 제어 시스템 연결' },
          { lessonNumber: 2, title: '스마트 리모컨 조종 로봇', objective: '스마트폰 블루투스 통신 기반 주행 모듈' },
          { lessonNumber: 3, title: '스마트 센서 자동문', objective: '적외선 접근 감지로 정밀하게 작동하는 자동문' },
          { lessonNumber: 4, title: '자율주행 스마트 로봇', objective: '센서 피드백을 통해 장애물을 차단하는 자율 로봇' }
        ]
      },
      {
        id: 'ai-literacy',
        title: 'AI인공지능 리터러쉬',
        type: 'lesson_plan',
        typeIcon: '🔮',
        categoryKey: 'grade56',
        categoryTitle: '초등 5~6학년',
        summary: '생성형 AI를 활용한 미래발명품 제작, 투닝 4컷 속담툰 및 캔바 바이브 코딩 실습',
        targetGrade: '초등 5~6학년',
        detailDescription: '생성형 AI와 함께하는 미래발명품 기획·제작, 투닝(Tooning) 툴을 활용한 4컷 만화 속담툰 제작, 캔바(Canva) AI와 바이브코딩으로 만드는 나만의 웹서비스 구축 프로젝트입니다.',
        tags: ['AI리터러쉬', '미래발명품', '4컷속담툰', '투닝', '캔바바이브코딩'],
        imageUrl: '/grade56.jpg',
        lessonOutline: [
          { lessonNumber: 1, title: '01차시 - AI와 함께 하는 미래발명품 제작하기', objective: '생성형 AI 프롬프트와 아이디어 기획으로 미래 발명품 디자인 및 제작' },
          { lessonNumber: 2, title: '02차시 - AI와 함께 만드는 4컷 만화 속담 툰 투닝', objective: '투닝(Tooning) AI 만화 툴을 활용한 4컷 속담 웹툰 스토리보드 제작' },
          { lessonNumber: 3, title: '03차시 - AI와 함께 만드는 나만의 웹서비스 캔바바이브코딩', objective: '캔바(Canva) AI 매직미디어와 바이브코딩을 활용한 나만의 웹 서비스 구축' }
        ]
      },
      {
        id: 'webapp-56',
        title: '활동웹앱',
        type: 'gallery_link',
        typeIcon: '🌐',
        categoryKey: 'grade56',
        categoryTitle: '초등 5~6학년',
        summary: '초등 5~6학년 학생들이 직접 제작하고 체험하는 인터랙티브 활동 웹앱 프로젝트',
        targetGrade: '초등 5~6학년',
        detailDescription: '고학년 학생들이 개발한 AI 리터러쉬 앱, 로봇 시뮬레이터 및 실생활 문제 해결 인터랙티브 웹 애플리케이션 연결 서비스입니다.',
        tags: ['활동웹앱', '웹앱연결', '학생창작앱', '인터랙티브SW', '초등5~6학년'],
        imageUrl: '/images/future (1).jpg',
        fileDownloadUrl: ''
      },
      {
        id: 'padlet-56',
        title: '패들렛 (padlet)',
        type: 'gallery_link',
        typeIcon: '📌',
        categoryKey: 'grade56',
        categoryTitle: '초등 5~6학년',
        summary: '초등 5~6학년 학생들의 수업 과제 및 창작물 공유 패들렛(Padlet) 게시판',
        targetGrade: '초등 5~6학년',
        detailDescription: '학생들의 코딩 과제, 속담툰 기획서, 바이브코딩 공유작품을 실시간으로 공유하고 소통하는 온라인 활동 패들렛 보드입니다.',
        tags: ['패들렛 (padlet)', 'Padlet', '학생작품모음', '온라인보드', '초등5~6학년'],
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
        fileDownloadUrl: 'https://padlet.com/dlrka0131/6-bwwl5nvlo6ohxm4h'
      },
      {
        id: 'gallery-3',
        title: '활동갤러리',
        type: 'gallery_link',
        typeIcon: '📷',
        categoryKey: 'grade56',
        categoryTitle: '초등 5~6학년',
        summary: '초등 5~6학년 학생들의 생생한 수업 장면과 창작 작품 갤러리',
        targetGrade: '초등 5~6학년',
        detailDescription: '아이들이 집중하고 즐거워하는 수업 모습과 기발한 학생 작품 사진을 확인하세요.',
        tags: ['수업현장', '활동사진', '생생갤러리', '초등5~6학년'],
        imageUrl: '/images/future (1).jpg'
      }
    ]
  }
];
