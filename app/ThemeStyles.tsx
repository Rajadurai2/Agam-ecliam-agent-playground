'use client';
import { useEffect, useState } from 'react';

interface ThemeStylesProps {
  accent?: string;
  accentDark?: string;
}

export function ThemeStyles({ accent, accentDark }: ThemeStylesProps) {
  const [styles, setStyles] = useState<string>('');

  useEffect(() => {
    const s = [
      accent ? `:root { --primary: ${accent}; }` : '',
      accentDark ? `.dark { --primary: ${accentDark}; }` : '',
    ]
      .filter(Boolean)
      .join('\n');
    setStyles(s);
  }, [accent, accentDark]);

  if (!styles) return null;

  return <style>{styles}</style>;
}
