import { createContext } from 'react';
import type { Language } from './translations';

export type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
};

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);
