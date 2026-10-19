// 분해 순서 = parts 배열 순서. 조립은 역순(스택 pop).
// off = 분해할 때 설명, on = 조립할 때 설명. 조립은 역순이라 문구가 따로 필요하다.
// 상표 회피: 실제 제품명 대신 "G17형" 처럼 쓴다.
// info = 분해 시작 전 한 줄. 총 자체 설명만 적는다 — 분해 단계·절차는 off/on 이 한다.
const CHECK = ' 뺀 뒤 슬라이드를 당겨 약실이 빈 것을 눈으로 확인한다.';

export const GUNS = {
  g17: {
    ko: 'G17형',
    info: '9mm 폴리머 프레임 권총. 공이치기가 없고, 스프링에 걸어둔 공이가 그대로 때리는 스트라이커 격발이다.',
    parts: [
      { id: 'magazine',  ko: '탄창',         off: '제일 먼저. 탄창 멈치를 누르고 탄창을' + CHECK,
                                             on:  '마지막. 탄창을 끝까지 밀어 넣어 멈치가 걸리게 한다.' },
      { id: 'slidelock', ko: '슬라이드 락',   off: '슬라이드를 3mm 뒤로 당긴 채 락 레버를 아래로 내린다.',
                                             on:  '슬라이드를 끝까지 당겼다 놓으면 락이 제자리로 올라온다.' },
      { id: 'slide',     ko: '슬라이드',      off: '락을 내린 상태에서 슬라이드를 앞으로 밀어 뺀다.',
                                             on:  '프레임 레일에 얹고 뒤로 끝까지 민다.' },
      { id: 'spring',    ko: '리코일 스프링', off: '슬라이드 안쪽 스프링을 앞쪽으로 눌러 빼낸다.',
                                             on:  '배럴 아래 홈에 스프링 앞쪽 끝을 걸어 넣는다.' },
      { id: 'barrel',    ko: '배럴',          off: '마지막. 배럴을 살짝 들어 앞으로 빼낸다.',
                                             on:  '제일 먼저. 배럴을 슬라이드 안쪽에 집어넣는다.' },
    ],
  },

  // 자동권총과 공통점이 거의 없다. 탄창도 슬라이드도 없고, 실린더가 둘을 겸한다.
  // 순서는 실총과 같다 — 그립을 벗겨야 나사가 보이고, 요크 나사를 풀어야 실린더가 빠진다.
  revolver: {
    ko: '리볼버',
    info: '.38 구경 6연발 더블 액션. 탄창 대신 실린더가 약실을 겸해 한 발 쏠 때마다 한 칸 돈다.',
    parts: [
      { id: 'grip',      ko: '그립 패널',   off: '제일 먼저. 실린더를 열어 약실 여섯 개가 빈 것을 확인한 뒤, 그립 나사를 풀고 패널을 벗긴다.',
                                            on:  '마지막. 패널을 끼우고 나사를 조인다. 나무라 세게 조이면 쪼개진다.' },
      { id: 'yokescrew', ko: '요크 나사',   off: '크레인 앞쪽 나사를 푼다. 이 나사 하나가 실린더를 잡고 있다.',
                                            on:  '요크를 끝까지 밀어 넣은 뒤 나사를 조인다.' },
      { id: 'cylinder',  ko: '실린더',      off: '실린더를 열고 요크째 앞으로 빼낸다.',
                                            on:  '요크를 프레임 홈에 맞춰 뒤로 밀어 넣는다.' },
      { id: 'latch',     ko: '실린더 래치', off: '래치 너트를 풀어 엄지판을 뺀다. 사이드 플레이트보다 먼저다.',
                                            on:  '엄지판을 끼우고 너트를 조인다. 왼나사다.' },
      { id: 'sideplate', ko: '사이드 플레이트', off: '마지막. 프레임을 나무로 두드려 플레이트를 띄워 벗긴다. 지렛대로 비틀면 자리가 상해 다시 안 맞는다.',
                                            on:  '제일 먼저. 플레이트를 자리에 얹고 손바닥으로 눌러 앉힌다.' },
    ],
  },

};

export const GUN_IDS = Object.keys(GUNS);
export const partsOf = gun => GUNS[gun].parts;
export const orderOf = gun => GUNS[gun].parts.map(p => p.id);
export const labelOf = (gun, id) => GUNS[gun].parts.find(p => p.id === id)?.ko ?? id;

export const init = (gun = 'g17') =>
  ({ gun, phase: 'strip', removed: [], wrong: 0, lastError: null, done: false });

// 지금 만져야 하는 부품. 분해는 순서대로, 조립은 마지막에 뺀 것부터.
export function expected(st) {
  if (st.phase === 'strip') return orderOf(st.gun)[st.removed.length] ?? null;
  return st.removed[st.removed.length - 1] ?? null;
}

export function tap(st, id) {
  if (st.done) return st;
  if (id !== expected(st))
    return { ...st, wrong: st.wrong + 1, lastError: id };

  const n = orderOf(st.gun).length;
  const removed = st.phase === 'strip'
    ? [...st.removed, id]
    : st.removed.slice(0, -1);
  return {
    ...st,
    removed,
    lastError: null,
    phase: st.phase === 'strip' && removed.length === n ? 'assemble' : st.phase,
    done:   st.phase === 'assemble' && removed.length === 0,
  };
}
