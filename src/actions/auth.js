import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const signup=(authData, navigate)=>async(dispatch)=>{
    console.log("data", authData)
    try {
        const {data}=await api.signUp(authData);
        dispatch({type:'AUTH', data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/')
    } catch (error) {
        if(error.message==='Request failed with status code 409'){
            alert("Email already exists")
        }
        if(error.message==='Request failed with status code 500'){
            alert("Server Error")
        }
        if(error.message==='Request failed with status code 400'){
            alert("Enter valid email and password")
        }
        if(error.message==='Request failed with status code 404'){
            alert("User already exists")
        }
        if(error.message==='Request failed with status code 401'){
            alert("Incorrect password")
        }
        if(error.message==='Request failed with status code 403'){
            alert("User already exists")
        }
        console.log(error);
    }
}

export const login=(authData, navigate)=>async(dispatch)=>{
    try {
        const {data}=await api.logIn(authData);
        dispatch({type:'AUTH', data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/')
    } catch (error) {
        if(error.message==='Request failed with status code 500'){
            alert("Server Error")
        }
        if(error.message==='Request failed with status code 400'){
            alert("Invalid Credentials")
        }
        if(error.message==='Request failed with status code 404'){
            alert("User does not exist")
        }
        console.log(error);
    }

}