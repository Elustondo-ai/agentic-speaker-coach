/** Deck-local Mermaid export. Authoritative diagram bytes are never modified. */
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {fileURLToPath, pathToFileURL} from 'node:url';

const deck = path.dirname(fileURLToPath(import.meta.url));
const build = path.join(deck, 'build');
const dependencies = path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies');
const {chromium} = await import(pathToFileURL(path.join(dependencies, 'node/node_modules/playwright/index.mjs')));
const modules = '/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/markdown-language-features/markdown-editor-out';
const mermaidFile = path.join(modules, 'mermaid.core-S5KCHHL2.js');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const jobsPath = path.resolve(process.argv[2] || path.join(build, 'mermaid-jobs.json'));
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const inside = (root, target) => target === root || target.startsWith(root + path.sep);
const errorText = error => String(error.message).replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').slice(0, 8000);

function encodeSequenceSemicolons(text) {
  const changes = [];
  if (!/^\s*sequenceDiagram\b/.test(text)) return {text, changes};
  const derived = text.split('\n').map((line, index) => {
    const match = line.match(/^(\s*[A-Za-z_]\w*\s*(?:->>|-->>|->|-->)\s*[A-Za-z_]\w*\s*:\s*)(.*)$/);
    if (!match || !match[2].includes(';')) return line;
    const label = match[2];
    const encoded = label.replace(/;/g, '#59;');
    changes.push({line: index + 1, original_label: label, encoded_label: encoded,
      literal_semicolon_count: [...label].filter(character => character === ';').length});
    return match[1] + encoded;
  }).join('\n');
  return {text: derived, changes};
}

