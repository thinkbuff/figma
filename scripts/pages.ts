import { execFileSync } from 'node:child_process';
import {
  cpSync,
  createReadStream,
  existsSync,
  mkdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';

// Assemble the GitHub Pages site (redirect index + storybook + playground)
// into site/figma/, which is what gets deployed to
// https://thinkbuff.github.io/figma/. `preview` additionally serves site/
// locally so <host>/figma/ mirrors production paths.
const root = path.resolve(import.meta.dirname, '..');
const site = path.join(root, 'site');
const app = path.join(site, 'figma');

const command = process.argv[2];
if (command === 'build' || command === 'preview') {
  build();
}
if (command === 'preview' || command === 'serve') {
  serve();
} else if (command !== 'build') {
  console.error('usage: tsx scripts/pages.ts <build|preview|serve>');
  process.exit(1);
}

function build() {
  run('pnpm', ['build']);
  rmSync(site, { recursive: true, force: true });
  mkdirSync(app, { recursive: true });
  run('pnpm', [
    '-F',
    '@thinkbuff/figma-react',
    'exec',
    'storybook',
    'build',
    '--output-dir',
    path.join(app, 'storybook'),
  ]);
  cpSync(path.join(root, 'playground/dist'), path.join(app, 'playground'), { recursive: true });
  writeFileSync(
    path.join(app, 'index.html'),
    '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=./storybook/">' +
      '<title>Thinkbuff Figma</title><a href="./storybook/">Storybook</a>\n',
  );
  console.log(`site -> ${app}`);
}

function run(cmd: string, args: string[]) {
  execFileSync(cmd, args, { cwd: root, stdio: 'inherit' });
}

const MIME: Record<string, string> = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.md': 'text/markdown',
  '.mjs': 'text/javascript',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.wasm': 'application/wasm',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function serve() {
  const port = Number(process.env.PORT ?? 4173);
  createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
    if (url === '/') {
      res.writeHead(302, { location: '/figma/' }).end();
      return;
    }
    let file = path.normalize(path.join(site, url));
    if (file !== site && !file.startsWith(site + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory()) {
      if (!url.endsWith('/')) {
        res.writeHead(301, { location: `${url}/` }).end();
        return;
      }
      file = path.join(file, 'index.html');
    }
    if (!existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(res);
  }).listen(port, () => {
    console.log(`preview -> http://localhost:${port}/figma/`);
  });
}
