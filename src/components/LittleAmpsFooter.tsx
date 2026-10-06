"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

interface Track {
  title: string;
  artist: string;
  duration: string;
  notes: number[][]; // chord frequencies in Hz
  explicit?: boolean;
}

// Frequency mapping for chord notes (Hz)
const NOTES_MAP: Record<string, number> = {
  A2: 110.0,
  Bb2: 116.54,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  "F#3": 185.0,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
};

const TRACKS: Track[] = [
  {
    title: "Atmosphere - 2020 Digital Remaster",
    artist: "Joy Division",
    duration: "04:12",
    notes: [
      [NOTES_MAP["A3"], NOTES_MAP["C4"], NOTES_MAP["E4"]],
      [NOTES_MAP["F3"], NOTES_MAP["A3"], NOTES_MAP["C4"]],
      [NOTES_MAP["G3"], NOTES_MAP["B3"], NOTES_MAP["D4"]],
      [NOTES_MAP["E3"], NOTES_MAP["G3"], NOTES_MAP["B3"]],
    ],
  },
  {
    title: "BUFFALO (feat. Shane Powers)",
    artist: "Tyler, The Creator, Shane Powers",
    duration: "02:39",
    explicit: true,
    notes: [
      [NOTES_MAP["D3"], NOTES_MAP["F3"], NOTES_MAP["A3"]],
      [NOTES_MAP["Bb2"], NOTES_MAP["D3"], NOTES_MAP["F3"]],
      [NOTES_MAP["C3"], NOTES_MAP["E3"], NOTES_MAP["G3"]],
      [NOTES_MAP["A2"], NOTES_MAP["C3"], NOTES_MAP["E3"]],
    ],
  },
  {
    title: "Right Back to It",
    artist: "Waxahatchee, MJ Lenderman",
    duration: "04:33",
    notes: [
      [NOTES_MAP["G3"], NOTES_MAP["B3"], NOTES_MAP["D4"]],
      [NOTES_MAP["C3"], NOTES_MAP["E3"], NOTES_MAP["G3"]],
      [NOTES_MAP["D3"], NOTES_MAP["F#3"], NOTES_MAP["A3"]],
      [NOTES_MAP["E3"], NOTES_MAP["G3"], NOTES_MAP["B3"]],
    ],
  },
];

interface MarqueePhoto {
  type: "image" | "poster";
  url?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  location?: string;
}

const MARQUEE_ITEMS: MarqueePhoto[] = [
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80",
    alt: "Cold Brew Little Amps Can",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80",
    alt: "State Street Cafe Entrance",
  },
  {
    type: "poster",
    title: "LOU BARLOW",
    subtitle: "BOBBY BARE JR",
    location: "STATE ST. PA",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&auto=format&fit=crop&q=80",
    alt: "Coffee Roasting Workshop",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80",
    alt: "Harrisburg Green Street Location",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&auto=format&fit=crop&q=80",
    alt: "Sidewalk Seating",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    alt: "Barista Team Outside",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=80",
    alt: "Counter staff with smiles",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&auto=format&fit=crop&q=80",
    alt: "Coffee Beans on Shelves",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    alt: "Little Amps Crew",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop&q=80",
    alt: "Summer in Harrisburg",
  },
];

