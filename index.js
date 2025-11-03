let express = require('express');
let app = express();

// app.get('/',(request, response)=> {
//     response.send('hello');
// })
app.use(express.static(__dirname));


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log("app listening at local host 3000");
})
