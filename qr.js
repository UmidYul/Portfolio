/* Генератор QR-кода: byte mode, уровень коррекции M, версии 1–6.
   Без зависимостей. Возвращает квадратную матрицу 0/1. */
(function (root) {
  'use strict';

  /* ——— поле Галуа GF(256), примитивный многочлен 0x11D ——— */

  var EXP = new Uint8Array(512);
  var LOG = new Uint8Array(256);

  (function () {
    var x = 1;
    for (var i = 0; i < 255; i++) {
      EXP[i] = x;
      LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11D;
    }
    for (var j = 255; j < 512; j++) EXP[j] = EXP[j - 255];
  })();

  function gmul(a, b) {
    if (a === 0 || b === 0) return 0;
    return EXP[LOG[a] + LOG[b]];
  }

  /* порождающий многочлен Рида — Соломона степени n */
  function rsGen(n) {
    var g = [1];
    for (var i = 0; i < n; i++) {
      var ng = [];
      for (var k = 0; k <= g.length; k++) ng[k] = 0;
      for (var j = 0; j < g.length; j++) {
        ng[j] ^= g[j];                      // умножение на x
        ng[j + 1] ^= gmul(g[j], EXP[i]);    // умножение на alpha^i
      }
      g = ng;
    }
    return g;
  }

  /* остаток от деления — это и есть байты коррекции */
  function rsEC(data, n) {
    var g = rsGen(n);
    var res = [];
    var i, j;
    for (i = 0; i < data.length; i++) res[i] = data[i];
    for (i = data.length; i < data.length + n; i++) res[i] = 0;
    for (i = 0; i < data.length; i++) {
      var c = res[i];
      if (c === 0) continue;
      for (j = 0; j < g.length; j++) res[i + j] ^= gmul(g[j], c);
    }
    return res.slice(data.length);
  }

  /* ——— таблицы версий для уровня M ———
     [всего кодовых слов, EC на блок, блоков группы 1, данных в блоке группы 1,
      блоков группы 2, данных в блоке группы 2] */
  var VER = {
    1: [26, 10, 1, 16, 0, 0],
    2: [44, 16, 1, 28, 0, 0],
    3: [70, 26, 1, 44, 0, 0],
    4: [100, 18, 2, 32, 0, 0],
    5: [134, 24, 2, 43, 0, 0],
    6: [172, 16, 4, 27, 0, 0]
  };

  /* центр единственного выравнивающего узора для версий 2–6 */
  var ALIGN = { 2: 18, 3: 22, 4: 26, 5: 30, 6: 34 };

  function dataCapacity(v) {
    var t = VER[v];
    var dataWords = t[2] * t[3] + t[4] * t[5];
    return dataWords - 2;            // 4 бита режима + 8 бит длины = 12 бит
  }

  function utf8(str) {
    var out = [];
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 0x80) {
        out.push(c);
      } else if (c < 0x800) {
        out.push(0xC0 | (c >> 6), 0x80 | (c & 0x3F));
      } else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < str.length) {
        var c2 = str.charCodeAt(++i);
        var cp = 0x10000 + ((c - 0xD800) << 10) + (c2 - 0xDC00);
        out.push(0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3F),
                 0x80 | ((cp >> 6) & 0x3F), 0x80 | (cp & 0x3F));
      } else {
        out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F));
      }
    }
    return out;
  }

  /* ——— битовый поток ——— */

  function buildCodewords(bytes, version) {
    var t = VER[version];
    var dataWords = t[2] * t[3] + t[4] * t[5];
    var bits = [];
    var i, j;

    function push(val, len) {
      for (var k = len - 1; k >= 0; k--) bits.push((val >> k) & 1);
    }

    push(0b0100, 4);              // режим: байты
    push(bytes.length, 8);        // длина, 8 бит для версий 1–9
    for (i = 0; i < bytes.length; i++) push(bytes[i], 8);

    var cap = dataWords * 8;
    var term = Math.min(4, cap - bits.length);
    push(0, term);                                  // терминатор
    while (bits.length % 8 !== 0) bits.push(0);     // добивка до байта

    var words = [];
    for (i = 0; i < bits.length; i += 8) {
      var b = 0;
      for (j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
      words.push(b);
    }
    var pad = [0xEC, 0x11];
    for (i = 0; words.length < dataWords; i++) words.push(pad[i % 2]);

    /* разбиение на блоки */
    var blocks = [], pos = 0;
    for (i = 0; i < t[2]; i++) { blocks.push(words.slice(pos, pos + t[3])); pos += t[3]; }
    for (i = 0; i < t[4]; i++) { blocks.push(words.slice(pos, pos + t[5])); pos += t[5]; }

    var ecBlocks = blocks.map(function (b) { return rsEC(b, t[1]); });

    /* чередование */
    var out = [];
    var maxData = Math.max(t[3], t[5]);
    for (i = 0; i < maxData; i++) {
      for (j = 0; j < blocks.length; j++) {
        if (i < blocks[j].length) out.push(blocks[j][i]);
      }
    }
    for (i = 0; i < t[1]; i++) {
      for (j = 0; j < ecBlocks.length; j++) out.push(ecBlocks[j][i]);
    }
    return out;
  }

  /* ——— матрица ——— */

  function makeMatrix(version) {
    var size = 17 + 4 * version;
    var m = [], fn = [];
    for (var r = 0; r < size; r++) {
      m.push(new Array(size).fill(0));
      fn.push(new Array(size).fill(false));
    }

    function set(r, c, v) { m[r][c] = v; fn[r][c] = true; }

    function finder(r0, c0) {
      for (var r = -1; r <= 7; r++) {
        for (var c = -1; c <= 7; c++) {
          var rr = r0 + r, cc = c0 + c;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          var inRing = (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
                       (c >= 0 && c <= 6 && (r === 0 || r === 6));
          var inCore = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          set(rr, cc, (inRing || inCore) ? 1 : 0);
        }
      }
    }

    finder(0, 0);
    finder(0, size - 7);
    finder(size - 7, 0);

    /* синхрополосы */
    for (var i = 8; i < size - 8; i++) {
      var v = (i % 2 === 0) ? 1 : 0;
      set(6, i, v);
      set(i, 6, v);
    }

    /* выравнивающий узор */
    if (ALIGN[version]) {
      var a = ALIGN[version];
      for (var dr = -2; dr <= 2; dr++) {
        for (var dc = -2; dc <= 2; dc++) {
          var ring = Math.max(Math.abs(dr), Math.abs(dc));
          set(a + dr, a + dc, (ring === 1) ? 0 : 1);
        }
      }
    }

    /* тёмный модуль */
    set(size - 8, 8, 1);

    /* резерв под информацию о формате */
    for (i = 0; i < 9; i++) {
      if (!fn[8][i]) set(8, i, 0);
      if (!fn[i][8]) set(i, 8, 0);
    }
    for (i = 0; i < 8; i++) {
      if (!fn[8][size - 1 - i]) set(8, size - 1 - i, 0);
      if (!fn[size - 1 - i][8]) set(size - 1 - i, 8, 0);
    }

    return { m: m, fn: fn, size: size };
  }

  function placeData(mx, words) {
    var m = mx.m, fn = mx.fn, size = mx.size;
    var bitIdx = 0;
    var total = words.length * 8;

    function nextBit() {
      if (bitIdx >= total) return 0;          // остаточные биты — нули
      var b = (words[bitIdx >> 3] >> (7 - (bitIdx & 7))) & 1;
      bitIdx++;
      return b;
    }

    var up = true;
    for (var col = size - 1; col > 0; col -= 2) {
      if (col === 6) col--;                   // столбец синхрополосы пропускаем
      for (var i = 0; i < size; i++) {
        var row = up ? (size - 1 - i) : i;
        for (var k = 0; k < 2; k++) {
          var c = col - k;
          if (fn[row][c]) continue;
          m[row][c] = nextBit();
        }
      }
      up = !up;
    }
  }

  var MASKS = [
    function (r, c) { return (r + c) % 2 === 0; },
    function (r) { return r % 2 === 0; },
    function (r, c) { return c % 3 === 0; },
    function (r, c) { return (r + c) % 3 === 0; },
    function (r, c) { return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; },
    function (r, c) { return ((r * c) % 2) + ((r * c) % 3) === 0; },
    function (r, c) { return ((((r * c) % 2) + ((r * c) % 3)) % 2) === 0; },
    function (r, c) { return ((((r + c) % 2) + ((r * c) % 3)) % 2) === 0; }
  ];

  function formatBits(mask) {
    var d = (0b00 << 3) | mask;              // уровень M = 00
    var rem = d << 10;
    for (var i = 14; i >= 10; i--) {
      if (rem & (1 << i)) rem ^= 0x537 << (i - 10);
    }
    return ((d << 10) | rem) ^ 0x5412;
  }

  function applyFormat(m, size, mask) {
    var bits = formatBits(mask);
    for (var i = 0; i < 15; i++) {
      /* старший бит идёт первым: позиция i получает бит 14-i */
      var b = (bits >> (14 - i)) & 1;

      if (i < 6)       m[8][i] = b;
      else if (i === 6) m[8][7] = b;
      else if (i === 7) m[8][8] = b;
      else if (i === 8) m[7][8] = b;
      else              m[14 - i][8] = b;

      if (i < 7) m[size - 1 - i][8] = b;
      else       m[8][size - 15 + i] = b;
    }
  }

  function penalty(m, size) {
    var score = 0, r, c, i, run, last;

    /* правило 1: пять и более одинаковых подряд */
    for (r = 0; r < size; r++) {
      run = 1; last = m[r][0];
      for (c = 1; c < size; c++) {
        if (m[r][c] === last) { run++; }
        else { if (run >= 5) score += 3 + (run - 5); run = 1; last = m[r][c]; }
      }
      if (run >= 5) score += 3 + (run - 5);
    }
    for (c = 0; c < size; c++) {
      run = 1; last = m[0][c];
      for (r = 1; r < size; r++) {
        if (m[r][c] === last) { run++; }
        else { if (run >= 5) score += 3 + (run - 5); run = 1; last = m[r][c]; }
      }
      if (run >= 5) score += 3 + (run - 5);
    }

    /* правило 2: блоки 2×2 */
    for (r = 0; r < size - 1; r++) {
      for (c = 0; c < size - 1; c++) {
        var v = m[r][c];
        if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) score += 3;
      }
    }

    /* правило 3: узор 1:1:3:1:1 с четырьмя светлыми модулями по краю */
    var P1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    var P2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
    function match(get, len, at) {
      var ok1 = true, ok2 = true;
      for (var k = 0; k < 11; k++) {
        var val = get(at + k);
        if (val !== P1[k]) ok1 = false;
        if (val !== P2[k]) ok2 = false;
      }
      return ok1 || ok2;
    }
    for (r = 0; r < size; r++) {
      for (c = 0; c + 11 <= size; c++) {
        if (match(function (x) { return m[r][x]; }, size, c)) score += 40;
      }
    }
    for (c = 0; c < size; c++) {
      for (r = 0; r + 11 <= size; r++) {
        if (match(function (x) { return m[x][c]; }, size, r)) score += 40;
      }
    }

    /* правило 4: перекос соотношения тёмных и светлых */
    var dark = 0;
    for (r = 0; r < size; r++) for (c = 0; c < size; c++) dark += m[r][c];
    var pct = (dark * 100) / (size * size);
    score += Math.floor(Math.abs(pct - 50) / 5) * 10;

    return score;
  }

  function generate(text, forceMask) {
    var bytes = utf8(text);
    var version = 0;
    for (var v = 1; v <= 6; v++) {
      if (bytes.length <= dataCapacity(v)) { version = v; break; }
    }
    if (!version) throw new Error('Текст слишком длинный для версий 1–6');

    var words = buildCodewords(bytes, version);

    var best = null, bestScore = Infinity, bestMask = -1;
    for (var mask = 0; mask < 8; mask++) {
      if (forceMask !== undefined && forceMask !== null && mask !== forceMask) continue;
      var mx = makeMatrix(version);
      placeData(mx, words);
      var size = mx.size;
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
          if (!mx.fn[r][c] && MASKS[mask](r, c)) mx.m[r][c] ^= 1;
        }
      }
      applyFormat(mx.m, size, mask);
      var s = penalty(mx.m, size);
      if (s < bestScore) { bestScore = s; best = mx.m; bestMask = mask; }
    }
    generate.lastMask = bestMask;
    generate.lastVersion = version;
    return best;
  }

  root.makeQR = generate;

})(typeof module !== 'undefined' && module.exports ? module.exports : (typeof window !== 'undefined' ? window : this));
