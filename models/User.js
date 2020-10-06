const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
name: {
    type: String,
    maxlength : 60
},
email : {
    type:String,
    trim : true, //스페이스를 없애주는 역할
    unique: 1
},
password : {
    type: String,
    minlength:5
},
lastname: {
    type: String,
    maxlength:50
},
role : {
    type: Number,
    default:0
},
image : String,
token: { // 유효성 검사시 사용
    type: String
},
tokenExp: { // 유효성 검사기한
    type: Number
}

})

//밑에는 모델로 감싸주는부분
const User = mongoose.model('User',userSchema)

module.exports={User} //외부에서도 쓸수있게 하는것.