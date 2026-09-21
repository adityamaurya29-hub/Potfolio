/**
 * Web Audio API Sci-Fi Sound Synthesizer
 * Generates instant, zero-latency futuristic UI sound effects purely through browser oscillators.
 */

const CyberAudio = (function () {
  let audioCtx = null;
  let isMuted = true; // Muted by default for polite UX

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = "sine", duration = 0.08, gainVal = 0.04) {
    if (isMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio synthesis errors gracefully
    }
  }

  return {
    toggleMute: function () {
      isMuted = !isMuted;
      if (!isMuted) {
        initAudio();
        this.playSuccess();
      }
      return isMuted;
    },

    isMuted: function () {
      return isMuted;
    },

    playHover: function () {
      if (isMuted) return;
      playTone(880, "triangle", 0.04, 0.02);
    },

    playClick: function () {
      if (isMuted) return;
      playTone(1200, "sine", 0.06, 0.035);
    },

    playFilter: function () {
      if (isMuted) return;
      try {
        initAudio();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } catch (e) {}
    },

    playSuccess: function () {
      if (isMuted) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          playTone(freq, "sine", 0.12, 0.03);
        }, idx * 60);
      });
    }
  };
})();

if (typeof window !== "undefined") {
  window.CyberAudio = CyberAudio;
}
