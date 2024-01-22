import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useContext,useEffect } from "react";
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const theme = useContext(ThemeContext);
    const session = useContext(SessionContext);
    const navigate = useNavigate();    

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
      });

      const formik = useFormik({
        initialValues: {
          username:'',
          password:''
        },
        onSubmit: values => {
            const {username, password} = values;

            console.log(username,password)
        },
      });
      const handle_signup = () => {
        navigate('/signup')
      }

    return (
      <div style={{height: '100vh',width:'100%',backgroundColor:theme.color2}}>
        <form onSubmit={formik.handleSubmit} style={{position:'absolute', top: '50%', left: '50%',transform:'translate(-50%, -50%)',display:'flex',flexDirection:'column',padding:'1em',backgroundColor:theme.color3}}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type='test' onChange={formik.handleChange} value={formik.values.password} />

            <button className='m-1 border-solid border-gray-600 border-opacity-75 border-2' type="submit">Sign-in</button>
            <button className='m-1 border-solid border-gray-600 border-opacity-75 border-2' onClick={handle_signup}>
              No account? Sign-up
            </button>
        </form>
      </div>
    )
}

export default LoginPage;