async function buildTarget(target) {
  const absolute = path.resolve(target);
  if (!inside(build, absolute)) throw new Error(`Generated target must be inside this deck's build/: ${target}`);
  let parent = absolute;
  while (inside(build, parent)) {
    try {
      if ((await fs.lstat(parent)).isSymbolicLink()) throw new Error(`Symlink target rejected: ${parent}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (parent === build) break;
    parent = path.dirname(parent);
  }
  await fs.mkdir(path.dirname(absolute), {recursive: true});
  return absolute;
}

await fs.mkdir(build, {recursive: true});
await buildTarget(path.join(build, 'mermaid-renderer.html'));
const jobs = JSON.parse(await fs.readFile(jobsPath, 'utf8'));
if (!Array.isArray(jobs) || !jobs.length) throw new Error('Expected a nonempty JSON array of Mermaid jobs.');
const html = path.join(build, 'mermaid-renderer.html');
await fs.writeFile(html, '<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:white}#diagram{display:inline-block}</style></head><body><div id="diagram"></div></body></html>');
const profile = await fs.mkdtemp(path.join(build, 'chrome-profile-'));
const temporary = await fs.mkdtemp(path.join(build, 'chrome-tmp-'));
const report = {
  renderer: 'installed VS Code Mermaid 11.17.0; default Mermaid layout',
  mermaid_module: mermaidFile,
  mermaid_module_sha256: hash(await fs.readFile(mermaidFile)),
  chrome,
  source_transformations: [],
  rendering_compatibility_encodings: [],
  external_requests_allowed: false,
  diagrams: [],
  failures: [],
};
let context;
try {
  context = await chromium.launchPersistentContext(profile, {
    executablePath: chrome, headless: true, viewport: {width: 2600, height: 1800},
    deviceScaleFactor: 1, offline: true, serviceWorkers: 'block', acceptDownloads: false,
    env: {...process.env, TMPDIR: temporary},
    args: ['--allow-file-access-from-files', '--disable-background-networking',
      '--disable-component-update', '--disable-default-apps', '--no-first-run',
      '--no-default-browser-check', '--disable-sync', '--disable-extensions',
      '--metrics-recording-only', '--host-resolver-rules=MAP * ~NOTFOUND'],
  });
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.protocol === 'file:') {
      const target = path.resolve(fileURLToPath(url));
      if (inside(modules, target) || target === html) return route.continue();
    }
    return route.abort('blockedbyclient');
  });
  const page = await context.newPage();
  await page.goto(pathToFileURL(html).href);
  await page.evaluate(async url => {
    const module = await import(url);
    window.mermaid = module.default;
    window.mermaid.initialize({startOnLoad: false, securityLevel: 'strict'});
  }, pathToFileURL(mermaidFile).href);
  report.browser_version = context.browser()?.version() || 'unavailable';
  for (const job of jobs) {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(job.id)) throw new Error(`Unsafe Mermaid render ID: ${job.id}`);
    const sourcePath = path.resolve(job.source);
    const info = await fs.lstat(sourcePath);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 2 * 1024 * 1024) throw new Error(`Unsafe source: ${sourcePath}`);
    const source = await fs.readFile(sourcePath);
    const pngPath = await buildTarget(job.output);
    const svgPath = await buildTarget(job.svg);
    try {
    const render = text => page.evaluate(async ({id, source}) => {
      const host = document.querySelector('#diagram');
      host.replaceChildren();
      const result = await window.mermaid.render(id, source);
      host.innerHTML = result.svg;
      await document.fonts.ready;
      const svg = host.querySelector('svg');
      if (!svg) throw new Error('Mermaid did not return an SVG.');
      const box = svg.viewBox.baseVal;
      if (!(box.width > 0 && box.height > 0)) throw new Error('Mermaid SVG has invalid dimensions.');
      const width = Math.max(2400, Math.ceil(box.width * 2));
      const height = Math.ceil(width * box.height / box.width);
      if (width > 12000 || height > 16000) throw new Error('Rendered diagram exceeds the bounded raster surface.');
      svg.style.maxWidth = 'none';
      svg.style.width = `${width}px`;
      svg.style.height = `${height}px`;
      svg.setAttribute('width', String(width));
      svg.setAttribute('height', String(height));
      const origin = svg.getBoundingClientRect();
      const metrics = [...svg.querySelectorAll('text, .nodeLabel, .edgeLabel .label, .cluster-label .label')]
        .filter(element => element.textContent.trim()).map(element => {
          const bounds = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {text: element.textContent.trim(), tag: element.tagName,
            x: bounds.x - origin.x, y: bounds.y - origin.y,
            width: bounds.width, height: bounds.height,
            font_family: style.fontFamily, css_font_size_px: parseFloat(style.fontSize),
            approximate_rendered_font_size_px: parseFloat(style.fontSize) * width / box.width,
            font_weight: style.fontWeight};
        });
      return {svg: result.svg, width, height,
        view_box: {x: box.x, y: box.y, width: box.width, height: box.height}, text_metrics: metrics};
    }, {id: 'mermaid-' + job.id, source: text});
    let rendered, compatibility = null;
    try {
      rendered = await render(source.toString('utf8'));
    } catch (originalError) {
      const derived = encodeSequenceSemicolons(source.toString('utf8'));
      if (!derived.changes.length) throw originalError;
      const derivedPath = await buildTarget(svgPath.replace(/\.svg$/, '.rendering-compatibility.mmd'));
      await fs.writeFile(derivedPath, derived.text);
      rendered = await render(derived.text);
      const labels = new Set(rendered.text_metrics.map(item => item.text));
      if (derived.changes.some(change => !labels.has(change.original_label))) {
        throw new Error('Encoded sequence message labels did not render exactly as the original literal labels.');
      }
      compatibility = {id: job.id, rule: 'Encode literal message-label semicolons as Mermaid #59; entities; preserve arrows, participant order and displayed label text.',
        original_render_failure: errorText(originalError), original_sha256: hash(source),
        derived_path: derivedPath, derived_sha256: hash(derived.text), changes: derived.changes,
        rendered_labels_exact_match: true};
      report.rendering_compatibility_encodings.push(compatibility);
      console.log(`RENDERING ENCODING ${job.id}: ${derived.changes.length} message labels; exact displayed labels verified`);
    }
    await fs.writeFile(svgPath, rendered.svg);
    await page.locator('#diagram > svg').screenshot({path: pngPath, omitBackground: false});
    if (hash(await fs.readFile(sourcePath)) !== hash(source)) throw new Error(`Source changed during rendering: ${sourcePath}`);
    delete rendered.svg;
    report.diagrams.push({id: job.id, source: sourcePath, source_sha256: hash(source),
      output: pngPath, output_sha256: hash(await fs.readFile(pngPath)),
      svg: svgPath, svg_sha256: hash(await fs.readFile(svgPath)), compatibility, ...rendered});
    console.log(`RENDERED ${job.id}: ${rendered.width} × ${rendered.height}; ${rendered.text_metrics.length} text boxes`);
    } catch (error) {
      const message = errorText(error);
      report.failures.push({id: job.id, source: sourcePath, source_sha256: hash(source),
        status: 'NOT_RENDERED', error: message, source_changed: false});
      console.error(`NOT RENDERED ${job.id}: ${message.split('\n')[0]}`);
    }
  }
} finally {
  if (context) await context.close();
  await fs.rm(profile, {recursive: true, force: true});
  await fs.rm(temporary, {recursive: true, force: true});
}
await fs.writeFile(await buildTarget(path.join(build, 'mermaid-render-manifest.json')), JSON.stringify(report, null, 2) + '\n');
if (report.failures.length) process.exitCode = 1;
