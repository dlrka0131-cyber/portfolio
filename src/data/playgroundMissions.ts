import { CodeMission } from '../types';

export const PLAYGROUND_MISSIONS: CodeMission[] = [
  {
    id: 'm1',
    title: '🤖 귀여운 로봇 큐티의 보물상자 찾기',
    description: '로봇 큐티가 장애물을 지나 보물상자까지 도달할 수 있도록 명령 블록을 순서대로 조립해주세요!',
    difficulty: '쉬움',
    characterEmoji: '🤖',
    targetGoal: '보물상자 💎 도착하기!',
    availableBlocks: [
      { id: 'b1', text: '▶️ 앞으로 1칸 이동', action: 'MOVE_FORWARD', category: 'move' },
      { id: 'b2', text: '🔄 오른쪽으로 회전', action: 'TURN_RIGHT', category: 'move' },
      { id: 'b3', text: '🔄 왼쪽으로 회전', action: 'TURN_LEFT', category: 'move' },
      { id: 'b4', text: '💎 보물상자 열기', action: 'OPEN_CHEST', category: 'action' },
      { id: 'b5', text: '📢 "보물 찾았다!" 말하기', action: 'SPEAK', category: 'action' }
    ],
    correctSequence: ['MOVE_FORWARD', 'MOVE_FORWARD', 'TURN_RIGHT', 'MOVE_FORWARD', 'OPEN_CHEST', 'SPEAK']
  },
  {
    id: 'm2',
    title: '🐱 냐옹이 마법사의 무지개 별 점프',
    description: '냐옹이가 하늘에서 내려오는 별을 모을 수 있게 [반복문]과 [점프] 블록을 완성해볼까요?',
    difficulty: '보통',
    characterEmoji: '🐱',
    targetGoal: '무지개 별 ⭐ 3개 모으기!',
    availableBlocks: [
      { id: 'b20', text: '🚀 하늘로 높이 점프', action: 'JUMP', category: 'move' },
      { id: 'b21', text: '⭐ 별 획득하기', action: 'COLLECT_STAR', category: 'action' },
      { id: 'b22', text: '🔁 3번 반복하기', action: 'REPEAT_3', category: 'control' },
      { id: 'b23', text: '✨ 마법 가루 뿌리기', action: 'MAGIC_SPARKLE', category: 'action' },
      { id: 'b24', text: '🎵 야옹~ 신나는 노래', action: 'SING', category: 'action' }
    ],
    correctSequence: ['REPEAT_3', 'JUMP', 'COLLECT_STAR', 'MAGIC_SPARKLE', 'SING']
  },
  {
    id: 'm3',
    title: '🐍 파이썬 뱀의 별 프린트 함수 만들기',
    description: '파이썬 코딩 입문! 조건문과 반복문 로직을 완성하여 귀여운 별 피라미드를 출력해봐요.',
    difficulty: '도전',
    characterEmoji: '🐍',
    targetGoal: '파이썬 콘솔에 별 5개 ⭐⭐⭐⭐⭐ 출력!',
    availableBlocks: [
      { id: 'b30', text: 'def print_stars(n):', action: 'DEF_FUNC', category: 'control' },
      { id: 'b31', text: '   for i in range(5):', action: 'FOR_LOOP', category: 'control' },
      { id: 'b32', text: '       print("⭐", end="")', action: 'PRINT_STAR', category: 'action' },
      { id: 'b33', text: 'print_stars(5)', action: 'CALL_FUNC', category: 'action' },
      { id: 'b34', text: '   print("\\n완성!")', action: 'PRINT_DONE', category: 'action' }
    ],
    correctSequence: ['DEF_FUNC', 'FOR_LOOP', 'PRINT_STAR', 'CALL_FUNC', 'PRINT_DONE']
  }
];
