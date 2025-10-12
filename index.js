const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req,res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
        fs.readFile('index.html',function(err,data){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        });
    }
    else if (page == '/randomize') {
        const randArray = [[],[],[],[],[]]
        for (let i=0 ; i<10 ; i++){
            
            let placed = false
            while (placed === false){
                let index = Math.floor(Math.random()*5)
                if(randArray[index].length < 2) {
                    randArray[index].push(i)
                    placed = true
                }
            } 
        }
        console.log(randArray)
        res.writeHead(200, {'Content-Type':'application/json'})
        res.end(JSON.stringify(randArray))
    }
    else if (page == '/css/style.css') {
        fs.readFile('css/style.css', function(err,data){
            res.write(data)
            res.end()
        })
    }
    else if (page == '/js/main.js') {
        fs.readFile('js/main.js', function(err,data){
            res.writeHead(200, {'Content-Type':'text/javascript'})
            res.write(data)
            res.end()
        })
    }
})
server.listen(8000)