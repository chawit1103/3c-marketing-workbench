import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { translations, type Language } from './translations';

export function translateExact(text: string, language: Language): string {
  if (language === 'en') {
    return text;
  }

  const table = translations[language];
  if (table[text]) {
    return table[text];
  }

  const trimmed = text.trim();
  if (trimmed && table[trimmed]) {
    return text.replace(trimmed, table[trimmed]);
  }

  return text;
}

export function translateUi(text: string, language: Language): string {
  return translate(text, language);
}

export function translate(text: string, language: Language): string {
  if (language === 'en') {
    return text;
  }

  const exact = translateExact(text, language);
  if (exact !== text) {
    return exact;
  }

  return translateTemplates(text, language);
}

function translateTemplates(text: string, language: Language) {
  const replacements: Array<[RegExp, string | ((...args: string[]) => string)]> = [
    [/^(.+) source and evidence$/u, (_match, label) => `${translateUi(String(label), language)} แหล่งที่มาและหลักฐาน`],
    [/^(.+) formula and source$/u, (_match, label) => `${translateUi(String(label), language)} สูตรและแหล่งที่มา`],
    [/^Run (.+)$/u, (_match, id) => `รัน ${id}`],
    [/^Switch to (.+)$/u, (_match, workflow) => `เปลี่ยนไปที่ ${translate(String(workflow), language)}`],
    [/^Objective: (.+)$/u, (_match, objective) => `วัตถุประสงค์: ${translate(String(objective), language)}`],
    [/^(.+) executive summary$/u, (_match, objective) => `สรุปผู้บริหารสำหรับ ${translate(String(objective), language)}`],
    [/^(.+) executive-ready summary$/u, (_match, objective) => `สรุปพร้อมผู้บริหารสำหรับ ${translate(String(objective), language)}`],
    [/^(.+) executive handoff report$/u, (_match, objective) => `รายงานส่งต่อผู้บริหารสำหรับ ${translate(String(objective), language)}`],
    [/^(.+) Results$/u, (_match, objective) => `ผลลัพธ์ ${translate(String(objective), language)}`],
    [/^(Completed|Current|Next): (.+)$/u, (_match, status, stage) => `${translate(String(status), language)}: ${translate(String(stage), language)}`],
    [/^Handoff readiness: (.+)$/u, (_match, value) => `ความพร้อมสำหรับส่งต่อ: ${translateUi(String(value), language)}`],
    [/^Confidence: (.+)$/u, (_match, value) => `ความเชื่อมั่น: ${translateUi(String(value), language)}`],
    [/^Safety: (.+)$/u, (_match, value) => `ความปลอดภัย: ${translateUi(String(value), language)}`],
    [/^Evidence gap: (.+)$/u, (_match, value) => `ช่องว่างหลักฐาน: ${translateUi(String(value), language)}`],
    [/^Human review required: (.+)$/u, (_match, value) => `ต้องให้มนุษย์ตรวจทาน: ${translateUi(String(value), language)}`],
    [/^Blocked action: (.+)$/u, (_match, value) => `การดำเนินการที่ถูกบล็อก: ${translateUi(String(value), language)}`],
    [/^Source: (.+)$/u, (_match, value) => `แหล่งที่มา: ${translateUi(String(value), language)}`],
    [/^Formula: (.+)$/u, (_match, value) => `สูตร: ${translateUi(String(value), language)}`],
    [/^Evidence: (.+)$/u, (_match, value) => `หลักฐาน: ${translateUi(String(value), language)}`],
    [/^Evidence tier: (.+)$/u, (_match, value) => `ระดับหลักฐาน: ${translateUi(String(value), language)}`],
    [/^Next evidence step: (.+)$/u, (_match, value) => `ขั้นตอนหลักฐานถัดไป: ${translateUi(String(value), language)}`],
    [/^([^:]+): ([^.]+)\. (.+)$/u, (_match, label, signal, detail) => `${translateUi(String(label), language)}: ${translateUi(String(signal), language)}. ${translateUi(String(detail), language)}`],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(text)) {
      return text.replace(pattern, replacement as string);
    }
  }

  return text;
}

export function localizeNode(node: ReactNode, language: Language): ReactNode {
  if (typeof node === 'string') {
    return translateUi(node, language);
  }

  if (Array.isArray(node)) {
    return node.map((child) => localizeNode(child, language));
  }

  if (!isValidElement(node)) {
    return node;
  }

  const element = node as ReactElement<Record<string, unknown>>;
  const props = element.props;
  const nextProps: Record<string, unknown> = {};

  if (typeof element.type === 'string') {
    for (const attr of ['aria-label', 'placeholder', 'title']) {
      const value = props[attr];
      if (typeof value === 'string') {
        nextProps[attr] = translateUi(value, language);
      }
    }
  }

  if (props.children !== undefined) {
    nextProps.children = Children.map(props.children as ReactNode, (child) => localizeNode(child, language));
  }

  return cloneElement(element, nextProps);
}
