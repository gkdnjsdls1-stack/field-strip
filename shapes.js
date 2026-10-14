// 2D 버전과 같은 측면도 경로를 그대로 쓴다. SVGLoader 로 읽어 두께를 준다.
// 좌표는 SVG 기준(y가 아래로 증가). 3D 쪽에서 X축 180도 회전으로 뒤집는다.
// axis 도 같은 SVG 기준이라 "아래"는 y=+1, "총구 쪽"은 x=-1 이다.
//
// 세 총 모두 같은 640x500 공간에 그린다. 실측 도면이 아니라 실루엣이 구별되게 그린
// 양식화된 측면도다 — 부싱/플러그(1911형), 뚫린 슬라이드 윗면(92형)처럼
// "그 총을 그 총이게 하는" 특징만 과장해서 남겼다.
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

  // 총구 쪽에 플러그·부싱이 따로 달린 것이 이 총의 얼굴이다. 뒤쪽 비버테일 혹도 특징.
  m1911: {
    plug: {
      d: 'M126 73 H141 V93 H126 Q119 93 119 83 Q119 73 126 73 Z',
      depth: 22, axis: [-1, -0.35, 0], pull: 70,
    },
    bushing: {
      d: 'M152 62 H168 V104 H152 Q140 104 140 83 Q140 62 152 62 Z',
      depth: 30, axis: [-1, 0.45, 0], pull: 95,
    },
    barrel: {
      d: 'M130 74 H420 L428 66 H452 Q458 66 458 74 V90 Q458 98 452 98 H428 L420 90 H130 Z',
      depth: 24, axis: [-1, 0.1, 0], pull: 150,
    },
    spring: { axis: [-1, 0.7, 0], pull: 150, coil: [146, 392, 92, 7] },
    frame: {
      d: `M168 106 H455 Q470 106 476 118 L486 132 L492 292 Q494 308 478 310 L414 306
          Q402 305 401 294 L390 196 Q388 184 378 184 L310 184 Q297 184 295 168
          L292 140 Q291 132 280 132 L168 132 Z
          M304 138 H372 Q378 138 377 148 L372 162 Q370 167 362 167 L316 167 Q305 167 303 154 Z`,
      depth: 50, axis: [0, 0, 0], pull: 0,
    },
    magazine: {
      d: 'M408 188 L476 184 L484 298 L416 304 Z M412 294 L488 289 L492 316 L416 322 Z',
      depth: 26, axis: [0, 1, 0], pull: 95,
    },
    slide: {
      d: 'M168 70 Q168 58 184 58 H450 Q462 58 462 70 V96 Q462 106 450 106 H178 Q168 106 168 96 Z',
      depth: 46, axis: [-1, -0.85, 0], pull: 185,
    },
    slidestop: {
      d: 'M290 110 H322 Q330 110 330 118 V130 Q330 139 320 139 H294 Q286 139 286 130 Z',
      depth: 62, axis: [-0.25, -1, 0], pull: 70,
    },
  },

  // 슬라이드 윗면이 뚫려 있어 조립 상태에서도 배럴이 보인다. 그 틈이 이 총의 얼굴이다.
  m92: {
    barrel: {
      d: 'M122 70 H400 L408 64 H444 Q452 64 452 72 V88 Q452 96 444 96 H408 L400 90 H122 Z',
      depth: 25, axis: [-1, 0, 0], pull: 150,
    },
    spring: { axis: [-1, 0.7, 0], pull: 150, coil: [134, 386, 94, 8] },
    frame: {
      d: `M125 106 H458 L470 122 L478 290 Q480 306 464 308 L398 304 Q386 303 385 292
          L374 192 Q372 180 362 180 L298 180 Q285 180 283 164 L280 138 Q279 130 268 130 L125 130 Z
          M296 136 H364 Q370 136 369 146 L364 160 Q362 165 354 165 L308 165 Q297 165 295 152 Z`,
      depth: 52, axis: [0, 0, 0], pull: 0,
    },
    magazine: {
      d: 'M396 154 L458 150 L470 292 L408 298 Z M400 288 L478 283 L482 312 L404 318 Z',
      depth: 40, axis: [0, 1, 0], pull: 95,
    },
    slide: {
      d: `M125 72 Q125 60 140 60 H210 V74 H388 V60 H450 Q462 60 462 72 V96
          Q462 106 450 106 H136 Q125 106 125 96 Z`,
      depth: 48, axis: [-1, -0.8, 0], pull: 175,
    },
    lever: {
      d: 'M282 110 H308 Q318 110 318 122 Q318 136 306 139 L288 142 Q278 140 278 128 Z',
      depth: 64, axis: [0, 1, 0], pull: 45,
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
  // 방아쇠울이 곧 분해 레버다. 배럴은 프레임에 붙박여 빠지지 않아 단계가 넷뿐 — 제일 짧다.
  pm: {
    frame: {
      // 배럴이 프레임의 일부다. 따로 그리면 슬라이드를 빼는 순간 공중에 뜬다.
      // 그래서 총구 → 배럴 윗면 → 프레임 윗면 → 그립 → 프레임 밑면 → 배럴 밑면 한 바퀴로 그린다.
      d: `M146 74 H230 V104 H452 Q462 106 464 118 L470 266 Q472 282 456 284
          L396 280 Q384 279 383 268 L372 142 H216 V96 H146 Z`,
      depth: 46, axis: [0, 0, 0], pull: 0,
    },
    slide: {
      d: 'M164 76 Q164 64 180 64 H434 Q450 64 450 80 V94 Q450 104 434 104 H176 Q164 104 164 92 Z',
      depth: 44, axis: [-1, -0.8, 0], pull: 170,
    },
    guard: {   // 고리라 가운데를 뚫어야 방아쇠울로 보인다
      d: `M282 138 H348 Q356 140 354 154 L348 174 Q344 182 330 182 L296 182 Q282 180 281 164 Z
          M294 148 H338 Q344 149 343 158 L338 168 Q335 172 328 172 L302 172 Q294 170 293 160 Z`,
      evenodd: true, depth: 20, axis: [0, 1, 0], pull: 70,
    },
    spring: { axis: [-1, 0.7, 0], pull: 140, coil: [172, 420, 86, 7] },
    magazine: {
      d: 'M392 144 L450 140 L460 266 L402 272 Z M396 262 L466 257 L470 286 L400 292 Z',
      depth: 24, axis: [0, 1, 0], pull: 95,
    },
  },

  // 가스식 대구경. 슬라이드 안에 회전 노리쇠가 따로 들어 있는 유일한 총이다.
  big: {
    barrel: {
      d: 'M108 72 H424 L432 64 H454 Q460 64 460 72 V90 Q460 98 454 98 H432 L424 90 H108 Z',
      depth: 30, axis: [-1, 0.15, 0], pull: 160,
    },
    bolt: {
      d: 'M330 72 H422 Q432 74 432 85 Q432 97 422 99 H330 Q320 97 320 85 Q320 74 330 72 Z',
      depth: 36, axis: [-1, -0.2, 0], pull: 150,
    },
    spring: { axis: [-1, 0.7, 0], pull: 150, coil: [128, 384, 102, 9] },
    frame: {
      d: `M118 112 H466 L478 128 L486 292 Q488 308 472 310 L404 306 Q392 305 391 294
          L380 198 Q378 186 368 186 L302 186 Q289 186 287 170 L284 144 Q283 136 272 136 L118 136 Z
          M300 142 H370 Q376 142 375 152 L370 166 Q368 171 360 171 L312 171 Q301 171 299 158 Z`,
      depth: 56, axis: [0, 0, 0], pull: 0,
    },
    magazine: {
      d: 'M398 158 L464 154 L476 296 L410 302 Z M402 292 L484 287 L488 318 L406 324 Z',
      depth: 44, axis: [0, 1, 0], pull: 95,
    },
    slide: {
      d: 'M118 68 L150 52 H444 Q462 52 462 70 V100 Q462 112 448 112 H132 Q118 112 118 98 Z',
      depth: 54, axis: [-1, -0.85, 0], pull: 185,
    },
    barrelbolt: {
      d: 'M152 112 H188 Q196 114 194 124 L188 134 H158 Q150 132 150 122 Z',
      depth: 56, axis: [0, 1, 0], pull: 60,
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
  m1911:    { feed: 'magazine', action: 'auto',     muzzle: [124, 82], port: [312, 60],
              sights: [185, 448, 58, 'slide'] },
  m92:      { feed: 'magazine', action: 'auto',     muzzle: [118, 80], port: [300, 62],
              sights: [150, 440, 60, 'slide'] },
  revolver: { feed: 'cylinder', action: 'revolver', muzzle: [118, 83],
              sights: [132, 358, 70, 'frame'] },
  pm:       { feed: 'magazine', action: 'auto',     muzzle: [144, 85], port: [300, 66],
              sights: [178, 436, 64, 'slide'] },
  big:      { feed: 'magazine', action: 'auto',     muzzle: [106, 81], port: [310, 56],
              sights: [162, 448, 52, 'slide'] },
};

// 재질 표. 부품 id 가 세 총에서 같은 뜻이라 총마다 다시 쓰지 않는다.
export const LOOK = {
  frame:     { color: 0x24282f, metalness: 0.04, roughness: 0.92 },  // 폴리머(1911형·92형은 알루미늄이지만 색만 다르다)
  slide:     { color: 0x79838f, metalness: 0.80, roughness: 0.30 },
  barrel:    { color: 0x9aa3ae, metalness: 0.88, roughness: 0.20 },
  spring:    { color: 0x8a929c, metalness: 0.85, roughness: 0.26 },
  magazine:  { color: 0x3d4551, metalness: 0.60, roughness: 0.48 },
  slidelock: { color: 0x8d97a4, metalness: 0.80, roughness: 0.30 },
  slidestop: { color: 0x8d97a4, metalness: 0.80, roughness: 0.30 },
  lever:     { color: 0x8d97a4, metalness: 0.80, roughness: 0.30 },
  plug:      { color: 0x9aa3ae, metalness: 0.85, roughness: 0.24 },
  bushing:   { color: 0x9aa3ae, metalness: 0.85, roughness: 0.24 },
  cylinder:  { color: 0x8891a0, metalness: 0.85, roughness: 0.26 },
  sideplate: { color: 0x79838f, metalness: 0.80, roughness: 0.30 },
  latch:     { color: 0x8d97a4, metalness: 0.80, roughness: 0.30 },
  yokescrew: { color: 0xa8b0ba, metalness: 0.90, roughness: 0.18 },
  grip:      { color: 0x6b4a2f, metalness: 0.02, roughness: 0.78 },   // 나무 그립. 강철뿐인 화면에서 유일한 대비다.
  guard:     { color: 0x8d97a4, metalness: 0.80, roughness: 0.30 },
  bolt:      { color: 0xa8b0ba, metalness: 0.90, roughness: 0.18 },
  barrelbolt:{ color: 0x8d97a4, metalness: 0.80, roughness: 0.30 },
};

// 1911형 프레임은 알루미늄/강철이라 폴리머 색이 맞지 않는다.
export const FRAME_LOOK = {
  m1911:    { color: 0x5b626c, metalness: 0.70, roughness: 0.38 },
  revolver: { color: 0x6f7680, metalness: 0.78, roughness: 0.30 },   // 블루잉 강철
  pm:       { color: 0x3a3f47, metalness: 0.62, roughness: 0.42 },
  big:      { color: 0x5f666f, metalness: 0.72, roughness: 0.34 },
};
