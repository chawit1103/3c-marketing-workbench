import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { translate, translateUi } from './i18n/localize';
import { safetyLabels } from './product/safety/safetyLabels';

function renderAt(pathnameWithSearch: string, language: 'th' | 'en' = 'en') {
  cleanup();
  const [pathname, search] = pathnameWithSearch.split('?');
  vi.stubGlobal('location', {
    ...window.location,
    pathname,
    search: search ? `?${search}` : '',
  });
  const rendered = render(<App />);
  if (language === 'en') {
    fireEvent.change(screen.getByLabelText('ภาษา'), { target: { value: 'en' } });
  }
  return rendered;
}

function renderWorkbench() {
  renderAt('/workbench');
  return screen.getByRole('form', { name: 'Product Launch setup' });
}

function renderCampaignMessageTest() {
  renderAt('/workbench/campaign-message-test');
  return screen.getByRole('form', { name: 'Campaign Message Test setup' });
}

function renderAbExperiment() {
  renderAt('/workbench/ab-experiment');
  return screen.getByRole('form', { name: 'A/B Experiment setup' });
}

function renderCreativeComparison() {
  renderAt('/workbench/creative-comparison');
  return screen.getByRole('form', { name: 'Creative Comparison setup' });
}

describe('M18 Thai-first internationalization', () => {
  const thaiSafetyLabels = [
    'โหมดข้อมูลตัวอย่างออฟไลน์',
    'ข้อมูลสังเคราะห์แบบรวม',
    'ไม่มีข้อมูลโซเชียลสด',
    'ไม่มีข้อมูล CRM/ลูกค้า',
    'ไม่มีข้อความส่วนตัว',
    'ไม่รับประกันการคาดการณ์',
    'ไม่ใช่การปรับแคมเปญสำหรับใช้งานจริง',
  ];

  it('renders Thai by default and exposes a language selector', () => {
    renderAt('/', 'th');

    expect(screen.getByLabelText('ภาษา')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'เปรียบเทียบทางเลือกแคมเปญอย่างปลอดภัยก่อนทบทวนงบประมาณ' })).toBeInTheDocument();
    expect(within(screen.getByRole('navigation', { name: 'เมนูหลัก' })).getByRole('link', { name: 'พื้นที่ทำงาน' })).toHaveAttribute('href', '/workbench');
    expect(screen.getByRole('link', { name: 'เปิด Campaign Workspace' })).toBeInTheDocument();
    const safetyPanel = screen.getByRole('region', { name: 'ขอบเขตความปลอดภัย' });
    for (const label of thaiSafetyLabels) {
      expect(safetyPanel).toHaveTextContent(label);
    }
  });

  it('switches to English at runtime and keeps every safety label visible', () => {
    renderAt('/', 'th');

    fireEvent.change(screen.getByLabelText('ภาษา'), { target: { value: 'en' } });

    expect(screen.getByLabelText('Language')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Compare campaign decisions safely before budget reviews.' })).toBeInTheDocument();
    const safetyPanel = screen.getByRole('region', { name: 'Safety boundaries' });
    for (const label of safetyLabels) {
      expect(safetyPanel).toHaveTextContent(label);
    }
  });

  it.each([
    ['/campaign-workspace', 'Campaign Workspace', 'พื้นที่ทำงานแคมเปญ'],
    ['/workbench', 'Product Launch Simulation', 'จำลองการเปิดตัวสินค้า'],
    ['/workbench/campaign-message-test', 'Campaign Message Test', 'ทดสอบข้อความแคมเปญ'],
    ['/workbench/ab-experiment', 'A/B Experiment', 'การทดลอง A/B'],
    ['/workbench/creative-comparison', 'Creative Comparison', 'เปรียบเทียบงานสร้างสรรค์'],
    ['/runs/sample-run', 'Product Launch Results', 'ผลลัพธ์การเปิดตัวสินค้า (Product Launch)'],
    ['/exports/sample-run', 'Export Readiness Preview', 'ตัวอย่างความพร้อมสำหรับส่งออก'],
    ['/health', 'Product health', 'สถานะผลิตภัณฑ์'],
  ])('renders Thai and English labels for %s', (pathname, englishHeading, thaiHeading) => {
    const rendered = renderAt(pathname, 'th');
    expect(screen.getByRole('heading', { name: thaiHeading })).toBeInTheDocument();
    rendered.unmount();

    renderAt(pathname, 'en');
    expect(screen.getByRole('heading', { name: englishHeading })).toBeInTheDocument();
  });

  it('does not translate Health inside arbitrary user text and translates known full campaign phrases', () => {
    expect(translate('Health Co', 'th')).toBe('Health Co');
    expect(translate('Brand and product is Health Co.', 'th')).toBe('Brand and product is Health Co.');
    expect(translateUi('Brand and product is Health Co.', 'th')).toBe('Brand and product is Health Co.');
    expect(translate('Healthy lunch decisions in under 10 minutes for busy urban teams.', 'th')).toBe(
      'ช่วยให้ทีมเมืองที่ยุ่งตัดสินใจเลือกมื้อกลางวันที่ดีต่อสุขภาพได้ภายใน 10 นาที',
    );
    expect(translate('Healthy team lunch decisions can feel fast, reviewed, and dependable.', 'th')).toBe(
      'การตัดสินใจมื้อกลางวันเพื่อสุขภาพของทีมสามารถรวดเร็ว ผ่านการตรวจทาน และเชื่อถือได้',
    );
    expect(translate('Healthy lunch decisions in under 10 minutes for busy urban teams.', 'th')).not.toContain(
      'สถานะผลิตภัณฑ์y',
    );
  });

  it('renders Workbench Thai form legend and audience presets without English blockers', () => {
    renderAt('/workbench', 'th');

    const visibleText = document.body.textContent ?? '';
    expect(visibleText).toContain('2. ข้อมูลที่แก้ไขได้');
    expect(visibleText).toContain('ผู้ปกครอง');
    expect(visibleText).not.toContain('2. Inputs you can edit');
    expect(visibleText).not.toContain('Parents');
  });

  it('preserves Workbench English form legend and audience preset copy in English mode', () => {
    renderAt('/workbench', 'en');

    const visibleText = document.body.textContent ?? '';
    expect(visibleText).toContain('2. Inputs you can edit');
    expect(visibleText).toContain('Parents');
    expect(visibleText).not.toContain('2. ข้อมูลที่แก้ไขได้');
    expect(visibleText).not.toContain('ผู้ปกครอง');
  });

  it('renders Thai sample-run dashboard without reviewed English executive-copy blockers', () => {
    renderAt('/runs/sample-run', 'th');

    const visibleText = document.body.textContent ?? '';
    for (const blocker of [
      'The promise is clearest when the time-saving benefit is paired with trust proof.',
      'Short video and chat-friendly creative are likely better first tests than broad reach claims.',
      'Offline fixture only: no live social data, private data, CRM lists, or production prediction.',
      'Working Adults: emphasize speed, reliability, and a clear lunch-time use case.',
      'Urban Consumers: lead with convenience and visible quality proof.',
      'SME Owners: frame the offer as a simple team perk with budget control.',
      'Fixture channel cue only; use as a planning prompt, not measured live activity.',
      'Product launch fixture shows stronger synthetic awareness than trust, so analysts should inspect launch-message clarity before using the finding.',
    ]) {
      expect(visibleText).not.toContain(blocker);
    }
    expect(visibleText).toContain('คำมั่นสัญญาชัดเจนที่สุด');
    expect(visibleText).toContain('ผู้บริโภคในเมือง: นำด้วยความสะดวก');
  });

  const thaiUxReviewBlockerPhrases = [
    'Working Adults',
    'Urban Consumers',
    'SME Owners',
    'Product Launch mode',
    'Strong directional signal',
    'Light positive signal',
    'Message is understandable',
    'Directional campaign health',
  ];

  it.each([
    ['/workbench', 'ทำตัวอย่างเปิดตัวสินค้าออฟไลน์ที่ตรวจทานแล้วให้เสร็จในไม่ถึงหนึ่งนาที', 'เปลี่ยนไปที่ การทดลอง A/B'],
    ['/workbench/campaign-message-test', 'ทบทวนข้อความแคมเปญ กลุ่มเป้าหมาย และสัดส่วนแพลตฟอร์ม', 'เปลี่ยนไปที่ การทดลอง A/B'],
    ['/workbench/ab-experiment', 'เปรียบเทียบตัวเลือก A และ B ด้วยกรอบการเปรียบเทียบที่อนุมัติแล้ว', 'เปลี่ยนไปที่ เปิดตัวผลิตภัณฑ์'],
    ['/workbench/creative-comparison', 'เปรียบเทียบแนวคิดงานสร้างสรรค์แบบข้อความเท่านั้นสองแบบ', 'เปลี่ยนไปที่ การทดลอง A/B'],
  ])('renders Workbench Thai mode without known English smoke blocker fragments for %s', (pathname, thaiHelper, thaiSwitch) => {
    renderAt(pathname, 'th');

    const visibleText = document.body.textContent ?? '';
    expect(visibleText).toContain(thaiHelper);
    expect(visibleText).toContain(thaiSwitch);
    expect(visibleText).toContain('เครื่องมือช่วยตัดสินใจการตลาด');
    for (const blocker of [
      'Complete a reviewed offline Product Launch sample in under a minute',
      'Review a campaign message, audience, and platform mix',
      'Compare two text-only creative concepts with the approved workflow',
      'Switch to',
      'Marketing Decision Workbench',
      'WORKBENCH ตัดสินใจการตลาด',
      ...thaiUxReviewBlockerPhrases,
    ]) {
      expect(visibleText).not.toContain(blocker);
    }
  });

  it('renders A/B workflow steps in Thai by default while preserving English secondary copy', () => {
    renderAt('/workbench/ab-experiment', 'th');

    const workflowSteps = screen.getByRole('region', { name: 'ขั้นตอนเวิร์กโฟลว์อ้างอิง' });
    expect(workflowSteps).toHaveTextContent('แดชบอร์ดเปรียบเทียบ');
    expect(workflowSteps).not.toHaveTextContent('Comparison Dashboard');

    cleanup();
    renderAt('/workbench/ab-experiment', 'en');
    expect(screen.getByRole('region', { name: 'Reference workflow steps' })).toHaveTextContent('Comparison Dashboard');
  });

  it('localizes PR4 evidence visualization limitation and gap fragments for arbitrary platform selections', () => {
    const form = renderAt('/workbench', 'th').getByRole('form', { name: 'ตั้งค่า Product Launch' });

    fireEvent.click(within(form).getByLabelText('Facebook'));
    fireEvent.click(within(form).getByLabelText('TikTok'));
    fireEvent.click(within(form).getByLabelText('LINE'));
    fireEvent.click(within(form).getByLabelText('YouTube'));
    fireEvent.click(within(form).getByLabelText('X'));
    fireEvent.click(within(form).getAllByRole('button', { name: 'รันการจำลองออฟไลน์' }).at(-1)!);

    const evidenceSection = screen.getByRole('region', { name: 'ภาพหลักฐาน' });
    expect(evidenceSection).toHaveTextContent('YouTube, X');
    expect(evidenceSection).toHaveTextContent('เป็นเพียงตัวอย่างออฟไลน์ที่ตรวจทานแล้ว');
    expect(evidenceSection).toHaveTextContent('ไม่ได้ใช้ API แพลตฟอร์มโซเชียลจริง');
    expect(evidenceSection).not.toHaveTextContent('Reviewed offline sample only');
    expect(evidenceSection).not.toHaveTextContent('No real social platform APIs');
    expect(evidenceSection).not.toHaveTextContent('Synthetic/offline only; no live data or field evidence is implied.');
    expect(evidenceSection).not.toHaveTextContent('Treat provenance and limitations as blockers before external use.');

    cleanup();
    renderAt('/runs/sample-run', 'en');
    expect(screen.getByRole('region', { name: 'Evidence Visualization' })).toHaveTextContent('Reviewed offline sample only');
  });

  it('renders campaign workspace Thai mode without known English smoke blocker fragments', () => {
    renderAt('/campaign-workspace', 'th');

    const visibleText = document.body.textContent ?? '';
    expect(visibleText).not.toContain('สถานะผลิตภัณฑ์y');
    expect(visibleText).not.toContain('runtime');
    expect(visibleText).not.toContain('Experiment Framework');
    expect(visibleText).not.toContain('MVP');
    for (const blocker of [
      'Run a small',
      'Both creative concepts',
      'MVP is text-only',
      'Have claims',
      'winner selection',
      'Directional campaign health',
      'Message is understandable',
      'Message is clear enough',
      'Low implementation risk',
      'required before external use',
      'offline directional',
      'Low confidence',
      'synthetic planning cue',
      'live social activity',
      'JOURNEY',
      'Product Launch fixture',
      'Engagement Potential',
      'fixture card',
      'quality, delivery',
      'observed market behavior',
      'synthetic/offline fixture',
      ...thaiUxReviewBlockerPhrases,
    ]) {
      expect(visibleText).not.toContain(blocker);
    }

    const accessibleText = Array.from(document.body.querySelectorAll('[aria-label]'))
      .map((element) => element.getAttribute('aria-label') ?? '')
      .join(' ');
    expect(accessibleText).not.toContain('source and evidence');
    expect(accessibleText).not.toContain('formula and source');
    expect(accessibleText).not.toContain('Current Journey Stage');
    expect(accessibleText).not.toContain('Campaign journey timeline');
    expect(accessibleText).not.toContain('Top evidence confidence blocker');
  });

  it.each([
    ['/workbench', 'การจำลอง Product Launch ออฟไลน์พร้อมสำหรับผู้บริหารตรวจทาน'],
    ['/workbench/campaign-message-test', 'การทดสอบข้อความแคมเปญออฟไลน์พร้อมสำหรับผู้บริหารตรวจทาน'],
    ['/workbench/ab-experiment', 'การทดลอง A/B ออฟไลน์พร้อมสำหรับผู้บริหารตรวจทาน'],
    ['/workbench/creative-comparison', 'การเปรียบเทียบงานสร้างสรรค์ออฟไลน์พร้อมสำหรับผู้บริหารตรวจทาน'],
  ])('keeps dynamic run results localized in Thai after clicking run on %s', (pathname, thaiResultHeading) => {
    renderAt(pathname, 'th');

    fireEvent.click(screen.getAllByRole('button', { name: 'รันการจำลองออฟไลน์' }).at(-1)!);

    const resultHeading = screen.getByRole('heading', { name: thaiResultHeading });
    const resultSection = resultHeading.closest('section');
    expect(resultSection).not.toBeNull();
    expect(resultSection).toHaveTextContent('แดชบอร์ด');
    expect(resultSection).toHaveTextContent('ข้อเสนอแนะถัดไป');
    expect(resultSection).toHaveTextContent('ใช้เป็นโจทย์ให้มนุษย์ตรวจทาน');
    expect(screen.getByRole('link', { name: 'ไปยังผลลัพธ์ตัวอย่างที่สร้างไว้' })).toHaveAttribute('href', '#results-title');
    for (const blocker of [
      'Offline product-launch simulation ready for executive review',
      'Safety: offline fixture for planning only; review before using externally.',
      'Open result dashboard',
      'Open export-readiness preview',
      'YOUR ASSUMPTIONS SHOWN FOR REVIEW',
      'Your assumptions shown for review',
      'FIXTURE TRANSPARENCY',
      'Fixture transparency',
      'OVERALL REACTION',
      'Overall Reaction',
      'Platform Breakdown',
      'Risks / Caveats',
      'DASHBOARD',
      'The offline Product Launch sample shows',
      'Recommended next action',
      'Jump to generated sample results',
      ...thaiUxReviewBlockerPhrases,
    ]) {
      expect(resultSection).not.toHaveTextContent(blocker);
      expect(document.body).not.toHaveTextContent(blocker);
    }
  });

  it('localizes Thai Workbench default input values without known English fixture fragments', () => {
    const form = renderAt('/workbench', 'th').container.querySelector('form');
    expect(form).not.toBeNull();
    const thaiForm = screen.getByRole('form', { name: 'ตั้งค่า Product Launch' });

    const defaultValues = [
      within(thaiForm).getByLabelText('ข้อความแคมเปญ'),
      within(thaiForm).getByLabelText('ข้อเสนอ/โปรโมชัน'),
      within(thaiForm).getByLabelText('ข้อความหลัก'),
      within(thaiForm).getByLabelText('บริบทเพิ่มเติม'),
    ].map((field) => (field as HTMLInputElement | HTMLTextAreaElement).value);

    for (const value of defaultValues) {
      expect(value).not.toContain('Healthy lunch decisions in under 10 minutes for busy urban teams.');
      expect(value).not.toContain('Intro launch bundle: first-week sampler with free delivery threshold.');
      expect(value).not.toContain('Save time without sacrificing taste, nutrition, or team convenience.');
      expect(value).not.toContain('Reviewed offline product-launch sample for an executive marketing scenario walkthrough.');
    }
    expect(defaultValues.join(' ')).toContain('ช่วยให้ทีมเมืองที่ยุ่งตัดสินใจเลือกมื้อกลางวันที่ดีต่อสุขภาพได้ภายใน 10 นาที');
  });

  it('shows English Workbench defaults in English mode', () => {
    const form = renderWorkbench();

    expect(within(form).getByLabelText('Campaign Message')).toHaveValue(
      'Healthy lunch decisions in under 10 minutes for busy urban teams.',
    );
    expect(within(form).getByLabelText('Offer/Promotion')).toHaveValue(
      'Intro launch bundle: first-week sampler with free delivery threshold.',
    );
    expect(within(form).getByLabelText('Key Message')).toHaveValue(
      'Save time without sacrificing taste, nutrition, or team convenience.',
    );
    expect(within(form).getByLabelText('Context notes')).toHaveValue(
      'Reviewed offline product-launch sample for an executive marketing scenario walkthrough.',
    );
  });

  it('fully localizes Workbench completion status accessible label in Thai mode', () => {
    renderAt('/workbench', 'th');
    const thaiForm = screen.getByRole('form', { name: 'ตั้งค่า Product Launch' });

    fireEvent.click(within(thaiForm).getByRole('button', { name: 'รันการจำลองออฟไลน์' }));

    expect(screen.getByRole('status', { name: 'สถานะการรัน' })).toHaveTextContent(
      'รันเสร็จแล้ว: ผลลัพธ์ตัวอย่างที่สร้างไว้แสดงอยู่ด้านล่างแล้ว',
    );
    const accessibleText = Array.from(document.body.querySelectorAll('[aria-label]'))
      .map((element) => element.getAttribute('aria-label') ?? '')
      .join(' ');
    expect(accessibleText).not.toContain('รัน completion status');
    expect(accessibleText).not.toContain('Run completion status');
  });

  it('keeps Workbench run-complete status and audience assumptions across language switches after Thai run', () => {
    renderAt('/workbench', 'th');
    const thaiForm = screen.getByRole('form', { name: 'ตั้งค่า Product Launch' });

    const thaiPreview = screen.getByRole('region', { name: 'สมมติฐานปัจจุบัน' });
    expect(thaiPreview).toHaveTextContent('วัยทำงาน, ผู้บริโภคในเมือง, เจ้าของธุรกิจ SME');
    expect(thaiPreview).not.toHaveTextContent('Working Adults');

    fireEvent.click(within(thaiForm).getByRole('button', { name: 'รันการจำลองออฟไลน์' }));

    expect(screen.getByRole('status', { name: 'สถานะการรัน' })).toHaveTextContent(
      'รันเสร็จแล้ว: ผลลัพธ์ตัวอย่างที่สร้างไว้แสดงอยู่ด้านล่างแล้ว',
    );
    expect(screen.getByRole('heading', { name: 'การจำลอง Product Launch ออฟไลน์พร้อมสำหรับผู้บริหารตรวจทาน' })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('ภาษา'), { target: { value: 'en' } });

    const englishPreview = screen.getByRole('region', { name: 'Current assumptions' });
    expect(englishPreview).toHaveTextContent('Working Adults, Urban Consumers, SME Owners');
    expect(englishPreview).not.toHaveTextContent('วัยทำงาน');
    expect(englishPreview).not.toHaveTextContent('ผู้บริโภคในเมือง');
    expect(englishPreview).not.toHaveTextContent('เจ้าของธุรกิจ SME');
    expect(screen.getByRole('status', { name: 'Run completion status' })).toHaveTextContent(
      'Run complete: generated sample results are visible below now.',
    );
    expect(screen.getByRole('heading', { name: 'Offline product-launch simulation ready for executive review' })).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent('Defaults are prefilled. Run now, or edit the visible inputs first.');

    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'th' } });

    expect(screen.getByRole('status', { name: 'สถานะการรัน' })).toHaveTextContent(
      'รันเสร็จแล้ว: ผลลัพธ์ตัวอย่างที่สร้างไว้แสดงอยู่ด้านล่างแล้ว',
    );
    expect(screen.getByRole('heading', { name: 'การจำลอง Product Launch ออฟไลน์พร้อมสำหรับผู้บริหารตรวจทาน' })).toBeInTheDocument();
  });

  it('preserves edited Workbench inputs while localizing untouched defaults across language switches', () => {
    const form = renderWorkbench();
    const editedCampaignName = 'Edited campaign survives language switch';
    const editedMessage = 'Edited message remains controlled state';

    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), { target: { value: editedCampaignName } });
    fireEvent.change(within(form).getByLabelText('Campaign Message'), { target: { value: editedMessage } });

    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'th' } });

    const thaiForm = screen.getByRole('form', { name: 'ตั้งค่า Product Launch' });
    expect(within(thaiForm).getByLabelText('ชื่อแคมเปญหรือแบรนด์')).toHaveValue(editedCampaignName);
    expect(within(thaiForm).getByLabelText('ข้อความแคมเปญ')).toHaveValue(editedMessage);
    expect(within(thaiForm).getByLabelText('ข้อเสนอ/โปรโมชัน')).toHaveValue(
      'ชุดเปิดตัวทดลองสัปดาห์แรก พร้อมเงื่อนไขส่งฟรีเมื่อถึงยอดขั้นต่ำ',
    );

    fireEvent.change(screen.getByLabelText('ภาษา'), { target: { value: 'en' } });

    const englishForm = screen.getByRole('form', { name: 'Product Launch setup' });
    expect(within(englishForm).getByLabelText('Campaign name or brand')).toHaveValue(editedCampaignName);
    expect(within(englishForm).getByLabelText('Campaign Message')).toHaveValue(editedMessage);
    expect(within(englishForm).getByLabelText('Offer/Promotion')).toHaveValue(
      'Intro launch bundle: first-week sampler with free delivery threshold.',
    );
  });

  it('preserves user-entered Health Co exactly in Thai review preview before run', () => {
    const form = renderWorkbench();

    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), { target: { value: 'Health Co' } });
    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'th' } });

    const preview = screen.getByRole('region', { name: 'สมมติฐานปัจจุบัน' });
    expect(preview).toHaveTextContent('Health Co');
    expect(preview).not.toHaveTextContent('สถานะผลิตภัณฑ์ Co');
  });

  it('preserves user-entered Health Co exactly in Thai result assumptions', () => {
    const form = renderWorkbench();

    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), { target: { value: 'Health Co' } });
    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'th' } });

    const thaiForm = screen.getByRole('form', { name: 'ตั้งค่า Product Launch' });
    fireEvent.click(within(thaiForm).getByRole('button', { name: 'รันการจำลองออฟไลน์' }));

    const assumptions = screen.getByText('สมมติฐานของคุณที่แสดงเพื่อการตรวจทาน').closest('.assumption-panel');
    expect(assumptions).toHaveTextContent('Health Co');
    expect(assumptions).not.toHaveTextContent('สถานะผลิตภัณฑ์ Co');
  });

  it('localizes Thai Workbench validation errors after user interaction', () => {
    renderAt('/workbench', 'th');
    const thaiForm = screen.getByRole('form', { name: 'ตั้งค่า Product Launch' });

    fireEvent.change(within(thaiForm).getByLabelText('ชื่อแคมเปญหรือแบรนด์'), { target: { value: '' } });
    fireEvent.change(within(thaiForm).getByLabelText('ข้อความแคมเปญ'), { target: { value: '' } });
    for (const checkbox of within(thaiForm).getAllByRole('checkbox')) {
      if ((checkbox as HTMLInputElement).checked) {
        fireEvent.click(checkbox);
      }
    }
    fireEvent.click(within(thaiForm).getByRole('button', { name: 'รันการจำลองออฟไลน์' }));

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('กรอกข้อมูลจำเป็นให้ครบก่อนรัน:');
    expect(alert).toHaveTextContent('ต้องระบุชื่อแคมเปญหรือแบรนด์');
    expect(alert).toHaveTextContent('ต้องระบุข้อความแคมเปญ');
    expect(alert).toHaveTextContent('เลือกอย่างน้อยหนึ่งแพลตฟอร์ม');
    for (const blocker of [
      'Complete required fields before running:',
      'Campaign name or brand is required',
      'Campaign Message is required',
      'Select at least one platform',
    ]) {
      expect(alert).not.toHaveTextContent(blocker);
    }
  });

  it('uses honest Health KPI language and avoids overclaiming language coverage', () => {
    renderAt('/health', 'en');

    const healthStatus = screen.getByRole('region', { name: 'Product health status' });
    expect(healthStatus).toHaveTextContent('Reviewed core UI');
    expect(healthStatus).toHaveTextContent('known mixed-language fragments remain visible for review');
    expect(healthStatus).toHaveTextContent('Executive insight dashboard is available for reviewed offline results');
    expect(healthStatus).toHaveTextContent('Report/export upgrade remains out of scope');
    expect(healthStatus).not.toHaveTextContent('all UI copy');
    expect(healthStatus).not.toHaveTextContent('fully translated');
    for (const internalTerm of ['M18', 'M19', 'PR3', 'PR4', 'PR5']) {
      expect(healthStatus).not.toHaveTextContent(internalTerm);
    }
  });

  it('localizes PR3 Platform Engagement comments and themes in Thai mode without English fragments', () => {
    renderAt('/runs/sample-run', 'th');

    const panel = screen.getByRole('region', { name: 'โมเดลผลการมีส่วนร่วมแพลตฟอร์ม' });
    expect(panel).toHaveTextContent('ประโยชน์ชัดเจน แต่ควรตรวจทานหลักฐานคุณภาพก่อนใช้ข้อความภายนอก');
    expect(panel).toHaveTextContent('คอมเมนต์สังเคราะห์ชี้ว่าข้อความที่ตรวจทานเข้าใจง่ายเพียงใดในบริบทแพลตฟอร์มที่ตั้งค่าไว้');
    expect(panel).toHaveTextContent('ต้องมีหลักฐานความน่าเชื่อถือ');
    expect(panel).toHaveTextContent('สมมติฐานความเหมาะสมของช่องทาง');

    for (const blocker of [
      'Clear benefit',
      'Message clarity: Synthetic comments indicate',
      'Trust proof needed:',
      'Channel fit hypothesis:',
    ]) {
      expect(panel).not.toHaveTextContent(blocker);
    }
  });

  it('preserves PR3 Platform Engagement comments and themes in English mode', () => {
    renderAt('/runs/sample-run', 'en');

    const panel = screen.getByRole('region', { name: 'Platform Engagement Result Model' });
    expect(panel).toHaveTextContent('Facebook: Clear benefit, but quality proof should be reviewed before public copy.');
    expect(panel).toHaveTextContent('Message clarity: Synthetic comments indicate whether the reviewed message is easy to understand in each configured platform context.');
    expect(panel).toHaveTextContent('Trust proof needed: Synthetic comments keep proof-point needs visible before any external review or small evidence test.');
    expect(panel).toHaveTextContent('Channel fit hypothesis: Platform differences are configuration-owned planning cues from selected platforms, not field observations.');
  });

  it('fully localizes Thai Export Review sample-run executive copy and glossary terms', () => {
    renderAt('/exports/sample-run', 'th');

    const visibleText = document.body.textContent ?? '';
    const accessibleText = Array.from(document.body.querySelectorAll('[aria-label]'))
      .map((element) => element.getAttribute('aria-label') ?? '')
      .join(' ');
    for (const blocker of [
      'Generated from the reviewed offline sample',
      'This screen previews Executive JSON',
      'Prepared from the reviewed offline sample',
      'Unsupported now',
      'Decision readiness:',
      'Objectives',
      'Scenario',
      'Inputs',
      'Use the report for executive handoff',
      'ส่งออก readiness',
      'หลักฐาน tier',
      'executive handoff report',
      'Decision readiness: การตรวจทานโดยมนุษย์ required',
      'Evidence tier',
      'Formula:',
      'Confidence:',
      'Objective:',
      'Overall Reaction',
      'Moderate positive signal',
      'Message is understandable',
      'Light positive signal',
      'Strong directional signal',
      'Directional only',
      'Brand and product is Nimbus Go.',
      'Campaign message is Healthy lunch decisions in under 10 minutes for busy urban teams.',
      'Launch offer is Intro launch bundle: first-week sampler with free delivery threshold.',
      'Key message is Save time without sacrificing taste, nutrition, or team convenience.',
      'Use only aggregate, synthetic, offline assumptions',
      'Directional synthetic aggregate sample only',
      'ช่องว่างหลักฐาน remain visible before action.',
      'Review mode:',
      'execution mode:',
      'production ready:',
      'Offline sample',
      'fixture;',
      'no.',
    ]) {
      expect(visibleText).not.toContain(blocker);
      expect(accessibleText).not.toContain(blocker);
    }

    for (const thaiCopy of [
      'ตรวจทานการส่งออก',
      'หน้าจอนี้แสดงตัวอย่างเนื้อหา Executive JSON และบรีฟ Markdown',
      'เตรียมจากตัวอย่างออฟไลน์ที่ตรวจทานแล้วพร้อมหมายเหตุความปลอดภัย',
      'ตัวอย่างตรวจทานที่รองรับ',
      'เป็นตัวอย่างตรวจทานจากข้อมูลสังเคราะห์/ออฟไลน์เท่านั้น',
      'ความพร้อมในการตัดสินใจ: ต้องให้มนุษย์ตรวจทาน',
      'วัตถุประสงค์',
      'สถานการณ์',
      'ข้อมูลนำเข้า',
      'ใช้รายงานนี้เพื่อส่งต่อให้ผู้บริหารและให้มนุษย์ตรวจทาน',
      'ระดับหลักฐาน',
      'แหล่งที่มา',
      'สูตร',
      'ความเชื่อมั่น',
      'รายงานส่งต่อผู้บริหาร',
      'ปฏิกิริยาโดยรวม: สัญญาณบวกปานกลาง',
      'การยอมรับข้อความ: ข้อความเข้าใจง่าย',
      'ภาพรับรู้แบรนด์: สัญญาณบวกเล็กน้อย',
      'ศักยภาพการมีส่วนร่วม: สัญญาณเชิงทิศทางชัดเจน',
      'ความตั้งใจซื้อเชิงสังเคราะห์: ใช้เป็นทิศทางเท่านั้น',
      'โหมดตรวจทาน: ตัวอย่างออฟไลน์',
      'รูปแบบการทำงาน: ข้อมูลตัวอย่างออฟไลน์',
      'ความพร้อมใช้งานจริง: ยังไม่พร้อมใช้งานจริง',
      'แบรนด์และสินค้า: Nimbus Go',
      'ข้อความแคมเปญ: ตัดสินใจมื้อกลางวันที่ดีต่อสุขภาพได้ในไม่เกิน 10 นาที สำหรับทีมเมืองที่งานยุ่ง',
      'ข้อเสนอเปิดตัว: ชุดทดลองสัปดาห์แรกพร้อมเกณฑ์ส่งฟรี',
      'ข้อความหลัก: ประหยัดเวลาโดยไม่ลดทอนรสชาติ โภชนาการ หรือความสะดวกของทีม',
      'ใช้เฉพาะสมมติฐานแบบรวม สังเคราะห์ และออฟไลน์',
      'เป็นตัวอย่างรวมเชิงสังเคราะห์แบบชี้ทิศทางเท่านั้น',
      'ช่องว่างหลักฐานต้องแสดงให้เห็นก่อนดำเนินการ',
    ]) {
      expect(visibleText).toContain(thaiCopy);
    }
  });

  it('fully localizes Thai Campaign Workspace dashboard metadata and accessibility labels', () => {
    renderAt('/campaign-workspace', 'th');

    const dashboard = screen.getByRole('region', { name: 'แดชบอร์ด KPI ผู้บริหาร' });
    const visibleText = dashboard.textContent ?? '';
    const accessibleText = Array.from(dashboard.querySelectorAll('[aria-label]'))
      .map((element) => element.getAttribute('aria-label') ?? '')
      .join(' ');

    for (const blocker of [
      'Legend: ข้อมูลตัวอย่าง-rank cue',
      'higher bars show directional strength',
      'สูตร: platform bar value = clampScore',
      'earlier productLaunchFixture',
      'Overall Campaign Score แหล่งที่มาและหลักฐาน',
      'Sentiment comparison สูตรและแหล่งที่มา',
      'Human review สูตรและแหล่งที่มา',
      'source and evidence',
      'formula and source',
      'Legend:',
      'Formula:',
      'Source:',
      'Evidence tier:',
      'Confidence:',
    ]) {
      expect(visibleText).not.toContain(blocker);
      expect(accessibleText).not.toContain(blocker);
    }

    expect(accessibleText).toContain('คะแนนรวมแคมเปญ แหล่งที่มาและหลักฐาน');
    expect(accessibleText).toContain('เปรียบเทียบ Sentiment สูตรและแหล่งที่มา');
    expect(accessibleText).toContain('รายการตรวจทานโดยมนุษย์ สูตรและแหล่งที่มา');
    expect(visibleText).toContain('สัญญาณจากลำดับข้อมูลตัวอย่าง');
    expect(visibleText).toContain('สูตร: ค่าแถบแพลตฟอร์ม = clampScore(100 - fixture rank index × 12)');
    expect(visibleText).toContain('แหล่งที่มา: รายละเอียดแพลตฟอร์มจากข้อมูลตัวอย่าง');
    expect(visibleText).toContain('ระดับหลักฐาน: E1 ข้อมูลตัวอย่างสังเคราะห์/ออฟไลน์');
  });

  it('fully localizes Health KPI copy and technical boundaries in Thai mode', () => {
    renderAt('/health', 'th');

    const healthStatus = screen.getByRole('region', { name: 'สถานะสุขภาพผลิตภัณฑ์' });
    const visibleText = document.body.textContent ?? '';
    const accessibleText = Array.from(document.body.querySelectorAll('[aria-label]'))
      .map((element) => element.getAttribute('aria-label') ?? '')
      .join(' ');

    for (const thaiTerm of [
      'หลักฐาน',
      'ความเชื่อมั่น',
      'ข้อเสนอแนะ',
      'เส้นทางแคมเปญ',
      'แดชบอร์ด',
      'รายงาน',
      'ส่งออก',
      'ตรวจทาน',
      'ข้อความหน้าจอหลักที่ตรวจทานแล้ว',
      'ผลลัพธ์ออฟไลน์ที่ตรวจทานแล้ว',
      'การอัปเกรดรายงาน/การส่งออกยังอยู่นอกขอบเขต',
    ]) {
      expect(healthStatus).toHaveTextContent(thaiTerm);
    }

    for (const blocker of [
      'Product terms follow the M18 glossary',
      'Product terms stay consistent',
      'ไทย copy is short',
      'English remains the fallback',
      'Dashboard, executive summary',
      'Human review',
      'Engineering KPI',
      'No Architecture Gate',
      'Evidence',
      'Confidence',
      'Recommendation',
      'Journey',
      'Dashboard',
      'Report',
      'Export',
      'Review',
      'backend',
      'persistence',
      'auth',
      'live API',
      'IA',
      'M18',
      'M19',
      'PR3',
      'PR4',
      'PR5',
      'all UI copy',
      'fully translated',
    ]) {
      expect(visibleText).not.toContain(blocker);
      expect(accessibleText).not.toContain(blocker);
    }
  });
});

