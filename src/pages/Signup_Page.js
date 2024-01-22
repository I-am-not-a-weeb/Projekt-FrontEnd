import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useContext,useEffect } from "react";
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";
import { useNavigate } from 'react-router-dom';

import { HostUrl } from "../contexts/host";

const SignupPage = () => {
    const theme = useContext(ThemeContext);
    const session = useContext(SessionContext);
    const navigate = useNavigate();    

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        nickname: Yup.string().required('Nickname is required'),
        password: Yup.string().required('Password is required'),
        password2: Yup.string().required('Password is required'),
        email: Yup.string().required('Email is required'),
      });

      const formik = useFormik({
        initialValues: {
          username:'',
          nickname:'',
          password:'',
          password2:'',
          email:''
        },
        onSubmit: values => {
            const {username,nickname,password,password2,email} = values;

            const passwordRegex = /(?=.*[0-9])/;
            const emailRegex = /(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

            if(password !== password2){
                alert('Passwords do not match');
                return;
            }
            if(password.length < 8){
                alert('Password must be at least 8 characters');
                return;
            }
            if(!passwordRegex.test(password)){
                alert('Password must contain a number');
                return;
            }
            if(!emailRegex.test(email)){
                alert('Email is not valid');
                return;
            }

            const data = {
                'username':username,
                'nickname':nickname,
                'password':password,
                'email':email
            }

            fetch(`${HostUrl}/signup`,{method:'POST'} )

        },
      });

      const validatePassword = (password) => {

      }
      const validateConfirmPassword = (password,password2) => {

      }

        const handleLogin = () => {
            navigate('/login')
        }
    return (
      <div style={{height: '100vh',width:'100%',backgroundColor:theme.color2}}>
        <form onSubmit={formik.handleSubmit} style={{position:'absolute', top: '50%', left: '50%',transform:'translate(-50%, -50%)',display:'flex',flexDirection:'column',padding:'1em',backgroundColor:theme.color3}}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} />

            <label htmlFor="nickname">Nickname</label>
            <input id="nickname" name="nickname" type="text" onChange={formik.handleChange} value={formik.values.nickname} />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type='password' onChange={formik.handleChange} value={formik.values.password} />

            <label htmlFor="password2">Confirm Password</label>
            <input id="password2" name="password2" type='password' onChange={formik.handleChange} value={formik.values.password2} />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type='text' onChange={formik.handleChange} value={formik.values.email} />

            <button className='m-1 border-solid border-gray-600 border-opacity-75 border-2' type="submit">Sign-up</button>
            <button className='m-1 border-solid border-gray-600 border-opacity-75 border-2' onClick={handleLogin}>
                Already have account? Sign in
            </button>
        </form>
      </div>
    )
}

export default SignupPage;