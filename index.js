const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key');

const { User } = require("./models/User");
const bodyParser = require('body-parser');

//application/x-www-form-urlencoded 로 넣어오는걸 분석할수있게해주는 구문
app.use(bodyParser.urlencoded({extended : true}));

//application/json 타입으로 된것을 분석해서 가져올수 있게 해주는 구문
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, 
{useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() => console.log('connet good!..'))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello gg!')
})

app.post('/register',(req,res)=> {

  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

 
  //req.body에는 json식으로 데이터가 들어있음
  const user = new User(req.body)

  //몽고db의 메소드 save해주면 넘어온 정보들이 유저모델에 저장됨
  user.save((err,userInfo) => {
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success:true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})