import { GradeCurriculum } from '../types';

export const CURRICULUM_DATA: GradeCurriculum[] = [
  {
    id: 'solbit-1',
    gradeTitle: '솔빛초 1학년 (엔트리 & 3D 메타버스)',
    targetAge: '솔빛초등학교 1학년',
    badgeText: '솔빛초 1학년 맞춤 🌱',
    themeColor: 'from-cyan-100 to-teal-200 border-cyan-300 text-teal-800',
    accentColor: 'bg-cyan-500',
    bgGradient: 'bg-gradient-to-br from-cyan-50 to-teal-100/60',
    icon: '🏫',
    summary: '솔빛초등학교 1학년 맞춤형 블록코딩과 3D 딜라이텍스 VR/메타버스 탐험 수업입니다.',
    keyFeatures: [
      '엔트리 블록을 활용한 차근차근 기초 프로그래밍 (8차시)',
      '3D 딜라이텍스를 활용한 가상현실(VR) & 메타버스 박물관 제작 (5차시)',
      '마우스 연습부터 조건문, 좌표, 복제본까지 자연스러운 알고리즘 학습',
      '직접 만든 3D 공간과 가상 박물관을 친구들과 함께 발표하는 자신감'
    ],
    recommendedTools: ['엔트리 (Entry)', '3D 딜라이텍스 (Delightex)', 'VR 메타버스'],
    steps: [
      {
        stepNumber: 1,
        title: '엔트리 기초 & 애니메이션 프로젝트',
        subtitle: '1학년 엔트리 8차시 커리큘럼',
        description: '컴퓨터 마우스 조작부터 애니메이션, 좌표 점프, 조건문, 복제본 활용 게임까지 기초를 탄탄하게 세웁니다.',
        tools: ['엔트리 (Entry)'],
        duration: '총 8차시',
        outcomes: [
          '마우스 조작 및 블록 결합 완벽 숙지',
          '엔트리 8종 미니 프로젝트 완수 (공튕기기, 강아지산책, 밤하늘, 점프, 풍선터뜨리기)'
        ],
        icon: '💻',
        sessions: [
          { sessionNumber: 1, title: '01차시 - 첫수업 마우스 연습 (자유꾸미기 활동)', concept: '마우스 조작 & 클릭', description: '컴퓨터 기본 조작법을 익히고 마우스 클릭과 드래그로 캐릭터를 직접 움직여봅니다.', defaultImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 2, title: '02차시 - 화면 구성하기 (이동 방향 코딩)', concept: '오브젝트 배치 & 배경', description: '다양한 엔트리 캐릭터(오브젝트)를 화면에 배치하고 멋진 무대 배경을 연출합니다.', defaultImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 3, title: '03차시 - 공 튕기기 (애니메이션 만들기)', concept: '벽 판정 & 자동 이동', description: '화면 끝에 닿으면 튕기는 블록을 사용하여 튀어 다니는 재미있는 공을 만듭니다.', defaultImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 4, title: '04차시 - 강아지 산책 (점프 만들기)', concept: '다음 모양 바꾸기 & 점프', description: '연속된 모양 바꾸기 블록으로 귀여운 강아지가 살아 움직이듯 산책하고 점프하는 애니메이션을 구현합니다.', defaultImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 5, title: '05차시 - 밤 하늘 만들기 (도장 찍기 배우기)', concept: '도장 찍기 기능', description: '도장 찍기 기능을 활용하여 반짝이는 별과 달을 밤하늘 도화지에 마음껏 찍어봅니다.', defaultImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 6, title: '06차시 - Y좌표 점프 (우주인 3D 코딩)', concept: '좌표 & 점프 동작', description: 'Y좌표의 개념을 이해하고 스페이스바를 누르면 통통 점프하는 캐릭터를 코딩합니다.', defaultImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 7, title: '07차시 - 이상한 나라의 엔트리봇', concept: '조건문 / 판단', description: '만약 ~라면 판단 블록을 배워 장애물을 피하고 미로를 탈출하는 엔트리봇을 만듭니다.', defaultImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 8, title: '08차시 - 풍선 터뜨리기', concept: '복제본 & 클릭 이벤트', description: '풍선 복제본이 계속 생겨나고 클릭하면 터지는 미니 아케이드 게임을 완성합니다.', defaultImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80' }
        ]
      },
      {
        stepNumber: 2,
        title: '3D 딜라이텍스 메타버스 & VR 탐험',
        subtitle: '3D 딜라이텍스 5차시 커리큘럼',
        description: '3D 가상 공간에서 나만의 탐험 세계와 메타버스 박물관을 건축하고 VR 발표회를 가집니다.',
        tools: ['3D 딜라이텍스', 'VR 헤드셋 / 3D Viewer'],
        duration: '총 5차시',
        outcomes: [
          '3D 공간 감각과 디지털 그래픽 레이아웃 습득',
          '나만의 메타버스 3D 박물관 제작 및 도슨트 발표 경험'
        ],
        icon: '🥽',
        sessions: [
          { sessionNumber: 1, title: '1차시 - VR 소개 및 기본 기능 익히기', concept: 'VR 가상현실 입문', description: 'VR 공간의 개념을 이해하고 3D 시점 이동, 카메라인터페이스, 오브젝트 생성 기본기를 습득합니다.', defaultImage: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 2, title: '2차시 - 탐험 프로젝트 제작', concept: '3D 아일랜드 탐험 공간', description: '지형을 다듬고 다양한 탐험 요소(동물, 보물, 건물)를 3D 공간에 자유롭게 디자인합니다.', defaultImage: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 3, title: '3차시 - 탐험 프로젝트 완성 및 발표', concept: '상호작용 연출 & 시연', description: '탐험 공간에 캐릭터 동선을 완성하고 친구들 앞에서 나만의 3D 탐험 세계를 소개합니다.', defaultImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 4, title: '4차시 - 메타버스 박물관 프로젝트', concept: '3D 전시관 설계', description: '3D 공간에 박물관 건물을 세우고 역사/예술/우주 테마 전시품을 기획·배치합니다.', defaultImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80' },
          { sessionNumber: 5, title: '5차시 - 메타버스 박물관 완성 및 발표', concept: '메타버스 도슨트 라이브', description: '완성된 3D 메타버스 박물관에 입장하여 안내 가이드(도슨트)가 되어 발표회를 가집니다.', defaultImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80' }
        ]
      }
    ]
  },
  {
    id: 'solbit-2',
    gradeTitle: '초등 2학년 엔트리활용',
    targetAge: '초등 2학년 대상',
    badgeText: '초등 2학년 심화 🌿',
    themeColor: 'from-amber-100 to-orange-200 border-amber-300 text-amber-900',
    accentColor: 'bg-amber-500',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-100/60',
    icon: '🎮',
    summary: '초등 2학년 학생의 컴퓨팅 사고력(CT) 및 문제해결력을 신장하기 위해 순차, 조건, 반복, 변수, 난수, 복제본 개념을 체계적으로 실습하는 8차시 심화 과정입니다.',
    curriculumImageKey: 'curriculum_img_solbit2',
    keyFeatures: [
      '마우스 좌표, 방향키 제어, 실시간 초시계 타이머 등 컴퓨팅 기초 원리 체득',
      '다중 조건문(if-else), 예외 처리(충돌 감지) 및 알고리즘 효율성 습득',
      '변수 연산, 무작위 난수 및 동적 객체 복제본 알고리즘을 활용한 창의적 프로젝트 완수',
      '프로그램 구조화 및 자기주도적 디버깅(오류 수정) 능력 배양'
    ],
    recommendedTools: ['엔트리 (Entry 3.0)', '주차별 전문 교안'],
    steps: [
      {
        stepNumber: 1,
        title: '초등 2학년 엔트리 8차시 심화 코딩 과정',
        subtitle: '인터랙티브 SW 알고리즘 실습',
        description: '2학년 눈높이에 최적화된 컴퓨팅 사고력(Computational Thinking) 중심의 프로젝트 학습(PBL) 과정입니다.',
        tools: ['엔트리 (Entry)'],
        duration: '총 8차시',
        outcomes: [
          '8가지 분야별 창의 SW 응용 프로젝트 완성',
          '좌표, 타이머, 조건문, 변수, 난수, 복제본 개념 정복'
        ],
        icon: '🕹️',
        sessions: [
          { sessionNumber: 1, title: '01차시 - 숨은그림찾기', concept: '마우스 좌표 체계 & 정답 판단', description: '화면 내 X,Y 좌표 감지를 통해 정답 위치 클릭 시 이벤트 처리 및 데이터 카운트 알고리즘' },
          { sessionNumber: 2, title: '02차시 - 우주여행', concept: '키보드 이벤트 & 방향 알고리즘', description: '화살표 키 입력 이벤트 제어로 가속도 및 방향 전환을 반영한 우주 비행 로직' },
          { sessionNumber: 3, title: '03차시 - 환경보호 분리수거', concept: '오브젝트 충돌 감지 & 조건문', description: '객체 간 닿았는가 판정을 활용하여 정해진 분류 기준에 따라 점수가 증가하는 알고리즘' },
          { sessionNumber: 4, title: '04차시 - 두더지잡기 (초시계)', concept: '실시간 타이머 & 무작위 난수', description: '초시계 기능을 활용한 정해진 시간 제어 및 무작위 위치 좌표 출현 로직' },
          { sessionNumber: 5, title: '05차시 - 미로탈출 (다중 조건문)', concept: '경계면 벽 감지 & 예외 처리', description: '미로 벽 충돌 조건 감지 시 초기 위치로 돌아가는 예외 처리 및 탈출 로직' },
          { sessionNumber: 6, title: '06차시 - 점핑곰 (변수 연산)', concept: '변수 가공 & 물리 점프 운동', description: '점수와 체력 변수를 실시간 연산하고 Y축 좌표 연산을 활용한 물리 점프 구현' },
          { sessionNumber: 7, title: '07차시 - 펭귄게임 (난수 회피)', concept: '동적 장애물 & 회피 알고리즘', description: '상단 낙하 장애물 동적 난수 생성 및 난이도 조절을 통한 장애물 회피 연산' },
          { sessionNumber: 8, title: '08차시 - 우주전쟁 (동적 복제본)', concept: '객체 복제본 생성 & 신호 제어', description: '미사일 복제본 생성 및 소멸 메커니즘, 신호 전달을 활용한 캡스톤 종합 프로젝트' }
        ]
      }
    ]
  },
  {
    id: 'hello-maple',
    gradeTitle: '헬로메이플 (메타버스 코딩)',
    targetAge: '초등학생 & 중학생 메타버스 과정',
    badgeText: '넥슨 헬로메이플 🍁',
    themeColor: 'from-orange-100 to-rose-200 border-orange-300 text-rose-800',
    accentColor: 'bg-orange-500',
    bgGradient: 'bg-gradient-to-br from-orange-50 to-amber-100/60',
    icon: '🍁',
    summary: '넥슨 헬로메이플(HelloMaple) 에디터를 활용하여 나만의 2D 메타버스 월드를 구축하고, 아바타 커스텀, 음식 상호작용, 순간 이동 포털 및 장면 전환 코딩을 배우는 5차시 실습 커리큘럼입니다.',
    curriculumImageKey: 'curriculum_img_hellomaple',
    keyFeatures: [
      '1차시: 헬로메이플 로그인 & 아바타 꾸미기 (나만의 아바타 만들기)',
      '2차시: 화면구성 & 맵꾸미기 (내 맘대로 만드는 메이플 월드)',
      '3차시: 오브젝트 상호작용 익히기 (아바타와 음식의 상호작용 구현하기)',
      '4차시: 공간 이동 포털 마법 배우기 (\'신호 보내기\'를 활용한 위치 이동)',
      '5차시: 새로운 월드로 떠나는 장면 전환 코딩 (장면(Map) 추가 및 구성)'
    ],
    recommendedTools: ['헬로메이플 (HelloMaple 에디터)', '2D 메타버스 에디션'],
    steps: [
      {
        stepNumber: 1,
        title: '헬로메이플 메타버스 월드 제작 5차시 커리큘럼',
        subtitle: 'HelloMaple Creation Class',
        description: '넥슨 메타버스 플랫폼 헬로메이플을 활용하여 아바타 꾸미기부터 맵 디자인, 상호작용, 포털 워프, 멀티 장면 전환까지 나만의 메이플 월드를 만듭니다.',
        tools: ['헬로메이플 (HelloMaple)'],
        duration: '총 5차시',
        outcomes: [
          '나만의 메이플 메타버스 월드 완성 및 친구들과 공개 배포',
          '아바타 커스텀, 음식 상호작용 스코어링, 신호 보내기 위치 이동, 장면(Map) 전환 제어'
        ],
        icon: '🏰',
        sessions: [
          {
            sessionNumber: 1,
            title: '01차시 - 헬로메이플 로그인 & 아바타 꾸미기',
            concept: '나만의 아바타 만들기',
            description: '헬로메이플 로그인 및 접속 방법부터 캐릭터 헤어, 의상, 악세서리를 자유롭게 조합하여 나만의 독창적인 메이플 부캐릭터를 꾸밉니다.',
            defaultImage: 'images/hellomaple_1.svg'
          },
          {
            sessionNumber: 2,
            title: '02차시 - 화면구성 & 맵꾸미기',
            concept: '내 맘대로 만드는 메이플 월드',
            description: '에디터 화면 구조를 익히고 지형 타일, 건물, 나무, 장애물을 배치하여 나만의 아름다운 2D 메이플 월드를 디자인합니다.',
            defaultImage: 'images/hellomaple_2.svg'
          },
          {
            sessionNumber: 3,
            title: '03차시 - 오브젝트 상호작용 익히기',
            concept: '아바타와 음식의 상호작용 구현하기',
            description: '아바타가 맵 안의 음식 오브젝트와 부딪치거나 획득했을 때 효과음이 나고 점수가 오르는 인터랙티브 상호작용 로직을 코딩합니다.',
            defaultImage: 'images/hellomaple_3.svg'
          },
          {
            sessionNumber: 4,
            title: '04차시 - 공간 이동 포털 마법 배우기',
            concept: '\'신호 보내기\'를 활용한 위치 이동 로직 구현하기',
            description: '신호 보내기 블록을 활용하여 특정 포털 공간에 들어갔을 때 원하는 목적지나 다음 위치로 순간 이동하는 워프 포털 시스템을 만듭니다.',
            defaultImage: 'images/hellomaple_4.svg'
          },
          {
            sessionNumber: 5,
            title: '05차시 - 새로운 월드로 떠나는 장면 전환 코딩',
            concept: '장면(Map) 추가 및 구성하기',
            description: '여러 개의 맵(장면)을 새로 추가하고 스테이지 전환 조건 및 월드 이동 로직을 구성하여 멀티 스테이지 메타버스 프로젝트를 최종 완성합니다.',
            defaultImage: 'images/hellomaple_5.svg'
          }
        ]
      }
    ]
  },
  {
    id: 'elementary-low',
    gradeTitle: '초등 저학년 (1~3학년)',
    targetAge: '만 7세 ~ 9세',
    badgeText: '새싹 프로그래머 싹싹이 🌱',
    themeColor: 'from-pink-100 to-rose-200 border-rose-300 text-rose-700',
    accentColor: 'bg-rose-500',
    bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-100/60',
    icon: '🐣',
    summary: '스크래치 주니어와 보드게임 형태의 언플러그드 교구로 소프트웨어와 처음 친해집니다.',
    keyFeatures: [
      '손으로 직접 만지는 알록달록 언플러그드 로봇 놀이',
      '드래그 앤 드롭 형태의 쉽고 직관적인 블록 코딩',
      '나만의 동화 스토리북과 미니 게임 애니메이션 제작',
      '논리적 순서(알고리즘)를 자연스럽게 배우는 미로 찾기'
    ],
    recommendedTools: ['스크래치 주니어', '오조봇 (Ozobot)', '비봇 (Bee-Bot)', '엔트리 에디션'],
    steps: [
      {
        stepNumber: 1,
        title: '1단계: 컴퓨팅 사고력 미로 탐험',
        subtitle: '언플러그드 알고리즘 놀이',
        description: '컴퓨터 없이 진행하는 보드게임 코딩! 로봇 캐릭터를 원하는 방향으로 움직이기 위한 순서 명령어를 직접 구성합니다.',
        tools: ['언플러그드 카드', '오조봇 마커 코딩'],
        duration: '1~2개월 (8회차)',
        outcomes: ['"순차"와 "방향"의 기본 알고리즘 개념 완벽 이해', '팀 협동 알고리즘 게임 완성'],
        icon: '🗺️'
      },
      {
        stepNumber: 2,
        title: '2단계: 알록달록 스크래치 주니어',
        subtitle: '나만의 움직이는 동화책',
        description: '내가 그리거나 선택한 캐릭터가 소리를 내고 움직이는 애니메이션 작품을 스크래치 주니어 블록으로 완성합니다.',
        tools: ['Scratch Jr', '태블릿 인터페이스'],
        duration: '3~4개월 (12회차)',
        outcomes: ['캐릭터 대화 및 배경 전환 블록 제어', '3가지 주제의 인터랙티브 스토리북 완성'],
        icon: '🎨'
      },
      {
        stepNumber: 3,
        title: '3단계: 아케이드 미니 게임 만들기',
        subtitle: '조건과 이벤트의 첫걸음',
        description: '버튼을 누르면 점프하고 장애물을 피하는 첫 미니 게임을 구현합니다. "상황에 따라 어떻게 움직여야 할까?" 조건문을 터득합니다.',
        tools: ['엔트리 저학년 에디션', '사운드 효과'],
        duration: '5~6개월 (12회차)',
        outcomes: ['점수 시스템과 장애물 피하기 게임 완성', '자신감 넘치는 첫 코딩 작품 발표회'],
        icon: '🎮'
      }
    ]
  },
  {
    id: 'elementary-high',
    gradeTitle: '초등 고학년 (4~6학년)',
    targetAge: '만 10세 ~ 12세',
    badgeText: '창의 블록 탐험가 🌿',
    themeColor: 'from-amber-100 to-yellow-200 border-amber-300 text-amber-800',
    accentColor: 'bg-amber-500',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-100/60',
    icon: '🚀',
    summary: '엔트리 및 스크래치 3.0 고급 문법과 피지컬 마이크로비트로 상상을 현실로 만듭니다.',
    keyFeatures: [
      '변수, 반복문, 함수, 리스트 등 핵심 프로그래밍 구조 습득',
      '마이크로비트 센서를 활용한 하드웨어 스마트 기기 제작',
      '앱인벤터로 스마트폰에서 실제로 실행되는 나만의 앱 만들기',
      '인공지능(AI) 블록을 활용한 자율주행 및 음성인식 체험'
    ],
    recommendedTools: ['Entry 3.0', 'Scratch 3.0', 'Micro:bit v2', 'App Inventor'],
    steps: [
      {
        stepNumber: 1,
        title: '1단계: 블록코딩 레벨업 & 물리엔진 게임',
        subtitle: '변수와 계산 알고리즘',
        description: '속도, 중력, 충돌 감지를 적용한 클래식 레트로 게임(벽돌깨기, 런게임)을 제작하며 컴퓨터 수학과 물리를 이해합니다.',
        tools: ['엔트리 3.0', '키보드/마우스 이벤트'],
        duration: '1~2개월 (8회차)',
        outcomes: ['변수를 이용한 체력, 타이머, 레벨업 시스템 완성', '2D 피지컬 슈팅/점프 게임 프로젝트'],
        icon: '🕹️'
      },
      {
        stepNumber: 2,
        title: '2단계: 마이크로비트 IoT 발명품 제작',
        subtitle: '피지컬 센서 코딩',
        description: '온도, 빛, 가속도, 소리 센서를 발판으로 실생활 문제를 해결하는 기기(스마트 저금통, 디지털 만보기, 화재경보기)를 직접 만듭니다.',
        tools: ['Micro:bit v2', 'MakeCode'],
        duration: '3~4개월 (12회차)',
        outcomes: ['LED 디스플레이 제어 및 센서 응용', '나만의 창의 피지컬 발명품 완성'],
        icon: '💡'
      },
      {
        stepNumber: 3,
        title: '3단계: 앱인벤터 스마트폰 앱 개발',
        subtitle: '내 폰에 설치하는 나만의 앱',
        description: '안드로이드 스마트폰에 직접 설치하여 구동되는 만보기 앱, 드로잉 패드 앱, 나만의 비밀 메모장 앱을 제작합니다.',
        tools: ['MIT App Inventor', '스마트폰 연결'],
        duration: '5~6개월 (12회차)',
        outcomes: ['실제 디바이스 앱 런칭 및 친구들과 공유', '사용자 경험(UI/UX) 기초 디자인 기법 익히기'],
        icon: '📱'
      }
    ]
  },
  {
    id: 'middle',
    gradeTitle: '중등부 (1~3학년)',
    targetAge: '만 13세 ~ 15세',
    badgeText: '텍스트 코더 영재 🌳',
    themeColor: 'from-sky-100 to-cyan-200 border-sky-300 text-sky-800',
    accentColor: 'bg-sky-500',
    bgGradient: 'bg-gradient-to-br from-sky-50 to-blue-100/60',
    icon: '💻',
    summary: '실전 파이썬(Python) 문법과 파이게임, 나만의 프론트엔드 웹 페이지 제작으로 텍스트 코딩에 입문합니다.',
    keyFeatures: [
      '전 세계 인기 1위 프로그래밍 언어 파이썬(Python) 기본기 완성',
      'Pygame 라이브러리를 활용한 2D 그래픽 액션 게임 완성',
      'HTML/CSS 웹 기초와 나만의 포트폴리오 웹사이트 구축',
      '정보올림피아드 기초 컴퓨팅 문제해결 능력 배양'
    ],
    recommendedTools: ['Python 3', 'VS Code', 'Pygame', 'HTML5 / CSS3'],
    steps: [
      {
        stepNumber: 1,
        title: '1단계: 파이썬 마스터리 기초',
        subtitle: '텍스트 코딩 입문',
        description: '문자열, 조건문, 반복문, 리스트, 딕셔너리, 함수 정의까지 파이썬의 표준 문법을 체계적으로 다집니다.',
        tools: ['Python 3.12', 'Visual Studio Code'],
        duration: '1~2개월 (8회차)',
        outcomes: ['텍스트 기반 RPG 게임 / 계산기 / 미니 퀴즈 프로그램 구현', '파이썬 핵심 문법 수료증'],
        icon: '🐍'
      },
      {
        stepNumber: 2,
        title: '2단계: Pygame 실전 게임 개발',
        subtitle: '그래픽 & 사운드 엔진',
        description: '화면 루프, 스프라이트 객체 지향, 키보드 조작, 충돌 감지 및 사운드 효과를 결합하여 완성도 높은 게임을 개발합니다.',
        tools: ['Pygame', 'Sprite Engine'],
        duration: '3~4개월 (12회차)',
        outcomes: ['우주 슈팅 게임 / 핑퐁 게임 / 오락실 갤러그 게임 완성', '게임 빌드파일(.exe) 생성 경험'],
        icon: '👾'
      },
      {
        stepNumber: 3,
        title: '3단계: Web 퍼블리싱 & 나만의 사이트',
        subtitle: 'HTML/CSS & JavaScript 입문',
        description: '내가 만든 게임과 취미를 소개하는 웹사이트를 HTML, CSS로 다듬고 인터넷에 게시해보는 즐거움을 느낍니다.',
        tools: ['HTML5', 'CSS3', 'GitHub Pages'],
        duration: '5~6개월 (12회차)',
        outcomes: ['반응형 나만의 프로필 웹페이지 배포', '웹 구조와 스타일에 대한 직관적 이해'],
        icon: '🌐'
      }
    ]
  },
  {
    id: 'high',
    gradeTitle: '고등 & 심화 과정',
    targetAge: '만 16세 이상 & 예비 개발자',
    badgeText: '미래 AI 마스터 🚀',
    themeColor: 'from-purple-100 to-indigo-200 border-purple-300 text-purple-800',
    accentColor: 'bg-purple-600',
    bgGradient: 'bg-gradient-to-br from-purple-50 to-indigo-100/60',
    icon: '🔮',
    summary: '인공지능 머신러닝, C/C++ 자료구조 알고리즘 및 풀스택 웹 개발 프로젝트로 미래 IT 전문가로 거듭납니다.',
    keyFeatures: [
      'C/C++ 알고리즘 기초 및 백준/프로그래머스 코딩테스트 입문',
      '파이썬 데이터 분석 (Pandas, Matplotlib) & OpenCV 영상 처리',
      'Generative AI / 머신러닝 모델 학습 및 웹 서비스 연동',
      'SW 특기자 전형 및 생활기록부 차별화 포트폴리오 준비'
    ],
    recommendedTools: ['C/C++', 'Python PyTorch', 'OpenCV', 'React', 'Git/GitHub'],
    steps: [
      {
        stepNumber: 1,
        title: '1단계: C/C++ & 알고리즘 트레이닝',
        subtitle: '자료구조와 메모리 원리',
        description: '포인터, 배열, 스택, 큐, 재귀 함수 및 탐색 알고리즘(BFS/DFS)을 훈련하여 높은 컴퓨팅 성능 파악 능력을 기릅니다.',
        tools: ['C/C++17', '백준 / 프로그래머스'],
        duration: '1~3개월 (12회차)',
        outcomes: ['알고리즘 문제 해결 능력 급상승', '컴퓨터 구조와 메모리 메커니즘 정확한 이해'],
        icon: '⚙️'
      },
      {
        stepNumber: 2,
        title: '2단계: 파이썬 AI & 이미지 인식 프로젝트',
        subtitle: '컴퓨터 비전 & 머신러닝',
        description: '웹캠 영상에서 손가락 모션을 감지하거나 얼굴 표정을 인식하는 인공지능 프로그램을 머신러닝 라이브러리로 직접 구축합니다.',
        tools: ['MediaPipe', 'OpenCV', 'Scikit-learn'],
        duration: '4~5개월 (12회차)',
        outcomes: ['제스처 제어 컴퓨터 조작기 / AI 표정 분석기 개발', '데이터 세트 수집 및 모델 평가 학습'],
        icon: '🤖'
      },
      {
        stepNumber: 3,
        title: '3단계: 웹/앱 융합 캡스톤 포트폴리오',
        subtitle: '아이디어 상용화 런칭',
        description: '학습한 AI 서비스와 웹 프론트엔드를 결합하여 실제 사용자가 접속하여 활용할 수 있는 웹 앱 포트폴리오를 작성합니다.',
        tools: ['React', 'FastAPI', 'Vercel / GitHub'],
        duration: '6개월 이상 (심화)',
        outcomes: ['완성된 개인 깃허브 포트폴리오 프로젝트', '각종 청소년 SW 공모전 및 대입 포트폴리오 완성'],
        icon: '🏆'
      }
    ]
  }
];
