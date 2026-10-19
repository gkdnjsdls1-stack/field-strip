# 다음 작업: 소총형 추가

권총 넷을 지운 이유가 "절차가 같아 보인다"였다. 소총은 **체급이 달라서** 값이 생긴다 —
상·하부 몸통을 핀으로 분리하고, 부품이 처음으로 **뒤(+x)로** 빠진다.
이 문서는 새 세션이 바로 손대게 하려고 미리 조사해 둔 것이다. 다 읽고 시작할 것.

## 1. 데이터 세 곳에 같은 키(`rifle`)로 넣는다

| 파일 | 넣을 것 |
|---|---|
| `strip.js` | `GUNS.rifle` — `ko`, `info`(총 자체 설명 한 줄), `parts[]`(순서 = 분해 순서, 각 `off`/`on` 문구) |
| `shapes.js` | `SHAPES.rifle` — 부품별 `d`(측면도 경로) `depth` `axis` `pull`<br>`RIG.rifle` — `feed` `action` `muzzle` `port` `sights`<br>`LOOK` — 새 부품 id 재질(`upper` `pin` `bolt` `gastube`) |
| 없음 | **`index.html` 은 안 건드려도 된다** (아래 3번 이유) |

## 2. 분해 순서 제안 (6단계)

| # | id | ko | 빠지는 축 | 비고 |
|---|---|---|---|---|
| 1 | `magazine` | 탄창 | 아래 `[0,1,0]` | 기존 코드가 `FEED()` 로 쓴다. id 고정 |
| 2 | `pin` | 조립핀 | 아래 | 실총은 옆으로 밀지만 측면도라 아래로 양식화 |
| 3 | `upper` | 상부 몸통 | 위 `[0,-1,0]` | 꺾어 여는 대신 들어올리는 것으로 양식화 |
| 4 | `slide` | 장전손잡이 | **뒤 `[1,0,0]`** | id 는 `slide` 그대로 쓴다 — 3번 참조 |
| 5 | `bolt` | 노리쇠뭉치 | 뒤 | 이 앱에서 처음으로 뒤로 빠지는 축 |
| 6 | `gastube` | 가스관 | 앞 `[-1,0,0]` | |

축이 아래/위/뒤/앞으로 갈려서 "슬라이드가 나머지를 덮는" 문제는 안 생긴다.
**조작만 하고 안 빠지는 단계(장전손잡이를 당겨 약실 확인 등)는 넣지 말 것** —
이 앱은 "부품을 뺀다/끼운다"만 표현할 수 있다.

## 3. 장전손잡이의 id 를 `slide` 로 두는 이유

사격 모드가 `'slide'` 라는 id 를 **여덟 군데에서 그대로 박아 쓴다**:

- `index.html:723` `axisOf` — 사격 중에는 `slide` 만 축을 `RACK`(+x, pull 46)으로 바꾼다
- `index.html:767, 947, 950, 1019, 1020` — 당겼다 놓기, 발사 후 왕복, 탄창 비면 멈춤
- `index.html:806` — 탄피가 튀는 위치(`port` + slide 위치)
- `index.html:875` — 사격 중 집을 수 있는 건 `FEED()` 와 `slide` 뿐

소총의 장전손잡이도 **뒤로 당겼다 놓는다**. 동작이 같으니 id 를 `slide` 로 두면
사격 코드를 한 줄도 안 고치고 그대로 돈다. 화면에 보이는 이름은 `ko: '장전손잡이'` 라 문제없다.

```
ponytail: 소총의 장전손잡이 id 를 slide 로 재사용한다. 사격 코드가 이 id 로 돈다.
          세 번째 급탄 방식(펌프 산탄총 등)이 들어오면 그때 RIG 에 rack 키를 빼서 일반화한다.
```

펌프 산탄총은 이 수법이 안 통한다(매 발 펌프질 + 튜브 급탄). 그건 `action: 'pump'` 를 새로 만든다.

## 4. 측면도 그릴 때

