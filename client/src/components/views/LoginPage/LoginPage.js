import React, {useState} from 'react'
import { useDispatch} from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { withRouter} from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();
//여긴 state를 만들어서 내부의 벨류를 변경시켜야함 이메일과 패스워드의 state 만들기
const [Email,setEmail] = useState("")
const [Password,setPassword] = useState("")

const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
}
const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
}
const onSubmitHandler = (event) => {
    event.preventDefault();  // refresh를 막아줌

    console.log('Email',Email)
    console.log('Password',Password)

let body = {
    email : Email,
    password : Password
}

dispatch(loginUser(body))
.then(response => { // 여긴 로그인 성공을 했을때
    if(response.payload.loginSuccess) {
        props.history.push('/')
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
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>
            Login
        </button>
            </form>
           
        </div>
    )
}

export default withRouter(LoginPage)
