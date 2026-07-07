import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { translations, type Language } from './translations';

const originalText = new WeakMap<Text, string>();

function restoreEnglish(text: string): string {
  const table = translations.th;
  const exactMatch = [...Object.entries(table)].reverse().find(([, target]) => target === text);
  if (exactMatch) {
    return exactMatch[0];
  }

  const trimmed = text.trim();
  const trimmedMatch = [...Object.entries(table)].reverse().find(([, target]) => target === trimmed);
  if (trimmed && trimmedMatch) {
    return text.replace(trimmed, trimmedMatch[0]);
  }

  return text;
}

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
  if (language === 'en') {
    return text;
  }

  const exact = translateExact(text, language);
  if (exact !== text) {
    return exact;
  }

  const templated = translateTemplates(text);
  return replaceTrustedUiPhrases(templated);
}

export function translate(text: string, language: Language): string {
  if (language === 'en') {
    return text;
  }

  const exact = translateExact(text, language);
  if (exact !== text) {
    return exact;
  }

  return translateTemplates(text);
}

function replaceTrustedUiPhrases(text: string): string {
  let result = text;
  const phraseReplacements: Record<string, string> = {
    'Completed': 'เสร็จแล้ว',
    'Current': 'ปัจจุบัน',
    'Next': 'ถัดไป',
    'Campaign Definition': 'นิยามแคมเปญ',
    'Executive Decision': 'การตัดสินใจระดับผู้บริหาร',
    'Export/Handoff': 'ส่งออก/ส่งต่อ',
    'Ready for human review': 'พร้อมให้มนุษย์ตรวจทาน',
    'Working Adults': 'วัยทำงาน',
    'Urban Consumers': 'ผู้บริโภคในเมือง',
    'SME Owners': 'เจ้าของธุรกิจ SME',
    'Low directional confidence': 'ความเชื่อมั่นเชิงทิศทางต่ำ',
    'E1 synthetic/offline fixture': 'E1 ข้อมูลสังเคราะห์/ออฟไลน์',
    'human review': 'การตรวจทานโดยมนุษย์',
    'not live social data': 'ไม่ใช่ข้อมูลโซเชียลสด',
    'not production prediction': 'ไม่ใช่การคาดการณ์ใช้งานจริง',
    'not measured social platform engagement': 'ไม่ใช่ engagement ที่วัดจริงบนแพลตฟอร์ม',
    'not a conversion guarantee': 'ไม่ใช่การรับประกันคอนเวอร์ชัน',
    'required before external use': 'ต้องตรวจทานก่อนใช้งานภายนอก',
    'offline directional': 'เชิงทิศทางจากข้อมูลออฟไลน์',
    'Low confidence': 'ความเชื่อมั่นต่ำ',
    'Low directional': 'เชิงทิศทางต่ำ',
    'synthetic planning cue': 'สัญญาณวางแผนจากข้อมูลสังเคราะห์',
    'live social activity': 'กิจกรรมโซเชียลสด',
    'Product Launch fixture card': 'การ์ดข้อมูลตัวอย่าง Product Launch',
    'Engagement Potential': 'ศักยภาพการมีส่วนร่วม',
    'Message Acceptance': 'การยอมรับข้อความ',
    'Brand Perception': 'ภาพรับรู้แบรนด์',
    'Synthetic Purchase Intent': 'ความตั้งใจซื้อเชิงสังเคราะห์',
    'fixture card': 'การ์ดข้อมูลตัวอย่าง',
    'quality, delivery': 'คุณภาพและการส่งมอบ',
    'observed market behavior': 'พฤติกรรมตลาดที่สังเกตจริง',
    'synthetic/offline fixture': 'ข้อมูลตัวอย่างสังเคราะห์/ออฟไลน์',
    'source and evidence': 'แหล่งที่มาและหลักฐาน',
    'formula and source': 'สูตรและแหล่งที่มา',
    'Use the report for executive handoff and human review, not production approval': 'ใช้รายงานนี้เพื่อส่งต่อให้ผู้บริหารและให้มนุษย์ตรวจทาน ไม่ใช่เพื่ออนุมัติใช้งานจริง',
    'Objective:': 'วัตถุประสงค์:',
    'executive handoff report': 'รายงานส่งต่อผู้บริหาร',
    'executive-ready summary': 'สรุปพร้อมผู้บริหาร',
    'Evidence gaps': 'ช่องว่างหลักฐาน',
    'evidence gaps': 'ช่องว่างหลักฐาน',
    'Next review step': 'ขั้นตอนตรวจทานถัดไป',
    'next-test planning': 'การวางแผนทดสอบถัดไป',
    'report sections are assembled from fixture metadata, synthetic evidence, and deterministic calculations': 'ส่วนต่าง ๆ ของรายงานประกอบจากเมทาดาทาข้อมูลตัวอย่าง หลักฐานสังเคราะห์ และการคำนวณแบบกำหนดผลแน่นอน',
    'fixture.exports.executiveSummaryPreview': 'fixture.exports.executiveSummaryPreview',
    'report sections': 'ส่วนต่าง ๆ ของรายงาน',
    'Use the report': 'ใช้รายงานนี้',
    'executive handoff': 'การส่งต่อให้ผู้บริหาร',
    'not production approval': 'ไม่ใช่เพื่ออนุมัติใช้งานจริง',
    'review step only': 'เป็นขั้นตอนตรวจทานเท่านั้น',
    'not a launch or budget decision': 'ไม่ใช่การตัดสินใจเปิดตัวหรืองบประมาณ',
    'reviewMetadata.evidenceGaps': 'reviewMetadata.evidenceGaps',
    'checklist questions': 'คำถามตรวจทาน',
    'ready stages': 'ช่วงที่พร้อม',
    'Product Launch': 'Product Launch',
    'Overall Campaign Score': 'คะแนนรวมแคมเปญ',
    'Sentiment comparison': 'เปรียบเทียบ Sentiment',
    'Human review checklist': 'รายการตรวจทานโดยมนุษย์',
    'Human review': 'รายการตรวจทานโดยมนุษย์',
    'Evidence tier': 'ระดับหลักฐาน',
    'Platform comparison': 'เปรียบเทียบแพลตฟอร์ม',
    'Audience comparison': 'เปรียบเทียบกลุ่มเป้าหมาย',
    'Confidence / risk': 'ความเชื่อมั่น / ความเสี่ยง',
    'Journey progress': 'ความคืบหน้าเส้นทางแคมเปญ',
    'Visual gaps': 'ช่องว่างหลักฐานภาพ',
    'launch, budget, or winner decisions': 'การตัดสินใจเปิดตัว งบประมาณ หรือผู้ชนะ',
    'Campaign Details': 'รายละเอียดแคมเปญ',
    'Platform Mix': 'สัดส่วนแพลตฟอร์ม',
    'Executive Summary': 'สรุปสำหรับผู้บริหาร',
    'Export Review': 'ตรวจทานการส่งออก',
    'Recommended Next Action': 'ข้อเสนอแนะถัดไป',
    'Review': 'ตรวจทาน',
    'Run': 'รัน',
    'Dashboard': 'แดชบอร์ด',
    'Evidence': 'หลักฐาน',
    'Confidence': 'ความเชื่อมั่น',
    'Recommendation': 'ข้อเสนอแนะ',
    'Risk': 'ความเสี่ยง',
    'Limitation': 'ข้อจำกัด',
    'Assumption': 'สมมติฐาน',
    'Synthetic': 'สังเคราะห์',
    'Fixture': 'ข้อมูลตัวอย่าง',
    'Report': 'รายงาน',
    'Export': 'ส่งออก',
    'Workflow': 'เวิร์กโฟลว์',
    'Journey': 'เส้นทางแคมเปญ',
    'Stage': 'ช่วง',
    'Audience': 'กลุ่มเป้าหมาย',
  };

  const safeReplacements = Object.entries(phraseReplacements).sort(
    ([left], [right]) => right.length - left.length,
  );

  for (const [source, target] of safeReplacements) {
    result = result.replace(isolatedPhrasePattern(source), target);
  }
  return result;
}