- 지금 두 총은 **640×500** 안에 그린다(`shapes.js` 맨 위 주석). 소총은 가로로 기니
  같은 세로 비율로 **가로만 길게**(예: 1500×420) 그린다. 화면 맞춤은 bbox 에서 자동으로 따라온다.
- 절대값으로 튜닝된 상수들이 있다 — 베벨 3, 여유 박스 +12, 자리 간격 `GAP = 26`, `LIFT = 0.5`.
  소총을 너무 크게 그리면 이것들이 상대적으로 작아진다. 부품 **두께**는 권총과 비슷하게 유지할 것.
- `RIG.rifle.sights` 의 host 는 `slide` 가 아니라 **`upper`**(상부 몸통)다. `buildSights` 는
  host id 를 인자로 받으니 그대로 된다.
- 프레임(하부 몸통)은 `frame` 이어야 한다 — `index.html` 이 `'frame'` 을 집기 제외 대상으로 쓴다.

## 5. 넣고 나서 반드시 확인할 것

1. `npm test` — 총끼리 분해 순서가 겹치는지 전수 비교한다. 소총은 당연히 통과한다.
2. 분해 자리(`slot`) 줄 폭은 **프레임 폭의 1.8배**다. 소총은 프레임이 길어 한 줄이 아주 넓어진다.
   네 줄로 깨지거나 화면이 세로로 길어지면 그 배수를 총마다 다르게 둬야 한다.
3. **사격 화면 범위(`fitFire`)는 손으로 잡은 값**이다(`index.html:478` 부근,
   `center (-340,170), w 1700, h 980`). 권총 기준이라 소총에서는 총이 화면을 넘길 수 있다.
   넘치면 총마다 다른 값이 필요하다 — 이게 이번 작업에서 제일 걸릴 만한 지점.
4. 브라우저 확인은 아래 스니펫을 쓴다(키보드로 전 과정을 돌린다).

```js
// 분해·조립 전 과정 자동 주파 — 콘솔에 붙여넣는다
const c=document.querySelector('canvas'), hud=document.getElementById('hud'), gsel=document.getElementById('gun');
const send=k=>c.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true}));
const lines=()=>hud.innerText.split('\n');
const want=()=>{const m=(lines()[2]||lines()[1]||'').match(/^(.+?) —/);return m?m[1].trim():null;};
const sel=()=>{const m=(lines()[0]||'').match(/선택 (.+)$/);return m?m[1].trim():null;};
const res={};
for(const o of [...gsel.options]){
  gsel.value=o.value; gsel.dispatchEvent(new Event('change',{bubbles:true})); send('r');
  let steps=0,err=null;
  for(let i=0;i<40;i++){const w=want(); if(!w) break; let g=0;
    while(sel()!==w && g++<14) send('ArrowDown');
    if(sel()!==w){err='stuck '+w;break;} send('Enter'); steps++;}
  res[o.textContent]=err||steps+'단계 '+(lines()[0].startsWith('완료')?'완료':lines()[0]);
}
res
```

> 주의: 브라우저 자동화 도구의 `Return` 키는 빈 키로 들어가 안 먹는다. 위처럼 직접 dispatch 할 것.
> 또 브라우저 패널이 숨겨지면 `requestAnimationFrame` 이 멈춰 카메라·부품이 수렴하지 않는다 —
> 화면이 안 움직인다고 버그로 오해하지 말 것.

## 6. 같이 바뀌는 것

- `index.html` 의 제목과 `CLAUDE.md` 첫 줄의 "권총" → "총기" (소총이 들어오면 권총 앱이 아니다)
- `RIG` 주석의 작동 방식 목록에 소총을 어디에 넣을지(`auto` 재사용이면 추가 없음)

## 7. 하지 말 것

- **자동권총을 더 늘리지 말 것.** 네 정을 지운 이유가 그것이다(`CLAUDE.md` 결정사항 참조).
- three 를 CDN 으로 바꾸지 말 것. npm 로컬 + importmap 이고 배포본도 같은 파일을 쓴다.
- `python3 -m http.server` 로 띄우지 말 것. `python3 serve.py` 만 쓴다(캐시 때문).
