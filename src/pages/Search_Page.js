import { useContext,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";
import { useParams } from "react-router-dom";

import FeedComponent from "../components/FeedComponent.js";
import UploadMemeComponent from "../components/UploadMemeComponent.js";

import MeComponent from '../components/MeComponent';

function HomePage() {
  const theme = useContext(ThemeContext);
  const session = useContext(SessionContext);
  const navigate = useNavigate();       
  

  //let {page} = useParams();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if(username === null) navigate('/login');
  },[]);


  return (
    <div className="flex">
      <div style={{flex:'0.7'}} className="my-4 flex flex-col">
        <FeedComponent />
      </div>
      <div style={{flex:'0.3'}} >
        <MeComponent/>
      </div>
    </div>
  );
}