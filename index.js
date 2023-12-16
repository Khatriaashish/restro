const http = require('http');
const app = require('./src/config/express.config')

//server creation
const server = http.createServer(app);

//server listen
server.listen(3030, 'localhost', (err)=>{
    if(!err){
        console.log("Server is running at port 3030");
    }
})