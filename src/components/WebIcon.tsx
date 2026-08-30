import React from 'react';

interface WebIconProps {
  icon?: string;
  className?: string;
  fallback?: string;
}

const EMOJI_TO_FA_MAP: Record<string, string> = {
  // Categories & Grades
  '🏫': 'fa-school',
  '🎓': 'fa-graduation-cap',
  '🧩': 'fa-puzzle-piece',
  '💻': 'fa-laptop-code',
  '🚀': 'fa-rocket',
  '🍁': 'fa-gamepad',
  
  // Specific Topics & Tools
  '🎮': 'fa-gamepad',
  '🥽': 'fa-vr-cardboard',
  '📷': 'fa-camera',
  '💡': 'fa-lightbulb',
  '📌': 'fa-clipboard-list',
  '🤖': 'fa-robot',
  '⚙️': 'fa-gear',
  '🔮': 'fa-wand-magic-sparkles',
  '🌐': 'fa-globe',
  '📑': 'fa-file-lines',
  '👑': 'fa-crown',
  '✳️': 'fa-sparkles',
  '🏢': 'fa-building',
  '🚗': 'fa-car',
  '🪴': 'fa-plant-wilt',
  '🎥': 'fa-video',
  '✨': 'fa-sparkles',
  '⭐': 'fa-star',
};

export const WebIcon: React.FC<WebIconProps> = ({ icon, className = 'w-5 h-5', fallback = 'fa-code' }) => {
  if (!icon) {
    return <i className={`fa-solid ${fallback} ${className}`} aria-hidden="true" />;
  }

  // If already a Font Awesome class string (e.g., "fa-solid fa-laptop-code" or "fa-robot")
  if (icon.startsWith('fa-') || icon.includes('fa-')) {
    const fullClass = icon.includes(' ') ? icon : `fa-solid ${icon}`;
    return <i className={`${fullClass} ${className}`} aria-hidden="true" />;
  }

  // If emoji or key in map
  const faIconName = EMOJI_TO_FA_MAP[icon] || fallback;
  return <i className={`fa-solid ${faIconName} ${className}`} aria-hidden="true" />;
};
