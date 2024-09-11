import React, { useState } from 'react'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();

   async function handleLoginForm(e){
        e.preventDefault();

        loginAPICall(email, password).then((response) => {
            console.log(`${email} + " " + ${password}`);

            // const token = 'Basic ' + window.btoa(email + ":" + password)
            const token = response.data.accessToken;
            const role = response.data.role;

            storeToken(token);

            saveLoggedInUser(email,role);
            navigate("/todos")
            window.location.reload(false);
            }).catch(error => {
                    console.error(error);
                }
            )
        
    }
  return (
    <div className='container'>
         <br /><br />

<div className='row'>
    <div className='col-md-6 offset-md-3'>
            <div className='card'>
                <div className='card-header'>
                    <h2 className='text-center'> User Login Form </h2>
                </div>
                <div className='card-body'>
                    <form>
                        <div className='row mb-3'>
                                <label className='col-md-3 control-label'>Username or Email </label>
                                <div className='col-md-9'>
                                <input 
                                    type='text'
                                    name='email'
                                    placeholder='Enter Email'
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                </div>
                        </div>
                        <div className='row mb-3'>
                                <label className='col-md-3 control-label'>Password </label>
                                <div className='col-md-9'>
                                <input 
                                    type='password'
                                    name='password'
                                    placeholder='Enter Password'
                                    className='form-control'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </input>
                                </div>
                        </div>
                        <div className='form-group mb-3'>
                            <button className='btn btn-primary' onClick={(e) => handleLoginForm(e)}>Submit</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
</div>
</div>
  )
}

export default LoginComponent