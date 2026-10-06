'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export const RahulPortrait: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      initial={{ opacity: 0, y: 15, rotate: -2.5 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: isHovered ? 0 : -2.5,
        scale: isHovered ? 1.03 : 1
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Polaroid style frame container */}
      <div className="relative bg-[#EAE8E3] p-1.5 sm:p-2 rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.05)] border border-white/40 max-w-[155px] sm:max-w-[175px] md:max-w-[195px] overflow-hidden">

        {/* Photo Container with Grain */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[3px] bg-[#CAC8C3]">
          {/* Detailed SVG Illustration capturing Rahul's distinct look from screenshot: bald, glasses, trimmed beard, white tee */}
          <svg
            viewBox="0 0 300 400"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Studio Backdrop Gradient */}
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4C2BE" />
                <stop offset="50%" stopColor="#ADAAA5" />
                <stop offset="100%" stopColor="#8F8C88" />
              </linearGradient>

              {/* Skin Tone Gradient */}
              <linearGradient id="skinTone" x1="0%" y1="20%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B37C56" />
                <stop offset="35%" stopColor="#A46B46" />
                <stop offset="70%" stopColor="#8A5534" />
                <stop offset="100%" stopColor="#6C4023" />
              </linearGradient>

              {/* Bald Head Highlight */}
              <radialGradient id="headHighlight" cx="45%" cy="30%" r="55%">
                <stop offset="0%" stopColor="#CCA07B" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#A46B46" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
              </radialGradient>

              {/* Glasses frame gradient */}
              <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E1E22" />
                <stop offset="50%" stopColor="#2D2D33" />
                <stop offset="100%" stopColor="#121215" />
              </linearGradient>

              {/* Lens reflection */}
              <linearGradient id="lensReflect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
              </linearGradient>

              {/* Beard Texture Gradient */}
              <linearGradient id="beardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1c1917" />
                <stop offset="60%" stopColor="#141210" />
                <stop offset="100%" stopColor="#0a0a09" />
              </linearGradient>

              {/* Shirt White Shadow */}
              <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E2E3E8" />
                <stop offset="40%" stopColor="#FAFAFA" />
                <stop offset="100%" stopColor="#D4D5DC" />
              </linearGradient>
            </defs>

            {/* Studio Background */}
            <rect width="300" height="400" fill="url(#bgGrad)" />

            {/* Subtle background ambient shadow behind shoulders */}
            <ellipse cx="150" cy="380" rx="140" ry="80" fill="#000000" opacity="0.18" />

            {/* White T-Shirt / Shoulders & Chest */}
            <path
              d="M 50 400 L 52 355 C 65 320, 95 305, 115 298 C 122 322, 178 322, 185 298 C 205 305, 235 320, 248 355 L 250 400 Z"
              fill="url(#shirtGrad)"
            />
            {/* Crewneck Collar */}
            <path
              d="M 115 298 C 123 325, 177 325, 185 298 C 176 317, 124 317, 115 298 Z"
              fill="#D0D2DA"
              stroke="#B5B8C2"
              strokeWidth="1.5"
            />

            {/* Neck */}
            <path
              d="M 125 240 L 122 305 C 132 312, 168 312, 178 305 L 175 240 Z"
              fill="#7A4B2D"
            />
            {/* Neck Shadow under chin */}
            <path
              d="M 122 250 C 135 275, 165 275, 178 250 L 178 268 C 160 282, 140 282, 122 268 Z"
              fill="#4E2F1B"
              opacity="0.75"
            />

            {/* Ears */}
            <ellipse cx="98" cy="180" rx="9" ry="17" fill="#99603B" transform="rotate(-6 98 180)" />
            <ellipse cx="98" cy="180" rx="5" ry="10" fill="#6A3B1E" transform="rotate(-6 98 180)" />
            <ellipse cx="202" cy="180" rx="9" ry="17" fill="#99603B" transform="rotate(6 202 180)" />
            <ellipse cx="202" cy="180" rx="5" ry="10" fill="#6A3B1E" transform="rotate(6 202 180)" />

            {/* Head & Face base (Bald head structure) */}
            <path
              d="M 150 65 C 105 65, 96 115, 98 175 C 99 210, 105 235, 120 255 C 133 272, 167 272, 180 255 C 195 235, 201 210, 202 175 C 204 115, 195 65, 150 65 Z"
              fill="url(#skinTone)"
            />

            {/* Bald Head Top Specular Highlight */}
            <path
              d="M 150 67 C 114 67, 106 100, 106 135 C 118 100, 140 85, 168 85 C 185 85, 194 95, 195 135 C 195 100, 186 67, 150 67 Z"
              fill="url(#headHighlight)"
            />

            {/* Forehead light plane */}
            <ellipse cx="150" cy="115" rx="38" ry="24" fill="#C5906A" opacity="0.35" />

            {/* Eyebrows */}
            <path
              d="M 112 148 Q 128 142 138 147"
              stroke="#1C1815"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 162 147 Q 172 142 188 148"
              stroke="#1C1815"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Eyes */}
            <ellipse cx="126" cy="158" rx="6.5" ry="4" fill="#2E1C12" />
            <circle cx="125" cy="157" r="1.5" fill="#ffffff" opacity="0.8" />
            <ellipse cx="174" cy="158" rx="6.5" ry="4" fill="#2E1C12" />
            <circle cx="173" cy="157" r="1.5" fill="#ffffff" opacity="0.8" />

            {/* Nose */}
            <path
              d="M 148 148 L 147 185 C 144 188, 139 191, 144 194 C 148 196, 152 196, 156 194 C 161 191, 156 188, 153 185 L 152 148"
              fill="#834F2E"
              opacity="0.65"
            />
            <ellipse cx="143" cy="193" rx="2.5" ry="1.5" fill="#3D1D0E" />
            <ellipse cx="157" cy="193" rx="2.5" ry="1.5" fill="#3D1D0E" />

            {/* Stylish Modern Glasses (Frames & Bridge) */}
            {/* Left Frame */}
            <rect
              x="110"
              y="142"
              width="34"
              height="28"
              rx="6"
              fill="none"
              stroke="url(#frameGrad)"
              strokeWidth="3.2"
            />
            <rect
              x="111"
              y="143"
              width="32"
              height="26"
              rx="5"
              fill="url(#lensReflect)"
            />

            {/* Right Frame */}
            <rect
              x="156"
              y="142"
              width="34"
              height="28"
              rx="6"
              fill="none"
              stroke="url(#frameGrad)"
              strokeWidth="3.2"
            />
            <rect
              x="157"
              y="143"
              width="32"
              height="26"
              rx="5"
              fill="url(#lensReflect)"
            />

            {/* Glasses Bridge & Temples */}
            <path
              d="M 144 150 Q 150 148 156 150"
              stroke="url(#frameGrad)"
              strokeWidth="3.2"
              fill="none"
            />
            <line x1="110" y1="150" x2="98" y2="152" stroke="url(#frameGrad)" strokeWidth="2.8" />
            <line x1="190" y1="150" x2="202" y2="152" stroke="url(#frameGrad)" strokeWidth="2.8" />

            {/* Full Dark Beard and Mustache */}
            {/* Mustache */}
            <path
              d="M 132 206 Q 150 200 168 206 C 172 214, 160 219, 150 216 C 140 219, 128 214, 132 206 Z"
              fill="url(#beardGrad)"
            />

            {/* Beard contour covering jawline, cheeks, and chin */}
            <path
              d="M 103 182
                 C 104 205, 114 220, 120 232
                 C 126 244, 132 258, 142 268
                 C 147 273, 153 273, 158 268
                 C 168 258, 174 244, 180 232
                 C 186 220, 196 205, 197 182
                 C 192 192, 184 205, 178 214
                 C 174 218, 168 221, 164 225
                 C 160 230, 140 230, 136 225
                 C 132 221, 126 218, 122 214
                 C 116 205, 108 192, 103 182 Z"
              fill="url(#beardGrad)"
            />

            {/* Soul patch under lip */}
            <path d="M 145 220 L 155 220 L 152 230 L 148 230 Z" fill="#0D0B0A" />

            {/* Fine Hair Texture Lines */}
            <g stroke="#262220" strokeWidth="0.8" opacity="0.65">
              <line x1="135" y1="210" x2="138" y2="216" />
              <line x1="140" y1="211" x2="143" y2="217" />
              <line x1="158" y1="211" x2="155" y2="217" />
              <line x1="163" y1="210" x2="160" y2="216" />
              <line x1="148" y1="245" x2="148" y2="258" />
              <line x1="152" y1="245" x2="152" y2="258" />
              <line x1="144" y1="250" x2="145" y2="262" />
              <line x1="156" y1="250" x2="155" y2="262" />
            </g>
          </svg>

          {/* Film Grain Texture layer over portrait */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
            style={{
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/noisy.png")',
            }}
          />

          {/* Vignette border */}
          <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(0,0,0,0.4)] pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};
