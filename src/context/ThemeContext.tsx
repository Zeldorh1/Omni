import React, { createContext, useContext, useMemo, useState } from 'react';
import { View } from 'react-native';

type ThemeState = {
  colorfulBg: boolean;
  setColorfulBg: (v:boolean)=>void;
};

const ThemeCtx = createContext<ThemeState | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorfulBg, setColorfulBg] = useState(false);
  const value = useMemo(()=>({ colorfulBg, setColorfulBg }), [colorfulBg]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
};

export const useThemeFlags = () => {
  const ctx = useContext(ThemeCtx);
  if(!ctx) throw new Error('useThemeFlags must be used within ThemeProvider');
  return ctx;
};

/** Optional wrapper that renders a pink gradient when colorfulBg is true */
export const PageBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorfulBg } = useThemeFlags();
  if(!colorfulBg) return <>{children}</>;
  return (
    <View style={{ flex:1, backgroundColor:'#FBD5E1' }}>{children}</View>
  );
};
