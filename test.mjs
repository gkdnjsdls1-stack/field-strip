import assert from 'node:assert/strict';
import { GUNS, GUN_IDS, orderOf, init, expected, tap } from './strip.js';

for (const gun of GUN_IDS) {
  const ORDER = orderOf(gun);
  assert.ok(ORDER.length >= 3, `${gun}: 단계가 너무 적다`);   // PM형은 배럴이 안 빠져서 넷뿐
  assert.equal(new Set(ORDER).size, ORDER.length, `${gun}: 부품 id 가 겹친다`);
  assert.ok(GUNS[gun].info?.length, `${gun}: 분해 전 소개(info) 가 없다`);

  // 올바른 전체 사이클: 분해 n + 조립 n = 완료, 오답 0
  let s = init(gun);
  for (const id of ORDER) s = tap(s, id);
  assert.equal(s.phase, 'assemble');
  assert.equal(s.removed.length, ORDER.length);

  // 조립 단계는 마지막에 뺀 부품부터
  assert.equal(expected(s), ORDER.at(-1));

  for (const id of [...ORDER].reverse()) s = tap(s, id);
  assert.equal(s.done, true);
  assert.equal(s.wrong, 0);

  // 완료 후 입력은 무시
  assert.equal(tap(s, ORDER[0]), s);

  // 순서를 틀리면 상태가 진행되지 않고 오답만 센다
  let w = init(gun);
  w = tap(w, ORDER.at(-1));
  assert.deepEqual(w.removed, []);
  assert.equal(w.wrong, 1);
  assert.equal(w.lastError, ORDER.at(-1));

  // 총이 바뀌면 순서도 바뀐다 (상태가 자기 총의 순서만 본다)
  assert.equal(expected(init(gun)), ORDER[0]);
}

// 총마다 순서가 실제로 다르다. 같으면 두 번째 총을 만든 의미가 없다.
assert.notDeepEqual(orderOf('g17'), orderOf('m1911'));
assert.notDeepEqual(orderOf('g17'), orderOf('m92'));
assert.notDeepEqual(orderOf('g17'), orderOf('revolver'));

// 사격 모드가 집어들 부품은 총마다 실제로 존재해야 한다 (탄창 / 실린더)
const { RIG, SHAPES } = await import('./shapes.js');
for (const g of GUN_IDS) {
  assert.ok(SHAPES[g][RIG[g].feed], `${g}: ${RIG[g].feed} 부품이 없다`);
  assert.ok(SHAPES[g].frame, `${g}: frame 이 없다`);
  for (const id of orderOf(g)) assert.ok(SHAPES[g][id], `${g}: ${id} 모양이 없다`);
}

console.log('ok');
