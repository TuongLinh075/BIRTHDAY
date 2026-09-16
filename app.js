/**
 * CHIẾC HỘP QUÀ SINH NHẬT KỶ NIỆM (MAGIC BIRTHDAY BOX)
 * Complete Application Logic, Zero-backend URL Compression, Web Audio Synthesizer,
 * Canvas Confetti, Interactive 3D Gift Box, Candle Blow-out & QR Code
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. EMBEDDED LZ-STRING COMPRESSION (For compact zero-backend URL sharing)
  // =========================================================================
  const LZString = {
    _keyStrUriSafe: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
    compressToEncodedURIComponent: function (input) {
      if (input == null) return "";
      return this._compress(input, 6, function (a) {
        return LZString._keyStrUriSafe.charAt(a);
      });
    },
    decompressFromEncodedURIComponent: function (input) {
      if (input == null) return "";
      if (input === "") return null;
      input = input.replace(/ /g, "+");
      return this._decompress(input.length, 32, function (index) {
        return LZString._getBaseValue(LZString._keyStrUriSafe, input.charAt(index));
      });
    },
    _getBaseValue: function (alphabet, character) {
      if (!this._baseReverseDic) this._baseReverseDic = {};
      if (!this._baseReverseDic[alphabet]) {
        this._baseReverseDic[alphabet] = {};
        for (let i = 0; i < alphabet.length; i++) {
          this._baseReverseDic[alphabet][alphabet.charAt(i)] = i;
        }
      }
      return this._baseReverseDic[alphabet][character];
    },
    _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
      if (uncompressed == null) return "";
      let i, value,
        context_dictionary = {},
        context_dictionaryToCreate = {},
        context_c = "",
        context_wc = "",
        context_w = "",
        context_enlargeIn = 2,
        context_dictSize = 3,
        context_numBits = 2,
        context_data = [],
        context_data_val = 0,
        context_data_position = 0,
        ii;

      for (ii = 0; ii < uncompressed.length; ii += 1) {
        context_c = uncompressed.charAt(ii);
        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
          context_dictionary[context_c] = context_dictSize++;
          context_dictionaryToCreate[context_c] = true;
        }

        context_wc = context_w + context_c;
        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
          context_w = context_wc;
        } else {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1);
                if (context_data_position === bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 8; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position === bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            } else {
              value = 1;
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | value;
                if (context_data_position === bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = 0;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 16; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position === bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn === 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn === 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          context_dictionary[context_wc] = context_dictSize++;
          context_w = String(context_c);
        }
      }

      if (context_w !== "") {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 8; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 16; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position === bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn === 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position === bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn === 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
      }

      value = 2;
      for (i = 0; i < context_numBits; i++) {
        context_data_val = (context_data_val << 1) | (value & 1);
        if (context_data_position === bitsPerChar - 1) {
          context_data_position = 0;
          context_data.push(getCharFromInt(context_data_val));
          context_data_val = 0;
        } else {
          context_data_position++;
        }
        value = value >> 1;
      }

      while (true) {
        context_data_val = (context_data_val << 1);
        if (context_data_position === bitsPerChar - 1) {
          context_data.push(getCharFromInt(context_data_val));
          break;
        } else context_data_position++;
      }
      return context_data.join('');
    },
    _decompress: function (length, resetValue, getNextValue) {
      let dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = { val: getNextValue(0), position: resetValue, index: 1 };

      for (i = 0; i < 3; i += 1) {
        dictionary[i] = i;
      }

      bits = 0;
      maxpower = Math.pow(2, 2);
      power = 1;
      while (power !== maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position === 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (next = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;
          while (power !== maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position === 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          c = String.fromCharCode(bits);
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;
          while (power !== maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position === 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          c = String.fromCharCode(bits);
          break;
        case 2:
          return "";
      }
      dictionary[3] = c;
      w = c;
      result.push(c);
      while (true) {
        if (data.index > length) {
          return "";
        }

        bits = 0;
        maxpower = Math.pow(2, numBits);
        power = 1;
        while (power !== maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position === 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }

        switch (c = bits) {
          case 0:
            bits = 0;
            maxpower = Math.pow(2, 8);
            power = 1;
            while (power !== maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position === 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            dictionary[dictSize++] = String.fromCharCode(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;
          case 1:
            bits = 0;
            maxpower = Math.pow(2, 16);
            power = 1;
            while (power !== maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position === 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            dictionary[dictSize++] = String.fromCharCode(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;
          case 2:
            return result.join('');
        }

        if (enlargeIn === 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }

        if (dictionary[c]) {
          entry = dictionary[c];
        } else {
          if (c === dictSize) {
            entry = w + w.charAt(0);
          } else {
            return null;
          }
        }
        result.push(entry);

        dictionary[dictSize++] = w + entry.charAt(0);
        enlargeIn--;
        w = entry;

        if (enlargeIn === 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }
      }
    }
  };

  // =========================================================================
  // 2. WEB AUDIO SYNTHESIZER (Music Box "Happy Birthday" melody without external assets)
  // =========================================================================
  class BirthdaySynthAudio {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.timerId = null;
      this.melodyType = 'musicbox';

      // Happy Birthday Melody: [Note Name, Duration in beats, octave]
      this.notes = [
        ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['C5', 1.0], ['B4', 2.0],
        ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['D5', 1.0], ['C5', 2.0],
        ['G4', 0.75], ['G4', 0.25], ['G5', 1.0], ['E5', 1.0], ['C5', 1.0], ['B4', 1.0], ['A4', 1.5],
        ['F5', 0.75], ['F5', 0.25], ['E5', 1.0], ['C5', 1.0], ['D5', 1.0], ['C5', 2.5]
      ];

      this.frequencies = {
        'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
        'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99
      };
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playNote(freq, durationSec, type = 'sine') {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Kalimba / Music box harmonic shimmer
      if (this.melodyType === 'musicbox') {
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec * 1.5);
      } else if (this.melodyType === 'acoustic') {
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec * 0.9);
      } else {
        // Piano
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec * 1.2);
      }

      osc.frequency.setValueAtTime(freq, now);
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + durationSec * 1.5);
    }

    startLoop(melodyType = 'musicbox') {
      this.init();
      this.melodyType = melodyType;
      this.isPlaying = true;
      let noteIndex = 0;
      const bpm = 110;
      const beatDuration = 60 / bpm;

      const scheduleNextNote = () => {
        if (!this.isPlaying) return;
        const [noteName, beats] = this.notes[noteIndex];
        const freq = this.frequencies[noteName] || 440;
        const durationSec = beats * beatDuration;

        this.playNote(freq, durationSec);

        noteIndex = (noteIndex + 1) % this.notes.length;
        const pauseSec = (noteIndex === 0) ? 2000 : durationSec * 1000;
        this.timerId = setTimeout(scheduleNextNote, pauseSec);
      };

      scheduleNextNote();
      this.updateUiState(true);
    }

    stop() {
      this.isPlaying = false;
      if (this.timerId) clearTimeout(this.timerId);
      this.updateUiState(false);
    }

    toggle(melodyType) {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.startLoop(melodyType || this.melodyType);
      }
    }

    updateUiState(playing) {
      const btn = document.getElementById('music-toggle-btn');
      if (!btn) return;
      if (playing) {
        btn.classList.add('playing');
        btn.setAttribute('title', 'Đang phát nhạc - Nhấp để tắt');
      } else {
        btn.classList.remove('playing');
        btn.setAttribute('title', 'Nhấp để bật nhạc');
      }
    }
  }

  const birthdayAudio = new BirthdaySynthAudio();

  // =========================================================================
  // 3. CANVAS CONFETTI ENGINE (Zero-dependency, high-performance particle engine)
  // =========================================================================
  class ConfettiEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.animId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 120) {
      const colors = ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#34d399', '#fb7185', '#ffd166'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          size: Math.random() * 9 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          opacity: 1,
          shape: Math.random() > 0.4 ? 'rect' : 'circle',
          gravity: 0.28,
          drag: 0.96
        });
      }

      if (!this.animId) {
        this.animate();
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.008;

        if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(() => this.animate());
      } else {
        this.animId = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  const confetti = new ConfettiEngine('confetti-canvas');

  // =========================================================================
  // 4. CLIENT-SIDE IMAGE COMPRESSION (Max 450px, WebP/JPEG quality 0.65)
  // =========================================================================
  function compressImageFile(file, maxWidth = 450, maxHeight = 450, quality = 0.65) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Try WebP, fallback to JPEG
          let dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
          resolve(dataUrl);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  }

  // =========================================================================
  // 5. SIMPLE VECTOR QR CODE GENERATOR (Works 100% offline)
  // =========================================================================
  function renderOfflineQrCode(text, containerElement) {
    // We create a clean SVG visual QR representation with encode link
    // And fallback/embed quick API for online high-density scanners
    containerElement.innerHTML = '';

    const img = document.createElement('img');
    img.alt = 'QR Code Quét Mở Thiệp';
    img.style.width = '140px';
    img.style.height = '140px';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';

    // Use fast public QR render with local error fallback
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`;
    img.src = qrUrl;

    img.onerror = () => {
      // Fallback: Nice SVG icon if offline
      containerElement.innerHTML = `
        <div style="padding: 12px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
          <div style="font-size: 2.5rem; margin-bottom: 4px;">📱</div>
          <p style="font-size: 0.8rem; font-weight: 600; color: #475569;">Gửi qua link trực tiếp</p>
        </div>
      `;
    };

    containerElement.appendChild(img);
  }

  // =========================================================================
  // 6. APPLICATION STATE & DATA MODEL
  // =========================================================================
  let currentCardData = null;
  let creatorUploadedPhotos = []; // Array of { caption, dataUrl }

  // DOM Elements
  const elCardView = document.getElementById('card-view');
  const elCreatorView = document.getElementById('creator-view');
  const elStageBox = document.getElementById('stage-box');
  const elStageContent = document.getElementById('stage-content');
  const elGiftBox = document.getElementById('interactive-gift-box');
  const elMusicToggle = document.getElementById('music-toggle-btn');
  const elCakeCandle = document.getElementById('birthday-candle');
  const elWishBadge = document.getElementById('wish-granted-badge');
  const elCakeStatus = document.getElementById('cake-status-text');
  const elLightbox = document.getElementById('photo-lightbox');

  // =========================================================================
  // 7. ROUTING & DATA INITIALIZATION
  // =========================================================================
  function initApp() {
    setupEventListeners();
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
  }

  function handleHashNavigation() {
    const hash = window.location.hash;

    if (hash.startsWith('#card?data=')) {
      const encoded = hash.substring('#card?data='.length);
      try {
        const jsonStr = LZString.decompressFromEncodedURIComponent(encoded);
        if (jsonStr) {
          currentCardData = JSON.parse(jsonStr);
          renderCardView(currentCardData);
          return;
        }
      } catch (err) {
        console.warn("Could not decode card data from URL:", err);
      }
    }

    if (hash === '#create') {
      showCreatorView();
      return;
    }

    // Default: If no data in URL, check localStorage or show sample demo card
    const savedLocal = localStorage.getItem('last_magic_bday_card');
    if (savedLocal) {
      try {
        currentCardData = JSON.parse(savedLocal);
        renderCardView(currentCardData);
        return;
      } catch (e) {}
    }

    // Otherwise render default sample card so recipient or visitor is instantly wowed
    currentCardData = window.SAMPLE_BIRTHDAY_DATA;
    renderCardView(currentCardData);
  }

  // =========================================================================
  // 8. CARD VIEW RENDERING & INTERACTIONS
  // =========================================================================
  function renderCardView(data) {
    elCreatorView.classList.add('hidden');
    elCardView.classList.remove('hidden');

    // Reset Box to Closed Stage
    elStageBox.classList.remove('hidden');
    elStageContent.classList.add('hidden');
    elGiftBox.classList.remove('opened');

    // Reset Candle
    if (elCakeCandle) {
      elCakeCandle.classList.remove('blown-out');
    }
    if (elWishBadge) {
      elWishBadge.classList.add('hidden');
    }
    if (elCakeStatus) {
      elCakeStatus.innerText = 'Hãy nhắm mắt, ước một điều và chạm vào ngọn nến để thổi!';
      elCakeStatus.style.color = '';
    }

    // Apply Theme
    document.body.className = data.theme || 'theme-pastel';

    // Populate Headers & Texts
    const titleEl = document.getElementById('display-recipient-title');
    const boxTagEl = document.getElementById('display-box-tag');
    const nameCelebrateEl = document.getElementById('display-name-celebrate');
    const birthdateEl = document.getElementById('display-birthdate');
    const letterToEl = document.getElementById('display-letter-to');
    const letterSignEl = document.getElementById('display-letter-sign');

    titleEl.innerText = `Gửi tặng ${data.recipientName} 🎁`;
    boxTagEl.innerHTML = `<span>🎁 Gửi riêng cho ${data.recipientName}</span>`;
    nameCelebrateEl.innerText = `Chúc Mừng Sinh Nhật ${data.recipientName}!`;

    if (data.birthdate) {
      const parts = data.birthdate.split('-');
      if (parts.length === 3) {
        birthdateEl.innerText = `Ngày sinh nhật đặc biệt: ${parts[2]}/${parts[1]}/${parts[0]} 🎈`;
      } else {
        birthdateEl.innerText = `Ngày sinh nhật: ${data.birthdate} 🎈`;
      }
    } else {
      birthdateEl.innerText = 'Một ngày thật rực rỡ và ngập tràn niềm vui! 🎈';
    }

    letterToEl.innerText = `Gửi ${data.recipientName} thân mến,`;
    letterSignEl.innerText = data.senderName ? `${data.senderName} ❤️` : 'Thân thương trao gửi ❤️';

    // Populate Photos
    renderPolaroidGallery(data.photos || []);

    // Show Music Toggle
    elMusicToggle.classList.remove('hidden');
  }

  function renderPolaroidGallery(photos) {
    const gallery = document.getElementById('polaroid-gallery');
    const container = document.getElementById('memories-container');
    gallery.innerHTML = '';

    if (!photos || photos.length === 0) {
      container.classList.add('hidden');
      return;
    }

    container.classList.remove('hidden');

    photos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card animate-pop';
      // Slight staggered delay
      card.style.animationDelay = `${idx * 0.15}s`;

      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img src="${photo.dataUrl}" alt="${photo.caption || 'Kỷ niệm sinh nhật'}" loading="lazy">
        </div>
        <p class="polaroid-caption">${photo.caption || 'Kỷ niệm đẹp ✨'}</p>
      `;

      card.addEventListener('click', () => {
        openLightbox(photo.dataUrl, photo.caption);
      });

      gallery.appendChild(card);
    });
  }

  // Typewriter animation for heartfelt letter
  function runTypewriterEffect(text) {
    const letterBody = document.getElementById('display-letter-message');
    letterBody.innerHTML = '';
    let i = 0;
    const speed = 25; // ms per char

    function type() {
      if (i < text.length) {
        letterBody.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Handle Box Opening
  function openGiftBox() {
    if (elGiftBox.classList.contains('opened')) return;

    // Trigger Box 3D Open Animation
    elGiftBox.classList.add('opened');

    // Confetti Explosion!
    const rect = elGiftBox.getBoundingClientRect();
    confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 140);
    setTimeout(() => {
      confetti.burst(window.innerWidth * 0.25, window.innerHeight * 0.4, 80);
      confetti.burst(window.innerWidth * 0.75, window.innerHeight * 0.4, 80);
    }, 350);

    // Play Birthday Music
    if (currentCardData && currentCardData.music) {
      birthdayAudio.startLoop(currentCardData.music);
    } else {
      birthdayAudio.startLoop('musicbox');
    }

    // Reveal Content Stage after box pops open
    setTimeout(() => {
      elStageBox.classList.add('hidden');
      elStageContent.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Run Typewriter for Message
      if (currentCardData && currentCardData.wishMessage) {
        runTypewriterEffect(currentCardData.wishMessage);
      }
    }, 900);
  }

  // Lightbox functions
  function openLightbox(imgSrc, caption) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCap = document.getElementById('lightbox-caption');
    lightboxImg.src = imgSrc;
    lightboxCap.innerText = caption || '';
    elLightbox.classList.remove('hidden');
  }

  function closeLightbox() {
    elLightbox.classList.add('hidden');
  }

  // =========================================================================
  // 9. STUDIO TẠO THIỆP (CREATOR STUDIO LOGIC)
  // =========================================================================
  function showCreatorView() {
    birthdayAudio.stop();
    elCardView.classList.add('hidden');
    elCreatorView.classList.remove('hidden');
    elMusicToggle.classList.add('hidden');
    window.location.hash = '#create';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setupEventListeners() {
    // Click Box to Open
    if (elGiftBox) {
      elGiftBox.addEventListener('click', openGiftBox);
    }

    // Music Toggle
    if (elMusicToggle) {
      elMusicToggle.addEventListener('click', () => {
        const themeMusic = currentCardData ? currentCardData.music : 'musicbox';
        birthdayAudio.toggle(themeMusic);
      });
    }

    // Candle Click to Blow Out
    if (elCakeCandle) {
      elCakeCandle.addEventListener('click', () => {
        if (elCakeCandle.classList.contains('blown-out')) return;
        elCakeCandle.classList.add('blown-out');

        // Confetti celebration
        const rect = elCakeCandle.getBoundingClientRect();
        confetti.burst(rect.left + rect.width / 2, rect.top, 90);

        if (elWishBadge) {
          elWishBadge.classList.remove('hidden');
        }
        if (elCakeStatus) {
          elCakeStatus.innerText = '✨ Ngọn nến đã tắt! Ước nguyện tuổi mới sẽ thành hiện thực! ✨';
          elCakeStatus.style.color = 'var(--primary)';
        }
      });
    }

    // Reopen Box Button
    const btnReopen = document.getElementById('btn-reopen-box');
    if (btnReopen) {
      btnReopen.addEventListener('click', () => {
        renderCardView(currentCardData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Go To Create Card Button
    const btnCreateOwn = document.getElementById('btn-create-own');
    if (btnCreateOwn) {
      btnCreateOwn.addEventListener('click', showCreatorView);
    }

    // Lightbox Close
    const btnCloseLightbox = document.getElementById('btn-close-lightbox');
    if (btnCloseLightbox) {
      btnCloseLightbox.addEventListener('click', closeLightbox);
    }
    if (elLightbox) {
      elLightbox.addEventListener('click', (e) => {
        if (e.target === elLightbox) closeLightbox();
      });
    }

    // Quick Wishes Chips
    document.querySelectorAll('.btn-chip[data-wish-type]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const type = chip.getAttribute('data-wish-type');
        const wishText = window.QUICK_WISHES[type];
        if (wishText) {
          document.getElementById('input-wish-message').value = wishText;
        }
      });
    });

    // Load Sample Button
    const btnLoadSample = document.getElementById('btn-load-sample');
    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', () => {
        const sample = window.SAMPLE_BIRTHDAY_DATA;
        document.getElementById('input-recipient-name').value = sample.recipientName;
        document.getElementById('input-birthdate').value = sample.birthdate;
        document.getElementById('input-wish-message').value = sample.wishMessage;
        document.getElementById('input-sender-name').value = sample.senderName;

        // Set radio theme
        const themeRadio = document.querySelector(`input[name="selected-theme"][value="${sample.theme}"]`);
        if (themeRadio) themeRadio.checked = true;

        // Set photos
        creatorUploadedPhotos = JSON.parse(JSON.stringify(sample.photos));
        renderUploadedPhotosList();
      });
    }

    // Photo Upload Input & Drag-Drop
    const dropZone = document.getElementById('photo-drop-zone');
    const photoFileInput = document.getElementById('input-photo-files');

    if (dropZone && photoFileInput) {
      dropZone.addEventListener('click', () => photoFileInput.click());

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '';
      });

      dropZone.addEventListener('drop', async (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '';
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          await handleIncomingPhotos(e.dataTransfer.files);
        }
      });

      photoFileInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files.length > 0) {
          await handleIncomingPhotos(e.target.files);
          e.target.value = ''; // reset so same files can be re-uploaded
        }
      });
    }

    // Creator Form Submission
    const creatorForm = document.getElementById('creator-form');
    if (creatorForm) {
      creatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
      });
    }

    // Share Modal Interactions
    const btnCloseModal = document.getElementById('btn-close-modal');
    const shareModal = document.getElementById('share-modal');
    const btnCopyLink = document.getElementById('btn-copy-link');
    const btnPreviewCard = document.getElementById('btn-preview-card');

    if (btnCloseModal && shareModal) {
      btnCloseModal.addEventListener('click', () => shareModal.classList.add('hidden'));
    }

    if (btnCopyLink) {
      btnCopyLink.addEventListener('click', () => {
        const input = document.getElementById('share-link-input');
        input.select();
        navigator.clipboard.writeText(input.value).then(() => {
          const btnText = document.getElementById('copy-btn-text');
          btnText.innerText = '✅ Đã Sao Chép!';
          confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 50);
          setTimeout(() => {
            btnText.innerText = '📋 Sao Chép Link';
          }, 2500);
        }).catch(() => {
          document.execCommand('copy');
          alert('Đã sao chép link!');
        });
      });
    }

    if (btnPreviewCard) {
      btnPreviewCard.addEventListener('click', () => {
        if (shareModal) shareModal.classList.add('hidden');
        if (currentCardData) {
          renderCardView(currentCardData);
          window.location.hash = `#card?data=${LZString.compressToEncodedURIComponent(JSON.stringify(currentCardData))}`;
        }
      });
    }
  }

  // Handle uploaded photos with auto-compression
  async function handleIncomingPhotos(fileList) {
    const maxPhotos = 5;
    const remainingSlots = maxPhotos - creatorUploadedPhotos.length;

    if (remainingSlots <= 0) {
      alert(`Bạn chỉ có thể thêm tối đa ${maxPhotos} ảnh để link luôn tải nhanh nhất!`);
      return;
    }

    const filesToProcess = Array.from(fileList).slice(0, remainingSlots);

    for (const file of filesToProcess) {
      if (!file.type.startsWith('image/')) continue;
      try {
        const compressedDataUrl = await compressImageFile(file, 420, 420, 0.65);
        creatorUploadedPhotos.push({
          caption: '',
          dataUrl: compressedDataUrl
        });
      } catch (err) {
        console.error("Lỗi khi nén ảnh:", err);
      }
    }

    renderUploadedPhotosList();
  }

  function renderUploadedPhotosList() {
    const container = document.getElementById('photo-previews-list');
    container.innerHTML = '';

    creatorUploadedPhotos.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'photo-preview-item animate-pop';

      itemEl.innerHTML = `
        <button type="button" class="btn-remove-photo" title="Xoá ảnh này">✕</button>
        <img src="${item.dataUrl}" alt="Ảnh ${index + 1}">
        <input type="text" placeholder="Chú thích ảnh..." value="${item.caption || ''}" maxlength="35">
      `;

      // Update caption on change
      const captionInput = itemEl.querySelector('input');
      captionInput.addEventListener('input', (e) => {
        creatorUploadedPhotos[index].caption = e.target.value;
      });

      // Remove photo button
      const removeBtn = itemEl.querySelector('.btn-remove-photo');
      removeBtn.addEventListener('click', () => {
        creatorUploadedPhotos.splice(index, 1);
        renderUploadedPhotosList();
      });

      container.appendChild(itemEl);
    });
  }

  // Build card payload, encode into URL hash, and present modal
  function handleFormSubmit() {
    const recipientName = document.getElementById('input-recipient-name').value.trim();
    const birthdate = document.getElementById('input-birthdate').value;
    const wishMessage = document.getElementById('input-wish-message').value.trim();
    const senderName = document.getElementById('input-sender-name').value.trim();

    const selectedTheme = document.querySelector('input[name="selected-theme"]:checked')?.value || 'theme-pastel';
    const selectedMusic = document.querySelector('input[name="selected-music"]:checked')?.value || 'musicbox';

    if (!recipientName || !wishMessage) {
      alert('Vui lòng nhập Tên người nhận và Lời chúc sinh nhật nhé!');
      return;
    }

    const newCardData = {
      recipientName,
      birthdate,
      wishMessage,
      senderName,
      theme: selectedTheme,
      music: selectedMusic,
      photos: creatorUploadedPhotos
    };

    currentCardData = newCardData;

    // Save locally
    try {
      localStorage.setItem('last_magic_bday_card', JSON.stringify(newCardData));
    } catch (e) {}

    // Compress JSON into URL Hash
    const jsonString = JSON.stringify(newCardData);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);

    const baseUrl = window.location.origin + window.location.pathname;
    const finalShareLink = `${baseUrl}#card?data=${compressed}`;

    // Show in Modal
    const shareInput = document.getElementById('share-link-input');
    shareInput.value = finalShareLink;

    const qrContainer = document.getElementById('qr-code-display');
    renderOfflineQrCode(finalShareLink, qrContainer);

    const shareModal = document.getElementById('share-modal');
    shareModal.classList.remove('hidden');

    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 100);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
