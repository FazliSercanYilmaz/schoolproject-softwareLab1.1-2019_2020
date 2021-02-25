let Tesseract =  require("tesseract.js");
var tmp = require('tmp');
const fs = require("fs");
var a=0;
const worker = Tesseract.createWorker();
async function isbnReader (image){
    if(a==0){
       await ocrstart();
       a=1;
    }
    var tmpobj = tmp.fileSync({postfix: '.png' });
    let dosyapath = tmpobj.name;
    fs.writeFileSync(dosyapath,image, {encoding:'base64'},function(err){
        console.log('File created');
      })
     let isbnnumber =  isbnparser(await ocr(dosyapath))
     return isbnnumber;
}
function isbnparser(str2){
    const regex = /[Ii][sS][bB][nN]/gm;
    let m;
    let isbnline;
    let isbnnumber = "";
    let strarray = str2.split(/\r?\n/);
    for (let index = 0; index < strarray.length; index++) {
        const str = strarray[index];
    
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
         isbnline = m.input;
        }
    }
    if(!isbnline)
    return -1;
  matches = isbnline.match(/\d+/g);
    if(matches){
        for (let index = 0; index < matches.length; index++) {
            const element = matches[index];
            isbnnumber += element
        }
    }
    if(isbnnumber)
    return isbnnumber;
    return 0;
}
async function ocr(path){
const { data: { text } } = await worker.recognize(path);
return text;
}
async function ocrstart(){
    await worker.load();
    await worker.loadLanguage('tur');
    await worker.initialize('tur');
}
module.exports = {
    isbnReader : isbnReader
  };
  