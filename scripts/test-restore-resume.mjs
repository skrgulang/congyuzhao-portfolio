// Safety regression: invalid input must not modify either published resume alias.
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const paths=['public/Congyu_Zhao_Resume.pdf','public/Congyu_Zhao_Resume_Uploaded.pdf'];
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const before=await Promise.all(paths.map(path=>readFile(join(root,path)).then(hash)));
const folder=await mkdtemp(join(tmpdir(),'portfolio-bad-resume-'));
try{
 const invalid=join(folder,'bad-resume.pdf');
 await writeFile(invalid,'%PDF-1.4\nThis is not the original uploaded resume.\n');
 const attempt=spawnSync(process.execPath,[join(root,'scripts/restore-original-resume.mjs'),invalid],{cwd:root,encoding:'utf8'});
 if(attempt.status!==1||!attempt.stderr.includes('Refusing to replace website resume'))
  throw new Error('Restore script did not reject mismatched source: '+attempt.stderr);
 const after=await Promise.all(paths.map(path=>readFile(join(root,path)).then(hash)));
 if(before.some((value,i)=>value!==after[i]))throw new Error('Restore script modified PDF files despite rejection');
 console.log('PASS invalid resume rejected without modifying public PDF aliases');
}finally{
 await rm(folder,{recursive:true,force:true});
}