function isolatedPhrasePattern(source: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(source)}(?![\\p{L}\\p{N}])`, 'gu');
}

function escapeRegExp(source: string): string {
  return source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function translateTemplates(text: string) {
  const replacements: Array<[RegExp, string | ((...args: string[]) => string)]> = [
    [/^(.+) source and evidence$/u, (_match, label) => `${translateUi(String(label), 'th')} แหล่งที่มาและหลักฐาน`],
    [/^(.+) formula and source$/u, (_match, label) => `${translateUi(String(label), 'th')} สูตรและแหล่งที่มา`],
    [/^Run (.+)$/u, (_match, id) => `รัน ${id}`],
    [/^Switch to (.+)$/u, (_match, workflow) => `เปลี่ยนไปที่ ${translate(String(workflow), 'th')}`],
    [/^Objective: (.+)$/u, (_match, objective) => `วัตถุประสงค์: ${translate(String(objective), 'th')}`],
    [/^(.+) executive summary$/u, (_match, objective) => `สรุปผู้บริหารสำหรับ ${translate(String(objective), 'th')}`],
    [/^(.+) executive-ready summary$/u, (_match, objective) => `สรุปพร้อมผู้บริหารสำหรับ ${translate(String(objective), 'th')}`],
    [/^(.+) executive handoff report$/u, (_match, objective) => `รายงานส่งต่อผู้บริหารสำหรับ ${translate(String(objective), 'th')}`],
    [/^(.+) Results$/u, (_match, objective) => `ผลลัพธ์ ${translate(String(objective), 'th')}`],
    [/^(Completed|Current|Next): (.+)$/u, (_match, status, stage) => `${translate(String(status), 'th')}: ${translate(String(stage), 'th')}`],
    [/^Handoff readiness: (.+)$/u, (_match, value) => `ความพร้อมสำหรับส่งต่อ: ${translateUi(String(value), 'th')}`],
    [/^Confidence: (.+)$/u, (_match, value) => `ความเชื่อมั่น: ${translateUi(String(value), 'th')}`],
    [/^Safety: (.+)$/u, (_match, value) => `ความปลอดภัย: ${translateUi(String(value), 'th')}`],
    [/^Evidence gap: (.+)$/u, (_match, value) => `ช่องว่างหลักฐาน: ${translateUi(String(value), 'th')}`],
    [/^Human review required: (.+)$/u, (_match, value) => `ต้องให้มนุษย์ตรวจทาน: ${translateUi(String(value), 'th')}`],
    [/^Blocked action: (.+)$/u, (_match, value) => `การดำเนินการที่ถูกบล็อก: ${translateUi(String(value), 'th')}`],
    [/^Source: (.+)$/u, (_match, value) => `แหล่งที่มา: ${translateUi(String(value), 'th')}`],
    [/^Formula: (.+)$/u, (_match, value) => `สูตร: ${translateUi(String(value), 'th')}`],
    [/^Evidence: (.+)$/u, (_match, value) => `หลักฐาน: ${translateUi(String(value), 'th')}`],
    [/^Evidence tier: (.+)$/u, (_match, value) => `ระดับหลักฐาน: ${translateUi(String(value), 'th')}`],
    [/^Next evidence step: (.+)$/u, (_match, value) => `ขั้นตอนหลักฐานถัดไป: ${translateUi(String(value), 'th')}`],
    [/^([^:]+): ([^.]+)\. (.+)$/u, (_match, label, signal, detail) => `${translateUi(String(label), 'th')}: ${translateUi(String(signal), 'th')}. ${translateUi(String(detail), 'th')}`],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(text)) {
      return text.replace(pattern, replacement as string);
    }
  }

  return text;
}

export function localizeDom(root: HTMLElement, language: Language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  for (const node of textNodes) {
    if (node.parentElement?.closest('script, style, [data-i18n-rendered], [data-i18n-preserve]')) {
      continue;
    }
    if (!originalText.has(node)) {
      originalText.set(node, language === 'en' ? restoreEnglish(node.nodeValue ?? '') : node.nodeValue ?? '');
    }
    const source = language === 'en' ? restoreEnglish(originalText.get(node) ?? node.nodeValue ?? '') : originalText.get(node) ?? '';
    node.nodeValue = language === 'en' ? source : translateUi(source, language);
  }

  for (const element of root.querySelectorAll<HTMLElement>('[aria-label], [placeholder], [title]')) {
    for (const attr of ['aria-label', 'placeholder', 'title']) {
      const value = element.getAttribute(attr);
      if (value && !element.closest('[data-i18n-rendered], [data-i18n-preserve]')) {
        const sourceAttr = `data-i18n-original-${attr}`;
        if (!element.hasAttribute(sourceAttr)) {
          element.setAttribute(sourceAttr, language === 'en' ? restoreEnglish(value) : value);
        }
        const source = language === 'en' ? restoreEnglish(element.getAttribute(sourceAttr) ?? value) : element.getAttribute(sourceAttr) ?? value;
        element.setAttribute(attr, language === 'en' ? source : translateUi(source, language));
      }
    }
  }
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

  for (const attr of ['aria-label', 'placeholder', 'title']) {
    const value = props[attr];
    if (typeof value === 'string') {
      nextProps[attr] = translateUi(value, language);
    }
  }

  if (props.children !== undefined) {
    nextProps.children = Children.map(props.children as ReactNode, (child) => localizeNode(child, language));
  }

  return cloneElement(element, nextProps);
}
