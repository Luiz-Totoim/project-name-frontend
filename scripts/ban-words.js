const fs = require('fs');
const path = require('path');

const BANNED = [/copilot/i, /chatgpt/i, /openai/i, /ai assistant/i];
const IGNORE_DIRS = new Set(['node_modules', '.git', 'build', 'dist', 'scripts']);

function shouldIgnore(p){
  const parts = p.split(path.sep);
  return parts.some(seg => IGNORE_DIRS.has(seg));
}

function scan(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let issues = [];
  for(const e of entries){
    const full = path.join(dir, e.name);
    if(shouldIgnore(full)) continue;
    if(e.isDirectory()){
      issues = issues.concat(scan(full));
    } else {
      const ext = path.extname(e.name);
      if(['.js', '.jsx', '.ts', '.tsx', '.css', '.md', '.json'].includes(ext)){
        const content = fs.readFileSync(full, 'utf8');
        for(const re of BANNED){
          const m = content.match(re);
          if(m){
            issues.push({ file: full, match: m[0]});
            break;
          }
        }
      }
    }
  }
  return issues;
}

const problems = scan(process.cwd());
if(problems.length){
  console.error('Foram encontradas referências proibidas:');
  for(const p of problems){
    console.error(`- ${p.file} contém '${p.match}'`);
  }
  process.exit(1);
} else {
  console.log('Check de branding: OK (nenhuma referência a termos proibidos).');
}
