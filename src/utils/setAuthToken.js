import axios from 'axios';

const setAuthToken = token => {
    if(token){
        //APPLY TO EVERY REQUEST
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    } else {
        //DELETE AUTH HEADER
        
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;