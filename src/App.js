import logo from './logo.svg';
import './App.css';
import { createContext,useState,useEffect } from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { light_theme, dark_theme,ThemeContext } from './contexts/theme';
import HomePage from './pages/Home_Page';
import LoginPage from './pages/Login_Page';
import NotFoundPage from './pages/NotFound_Page';
import  AccountPage  from './pages/Account_Page';
import SignupPage from './pages/Signup_Page';

const SessionContext = createContext(0);

function HoverableButton(props)
{
  const [hover,setHover] = useState(false);
  const theme = props.theme;

  return (
    <button
      onClick={props.onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{display: 'inline-flex', alignItems:'center' }} 
      className={
        (theme === dark_theme ? 'text-slate-200' : 'text-slate-700')
        +' align-middle px-2 h-full text-center'
        +(hover ? (theme === dark_theme ? ' border-b-4 border-slate-200 border-solid' : ' border-b-4 border-slate-700 border-solid') : (''))
      }
    >
      {props.children}
    </button>
  );

}

function App() {
  const [theme, setTheme] = useState(light_theme);
  const [session, setSession] = useState(0);
  const navigate = useNavigate(); 

  function changeTheme() {
    if (theme === light_theme) {
      localStorage.setItem('theme', 'dark');
      setTheme(dark_theme);
    } else {
      localStorage.setItem('theme', 'light');
      setTheme(light_theme);
    }
  }

  useEffect(() => {
    setTheme(localStorage.getItem('theme') === 'light' ? light_theme : dark_theme);
  },[]);

  return (
    <SessionContext.Provider>
      <ThemeContext.Provider value={theme}>
          <nav className='flex flex-row space justify-between p-0' style={{backgroundColor:theme.color1, position:'fixed', width:'100%',height:'3em', paddingLeft:'10%', paddingRight:'10%', alignItems:'center'}}>
            <div style={{height:'100%'}}>
              <HoverableButton theme={theme}  onClick={()=>navigate('/')}>
                Main Page
              </HoverableButton>
            </div>
            <div style={{height:'100%'}}>
              <HoverableButton style={{display: 'inline-flex', alignItems:'center' }} className={(theme === dark_theme ? 'text-slate-200' : 'text-slate-700')+' align-middle px-2 h-full text-center'}>
                MY account
              </HoverableButton>
              <button className={theme === light_theme ? 'bg-slate-600 text-slate-200' : 'bg-slate-200 text-slate-700'} onClick={changeTheme}>
                {theme === light_theme ? 'Dark' : 'Light'}
              </button>
            </div>
          </nav>
          <div style={{height: '100vh',width:'100%',backgroundColor:theme.color3, paddingLeft:'10%', paddingRight:'10%', paddingTop:'3em'}}>
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/account/:username" element={<AccountPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <div>

            </div>
          </div>
      </ThemeContext.Provider>
    </SessionContext.Provider>
  );
}

export default App;