describe('App shell routes', () => {
  it.each([
    ['/', 'Compare campaign decisions safely before budget reviews.'],
    ['/workbench', 'Product Launch Simulation'],
    ['/campaign-workspace', 'Campaign Workspace'],
    ['/workbench/campaign-message-test', 'Campaign Message Test'],
    ['/workbench/ab-experiment', 'A/B Experiment'],
    ['/workbench/creative-comparison', 'Creative Comparison'],
    ['/runs/run-123', 'Run unavailable'],
    ['/exports/run-123', 'Export unavailable'],
    ['/health', 'Product health'],
  ])('renders %s with safety labels', (pathname, heading) => {
    renderAt(pathname);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    const safetyPanel = screen.getByRole('region', { name: 'Safety boundaries' });
    for (const label of safetyLabels) {
      expect(within(safetyPanel).getByText(label)).toBeInTheDocument();
    }
  });

  it('renders simple shell navigation without changing the primary navigation model', () => {
    renderAt('/');

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Workbench' })).toHaveAttribute('href', '/workbench');
    expect(within(nav).getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/runs/sample-run');
    expect(within(nav).getByRole('link', { name: 'Export review' })).toHaveAttribute('href', '/exports/sample-run');
    expect(within(nav).getByRole('link', { name: 'Health' })).toHaveAttribute('href', '/health');
    expect(within(nav).queryByRole('link', { name: /Campaign Workspace/i })).not.toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: /Campaign Message Test/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open Campaign Workspace' })).toHaveAttribute('href', '/campaign-workspace');
    expect(screen.getByRole('link', { name: 'Open Campaign Message Test' })).toHaveAttribute(
      'href',
      '/workbench/campaign-message-test',
    );
    expect(screen.getByRole('link', { name: 'Open A/B Experiment' })).toHaveAttribute('href', '/workbench/ab-experiment');
  });

  it('keeps internal platform terms out of visible primary UI', () => {
    const hiddenInternalTerms = [
      'provenance object',
      'sdk',
      'fixture runtime',
      'domain pack',
      'dashboard contract',
      'registry',
      'campaign_response',
    ];

    for (const pathname of ['/', '/workbench', '/campaign-workspace', '/workbench/campaign-message-test', '/workbench/ab-experiment', '/workbench/creative-comparison', '/runs/sample-run', '/exports/sample-run', '/health', '/unknown-route']) {
      const { unmount } = renderAt(pathname);
      const visibleText = document.body.textContent?.toLowerCase() ?? '';
      if (pathname !== '/health') {
        expect(visibleText).not.toContain('pr4');
      }
      expect(visibleText).not.toContain('pr2');
      expect(visibleText).not.toContain('vertical slice');

      for (const term of hiddenInternalTerms) {
        expect(visibleText).not.toContain(term);
      }

      unmount();
    }
  });
});

describe('Creative Comparison workflow', () => {
  it('is available as a fourth workbench workflow with Creative A and Creative B text inputs', () => {
    const form = renderCreativeComparison();

    expect(screen.getByRole('heading', { name: 'Creative Comparison' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current workflow' })).toHaveTextContent('Creative Comparison mode');
    expect(within(form).getByLabelText('Objective: Creative Comparison')).toHaveTextContent(
      'Review two text-only creative concepts with shared audience, platform, and safety assumptions.',
    );
    expect(within(form).getByLabelText('Creative A concept title')).toHaveValue('Speed-first lunch creative');
    expect(within(form).getByLabelText('Creative A visual idea / copy description')).toHaveValue('A clean desk scene with lunch options resolved quickly and a short benefit-led caption.');
    expect(within(form).getByLabelText('Creative B concept title')).toHaveValue('Trust-proof lunch creative');
    expect(within(form).getByLabelText('Creative B visual idea / copy description')).toHaveValue('A team lunch moment with nutrition proof points and dependable delivery reassurance.');
    for (const step of ['Creative A', 'Creative B', 'Review', 'Run', 'Creative Comparison Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action']) {
      expect(screen.getByRole('region', { name: 'Reference workflow steps' })).toHaveTextContent(step);
    }
  });

  it('validates empty creative comparison inputs before running', () => {
    const form = renderCreativeComparison();

    for (const label of [
      'Creative A concept title',
      'Creative A visual idea / copy description',
      'Creative B concept title',
      'Creative B visual idea / copy description',
      'Key Message',
    ]) {
      fireEvent.change(within(form).getByLabelText(label), { target: { value: '' } });
    }
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Creative A and Creative B titles are required because the comparison needs two named alternatives.');
    expect(screen.getByRole('alert')).toHaveTextContent('Creative A and Creative B descriptions are required because this reviewed prototype uses text-only concepts.');
    expect(screen.getByRole('alert')).toHaveTextContent('Key Message is required because message clarity must be reviewed against an explicit message.');
    expect(screen.queryByRole('heading', { name: 'Offline creative comparison ready for executive review' })).not.toBeInTheDocument();
  });

  it('produces result preview, comparison dashboard, executive summary, export review link, and safety labels after run', () => {
    const form = renderCreativeComparison();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('status', { name: 'Run completion status' })).toHaveTextContent(
      'Run complete: generated sample results are visible below now.',
    );
    expect(screen.getByRole('heading', { name: 'Offline creative comparison ready for executive review' })).toBeInTheDocument();
    const dashboard = screen.getByRole('region', { name: 'Creative comparison dashboard' });
    for (const heading of [
      'Creative A summary',
      'Creative B summary',
      'Comparison highlights',
      'Differentiators',
      'Audience fit',
      'Brand fit',
      'Message clarity',
      'Risk / caveats',
      'Evidence notes',
      'Recommended next action',
    ]) {
      expect(dashboard).toHaveTextContent(heading);
    }
    expect(dashboard).toHaveTextContent('No winner selected');
    expect(dashboard).toHaveTextContent('inconclusive');
    expect(screen.queryByRole('heading', { name: 'Variant decision frame' })).not.toBeInTheDocument();
    expect(screen.queryByText('A/B comparison')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Creative Comparison executive summary' })).toBeInTheDocument();
    expect(screen.getByText('Open export-readiness preview')).toHaveAttribute('href', expect.stringContaining('/exports/3c-m15-creative-comparison-reference-workflow'));
    expect(document.body.textContent).toContain('Safety: offline fixture for planning only');
  });

  it('routes Creative Comparison dashboard and reuses export review for the generated run id', () => {
    const runView = renderAt('/runs/3c-m15-creative-comparison-reference-workflow');
    expect(screen.getByRole('heading', { name: 'Creative Comparison Results' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Creative comparison dashboard' })).toHaveTextContent('No winner selected');
    runView.unmount();

    renderAt('/exports/3c-m15-creative-comparison-reference-workflow');
    expect(screen.getByRole('heading', { name: 'Creative Comparison executive-ready summary' })).toBeInTheDocument();
    expect(screen.getAllByText(/synthetic\/offline fixture/i).length).toBeGreaterThanOrEqual(1);
    expect(document.body.textContent?.toLowerCase()).not.toMatch(/download|pdf|ppt|powerpoint/);
  });
});

describe('Campaign Workspace MVP', () => {
  it('renders a campaign-centric workspace with the approved journey timeline and executive summary', () => {
    renderAt('/campaign-workspace');

    expect(screen.getByRole('heading', { name: 'Campaign Workspace' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Campaign Overview' })).toHaveTextContent('Nimbus Go');
    expect(screen.getByRole('region', { name: 'Current Journey Stage' })).toHaveTextContent('Executive Decision');
    expect(screen.getByRole('region', { name: 'Current Journey Stage' })).toHaveTextContent('Creative Comparison evidence');
    expect(screen.getByRole('region', { name: 'Executive Summary' })).toHaveTextContent('Creative Comparison evidence');

    const primaryAction = screen.getByRole('link', { name: 'Open executive handoff review' });
    expect(primaryAction).toHaveClass('button-primary');
    expect(primaryAction).toHaveAttribute('href', '/exports/3c-m15-creative-comparison-reference-workflow');
    expect(screen.queryByRole('link', { name: /Continue next workflow/i })).not.toBeInTheDocument();

    const journey = screen.getByRole('region', { name: 'Campaign journey timeline' });
    for (const stage of ['Completed: Campaign Definition', 'Completed: Campaign Message Test', 'Completed: A/B Experiment', 'Completed: Creative Comparison', 'Current: Executive Decision', 'Next: Export/Handoff']) {
      expect(journey).toHaveTextContent(stage);
    }
    expect(journey).toHaveTextContent('Handoff readiness: Ready for human review');
  });

  it('places a decision blockers panel before the executive dashboard visuals', () => {
    renderAt('/campaign-workspace');

    const blockers = screen.getByRole('region', { name: 'Decision blockers before action' });
    expect(blockers).toHaveTextContent('Evidence gaps + human review required before action');
    expect(blockers).toHaveTextContent('Evidence gap: Creative Comparison MVP is text-only');
    expect(blockers).toHaveTextContent('Human review required: Have claims been reviewed against approved proof points?');
    expect(blockers).toHaveTextContent('Blocked action: winner selection');
    expect(blockers).toHaveTextContent('Low directional confidence');

    const dashboard = screen.getByRole('region', { name: 'Executive KPI dashboard' });
    expect(blockers.compareDocumentPosition(dashboard) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('aggregates recent runs and evidence from existing fixtures only', () => {
    renderAt('/campaign-workspace');

    const recentRuns = screen.getByRole('region', { name: 'Recent Runs' });
    for (const objective of ['Product Launch', 'Campaign Message Test', 'A/B Experiment', 'Creative Comparison']) {
      expect(recentRuns).toHaveTextContent(objective);
    }

    const evidence = screen.getByRole('region', { name: 'Evidence Summary' });
    for (const fixtureHeadline of [
      'Offline product-launch simulation ready for executive review',
      'Offline campaign-message test ready for executive review',
      'Offline A/B experiment ready for executive review',
      'Offline creative comparison ready for executive review',
    ]) {
      expect(evidence).toHaveTextContent(fixtureHeadline);
    }
    expect(evidence).toHaveTextContent('Decision evidence quality');
    expect(evidence).toHaveTextContent('Low directional confidence');
    expect(evidence).toHaveTextContent('Evidence gaps');
    expect(evidence).toHaveTextContent('Creative Comparison MVP is text-only');
    expect(evidence).toHaveTextContent('Limitations / risks');
    expect(evidence).toHaveTextContent('Blocked actions');
    expect(evidence).toHaveTextContent('winner selection');
    expect(evidence).toHaveTextContent('Handoff readiness');
    expect(evidence).toHaveTextContent('Ready for human review');
    expect(evidence.textContent?.toLowerCase()).toContain('creative comparison');
    expect(evidence.textContent?.toLowerCase()).not.toContain('socialsense');
  });

  it('surfaces M17 executive KPI cards and CSS-only decision visuals from offline fixtures', () => {
    renderAt('/campaign-workspace');

    const dashboard = screen.getByRole('region', { name: 'Executive KPI dashboard' });
    for (const kpi of [
      'Overall Campaign Score',
      'Message Acceptance',
      'Brand Perception',
      'Audience Engagement',
      'Synthetic Purchase Intent',
      'Evidence Coverage',
      'Review Readiness',
      'Confidence',
      'Risk Level',
      'Recommendation',
    ]) {
      expect(dashboard).toHaveTextContent(kpi);
    }
    expect(dashboard).toHaveTextContent('Synthetic/offline fixture-backed dashboard');
    expect(dashboard).toHaveTextContent('not live social data');
    expect(dashboard).toHaveTextContent('Formula: average sentiment/trust/reach scores plus completed workflow coverage');
    expect(dashboard).toHaveTextContent('Source: summary fixture scores + completed workflow coverage');
    expect(dashboard).toHaveTextContent('Evidence: E1 synthetic/offline fixture; not live social data or production prediction');
    expect(dashboard).toHaveTextContent('Low implementation risk; market risk unmeasured');
    expect(dashboard).not.toHaveTextContent('0% fixture risk score');
    expect(dashboard).toHaveTextContent('Source: fixture riskScore is not a production risk model');
    expect(dashboard).toHaveTextContent('4 / 4 workflows');
    expect(dashboard).toHaveTextContent('Formula: completedWorkflowCount / totalWorkflowCount');
    expect(dashboard).toHaveTextContent('productLaunchFixture.sourceChecks, campaignMessageFixture.sourceChecks, abExperimentFixture.sourceChecks, and creativeComparisonFixture.sourceChecks');
    expect(dashboard).toHaveTextContent('4 / 4 exports ready');
    expect(dashboard).toHaveTextContent('Source: productLaunchFixture.exports.readiness, campaignMessageFixture.exports.readiness, abExperimentFixture.exports.readiness, and creativeComparisonFixture.exports.readiness');
    const platformComparison = within(dashboard).getByRole('region', { name: 'Platform comparison' });
    expect(platformComparison).toHaveTextContent('Notice: LINE leads the fixture rank; treat it as a channel hypothesis.');
    expect(platformComparison).toHaveTextContent('Fixture-rank cue');
    expect(platformComparison).toHaveTextContent('Formula: platform bar value = clampScore(100 - fixture rank index × 12)');
    expect(platformComparison).toHaveTextContent('Source: productLaunchFixture.platformBreakdown fields platform, signal, and detail');
    const platformText = platformComparison.textContent ?? '';
    expect(platformText.indexOf('Notice: LINE leads the fixture rank; treat it as a channel hypothesis.')).toBeLessThan(platformText.indexOf('LINE'));
    expect(platformText.indexOf('LINE')).toBeLessThan(platformText.indexOf('Formula: platform bar value'));
    const audienceComparison = within(dashboard).getByRole('region', { name: 'Audience comparison' });
    expect(audienceComparison).toHaveTextContent('Notice: Working Adults are first-ranked; validate before segmentation.');
    expect(audienceComparison).toHaveTextContent('Fixture-rank cue');
    expect(audienceComparison).toHaveTextContent('Formula: audience bar value = clampScore(100 - fixture rank index × 12)');
    expect(audienceComparison).toHaveTextContent('Source: productLaunchFixture.sampleInput.audiences provides labels and productLaunchFixture.audienceInsights provides detail copy');
    const audienceText = audienceComparison.textContent ?? '';
    expect(audienceText.indexOf('Notice: Working Adults are first-ranked; validate before segmentation.')).toBeLessThan(audienceText.indexOf('Working Adults'));
    expect(audienceText.indexOf('Working Adults')).toBeLessThan(audienceText.indexOf('Formula: audience bar value'));
    expect(dashboard).toHaveTextContent('Evidence: E1 synthetic/offline fixture; Recommendation is unsupported for launch approval and is only a next evidence step');
    expect(dashboard).toHaveTextContent('Confidence: Low directional; downgraded because evidence is synthetic/offline and not comparable measured field data');
    expect(dashboard).toHaveTextContent('Limitation / next evidence step: run a small reviewed evidence test before any budget, launch, or winner decision');
    expect(dashboard).toHaveTextContent('Low confidence / E1 downgrade rationale: non-measured directional KPI from synthetic/offline fixture, not observed market behavior');
    const confidenceRisk = within(dashboard).getByRole('region', { name: 'Confidence / risk' });
    expect(confidenceRisk).toHaveTextContent('Notice: confidence remains low even though review readiness is complete.');
    expect(confidenceRisk).toHaveTextContent('Legend: Confidence = caution; Readiness = readiness; Risk = review-controlled risk');
    expect(confidenceRisk).toHaveTextContent('Caution signal');
    expect(confidenceRisk).toHaveTextContent('Readiness signal');
    expect(confidenceRisk).toHaveTextContent('Risk signal');
    expect(confidenceRisk).toHaveTextContent('Formula: Confidence maps Low directional confidence to 40/100; Readiness = exports ready / fixture count; Risk = average fixture riskScore × 100');
    const confidenceText = confidenceRisk.textContent ?? '';
    expect(confidenceText.indexOf('Notice: confidence remains low even though review readiness is complete.')).toBeLessThan(confidenceText.indexOf('Confidence40/100'));
    expect(confidenceText.indexOf('Confidence40/100')).toBeLessThan(confidenceText.indexOf('Formula: Confidence maps'));
    expect(confidenceRisk).toHaveTextContent('Source: Confidence from creativeComparisonFixture.comparisonMethod.confidenceLevel; Readiness from fixture exports.readiness; Risk from fixture summary.riskScore');
    expect(confidenceRisk).toHaveTextContent('Evidence: E1 synthetic/offline fixture; Low confidence downgrade because no comparable measured field evidence, live data, or production risk model is used');
    expect(confidenceRisk).toHaveTextContent('Confidence evidence tier: E1 synthetic/offline fixture; Low directional confidence');
    expect(confidenceRisk).toHaveTextContent('Readiness evidence tier: E1 synthetic/offline fixture; review readiness only');
    expect(confidenceRisk).toHaveTextContent('Risk evidence tier: E1 synthetic/offline fixture; market risk remains unmeasured');
    expect(within(dashboard).getByRole('region', { name: 'Journey progress' })).toHaveTextContent('5 of 6 review stages ready');
  });

  it('adds M17 PR3 sentiment, evidence tier, limitation, and human-review visuals without measured engagement claims', () => {
    renderAt('/campaign-workspace');

    const dashboard = screen.getByRole('region', { name: 'Executive KPI dashboard' });
    const sentiment = within(dashboard).getByRole('region', { name: 'Sentiment comparison' });
    expect(sentiment).toHaveTextContent('Notice: sentiment is directionally positive, but still synthetic.');
    expect(sentiment).toHaveTextContent('Formula: sentiment bar = clampScore(50 + summary.sentimentDelta × 100)');
    expect(sentiment).toHaveTextContent('Source: summary.sentimentDelta and fixture summary/card fields from Product Launch, Campaign Message Test, A/B Experiment, and Creative Comparison offline fixtures.');
    expect(sentiment).toHaveTextContent('Evidence tier: E1 synthetic/offline fixture; not live social data, not measured social platform engagement, not production prediction.');
    expect(sentiment).toHaveTextContent('Next evidence step: compare against approved field feedback or backtest before any launch, budget, or winner decision.');
    const sentimentText = sentiment.textContent ?? '';
    expect(sentimentText.indexOf('Notice: sentiment is directionally positive, but still synthetic.')).toBeLessThan(sentimentText.indexOf('Product Launch'));
    expect(sentimentText.indexOf('Product Launch')).toBeLessThan(sentimentText.indexOf('Formula: sentiment bar'));

    const tiers = within(dashboard).getByRole('region', { name: 'Evidence tier visualization' });
    expect(tiers).toHaveTextContent('Notice: current evidence is E1 only; E2 evidence is required before budget or launch decisions.');
    expect(tiers).toHaveTextContent('Current tier: E1 synthetic/offline fixture');
    expect(tiers).toHaveTextContent('Unsupported: live social measurement, CRM/customer data, private data, and production prediction are unavailable in this dashboard.');
    expect(tiers).toHaveTextContent('Formula: evidence tier is E1 when sourceChecks confirm offlineExecution=true, liveApiAccess=false, credentialsRequired=false, and productionReady=false across all fixtures.');

    const review = within(dashboard).getByRole('region', { name: 'Human review checklist' });
    expect(review).toHaveTextContent('Have claims been reviewed against approved proof points?');
    expect(review).toHaveTextContent('Are evidence gaps acceptable before the next small reviewed test?');
    expect(review).toHaveTextContent('Confidence: Low directional; limitation is synthetic fixture evidence only.');

    const limitations = within(dashboard).getByRole('region', { name: 'Visual evidence gaps and limitations' });
    expect(limitations).toHaveTextContent('No real social platform APIs, private social scraping, private groups, CRM records, voter lists, or direct messages were used.');
    expect(limitations).toHaveTextContent('Not measured social platform engagement; not production prediction; not a conversion guarantee.');
    expect(document.body.textContent?.toLowerCase()).not.toContain('measured engagement lift');
  });

  it('offers approved workflow actions including Creative Comparison without primary navigation changes', () => {
    renderAt('/campaign-workspace');

    const actions = screen.getByRole('region', { name: 'Available Workflow Actions' });
    expect(within(actions).getByRole('link', { name: 'Open Product Launch' })).toHaveAttribute('href', '/workbench');
    expect(within(actions).getByRole('link', { name: 'Open Campaign Message Test' })).toHaveAttribute('href', '/workbench/campaign-message-test');
    expect(within(actions).getByRole('link', { name: 'Open A/B Experiment' })).toHaveAttribute('href', '/workbench/ab-experiment');
    expect(within(actions).getByRole('link', { name: 'Open Creative Comparison' })).toHaveAttribute('href', '/workbench/creative-comparison');
    expect(document.body.textContent).toContain('Creative Comparison');
  });
});

describe('Product Launch workflow regression', () => {
  it('renders the guided Product Launch form with static Product Launch objective', () => {
    const form = renderWorkbench();

    expect(screen.getByRole('heading', { name: 'Product Launch Simulation' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current workflow' })).toHaveTextContent('Product Launch mode');
    expect(within(form).getByLabelText('Objective: Product Launch')).toHaveTextContent(
      'Review launch message, offer, audience, and channel assumptions.',
    );
    expect(screen.queryByLabelText('Objective')).not.toBeInTheDocument();
    expect(within(form).getByLabelText('Campaign name or brand')).toHaveValue('Nimbus Go');
  });

  it('shows the run action in the quick-start area before the full form', () => {
    renderWorkbench();

    const quickStart = screen.getByRole('complementary', { name: 'Quick start run action' });
    expect(within(quickStart).getByRole('button', { name: 'Run offline simulation' })).toBeInTheDocument();
    expect(within(quickStart).getByText(/Defaults are prefilled/i)).toBeInTheDocument();
  });

  it('validates campaign name, campaign message, and platform requirements', () => {
    const form = renderWorkbench();

    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), { target: { value: '' } });
    fireEvent.change(within(form).getByLabelText('Campaign Message'), { target: { value: '' } });
    for (const platform of ['Facebook', 'TikTok', 'LINE']) {
      fireEvent.click(within(form).getByLabelText(platform));
    }
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Campaign name or brand is required because the review needs a campaign label. Add a brand or campaign name to continue.');
    expect(screen.getByRole('alert')).toHaveTextContent('Campaign Message is required because the fixture must be reviewed against a visible message. Add the message copy to continue.');
    expect(screen.getByRole('alert')).toHaveTextContent('Select at least one platform because channel context changes review interpretation. Choose one or more platform checkboxes.');
    expect(screen.queryByRole('heading', { name: 'Offline product-launch simulation ready for executive review' })).not.toBeInTheDocument();
  });

  it('updates platform mix selection and shows it in the assumptions preview', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByLabelText('YouTube'));

    expect(screen.getByRole('region', { name: 'Current assumptions' })).toHaveTextContent('Facebook, TikTok, LINE, YouTube');
  });

  it('renders marketing-friendly results after run', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('heading', { name: 'Offline product-launch simulation ready for executive review' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Recommended next action' })).toHaveTextContent(
      'Use this as a human review prompt',
    );
    for (const heading of [
      'Overall Reaction',
      'Message Acceptance',
      'Brand Perception',
      'Engagement Potential',
      'Synthetic Purchase Intent',
      'Platform Breakdown',
      'Audience Insights',
      'Risks / Caveats',
    ]) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Executive Summary').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Open export-readiness preview')).toBeInTheDocument();
    expect(screen.getAllByText(/Fixture channel cue only/).length).toBeGreaterThanOrEqual(1);
    expect(document.body.textContent?.toLowerCase()).not.toContain('aggregate sample ' + 'interactions');
    expect(screen.getByText(/not recalculated from arbitrary browser-entered data/i)).toBeInTheDocument();
  });

  it('propagates edited assumptions into dashboard and export preview via the same offline state payload', () => {
    const form = renderWorkbench();

    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), {
      target: { value: 'Acme Halo' },
    });
    fireEvent.change(within(form).getByLabelText('Campaign Message'), {
      target: { value: 'Launching a campaign focused on warm, practical outcomes.' },
    });
    fireEvent.click(within(form).getByLabelText('YouTube'));
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    const dashboardLink = screen.getByRole('link', { name: 'Open result dashboard' });
    const dashboardHref = dashboardLink.getAttribute('href');
    expect(dashboardHref).toContain('assumptions=');
    const exportLink = screen.getByRole('link', { name: 'Open export-readiness preview' });
    const exportHref = exportLink.getAttribute('href');
    expect(exportHref).toContain('assumptions=');

    renderAt(exportHref!);
    const executiveReport = screen.getByRole('region', { name: 'Executive report preview' });
    expect(executiveReport).toHaveTextContent('Campaign name or brand');
    expect(executiveReport).toHaveTextContent('Acme Halo');
    expect(executiveReport).toHaveTextContent('Campaign Message');
    expect(executiveReport).toHaveTextContent('Launching a campaign focused on warm, practical outcomes.');

    renderAt(dashboardHref!);
    const assumptionsSection = screen.getByText('Your assumptions shown for review').closest('section')!;
    expect(assumptionsSection).toHaveTextContent('Acme Halo');
    expect(assumptionsSection).toHaveTextContent('Launching a campaign focused on warm, practical outcomes.');
    expect(assumptionsSection).toHaveTextContent('YouTube');

    expect(document.body.textContent).toContain('Safety: offline fixture for planning only; review before using externally.');
    expect(screen.getByText(/The generated sample result is not recalculated/i)).toBeInTheDocument();
  });

  it('makes completion state visible immediately after running', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('status', { name: 'Run completion status' })).toHaveTextContent(
      'Run complete: generated sample results are visible below now.',
    );
    expect(screen.getByRole('link', { name: 'Jump to generated sample results' })).toHaveAttribute('href', '#results-title');
  });
});

describe('M12 Campaign Workspace trust and validation', () => {
  it.each([
    ['/runs/not-a-known-run', 'Run unavailable'],
    ['/exports/not-a-known-export', 'Export unavailable'],
  ])('does not fall back to the Product Launch fixture for unknown %s', (pathname, heading) => {
    renderAt(pathname);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    expect(screen.getByText(/We could not match this id to a reviewed reference fixture/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to Campaign Workspace' })).toHaveAttribute('href', '/campaign-workspace');
    expect(screen.getByRole('link', { name: 'Open Product Launch workbench' })).toHaveAttribute('href', '/workbench');
    expect(screen.queryByRole('heading', { name: 'Product Launch Results' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Offline product-launch simulation ready for executive review' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Product Launch executive-ready summary' })).not.toBeInTheDocument();
  });

  it.each([
    ['/runs/sample-run', 'Reference Fixture', 'User Review Session'],
    ['/exports/sample-run', 'Reference Fixture', 'User Review Session'],
  ])('clearly labels fixture provenance and user review assumptions for %s', (pathname, fixtureLabel, sessionLabel) => {
    renderAt(pathname);

    const transparency = screen.getByRole('region', { name: 'Fixture transparency' });
    expect(transparency).toHaveTextContent(fixtureLabel);
    expect(transparency).toHaveTextContent(sessionLabel);
    expect(transparency).toHaveTextContent('Synthetic generated sample');
    expect(transparency).toHaveTextContent('User-provided inputs are shown as review assumptions only');
    expect(transparency).toHaveTextContent('No live execution');
  });

  it('shows product-facing Health status without internal milestone wording', () => {
    renderAt('/health');

    expect(screen.getByRole('heading', { name: 'Product health' })).toBeInTheDocument();
    const healthStatus = screen.getByRole('region', { name: 'Product health status' });
    expect(screen.getAllByText(/Executive insight dashboard is available for reviewed offline results/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Report\/export upgrade remains out of scope/i).length).toBeGreaterThan(0);
    for (const kpi of [
      'Translation Completeness',
      'Glossary Consistency',
      'Thai UX Quality',
      'English UX Quality',
      'Executive Readability',
      'Executive Insight Dashboard',
      'Report/export scope',
      'Safety Copy Quality',
      'Terminology Consistency',
      'Engineering KPI',
    ]) {
      expect(healthStatus).toHaveTextContent(kpi);
    }
    const visibleText = document.body.textContent ?? '';
    expect(visibleText).not.toContain('M7 A/B Experiment workflow readiness');
    expect(visibleText).not.toContain('runtime result model remains not begun');
    for (const internalTerm of ['M18', 'M19', 'PR3', 'PR4', 'PR5']) {
      expect(visibleText).not.toContain(internalTerm);
    }
    expect(visibleText).toContain('executive insight dashboard are available for reviewed offline results');
    expect(visibleText).toContain('Report/export upgrade remains out of scope');
  });
});

describe('M19 PR5 Executive Decision Brief export review', () => {
  it('renders a cautious executive decision brief in the existing export review surface', () => {
    renderAt('/exports/sample-run');

    const brief = screen.getByRole('region', { name: 'Executive Decision Brief' });
    for (const heading of [
      'Campaign context',
      'Current situation',
      'Platform findings',
      'Evidence',
      'Confidence',
      'Risks',
      'Decision limitations',
      'Decision options',
      'Recommended next action',
      'Synthetic/offline notices',
    ]) {
      expect(brief).toHaveTextContent(heading);
    }
    for (const required of [
      'Campaign name or brand',
      'Selected platforms',
      'Simulation Profile',
      'Participant allocations',
      'Synthetic engagement summary',
      'Strongest directional fit',
      'Weakest directional fit',
      'Top themes',
      'Top concerns',
      'Executive KPI snapshot',
      'Decision blockers',
      'Next review step',
    ]) {
      expect(brief).toHaveTextContent(required);
    }
    for (const option of ['Proceed with review', 'Revise message/creative', 'Run another experiment', 'Hold for more evidence']) {
      const optionCard = within(brief).getByRole('article', { name: option });
      expect(optionCard).toHaveTextContent('Evidence basis');
      expect(optionCard).toHaveTextContent('Confidence');
      expect(optionCard).toHaveTextContent('Limitations');
      expect(optionCard).toHaveTextContent('Blocked actions');
      expect(optionCard).toHaveTextContent('launch approval');
      expect(optionCard).toHaveTextContent('conversion guarantee claims');
    }
    expect(brief).toHaveTextContent('Synthetic/offline');
    expect(brief).toHaveTextContent(/configuration-only/i);
    expect(brief.textContent?.toLowerCase()).not.toContain('measured engagement');
    expect(screen.queryByRole('button', { name: /download|pdf|ppt|powerpoint/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /download|pdf|ppt|powerpoint/i })).not.toBeInTheDocument();
  });

  it('localizes the executive decision brief between Thai and English without mixed-language Thai fragments', () => {
    renderAt('/exports/sample-run', 'th');
    const thaiBrief = screen.getByRole('region', { name: 'บรีฟการตัดสินใจสำหรับผู้บริหาร' });
    expect(thaiBrief).toHaveTextContent('บริบทแคมเปญ');
    expect(thaiBrief).toHaveTextContent('ทางเลือกการตัดสินใจ');
    expect(thaiBrief).toHaveTextContent('เดินหน้าตรวจทาน');
    expect(thaiBrief).toHaveTextContent('หลักฐาน');
    expect(thaiBrief).toHaveTextContent('ความเชื่อมั่น');
    expect(thaiBrief).not.toHaveTextContent('Evidence basis');
    expect(thaiBrief).not.toHaveTextContent('Proceed with review');
    expect(thaiBrief).not.toHaveTextContent('Run another experiment');

    const thaiExportPage = document.body.textContent ?? '';
    for (const mixedLanguageFragment of [
      'Platform differences are configuration-owned planning cues, not field observations.',
      '3 platforms / 240 synthetic participants — Evidence depth: standard; configuration source: preset.',
      'LINE leads synthetic reaction index — Average synthetic reaction index 68/100 across selected platforms only.',
      'สูตร: supported previews filter fixture.exports.formats to JSON and Markdown only.',
      'snapshot การตั้งค่าที่ส่งแล้ว',
    ]) {
      expect(thaiExportPage).not.toContain(mixedLanguageFragment);
    }

    renderAt('/exports/sample-run', 'en');
    const englishBrief = screen.getByRole('region', { name: 'Executive Decision Brief' });
    expect(englishBrief).toHaveTextContent('Campaign context');
    expect(englishBrief).toHaveTextContent('Proceed with review');
    expect(englishBrief).toHaveTextContent('Evidence basis');
  });
});


describe('Campaign Message Test workflow', () => {
  it('is available from the existing workbench area and follows the required step sequence', () => {
    const form = renderCampaignMessageTest();

    expect(screen.getByRole('heading', { name: 'Campaign Message Test' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current workflow' })).toHaveTextContent('Campaign Message Test mode');
    expect(within(form).getByLabelText('Objective: Campaign Message Test')).toHaveTextContent(
      'Review campaign message clarity, tone, claim, audience, and platform assumptions.',
    );
    for (const step of ['Campaign Details', 'Audience', 'Platform Mix', 'Review', 'Run', 'Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action']) {
      expect(screen.getByRole('region', { name: 'Reference workflow steps' })).toHaveTextContent(step);
    }
    expect(within(form).getByLabelText('Tone')).toHaveValue('helpful, practical, trust-first');
    expect(within(form).getByLabelText('Claim to review')).toHaveValue(
      'Under 10 minutes is a message assumption for review, not a verified production claim.',
    );
  });

  it('validates minimal required fields and reuses platform validation', () => {
    const form = renderCampaignMessageTest();

    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), { target: { value: '' } });
    fireEvent.change(within(form).getByLabelText('Campaign Message'), { target: { value: '' } });
    for (const platform of ['Facebook', 'TikTok', 'LINE']) {
      fireEvent.click(within(form).getByLabelText(platform));
    }
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Campaign name or brand is required because the review needs a campaign label. Add a brand or campaign name to continue.');
    expect(screen.getByRole('alert')).toHaveTextContent('Campaign Message is required because the fixture must be reviewed against a visible message. Add the message copy to continue.');
    expect(screen.getByRole('alert')).toHaveTextContent('Select at least one platform because channel context changes review interpretation. Choose one or more platform checkboxes.');
  });

  it('renders dashboard, safety labels, executive summary, export links, and recommended next action', () => {
    const form = renderCampaignMessageTest();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('heading', { name: 'Offline campaign-message test ready for executive review' })).toBeInTheDocument();
    for (const heading of ['Overall Reaction', 'Message Clarity', 'Tone Fit', 'Claim Readiness', 'Platform Fit']) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getByRole('region', { name: 'Recommended next action' })).toHaveTextContent(
      'message-readiness test',
    );
    expect(screen.getByText('Open result dashboard')).toBeInTheDocument();
    expect(screen.getByText('Open export-readiness preview')).toBeInTheDocument();
    expect(document.body.textContent).toContain('Safety: offline fixture for planning only');
    expect(document.body.textContent?.toLowerCase()).not.toContain('socialsense');
    expect(document.body.textContent?.toLowerCase()).not.toContain('campaign_response');
  });

  it('routes Campaign Message Test dashboard and export review from the generated sample run id', () => {
    renderAt('/runs/3c-m5-campaign-message-test-reference-workflow');
    expect(screen.getByRole('heading', { name: 'Campaign Message Test Results' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Offline campaign-message test ready for executive review' })).toBeInTheDocument();
  });
});

describe('A/B Experiment workflow', () => {
  it('is available as the third workbench reference workflow with minimal variant inputs', () => {
    const form = renderAbExperiment();

    expect(screen.getByRole('heading', { name: 'A/B Experiment' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current workflow' })).toHaveTextContent('A/B Experiment mode');
    expect(within(form).getByLabelText('Objective: A/B Experiment')).toHaveTextContent(
      'Review two campaign message variants with shared audience, platform, and safety assumptions.',
    );
    expect(within(form).getByLabelText('Variant A')).toHaveValue('Healthy lunch decisions in under 10 minutes for busy urban teams.');
    expect(within(form).getByLabelText('Variant B')).toHaveValue('Team lunch made simple with reviewed nutrition cues and dependable delivery windows.');
    expect(within(form).getByLabelText('Tone')).toHaveValue('helpful, practical, trust-first');
    for (const step of ['Variant A', 'Variant B', 'Review', 'Run', 'Comparison Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action']) {
      expect(screen.getByRole('region', { name: 'Reference workflow steps' })).toHaveTextContent(step);
    }
    expect(screen.getByRole('region', { name: 'Current assumptions' })).toHaveTextContent('Variant A');
    expect(screen.getByRole('region', { name: 'Current assumptions' })).toHaveTextContent('Variant B');
  });

  it('requires both A/B variants before running', () => {
    const form = renderAbExperiment();

    fireEvent.change(within(form).getByLabelText('Variant A'), { target: { value: '' } });
    fireEvent.change(within(form).getByLabelText('Variant B'), { target: { value: '' } });
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Both A/B variants are required because the comparison needs two visible alternatives. Add Variant A and Variant B copy to continue.');
    expect(screen.queryByRole('heading', { name: 'Offline A/B experiment ready for executive review' })).not.toBeInTheDocument();
  });

  it('renders comparison dashboard, reusable export links, and safety labels after run', () => {
    const form = renderAbExperiment();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('heading', { name: 'Offline A/B experiment ready for executive review' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Variant decision frame');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Inconclusive / needs evidence');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Low directional confidence');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Parity check');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Shared Criteria');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('message clarity');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Blocked Actions');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('winner selection');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('production launch');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('conversion optimization');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('automated targeting');
    for (const heading of ['Overall Reaction', 'Message Clarity', 'Tone Fit', 'Claim Readiness', 'Platform Fit', 'Decision Status']) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Variant A').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Variant B').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('region', { name: 'Recommended next action' })).toHaveTextContent('A/B message-readiness test');
    expect(screen.getByText('Open result dashboard')).toBeInTheDocument();
    expect(screen.getByText('Open export-readiness preview')).toBeInTheDocument();
    expect(document.body.textContent).toContain('Safety: offline fixture for planning only');
  });

  it('routes A/B Experiment dashboard from the generated sample run id', () => {
    renderAt('/runs/3c-m7-ab-experiment-reference-workflow');
    expect(screen.getByRole('heading', { name: 'A/B Experiment Results' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Offline A/B experiment ready for executive review' })).toBeInTheDocument();
  });
});

describe('M19 PR2 Simulation Configuration Workspace', () => {
  it.each([
    ['/workbench', 'Product Launch setup', 'Product Launch'],
    ['/workbench/campaign-message-test', 'Campaign Message Test setup', 'Campaign Response'],
    ['/workbench/ab-experiment', 'A/B Experiment setup', 'Campaign Response'],
    ['/workbench/creative-comparison', 'Creative Comparison setup', 'Campaign Response'],
  ])('renders workflow-correct simulation configuration summary for %s', (pathname, formName, profileLabel) => {
    renderAt(pathname);
    const form = screen.getByRole('form', { name: formName });

    expect(within(form).getByRole('group', { name: 'Simulation Profile' })).toHaveTextContent(profileLabel);
    expect(within(form).getByRole('region', { name: 'Current Simulation Profile' })).toHaveTextContent('Configured for simulation');
    expect(within(form).getByRole('region', { name: 'Current Simulation Profile' })).toHaveTextContent('Total synthetic participants');
    expect(within(form).getByText('Synthetic participants only; not live platform users.')).toBeInTheDocument();
  });

  it('lets custom allocations change totals while excluding unselected platforms', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByText('Advanced Simulation Settings'));
    fireEvent.change(within(form).getByLabelText('Synthetic participants for Facebook'), { target: { value: '200' } });
    fireEvent.click(within(form).getByLabelText('Facebook'));

    const summary = within(form).getByRole('region', { name: 'Current Simulation Profile' });
    expect(summary).toHaveTextContent('Current Simulation Profile');
    expect(summary).toHaveTextContent('configuration sourcecustom');
    expect(summary).toHaveTextContent('TikTok 80');
    expect(summary).toHaveTextContent('LINE 80');
    expect(summary).not.toHaveTextContent('Facebook 200');
    expect(summary).toHaveTextContent('Total synthetic participants');
    expect(summary).toHaveTextContent('160');
  });

  it.each([
    ['-1', 'Allocation must be at least 10 synthetic participants.'],
    ['abc', 'Use whole numbers only for synthetic participant allocation.'],
    ['10.5', 'Use whole numbers only for synthetic participant allocation.'],
    ['9', 'Allocation must be at least 10 synthetic participants.'],
    ['501', 'Allocation must be no more than 500 synthetic participants.'],
  ])('shows inline validation for invalid allocation %s', (value, expectedError) => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByText('Advanced Simulation Settings'));
    fireEvent.change(within(form).getByLabelText('Synthetic participants for Facebook'), { target: { value } });
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    const runAlert = within(form).getAllByRole('alert').at(-1)!;
    expect(runAlert).toHaveTextContent(expectedError);
    expect(runAlert).toHaveTextContent('Correct the selected-platform participant counts before running.');
    expect(screen.queryByRole('heading', { name: 'Offline product-launch simulation ready for executive review' })).not.toBeInTheDocument();
  });

  it('keeps simulation configuration localized and stable across language switches', () => {
    const form = renderAt('/workbench', 'th').container.querySelector('form')!;

    expect(screen.getByRole('group', { name: 'โปรไฟล์การจำลอง' })).toHaveTextContent('เปิดตัวผลิตภัณฑ์');
    expect(screen.getByRole('region', { name: 'โปรไฟล์การจำลองปัจจุบัน' })).toHaveTextContent('ตั้งค่าเพื่อการจำลอง');
    fireEvent.change(screen.getByLabelText('ภาษา'), { target: { value: 'en' } });

    expect(form).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Simulation Profile' })).toHaveTextContent('Product Launch');
    expect(screen.getByRole('region', { name: 'Current Simulation Profile' })).toHaveTextContent('Configured for simulation');
    expect(screen.getByRole('region', { name: 'Current Simulation Profile' })).toHaveTextContent('configuration only');
  });

  it('fully localizes Thai workbench step labels and simulation safety copy', () => {
    renderAt('/workbench', 'th');

    const visibleText = document.body.textContent ?? '';
    expect(visibleText).toContain('1. รายละเอียดแคมเปญ');
    expect(visibleText).toContain('3. กลุ่มเป้าหมาย');
    expect(visibleText).toContain('4. สัดส่วนแพลตฟอร์ม');
    expect(visibleText).toContain('ผลลัพธ์ปัจจุบันยังเป็นข้อมูลตัวอย่างออฟไลน์และยังไม่ได้ถูกใช้โดยระบบจำลอง');
    expect(visibleText).toContain('ไม่ใช่การวัดการมีส่วนร่วมจริง และไม่มีการเรียกบริการสด');
    for (const blocker of [
      '1. Campaign Details',
      '3. Audience',
      '4. Platform Mix',
      'runtime',
      'engagement จริง',
      'live API',
      'API สด',
      'not measured audience engagement',
    ]) {
      expect(visibleText).not.toContain(blocker);
    }
  });

  it('localizes Thai inline allocation validation and simulation aria labels', () => {
    const form = renderAt('/workbench', 'th').container.querySelector('form')!;

    fireEvent.click(within(form).getByText('การตั้งค่าการจำลองขั้นสูง'));
    expect(within(form).getByLabelText('ใช้ Facebook ในโปรไฟล์การจำลอง')).toBeChecked();
    fireEvent.change(within(form).getByLabelText('ผู้เข้าร่วมสังเคราะห์สำหรับ Facebook'), { target: { value: 'abc' } });
    fireEvent.click(within(form).getByRole('button', { name: 'รันการจำลองออฟไลน์' }));

    const visibleText = document.body.textContent ?? '';
    expect(screen.getByRole('radio', { name: 'เปิดตัวผลิตภัณฑ์' })).toBeChecked();
    expect(visibleText).toContain('Facebook ต้องเป็นจำนวนเต็มระหว่าง 10 ถึง 500');
    expect(visibleText).toContain('ใช้จำนวนเต็มเท่านั้นสำหรับการจัดสรรผู้เข้าร่วมสังเคราะห์');
    expect(visibleText).toContain('แก้จำนวนผู้เข้าร่วมของแพลตฟอร์มที่เลือกก่อนรัน');
    expect(visibleText).not.toContain('Facebook must be a whole number between 10 and 500.');
    expect(visibleText).not.toContain('Use whole numbers only for synthetic participant allocation.');
  });

  it('does not claim runtime consumption, live API access, or real platform users after run', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(document.body).toHaveTextContent('Configured for simulation');
    expect(document.body).toHaveTextContent('offline simulation configuration');
    expect(document.body).toHaveTextContent('not live platform users');
    expect(document.body.textContent).not.toContain('Consumed by SocialSense runtime');
    expect(document.body.textContent).not.toContain('real platform users');
    expect(document.body.textContent).not.toContain('live social platform API');
  });

  it('surfaces PR3 platform engagement model on all four current workflow result paths', () => {
    for (const [pathname, formName] of [
      ['/workbench', 'Product Launch setup'],
      ['/workbench/campaign-message-test', 'Campaign Message Test setup'],
      ['/workbench/ab-experiment', 'A/B Experiment setup'],
      ['/workbench/creative-comparison', 'Creative Comparison setup'],
    ] as const) {
      const rendered = renderAt(pathname);
      const form = screen.getByRole('form', { name: formName });
      fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

      const engagement = screen.getByRole('region', { name: 'Platform Engagement Result Model' });
      expect(engagement).toHaveTextContent('Synthetic platform engagement results');
      expect(engagement).toHaveTextContent('Facebook');
      expect(engagement).toHaveTextContent('Synthetic comments');
      expect(engagement).toHaveTextContent('Themes');
      expect(engagement).toHaveTextContent('Cross-platform summary');
      expect(engagement).toHaveTextContent('configuration-owned offline fixture');
      expect(engagement).toHaveTextContent('not live');
      expect(engagement).toHaveTextContent('not measured');
      expect(document.body.textContent?.toLowerCase()).not.toContain('measured engagement lift');
      rendered.unmount();
    }
  });

  it('uses selected PR2 platforms for PR3 results and excludes unselected platforms', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByLabelText('TikTok'));
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    const engagement = screen.getByRole('region', { name: 'Platform Engagement Result Model' });
    expect(engagement).toHaveTextContent('Facebook');
    expect(engagement).toHaveTextContent('LINE');
    expect(engagement).not.toHaveTextContent('TikTok');
    expect(engagement).toHaveTextContent('160');
  });

  it('keeps PR3 displayed result and dashboard/export payload on submitted simulation config after unsubmitted edits', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));
    fireEvent.click(within(form).getByLabelText('YouTube'));
    fireEvent.click(within(form).getByText('Advanced Simulation Settings'));
    fireEvent.change(within(form).getByLabelText('Synthetic participants for Facebook'), { target: { value: '200' } });

    const engagement = screen.getByRole('region', { name: 'Platform Engagement Result Model' });
    expect(engagement).toHaveTextContent('Total synthetic participants240');
    expect(engagement).toHaveTextContent('Facebook');
    expect(engagement).toHaveTextContent('TikTok');
    expect(engagement).toHaveTextContent('LINE');
    expect(engagement).not.toHaveTextContent('YouTube');
    expect(engagement).not.toHaveTextContent('Synthetic participants: 200');

    for (const linkName of ['Open result dashboard', 'Open export-readiness preview']) {
      const href = screen.getByRole('link', { name: linkName }).getAttribute('href')!;
      const payload = JSON.parse(decodeURIComponent(new URL(href, 'http://localhost').searchParams.get('assumptions')!));
      expect(payload.simulationConfig.selectedPlatforms).toEqual(['facebook', 'tiktok', 'line']);
      expect(payload.simulationConfig.platformAllocations.facebook).toBe(80);
      expect(payload.simulationConfig.selectedPlatforms).not.toContain('youtube');
    }
  });

  it('bounds transported allocation payload values before PR3 dashboard results', () => {
    const payload = encodeURIComponent(JSON.stringify({
      v: 1,
      runId: 'sample-run',
      form: { platforms: ['Facebook', 'TikTok', 'LINE', 'YouTube'] },
      editedFields: ['platforms'],
      simulationConfig: {
        simulationProfile: 'product_launch',
        selectedPlatforms: ['facebook', 'tiktok', 'line', 'youtube'],
        platformAllocations: {
          facebook: -25,
          tiktok: 0,
          line: 999,
          youtube: 500,
          x: 80,
        },
        platformAllocationDrafts: {
          facebook: '-25',
          tiktok: '0',
          line: '999',
          youtube: '500',
          x: '80',
        },
        evidenceDepth: 'standard',
        configurationSource: 'custom',
        runtimeStatus: 'configuration_only',
      },
    }));

    renderAt(`/runs/sample-run?assumptions=${payload}`);

    const engagement = screen.getByRole('region', { name: 'Platform Engagement Result Model' });
    expect(engagement).toHaveTextContent('Total synthetic participants1020');
    expect(engagement).toHaveTextContent('Facebook');
    expect(engagement).toHaveTextContent('Synthetic participants: 10');
    expect(engagement).toHaveTextContent('TikTok');
    expect(engagement).toHaveTextContent('LINE');
    expect(engagement).toHaveTextContent('Synthetic participants: 500');
    expect(engagement).toHaveTextContent('YouTube');
    expect(engagement).toHaveTextContent('Synthetic participants: 500');
    expect(engagement).not.toHaveTextContent('X');
  });

  it('carries PR3 platform engagement model into dashboard and export review safely', () => {
    const form = renderWorkbench();
    fireEvent.click(within(form).getByLabelText('YouTube'));
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    const dashboardHref = screen.getByRole('link', { name: 'Open result dashboard' }).getAttribute('href')!;
    const exportHref = screen.getByRole('link', { name: 'Open export-readiness preview' }).getAttribute('href')!;

    renderAt(dashboardHref);
    expect(screen.getByRole('region', { name: 'Platform Engagement Result Model' })).toHaveTextContent('YouTube');
    expect(screen.getByRole('region', { name: 'Platform Engagement Result Model' })).toHaveTextContent('320');

    renderAt(exportHref);
    const report = screen.getByRole('region', { name: 'Executive report preview' });
    expect(report).toHaveTextContent('Platform engagement result model');
    expect(report).toHaveTextContent('configuration-owned offline fixture');
    expect(report).toHaveTextContent('synthetic/offline');
    expect(report.textContent?.toLowerCase()).not.toContain('live platform users');
    expect(report.textContent?.toLowerCase()).not.toContain('measured engagement lift');
  });

  it('localizes PR3 platform engagement model in Thai by default and after English switching', () => {
    renderAt('/workbench', 'th');
    const thaiForm = screen.getByRole('form', { name: 'ตั้งค่า Product Launch' });
    fireEvent.click(within(thaiForm).getByRole('button', { name: 'รันการจำลองออฟไลน์' }));

    const thaiEngagement = screen.getByRole('region', { name: 'โมเดลผลการมีส่วนร่วมแพลตฟอร์ม' });
    expect(thaiEngagement).toHaveTextContent('ผลการมีส่วนร่วมแพลตฟอร์มเชิงสังเคราะห์');
    expect(thaiEngagement).toHaveTextContent('คอมเมนต์สังเคราะห์');
    expect(thaiEngagement).toHaveTextContent('สรุปข้ามแพลตฟอร์ม');
    expect(thaiEngagement).not.toHaveTextContent('Synthetic platform engagement results');

    fireEvent.change(screen.getByLabelText('ภาษา'), { target: { value: 'en' } });

    const englishEngagement = screen.getByRole('region', { name: 'Platform Engagement Result Model' });
    expect(englishEngagement).toHaveTextContent('Synthetic platform engagement results');
    expect(englishEngagement).toHaveTextContent('Synthetic comments');
    expect(englishEngagement).toHaveTextContent('Cross-platform summary');
  });
});

describe('M19 PR4 Executive Insight Dashboard', () => {
  it.each([
    ['/workbench', 'Product Launch setup'],
    ['/workbench/campaign-message-test', 'Campaign Message Test setup'],
    ['/workbench/ab-experiment', 'A/B Experiment setup'],
    ['/workbench/creative-comparison', 'Creative Comparison setup'],
  ])('keeps all four workflows rendering and running safe current result paths with executive insights for %s', (pathname, formName) => {
    renderAt(pathname, 'en');
    const form = screen.getByRole('form', { name: formName });
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    const insights = screen.getByRole('region', { name: 'Executive Insight Dashboard' });
    expect(insights).toHaveTextContent('Executive Insight Cards');
    expect(insights).toHaveTextContent('Platform Comparison');
    expect(insights).toHaveTextContent('Evidence Visualization');
    expect(insights).toHaveTextContent('Decision Guidance');
    expect(insights).toHaveTextContent('synthetic/offline');
    expect(insights).toHaveTextContent('configuration-only');
    expect(document.body.textContent?.toLowerCase()).not.toContain('measured engagement lift');
    expect(document.body.textContent?.toLowerCase()).not.toContain('approve launch');
  });

  it('derives insight cards and platform comparison from submitted assumptions and configuration after Run', () => {
    const form = renderWorkbench();
    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), { target: { value: 'Acme Halo' } });
    fireEvent.change(within(form).getByLabelText('Campaign Message'), { target: { value: 'Reviewed message for executive insight.' } });
    fireEvent.click(within(form).getByText('Advanced Simulation Settings'));
    fireEvent.change(within(form).getByLabelText('Synthetic participants for Facebook'), { target: { value: '120' } });
    fireEvent.click(within(form).getByLabelText('TikTok'));
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    fireEvent.click(within(form).getByLabelText('YouTube'));
    fireEvent.change(within(form).getByLabelText('Synthetic participants for Facebook'), { target: { value: '200' } });

    const insights = screen.getByRole('region', { name: 'Executive Insight Dashboard' });
    expect(insights).toHaveTextContent('Acme Halo');
    expect(insights).toHaveTextContent('Reviewed message for executive insight.');
    expect(insights).toHaveTextContent('2 platforms / 200 synthetic participants');
    expect(insights).toHaveTextContent('Facebook');
    expect(insights).toHaveTextContent('LINE');
    expect(insights).not.toHaveTextContent('TikTok');
    expect(insights).not.toHaveTextContent('YouTube');
    expect(insights).not.toHaveTextContent('Synthetic participants: 200');
  });

  it('shows evidence/provenance/limitations/configuration status without live runtime claims', () => {
    renderAt('/runs/sample-run', 'en');

    const insights = screen.getByRole('region', { name: 'Executive Insight Dashboard' });
    expect(insights).toHaveTextContent('Provenance');
    expect(insights).toHaveTextContent('synthetic/offline provenance');
    expect(insights).toHaveTextContent('Configuration status');
    expect(insights).toHaveTextContent('configuration-only');
    expect(insights).toHaveTextContent('Limitations');
    expect(insights).toHaveTextContent('Evidence gaps');
    expect(insights.textContent?.toLowerCase()).not.toContain('live api access');
    expect(insights.textContent?.toLowerCase()).not.toContain('runtime consumption');
    expect(insights.textContent?.toLowerCase()).not.toContain('consumed by runtime');
  });

  it('keeps decision guidance reviewed and blocks prediction, confidence guarantee, or launch approval wording', () => {
    renderAt('/runs/sample-run', 'en');

    const guidance = within(screen.getByRole('region', { name: 'Executive Insight Dashboard' })).getByRole('region', {
      name: 'Decision Guidance',
    });
    expect(guidance).toHaveTextContent('Reviewed next step');
    expect(guidance).toHaveTextContent('human review required');
    expect(guidance).toHaveTextContent('not a launch decision');
    for (const forbidden of ['predict', 'guarantee', 'accuracy', 'approve launch', 'launch approval', 'persuasion optimization']) {
      expect(guidance.textContent?.toLowerCase()).not.toContain(forbidden);
    }
  });

  it('localizes executive insight dashboard in Thai by default and switches to English without mixed-language Thai screen', () => {
    renderAt('/workbench', 'th');
    const thaiForm = screen.getByRole('form', { name: 'ตั้งค่า Product Launch' });
    fireEvent.click(within(thaiForm).getByRole('button', { name: 'รันการจำลองออฟไลน์' }));

    const thaiInsights = screen.getByRole('region', { name: 'แดชบอร์ดอินไซต์ผู้บริหาร' });
    expect(thaiInsights).toHaveTextContent('การ์ดอินไซต์ผู้บริหาร');
    expect(thaiInsights).toHaveTextContent('เปรียบเทียบแพลตฟอร์ม');
    expect(thaiInsights).toHaveTextContent('ภาพหลักฐาน');
    expect(thaiInsights).toHaveTextContent('คำแนะนำเพื่อการตัดสินใจ');
    expect(thaiInsights).not.toHaveTextContent('Executive Insight Cards');
    expect(thaiInsights).not.toHaveTextContent('Evidence Visualization');
    expect(thaiInsights).not.toHaveTextContent('Decision Guidance');

    fireEvent.change(screen.getByLabelText('ภาษา'), { target: { value: 'en' } });

    const englishInsights = screen.getByRole('region', { name: 'Executive Insight Dashboard' });
    expect(englishInsights).toHaveTextContent('Executive Insight Cards');
    expect(englishInsights).toHaveTextContent('Evidence Visualization');
    expect(englishInsights).toHaveTextContent('Decision Guidance');
  });

  it('localizes arbitrary PR4 configuration status platform combinations in Thai and English', () => {
    const payload = encodeURIComponent(JSON.stringify({
      v: 1,
      runId: 'sample-run',
      form: { platforms: ['YouTube', 'X'] },
      editedFields: ['platforms'],
      simulationConfig: {
        simulationProfile: 'product_launch',
        selectedPlatforms: ['youtube', 'x'],
        platformAllocations: {
          facebook: 80,
          tiktok: 80,
          line: 80,
          youtube: 90,
          x: 50,
        },
        platformAllocationDrafts: {
          facebook: '80',
          tiktok: '80',
          line: '80',
          youtube: '90',
          x: '50',
        },
        evidenceDepth: 'standard',
        configurationSource: 'custom',
        runtimeStatus: 'configuration_only',
      },
    }));

    renderAt(`/runs/sample-run?assumptions=${payload}`, 'th');

    const thaiInsights = screen.getByRole('region', { name: 'แดชบอร์ดอินไซต์ผู้บริหาร' });
    expect(thaiInsights).toHaveTextContent('แพลตฟอร์มที่เลือก: YouTube, X; สถานะยังเป็นการตั้งค่าเท่านั้น.');
    expect(thaiInsights).not.toHaveTextContent('Selected platforms:');
    expect(thaiInsights).not.toHaveTextContent('runtimeStatus remains configuration-only');

    fireEvent.change(screen.getByLabelText('ภาษา'), { target: { value: 'en' } });

    const englishInsights = screen.getByRole('region', { name: 'Executive Insight Dashboard' });
    expect(englishInsights).toHaveTextContent('Selected platforms: YouTube, X; runtimeStatus remains configuration-only.');
  });

  it('does not leak report redesign or export upgrade scope into the result dashboard', () => {
    renderAt('/runs/sample-run', 'en');

    const insights = screen.getByRole('region', { name: 'Executive Insight Dashboard' });
    expect(insights).not.toHaveTextContent('Executive report preview');
    expect(insights).not.toHaveTextContent('Export format readiness');
    expect(insights).not.toHaveTextContent('PDF');
    expect(insights).not.toHaveTextContent('PowerPoint');
    expect(insights).not.toHaveTextContent('download');
  });
});

describe('Export review', () => {
  it.each([
    ['/exports/sample-run', 'Product Launch executive-ready summary'],
    ['/exports/3c-m5-campaign-message-test-reference-workflow', 'Campaign Message Test executive-ready summary'],
    ['/exports/3c-m7-ab-experiment-reference-workflow', 'A/B Experiment executive-ready summary'],
    ['/exports/3c-m15-creative-comparison-reference-workflow', 'Creative Comparison executive-ready summary'],
  ])('renders supported formats, status, executive preview, and safety limitations for %s', (pathname, summaryHeading) => {
    renderAt(pathname);

    expect(screen.getByRole('heading', { name: 'Ready for human review' })).toBeInTheDocument();
    const formats = screen.getByRole('region', { name: 'Export format readiness' });
    for (const format of ['Executive JSON preview', 'Markdown briefing preview']) {
      expect(formats).toHaveTextContent(format);
      expect(screen.getAllByText('Preview ready for review').length).toBeGreaterThanOrEqual(1);
    }
    expect(formats).not.toHaveTextContent('Data preview (JSON)');
    expect(formats).not.toHaveTextContent('Executive summary preview');
    expect(formats).toHaveTextContent('Supported review previews');
    expect(document.body.textContent?.toLowerCase()).not.toMatch(/download|pdf|ppt|powerpoint/);
    expect(screen.getAllByText(/synthetic\/offline fixture/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/review preview only/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: summaryHeading })).toBeInTheDocument();
    expect(screen.getAllByText(/Executive review:/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Review Assumptions')).toBeInTheDocument();
    expect(screen.getByText('Evidence Gaps')).toBeInTheDocument();
    expect(screen.getAllByText('Limitations').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Offline sample basis')).toBeInTheDocument();
    expect(screen.getByText('Reviewed offline sample, no live data')).toBeInTheDocument();
    expect(document.body.textContent?.toLowerCase()).not.toContain('socialsense');
    expect(screen.getByText(/Directional synthetic aggregate sample/)).toBeInTheDocument();
    expect(screen.getAllByText(/Synthetic aggregate sample/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/No PII, CRM lists, private messages, or voter lists/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders an executive-first report preview with required sections, evidence basis, and notices', () => {
    renderAt('/exports/3c-m15-creative-comparison-reference-workflow');

    const report = screen.getByRole('region', { name: 'Executive report preview' });
    for (const section of [
      'Executive Summary',
      'Objectives',
      'Scenario',
      'Inputs',
      'Parameters',
      'Audience',
      'Platform Mix',
      'Dashboard / KPI snapshot',
      'Charts / Evidence / Confidence summary',
      'Recommendations',
      'Assumptions',
      'Limitations',
      'Synthetic-data notice',
      'Safety notice',
      'Next review step',
    ]) {
      expect(within(report).getByRole('heading', { name: section })).toBeInTheDocument();
    }
    expect(report).toHaveTextContent('Decision readiness: human review required before launch, budget, or winner decisions.');
    expect(report).toHaveTextContent('Formula: report sections are assembled from fixture metadata, synthetic evidence, and deterministic calculations.');
    expect(report).toHaveTextContent('Evidence tier: E1 synthetic/offline fixture');
    expect(report).toHaveTextContent('Confidence: Low directional confidence');
    expect(report).toHaveTextContent('Source: fixture.exports.executiveSummaryPreview');
    expect(report).toHaveTextContent('Formula: snapshot lists fixture cards as reported, with no recalculation from browser inputs. Source: fixture.cards.');
    for (const thaiOnlyLabel of ['หลักฐานระดับ', 'ความเชื่อมั่น', 'แหล่งที่มา', 'สูตร']) {
      expect(report).not.toHaveTextContent(thaiOnlyLabel);
    }
    expect(report).toHaveTextContent('Next review step');
    expect(report).toHaveTextContent('Run a small human-reviewed creative feedback test');
    expect(report).toHaveTextContent('no live social data, measured platform engagement, production prediction, conversion guarantee, persuasion optimization, or microtargeting');
  });

  it('propagates percent-sign runtime assumptions to dashboard and export previews with accurate source copy', () => {
    const form = renderWorkbench();
    const percentOffer = '50% off first-week sampler';

    fireEvent.change(within(form).getByLabelText('Offer/Promotion'), { target: { value: percentOffer } });
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    const dashboardHref = screen.getByRole('link', { name: 'Open result dashboard' }).getAttribute('href');
    const exportHref = screen.getByRole('link', { name: 'Open export-readiness preview' }).getAttribute('href');
    expect(dashboardHref).toBeTruthy();
    expect(exportHref).toBeTruthy();

    renderAt(dashboardHref!);
    expect(screen.getByRole('heading', { name: 'Product Launch Results' })).toBeInTheDocument();
    expect(screen.getByText(percentOffer)).toBeInTheDocument();

    renderAt(exportHref!);
    const report = screen.getByRole('region', { name: 'Executive report preview' });
    expect(within(report).getByText(percentOffer)).toBeInTheDocument();
    expect(report).toHaveTextContent(
      'Source: browser-entered offline review assumptions carried through the URL/caller payload; fixture result not recalculated and no live API invoked.',
    );
    expect(report).not.toHaveTextContent('Source: fixture.sampleInput; displayed as review assumptions only.');
  });

  it('keeps Thai report and source copy free of English technical API and audience fragments', () => {
    renderAt('/exports/sample-run', 'th');

    const report = screen.getByRole('region', { name: 'ตัวอย่างรายงานผู้บริหาร' });
    const reportText = report.textContent ?? '';

    expect(reportText).toContain('แหล่งที่มา: สมมติฐานกลุ่มเป้าหมายและอินไซต์กลุ่มเป้าหมายจากข้อมูลตัวอย่าง');
    expect(reportText).toContain('ไม่ใช่การมีส่วนร่วมของกลุ่มเป้าหมายที่วัดจริง');
    expect(reportText).not.toContain('live API');
    expect(reportText).not.toContain('API สด');
    expect(reportText).not.toContain('sampleInput.audiences');
    expect(reportText).not.toContain('audience insights');
    expect(reportText).not.toContain('not measured audience engagement');
  });
});
