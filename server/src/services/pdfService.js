import puppeteer from 'puppeteer';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Certificate from '../models/Certificate.js';

const CACHE_TTL = 30 * 1000;
const categories = ['Frontend', 'Backend', 'Database', 'Tools'];

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (char) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
  ));
const text = (value) => escapeHtml(value).replace(/\n/g, '<br>');
const year = (date) => new Date(date).getFullYear();
const period = (start, end) => `${year(start)} — ${end ? year(end) : 'Present'}`;
const bare = (url) => url?.replace(/^https?:\/\//, '');
const section = (title, body) => (body ? `<section><h2>${title}</h2>${body}</section>` : '');

const styles = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 10.5px; line-height: 1.55; color: #1a1d2e; }
  header { padding-bottom: 14px; border-bottom: 3px solid #6c63ff; }
  h1 { margin: 0; font-size: 28px; letter-spacing: -.5px; }
  .role { margin: 4px 0 8px; color: #6c63ff; font-size: 13px; font-weight: 700; }
  .contact { margin: 0; color: #5d5e68; font-size: 9.5px; }
  section { margin-top: 18px; }
  h2 { margin: 0 0 8px; color: #6c63ff; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; }
  h3 { margin: 0; font-size: 12px; }
  article { margin-bottom: 10px; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .row span { color: #5d5e68; white-space: nowrap; }
  .meta { margin: 1px 0 3px; color: #5d5e68; }
  p { margin: 0 0 4px; }
  ul { margin: 4px 0 0; padding-left: 16px; }
  .skill-row { display: flex; gap: 10px; margin-bottom: 3px; }
  .skill-row b { width: 70px; flex: none; }
`;

const skillsHtml = (skills) =>
  categories
    .map((category) => {
      const names = skills.filter((skill) => skill.category === category);
      return names.length
        ? `<div class="skill-row"><b>${category}</b><span>${names.map((skill) => escapeHtml(skill.name)).join(' · ')}</span></div>`
        : '';
    })
    .join('');

const experiencesHtml = (items) =>
  items
    .map(
      (item) => `<article>
        <div class="row"><h3>${escapeHtml(item.position)}</h3><span>${period(item.startDate, item.endDate)}</span></div>
        <p class="meta">${escapeHtml([item.company, item.location].filter(Boolean).join(' · '))}</p>
        ${item.description ? `<p>${text(item.description)}</p>` : ''}
        ${item.missions.length ? `<ul>${item.missions.map((mission) => `<li>${escapeHtml(mission)}</li>`).join('')}</ul>` : ''}
      </article>`
    )
    .join('');

const educationHtml = (items) =>
  items
    .map(
      (item) => `<article>
        <div class="row"><h3>${escapeHtml(item.degree)}</h3><span>${period(item.startDate, item.endDate)}</span></div>
        <p class="meta">${escapeHtml(item.school)}</p>
        ${item.description ? `<p>${text(item.description)}</p>` : ''}
      </article>`
    )
    .join('');

const certificatesHtml = (items) =>
  items
    .map(
      (item) => `<article>
        <div class="row"><h3>${escapeHtml(item.name)}</h3><span>${item.date ? year(item.date) : ''}</span></div>
        <p class="meta">${escapeHtml(item.issuer)}</p>
      </article>`
    )
    .join('');

const buildHtml = ({ profile, skills, experiences, education, certificates }) => {
  const contact = [profile.email, profile.phone, profile.location, bare(profile.github), bare(profile.linkedin), bare(profile.website)]
    .filter(Boolean)
    .map(escapeHtml)
    .join(' &nbsp;·&nbsp; ');
  const about = profile.summary || profile.about;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>${styles}</style></head>
<body>
  <header>
    <h1>${escapeHtml(profile.firstName)} ${escapeHtml(profile.lastName)}</h1>
    <p class="role">${escapeHtml(profile.role)}</p>
    <p class="contact">${contact}</p>
  </header>
  ${section('Profile', about ? `<p>${text(about)}</p>` : '')}
  ${section('Skills', skillsHtml(skills))}
  ${section('Experience', experiencesHtml(experiences))}
  ${section('Education', educationHtml(education))}
  ${section('Certifications', certificatesHtml(certificates))}
  ${section('Career goals', profile.goals ? `<p>${text(profile.goals)}</p>` : '')}
</body></html>`;
};

const generate = async () => {
  const [profile, skills, experiences, education, certificates] = await Promise.all([
    Profile.findOne(),
    Skill.find().sort({ category: 1, order: 1 }),
    Experience.find().sort({ startDate: -1 }),
    Education.find().sort({ startDate: -1 }),
    Certificate.find().sort({ date: -1 }),
  ]);
  if (!profile) return null;

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setContent(buildHtml({ profile, skills, experiences, education, certificates }), { waitUntil: 'load' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '14mm', right: '14mm', bottom: '14mm', left: '14mm' },
    });
    return {
      pdf: Buffer.from(pdf),
      fileName: `${profile.firstName}-${profile.lastName}-CV.pdf`.replace(/[^\w-.]+/g, '-'),
    };
  } finally {
    await browser.close();
  }
};

let cached = null;
let pending = null;

export const getCvPdf = async () => {
  if (cached && cached.expires > Date.now()) return cached.value;
  pending ??= generate()
    .then((value) => {
      cached = value ? { value, expires: Date.now() + CACHE_TTL } : null;
      return value;
    })
    .finally(() => {
      pending = null;
    });
  return pending;
};