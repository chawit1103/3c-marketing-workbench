import { type ReactNode, useMemo, useState } from 'react';
import { I18nContext, type I18nContextValue } from './I18nContext';
import { translate } from './localize';
import { defaultLanguage, type Language } from './translations';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const value = useMemo<I18nContextValue>(() => ({
    language,
    setLanguage,
    t: (text: string) => translate(text, language),
  }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
