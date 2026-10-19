// 2D 버전과 같은 측면도 경로를 그대로 쓴다. SVGLoader 로 읽어 두께를 준다.
// 좌표는 SVG 기준(y가 아래로 증가). 3D 쪽에서 X축 180도 회전으로 뒤집는다.
// axis 도 같은 SVG 기준이라 "아래"는 y=+1, "총구 쪽"은 x=-1 이다.
//
// 두 총 모두 같은 640x500 공간에 그린다. 실측 도면이 아니라 실루엣이 구별되게 그린
// 양식화된 측면도다 — 리볼버의 실린더 창처럼 "그 총을 그 총이게 하는" 특징만 과장해서 남겼다.
// coil = [x0, x1, y, 반지름]. 스프링은 헬릭스라 경로 대신 이 값으로 코드가 만든다.

export const SHAPES = {
  g17: {
    barrel: {
      d: 'M126 72 H394 L400 64 H448 Q456 64 456 72 V88 Q456 96 448 96 H414 Q404 96 400 90 L394 90 H126 Z',
      depth: 26, axis: [-1, 0, 0], pull: 150,
    },
    spring: { axis: [-1, 0.7, 0], pull: 150, coil: [136, 388, 96, 8] },
    frame: {
      d: `M126 104 H462 L474 120 L482 288 Q484 305 468 307 L400 303 Q388 302 387 291
          L376 190 Q374 178 364 178 L300 178 Q287 178 285 162 L282 136 Q281 128 270 128 L126 128 Z
          M298 134 H366 Q372 134 371 144 L366 158 Q364 163 356 163 L310 163 Q299 163 297 150 Z`,
      depth: 56, axis: [0, 0, 0], pull: 0,
    },
    magazine: {
      d: 'M398 152 L460 148 L472 290 L410 296 Z M402 286 L480 281 L484 310 L406 316 Z',
      depth: 42, axis: [0, 1, 0], pull: 95,
    },
    slide: {
      d: 'M125 72 Q125 60 140 60 H452 Q462 60 462 70 V96 Q462 106 452 106 H136 Q125 106 125 96 Z',
      depth: 50, axis: [-1, -0.8, 0], pull: 170,
    },
    slidelock: {
      d: 'M282 114 H314 Q320 114 320 120 V132 Q320 139 312 139 H290 Q282 139 282 132 Z',
      depth: 70, axis: [0, 1, 0], pull: 42,
    },
  },

  // 리볼버. 슬라이드도 탄창도 없다 — 배럴은 프레임에 붙박이고, 실린더가 탄창 역할을 한다.
  // 프레임 경로는 셋: 바깥선 / 방아쇠울 구멍 / 실린더 창. evenodd 로 뒤 둘을 뚫는다.
  revolver: {
    frame: {
      d: `M120 70 H372 L384 96 L394 152 Q448 180 444 250 L436 298 L382 302
          Q372 232 368 186 H332 Q316 186 314 170 L312 150 H296 L292 116 H130 V96 H120 Z
          M330 156 H364 Q370 157 369 168 L366 180 Q362 184 352 184 L336 184 Q328 182 327 170 Z
          M296 80 H368 V146 H296 Z`,
      depth: 44, axis: [0, 0, 0], pull: 0,
    },
    // 실린더는 자기 축으로 돌아야 해서 압출이 아니라 원통으로 만든다. [x0, x1, 중심y, 반지름, 약실수]
    cylinder: { cyl: [294, 366, 104, 30, 6], axis: [-1, -0.5, 0], pull: 190 },
    grip: {
      d: 'M382 166 Q442 184 446 250 L438 300 L386 304 Q376 236 372 172 Z',
      depth: 56, axis: [0.35, 1, 0], pull: 150,
    },
    sideplate: {
      d: 'M372 100 Q400 104 406 126 Q412 148 398 158 Q380 164 370 150 Z',
      depth: 50, axis: [1, 0.2, 0], pull: 190,
    },
    latch: {
      d: 'M374 84 H400 Q407 86 405 94 L398 103 H376 Q370 99 371 92 Z',
      depth: 58, axis: [0.65, -1, 0], pull: 130,
    },
    yokescrew: {
      d: 'M289 120 H302 Q307 125 305 132 L298 138 H290 Q285 133 286 126 Z',
      depth: 52, axis: [-1, 0.55, 0], pull: 140,
    },
  },
};


// 총구·배출구 좌표와 작동 방식. 부품 모양에서 추측하지 말고 적어 둔다.
// feed = 총알이 들어가는 부품, action = 사격 모드가 분기하는 기준.
// sights = [가늠쇠 x, 가늠자 x, 윗면 y, 올라탈 부품]. 1인칭에서 총 윗면을 읽게 하는 유일한 단서라
// 측면도에 없던 걸 코드로 얹는다. 자동권총은 슬라이드에, 리볼버는 프레임 윗막대에 붙는다.
export const RIG = {
  g17:      { feed: 'magazine', action: 'auto',     muzzle: [120, 80], port: [300, 62],
              sights: [140, 448, 60, 'slide'] },
  revolver: { feed: 'cylinder', action: 'revolver', muzzle: [118, 83],
              sights: [132, 358, 70, 'frame'] },
};

// 재질 표. 부품 id 가 총끼리 같은 뜻이라 총마다 다시 쓰지 않는다.
export const LOOK = {
  frame:     { color: 0x24282f, metalness: 0.04, roughness: 0.92 },  // 폴리머
  slide:     { color: 0x79838f, metalness: 0.80, roughness: 0.30 },
  barrel:    { color: 0x9aa3ae, metalness: 0.88, roughness: 0.20 },
  spring:    { color: 0x8a929c, metalness: 0.85, roughness: 0.26 },
  magazine:  { color: 0x3d4551, metalness: 0.60, roughness: 0.48 },
  slidelock: { color: 0x8d97a4, metalness: 0.80, roughness: 0.30 },
  cylinder:  { color: 0x8891a0, metalness: 0.85, roughness: 0.26 },
  sideplate: { color: 0x79838f, metalness: 0.80, roughness: 0.30 },
  latch:     { color: 0x8d97a4, metalness: 0.80, roughness: 0.30 },
  yokescrew: { color: 0xa8b0ba, metalness: 0.90, roughness: 0.18 },
  grip:      { color: 0x6b4a2f, metalness: 0.02, roughness: 0.78 },   // 나무 그립. 강철뿐인 화면에서 유일한 대비다.
};

// 폴리머가 아닌 프레임만 따로 적는다.
export const FRAME_LOOK = {
  revolver: { color: 0x6f7680, metalness: 0.78, roughness: 0.30 },   // 블루잉 강철
};
