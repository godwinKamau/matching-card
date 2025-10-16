const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')

const pexels = require('pexels');

const client = pexels.createClient('kgTIqQeKSbFks9mFWDnRhFZwYTSfbnHVavtt3KqlsBqnl6rOiaw4jpAm');

//first, find the images collect the url's, and then place them in a random array 
async function asyncPhotos(query,res){
    console.log(query)
    client.photos.search({ query, per_page: 5, orientation:'portrait' })
    .then(data => arrayMaker(data.photos,res));
    
}

function arrayMaker(photos,res) {
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
    const objToJson = {
        'randArray' : randArray,
        'photos' : photos
    }
    res.writeHead(200, {'Content-Type':'application/json'})
    res.end(JSON.stringify(objToJson)) 
}

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
        if(params['search']) {
            const query = params['search'];
            asyncPhotos(query,res)
        }
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