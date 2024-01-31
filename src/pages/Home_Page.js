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
  

  let {page=1} = useParams();

  useEffect(() => {
    
  },[]);

  if(!page) page=1;

  return (
    <div className="flex">
      <div style={{flex:'0.7'}} className="my-4 flex flex-col">
        <UploadMemeComponent/>
        <FeedComponent page={page}/>
      </div>
      <div style={{flex:'0.3'}} >
            <MeComponent/>
      </div>
    </div>
  );
}

export default HomePage;