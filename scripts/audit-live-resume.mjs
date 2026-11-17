// Checks the actual public production resume bytes, not just the PDF headers.
// Usage: npm run check:resume:live -- https://congyuzhao.com
import {createHash} from 'node:crypto';
const base=process.argv[2]||'https://congyuzhao.com';
const expected='375deed86cca7d8bf23bc23f92151e11a8cf40a30245107039157a95c5d5cced';
const paths=['/Congyu_Zhao_Resume.pdf','/Congyu_Zhao_Resume_Uploaded.pdf'];
let failed=false;
for(const path of paths){
 try{
  const response=await fetch(new URL(path,base),{signal:AbortSignal.timeout(20000),cache:'no-store'});
  if(!response.ok)throw Error('HTTP '+response.status);
  if(!(response.headers.get('content-type')||'').includes('application/pdf'))throw Error('Incorrect content type');
  const bytes=Buffer.from(await response.arrayBuffer());
  const actual=createHash('sha256').update(bytes).digest('hex');
  if(actual!==expected){
   failed=true;
   console.error('FAIL',path,'is not the uploaded original ('+bytes.length+' bytes)');
   console.error(' Expected SHA-256',expected);
   console.error(' Received SHA-256',actual);
  }else{
   console.log('PASS',path,'matches uploaded original ('+bytes.length+' bytes)');
  }
 }catch(error){failed=true;console.error('FAIL',path,error.message);}
}
if(failed){console.error('Production Resume release gate is NOT complete');process.exitCode=1;}
else console.log('PASS production PDF bytes match the user-supplied original');
