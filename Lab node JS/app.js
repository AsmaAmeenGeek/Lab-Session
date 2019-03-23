const os = require('os'),
      http = require('http'),
      fs = require('fs');

console.log('Hello World');
console.log('Architecture : '+ os.arch());
console.log('CPUs :'+os.cpus());
console.log('OS :'+os.platform());

 const fileName = 'test.txt';
fs.readFile(fileName,(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data.toString());
});

const  data=fs.readFileSync(fileName);
console.log(data.toString());

const outFileName='test-copy.txt';

const readStream = fs.createReadStream(fileName);
const writeStream = fs.createWriteStream(outFileName);

readStream.pipe(writeStream);

readStream.on('data',data =>{
    console.log(data.toString());
})

http.createServer((req,res) =>{
    res.setHeader('content-Type','text/html');
    res.write('<h1>Hello World</h1>');
    res.end();
}).listen(3001);


http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    switch (req.method) {
        case 'GET':
            res.write('<h1>Hello World</h1>');
            res.end();
            break;
        case 'POST':
            req.on('data', data => {
                res.write('<h1>Hello ' + data + '</h1>');
                res.end();
            });
            break;
    }
}).listen(3002, (err) => {
    console.log('Server is listening to port 3000')
});