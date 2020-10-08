import {
    LOGIN_USER
} from '../_actions/types';

// ...은 똑같이 가져오는것
export default function(state={},action) {
    switch (action.type) {
        case LOGIN_USER:
                return {...state,loginSuccess : action.payload} 
            break;
    
        default:
            return state;
    }

}