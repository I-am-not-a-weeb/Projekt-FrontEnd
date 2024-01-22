import { useContext,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";

import { HostUrl } from "../contexts/host";

function MemeUploadPage() {
  const theme = useContext(ThemeContext);
  const session = useContext(SessionContext);
  const navigate = useNavigate();       
  
  useEffect(() => {
    
  },[]);

  return (
    <div>
      <header className="App-header" style={{height: '100vh',width:'100%',backgroundColor:theme.color3}}>

      </header>
    </div>
  );
}

export default MemeUploadPage;