export const LittleAmpsFooter: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<MarqueePhoto | null>(null);

  // Web Audio synth refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const noteStepRef = useRef(0);

  // Stop synthesis
  const stopAudio = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Play chord step with warm analog character
  const playChord = useCallback((frequencies: number[]) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const duration = 1.35;

      // Master lowpass filter for warm analog tone
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(1.5, now);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, now);
      masterGain.connect(filter);
      filter.connect(ctx.destination);

      frequencies.forEach((freq) => {
        if (!freq) return;
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Soft ADSR envelope
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.25);
        noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.8);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    } catch {
      // AudioContext requires user interaction first
    }
  }, []);

  // Start audio loop for current track
  const startAudioLoop = useCallback(
    (trackIdx: number) => {
      stopAudio();
      noteStepRef.current = 0;

      const chords = TRACKS[trackIdx].notes;
      playChord(chords[0]);
      noteStepRef.current = 1;

      timerRef.current = setInterval(() => {
        const nextChord = chords[noteStepRef.current % chords.length];
        playChord(nextChord);
        noteStepRef.current += 1;
      }, 1500);
    },
    [playChord, stopAudio],
  );

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startAudioLoop(currentTrackIndex);
    }
  }, [isPlaying, currentTrackIndex, startAudioLoop, stopAudio]);

  // Switch tracks
  const switchTrack = useCallback(
    (index: number) => {
      let nextIndex = index;
      if (nextIndex < 0) nextIndex = TRACKS.length - 1;
      if (nextIndex >= TRACKS.length) nextIndex = 0;

      setCurrentTrackIndex(nextIndex);
      if (isPlaying) {
        startAudioLoop(nextIndex);
      }
    },
    [isPlaying, startAudioLoop],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopAudio]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCreditsOpen(false);
        setActivePhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Spotify player card — kept identical in both the normal 3-column layout
  // and the full-screen "now playing" takeover.
  const playerCard = (
    <div className="bg-zinc-900/90 text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-zinc-800/90 relative overflow-hidden group">
      {/* Spotify Header Info */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* 4-Grid Playlist Cover Image Mosaic */}
          <div className="w-16 h-16 rounded-lg overflow-hidden grid grid-cols-2 grid-rows-2 shrink-0 bg-zinc-800 shadow-md border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100&auto=format&fit=crop&q=80"
              alt="Cover 1"
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&auto=format&fit=crop&q=80"
              alt="Cover 2"
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&auto=format&fit=crop&q=80"
              alt="Cover 3"
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=100&auto=format&fit=crop&q=80"
              alt="Cover 4"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title and Creator */}
          <div>
            <h4 className="font-bold text-base text-white leading-snug">
              FW 2025
            </h4>
            <p className="text-xs text-zinc-400">Little Amps Coffee</p>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isSaved ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-[#1DB954]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      stroke="#fff"
                      fill="none"
                      d="M8 12l3 3 5-5"
                    />
                  </svg>
                  <span className="text-[#1DB954] font-semibold">
                    Saved to Library
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v8m-4-4h8"
                    />
                  </svg>
                  <span>Save on Spotify</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Spotify Brand Logo */}
        <div className="text-[#1DB954]" title="Spotify">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.307c-.218.358-.683.473-1.042.253-2.859-1.748-6.459-2.144-10.7-1.173-.41.094-.82-.16-.914-.57-.094-.41.16-.82.57-.914 4.636-1.06 8.608-.611 11.833 1.362.359.22.474.685.253 1.042zm1.472-3.272c-.276.447-.86.589-1.307.313-3.273-2.012-8.261-2.596-12.133-1.42-.497.15-1.026-.135-1.176-.632-.15-.497.135-1.026.632-1.176 4.431-1.345 9.924-.698 13.67 1.608.448.277.59.86.314 1.307zm.126-3.41c-3.926-2.331-10.395-2.546-14.15-1.406-.602.183-1.242-.162-1.424-.764-.183-.602.162-1.242.764-1.424 4.316-1.31 11.45-1.06 15.98 1.631.542.322.718 1.026.396 1.568-.322.542-1.026.718-1.566.395z" />
          </svg>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
        <span className="text-[10px] uppercase font-mono-code tracking-wider px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 border border-zinc-700/50">
          Preview
        </span>

        <div className="flex items-center gap-3">
          {/* Previous Track */}
          <button
            onClick={() => switchTrack(currentTrackIndex - 1)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Previous Track"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Next Track */}
          <button
            onClick={() => switchTrack(currentTrackIndex + 1)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Next Track"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          {/* Options Dot Menu */}
          <button
            className="text-zinc-400 hover:text-white transition-colors px-1 cursor-pointer"
            title="Options"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>

          {/* Play/Pause Big Round Button */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 bg-white hover:bg-zinc-200 hover:scale-105 active:scale-95 text-black rounded-full flex items-center justify-center shadow-lg transition-transform ml-1 cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Track Listing with Interactive Selection */}
      <div className="space-y-1.5" id="tracklist-container">
        {TRACKS.map((track, idx) => {
          const isSelected = idx === currentTrackIndex;
          return (
            <div
              key={track.title}
              onClick={() => {
                if (isSelected) {
                  togglePlay();
                } else {
                  setCurrentTrackIndex(idx);
                  setIsPlaying(true);
                  startAudioLoop(idx);
                }
              }}
              className={`track-item flex items-center justify-between p-1.5 rounded-lg hover:bg-zinc-800/60 cursor-pointer transition-colors group/track ${
                isSelected ? "bg-zinc-800/80 border border-zinc-700/50" : ""
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="w-4 text-center text-xs text-zinc-400 font-mono-code shrink-0">
                  {isSelected && isPlaying ? (
                    <div className="flex items-end justify-center gap-0.5 h-4">
                      <div className="eq-bar"></div>
                      <div className="eq-bar"></div>
                      <div className="eq-bar"></div>
                    </div>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                <div className="truncate">
                  <div
                    className={`text-xs font-semibold truncate transition-colors flex items-center gap-1 ${
                      isSelected
                        ? "text-[#1DB954]"
                        : "text-zinc-200 group-hover/track:text-[#1DB954]"
                    }`}
                  >
                    <span>{track.title}</span>
                    {track.explicit && (
                      <span className="text-[9px] bg-zinc-800 border border-zinc-700 px-1 py-0.2 rounded text-zinc-300 font-mono-code uppercase shrink-0">
                        E
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate">
                    {track.artist}
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono-code text-zinc-400 text-right shrink-0">
                {track.duration}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Audio Status Indicator */}
      <div className="mt-2.5 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-zinc-600"}`}
          />
          <span className={isPlaying ? "text-emerald-300" : "text-zinc-400"}>
            {isPlaying
              ? `Playing: ${TRACKS[currentTrackIndex].title}`
              : "Click Play to listen to store mix"}
          </span>
        </span>
        <span className="text-[10px] text-zinc-500 font-mono-code">
          Web Synth
        </span>
      </div>
    </div>
  );

  return (
    <footer
      id="footer-section"
      className="relative w-full h-screen bg-black border-t border-zinc-900 text-zinc-300 pt-8 sm:pt-10 md:pt-12 pb-0 overflow-hidden font-sans selection:bg-zinc-800 selection:text-white"
    >
      {/* Cassette-shop background: fades in at full opacity while music plays, fades back out when stopped */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-out pointer-events-none"
        style={{
          backgroundImage: "url(/musicbg.jpg)",
          opacity: isPlaying ? 1 : 0,
        }}
      />

      {/* Subtle portfolio background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-t from-zinc-900/40 via-zinc-950/20 to-transparent pointer-events-none rounded-full blur-3xl opacity-60" />

      {/* Main Content Card - Sleek dark glass card matching portfolio aesthetic */}
      {/* Footer keeps its normal-mode size at all times — playing only fades the
          brand/nav content out and the bg image in, so nothing reflows. */}
      <div className="max-w-[1380px] mx-auto px-3 sm:px-5 lg:px-7 relative z-10">
        <div
          className={`border rounded-[28px] md:rounded-[36px] p-7 sm:p-9 lg:p-12 relative text-zinc-100 transition-all duration-500 ease-out ${
            isPlaying
              ? "bg-transparent border-transparent shadow-none backdrop-blur-none"
              : "bg-[#0e0e11] sm:bg-zinc-950/90 border-zinc-800/80 shadow-2xl backdrop-blur-xl"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            {/* LEFT SECTION: Brand, Amp Illustration, Location & Contacts (5 cols) */}
            <motion.div
              animate={{ opacity: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={isPlaying}
              className={`lg:col-span-5 flex flex-col justify-between h-full space-y-7 ${isPlaying ? "pointer-events-none" : ""}`}
            >
              <div>
                {/* Brand Title & Vector Guitar Amp */}
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <div className="leading-none">
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[0.9]">
                      Little Amps
                      <br />
                      Coffee
                    </h2>
                  </div>

                  {/* Hand-drawn retro amplifier illustration matching the portfolio's monochrome/zinc aesthetic */}
                  <div
                    className="relative w-20 h-16 sm:w-24 sm:h-20 text-zinc-300 hover:text-white shrink-0 transition-transform hover:scale-105 duration-200"
                    title="Little Amps Vintage Amp"
                  >
                    <svg
                      viewBox="0 0 120 90"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full stroke-current"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Top Handle */}
                      <path d="M46 16 C46 9, 74 9, 74 16" />
                      {/* Outer Amp Cabinet */}
                      <rect
                        x="8"
                        y="16"
                        width="104"
                        height="66"
                        rx="8"
                        className="stroke-current"
                      />
                      {/* Inner Speaker Screen */}
                      <rect
                        x="18"
                        y="24"
                        width="84"
                        height="50"
                        rx="4"
                        strokeDasharray="1 1"
                        className="stroke-zinc-500"
                      />
                      {/* Grill Cloth lines */}
                      <line
                        x1="24"
                        y1="24"
                        x2="24"
                        y2="74"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                      <line
                        x1="32"
                        y1="24"
                        x2="32"
                        y2="74"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                      <line
                        x1="40"
                        y1="24"
                        x2="40"
                        y2="74"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                      <line
                        x1="80"
                        y1="24"
                        x2="80"
                        y2="74"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                      <line
                        x1="88"
                        y1="24"
                        x2="88"
                        y2="74"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                      <line
                        x1="96"
                        y1="24"
                        x2="96"
                        y2="74"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                      {/* Speaker center circle & Sun motif */}
                      <circle
                        cx="60"
                        cy="49"
                        r="14"
                        className="stroke-zinc-300"
                      />
                      <circle
                        cx="60"
                        cy="49"
                        r="6"
                        className="stroke-zinc-400"
                      />
                      {/* Sun rays around speaker center */}
                      <path
                        d="M60 30 L60 32 M60 66 L60 68 M41 49 L43 49 M77 49 L79 49 M47 36 L49 38 M73 62 L71 60 M47 62 L49 60 M73 36 L71 38"
                        strokeWidth="1.8"
                        className="stroke-zinc-400"
                      />
                      {/* Control knobs */}
                      <circle cx="86" cy="20" r="1.5" fill="currentColor" />
                      <circle cx="94" cy="20" r="1.5" fill="currentColor" />
                      <circle cx="102" cy="20" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Address & Contact Info */}
              <div className="space-y-4 pt-2">
                {/* VISIT US Badge matching portfolio pill badges */}
                <div>
                  <span className="inline-block bg-zinc-900 text-zinc-300 border border-zinc-800 text-[11px] font-mono-code font-bold uppercase px-2.5 py-0.5 rounded tracking-widest shadow-sm">
                    VISIT US
                  </span>
                </div>

                {/* Locations and Social links */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-zinc-400">
                  {/* Physical Addresses */}
                  <div className="text-[13px] sm:text-[14px] font-medium leading-relaxed font-sans">
                    <p className="hover:text-white cursor-pointer transition-colors">
                      133 State Street, PA
                    </p>
                    <p className="hover:text-white cursor-pointer transition-colors">
                      1836 Green Street, PA
                    </p>
                  </div>

                  {/* Social Icons and Email */}
                  <div className="space-y-2 sm:text-right">
                    <div className="flex items-center sm:justify-end gap-3 text-zinc-400">
                      {/* Facebook */}
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors p-1 -m-1"
                        aria-label="Little Amps on Facebook"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" />
                        </svg>
                      </a>
                      {/* Instagram */}
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors p-1 -m-1"
                        aria-label="Little Amps on Instagram"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                    {/* Email link */}
                    <a
                      href="mailto:hiya@littleampscoffee.com"
                      className="block text-[13px] font-sans font-medium text-zinc-300 hover:text-white transition-colors underline decoration-zinc-700 hover:decoration-white underline-offset-4"
                    >
                      hiya@littleampscoffee.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MIDDLE SECTION: Navigation Columns (3 cols) */}
            <motion.div
              animate={{ opacity: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={isPlaying}
              className={`lg:col-span-3 grid grid-cols-2 gap-6 pt-2 ${isPlaying ? "pointer-events-none" : ""}`}
            >
              {/* COMPANY Column */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-zinc-400">
                  COMPANY
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-400 font-medium">
                  <li>
                    <a
                      href="#about"
                      className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#blog"
                      className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* SHOP Column */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-zinc-400">
                  SHOP
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-400 font-medium">
                  <li>
                    <a
                      href="#coffee"
                      className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      Coffee
                    </a>
                  </li>
                  <li>
                    <a
                      href="#subscriptions"
                      className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      Subscriptions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#amps-gear"
                      className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      Amps Gear
                    </a>
                  </li>
                  <li>
                    <a
                      href="#brewing-equipment"
                      className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      Brewing Equipment
                    </a>
                  </li>
                  <li>
                    <a
                      href="#shop-all"
                      className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      Shop All
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* RIGHT SECTION: Spotify Embedded Player (4 cols) */}
            <div className="lg:col-span-4 w-full">{playerCard}</div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: Cactus Mascot Speech Bubble & Infinite Rolling Photo Marquee */}
      <div className="mt-20 md:mt-32 pb-6 md:pb-8 relative w-full flex items-center">
        {/* Left Mascot + Speech Bubble Anchor */}
        <div className="pl-4 sm:pl-7 pr-3 shrink-0 z-20 flex items-center gap-2 sm:gap-3">
          {/* Hand-Drawn Mascot: Cactus in Coffee Cup */}
          <div
            className="w-10 h-14 sm:w-12 sm:h-16 text-zinc-300 hover:text-white shrink-0 filter drop-shadow transition-transform hover:rotate-6 duration-200"
            title="Little Amps Mascot"
          >
            <svg
              viewBox="0 0 70 95"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full stroke-current"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Cactus flower/sun on top */}
              <path
                d="M35 10 L35 4 M28 7 L42 7 M30 14 L25 9 M40 14 L45 9"
                strokeWidth="2.5"
              />
              {/* Main Cactus Body */}
              <path d="M26 44 C26 22, 44 22, 44 44" />
              {/* Cactus Left Arm */}
              <path d="M26 34 L17 34 C13 34, 13 22, 17 22" />
              {/* Cactus Right Arm */}
              <path d="M44 38 L53 38 C57 38, 57 26, 53 26" />
              {/* Cactus Prickles/Needles */}
              <line x1="30" y1="26" x2="33" y2="28" strokeWidth="2" />
              <line x1="40" y1="28" x2="37" y2="30" strokeWidth="2" />
              <line x1="33" y1="36" x2="37" y2="38" strokeWidth="2" />
              {/* Coffee Mug */}
              <rect x="20" y="44" width="30" height="30" rx="6" />
              {/* Mug Handle */}
              <path d="M50 49 C60 49, 60 67, 50 67" />
              {/* Little Smile / Face on Mug */}
              <path d="M30 58 Q35 63 40 58" strokeWidth="2.5" />
              {/* Base ground */}
              <path d="M16 80 Q35 84 54 80" strokeWidth="2" opacity="0.4" />
            </svg>
          </div>

          {/* Quirky Speech Bubble: FOLLOW US ON THE 'GRAM in Sleek Dark Theme */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-[22px] font-display text-[10px] sm:text-xs font-bold tracking-wide uppercase leading-tight shadow-lg hover:scale-105 active:scale-95 transition-all text-center border border-zinc-700/80"
          >
            FOLLOW US
            <br />
            ON THE &apos;GRAM
            {/* Speech bubble left pointer notch */}
            <span className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-zinc-900 border-b-[6px] border-b-transparent"></span>
          </a>
        </div>

        {/* Marquee Photo Carousel Container */}
        <div className="relative overflow-hidden w-full marquee-container flex-1 py-1">
          {/* Soft Gradient Fade Masks on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* The moving track duplicate pairs for endless loop */}
          <div className="marquee-track flex items-center gap-3 md:gap-4 pl-2">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => {
              if (item.type === "poster") {
                return (
                  <div
                    key={`poster-${index}`}
                    onClick={() => setActivePhoto(item)}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-zinc-800 hover:border-zinc-500 hover:scale-105 transition-all cursor-pointer group bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col justify-between p-2 text-white font-mono-code"
                  >
                    <div className="text-[9px] uppercase tracking-widest text-center text-zinc-400 border-b border-zinc-800 pb-0.5">
                      CONCERT
                    </div>
                    <div className="text-center font-display font-black leading-tight text-xs sm:text-sm text-white">
                      LOU
                      <br />
                      <span className="text-[10px] font-sans font-bold text-zinc-300">
                        BARLOW
                      </span>
                      <br />
                      BOBBY
                    </div>
                    <div className="text-[8px] text-center text-zinc-400">
                      {item.location}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={`photo-${index}`}
                  onClick={() => setActivePhoto(item)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-zinc-800/90 hover:border-zinc-500 hover:scale-105 transition-all cursor-pointer group"
                >
                  <img
                    src={item.url}
                    alt={item.alt || "Little Amps moment"}
                    className="w-full h-full object-cover group-hover:brightness-110 group-hover:contrast-105 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM-MOST BAR: Copyright & Site Credits */}
      <div className="bg-black text-zinc-500 px-4 sm:px-8 py-3 text-[11px] sm:text-xs font-mono-code tracking-wider flex items-center justify-between border-t border-zinc-900">
        <div className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors cursor-default">
          <span>© 2026 LITTLE AMPS COFFEE</span>
        </div>

        <div>
          <button
            onClick={() => setCreditsOpen(true)}
            className="hover:text-white uppercase transition-colors tracking-widest text-[11px] underline underline-offset-4 decoration-zinc-700 hover:decoration-white cursor-pointer"
          >
            SITE CREDITS
          </button>
        </div>
      </div>

      {/* MODAL: Site Credits Popup */}
      {creditsOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setCreditsOpen(false)}
        >
          <div
            className="bg-zinc-950 text-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCreditsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="font-display text-2xl font-black mb-2 text-white">
              Site Credits
            </h3>
            <p className="text-sm text-zinc-400 mb-4 font-sans leading-relaxed">
              Handcrafted for Little Amps Coffee Roasters. Built with React 19,
              Next.js, Web Audio API, and seamless dark portfolio integration.
            </p>
            <div className="space-y-1.5 text-xs font-mono-code text-zinc-300 bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
              <p>
                <strong>Design:</strong> Little Amps Studio
              </p>
              <p>
                <strong>Soundtrack:</strong> Joy Division, Tyler, The Creator,
                Waxahatchee
              </p>
              <p>
                <strong>Locations:</strong> Harrisburg, PA
              </p>
              <p>
                <strong>Portfolio:</strong> Rahul Karnekar
              </p>
            </div>
            <button
              onClick={() => setCreditsOpen(false)}
              className="mt-5 w-full bg-white hover:bg-zinc-200 text-black py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Photo Lightbox Preview */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-10 bg-black/60 text-white rounded-full p-1.5 hover:bg-black transition-colors cursor-pointer border border-white/10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="w-full max-h-[75vh] flex items-center justify-center bg-black">
              {activePhoto.type === "poster" ? (
                <div className="p-12 w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white flex flex-col items-center justify-center space-y-4 font-mono-code">
                  <span className="text-sm tracking-widest uppercase border-b border-zinc-700 pb-1 text-zinc-400">
                    LIVE CONCERT
                  </span>
                  <div className="font-display font-black text-3xl sm:text-4xl text-center leading-tight">
                    LOU BARLOW
                    <br />
                    BOBBY BARE JR
                  </div>
                  <span className="text-xs text-zinc-400">
                    Little Amps Coffee Roasters • State St. PA
                  </span>
                </div>
              ) : (
                <img
                  src={activePhoto.url}
                  alt={activePhoto.alt || "Little Amps Photo"}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              )}
            </div>

            <div className="p-4 bg-zinc-900 text-white flex items-center justify-between font-sans border-t border-zinc-800">
              <span className="text-xs font-mono-code text-zinc-400">
                @littleampscoffee on Instagram
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1DB954] hover:underline"
              >
                View Profile &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
