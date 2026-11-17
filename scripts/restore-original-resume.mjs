// Install the exact original one-page resume without re-exporting or modifying it.
// Usage: npm run restore:resume -- "/path/to/Congyu Zhao — Resume (5)(1).pdf"
import {readFile,writeFile,rename,mkdir,unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const expected='375deed86cca7d8bf23bc23f92151e11a8cf40a30245107039157a95c5d5cced';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const src=process.argv[2];
if(!src){
 console.error('Usage: npm run restore:resume -- "/path/to/original-resume.pdf"');
 process.exit(2);
}
const buffer=await readFile(resolve(src));
const hash=createHash('sha256').update(buffer).digest('hex');
if(buffer.subarray(0,5).toString()!=='%PDF-'||hash!==expected){
 console.error('Refusing to replace website resume: source is not the exact uploaded original.');
 console.error('Expected SHA-256:',expected);
 console.error('Actual SHA-256:  ',hash);
 process.exit(1);
}
const paths=['public/Congyu_Zhao_Resume.pdf','public/Congyu_Zhao_Resume_Uploaded.pdf'];
for(const path of paths){
 const dest=join(root,path);
 await mkdir(dirname(dest),{recursive:true});
 const tmp=dest+'.original-resume-tmp-'+process.pid;
 try{
  await writeFile(tmp,buffer,{flag:'wx'});
  await rename(tmp,dest);
 }finally{
  await unlink(tmp).catch(()=>{});
 }
 const installed=await readFile(dest);
 if(createHash('sha256').update(installed).digest('hex')!==expected)
  throw new Error('Post-install checksum mismatch: '+path);
 console.log('PASS',path,'matches exact original ('+installed.length+' bytes)');
}
console.log('Resume restored locally. Commit both PDF files and verify the production download after deployment.');
