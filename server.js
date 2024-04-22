
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const { MongoClient } = require('mongodb')

let db;
const url = 'mongodb+srv://admin:qwer1234@cluster0.atvbbro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('Forum');

}).catch((err)=>{
  console.log(err)
})


app.listen(8080, () => {
    console.log('http://localhost:8080에서 실행중')
})

app.get('/', (요청,응답) => {
    응답.sendFile(__dirname + '/index.html')
});

app.get('/list', async (요청, 응답) => {
  let result = await db.collection('post').find().toArray()
  응답.render('list.ejs', { 글목록 : result })
})

app.get('/time', (요청, 응답) => {

  응답.render('time.ejs',{ data : new Date() })

})

app.get('/write', (요청, 응답) => {
  응답.render('write.ejs')

})

