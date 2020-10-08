import React, {useState} from 'react'
import { useDispatch} from 'react-redux'
import { RegisterUser } from '../../../_actions/user_action';
import { withRouter} from 'react-router-dom';

function RegisterPage(props) {

    const dispatch = useDispatch();
//여긴 state를 만들어서 내부의 벨류를 변경시켜야함 이메일과 패스워드의 state 만들기
const [Email,setEmail] = useState("")
const [Password,setPassword] = useState("")
const [Name,setName] = useState("")
const [ConfirmPassword,setConfirmPassword] = useState("")


const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
}
const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
}
const onNameHandler = (event) => {
    setName(event.currentTarget.value)
}
const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
}

const onSubmitHandler = (event) => {
    event.preventDefault();  // refresh를 막아줌

    if(Password !== ConfirmPassword) {
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
let body = {
    email : Email,
    name: Name,
    password : Password
}

dispatch(RegisterUser(body))
.then(response => { // 여긴 로그인 성공을 했을때
    if(response.payload.success) {
        props.history.push('/login')
    }else {
        alert('Error')
    }
})


}
    return (
        <div style={{
            display : 'flex',justifyContent:'center',alignItems : 'center',
            width: '100%', height:'100vh' 
        }}>
            <form style={{ display : 'flex',flexDirection:'column'}}
            onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
       
        <label>ConfirmPassword</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
       
        <br />
        <button>
            Register!
        </button>
            </form>
           
        </div>
    )
}

export default withRouter(RegisterPage)
