import { useContext,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";

function HomePage() {
  const theme = useContext(ThemeContext);
  const session = useContext(SessionContext);
  const navigate = useNavigate();       
  
  useEffect(() => {
    
  },[]);

  return (
    <div >
      <div> // This is a comment  

      </div>
    </div>
  );
}

export default HomePage;