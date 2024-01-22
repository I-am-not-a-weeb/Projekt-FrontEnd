import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

function NotFoundPage() {

    const theme = useContext(ThemeContext);

  return (
   <div style={{height: '100vh',backgroundColor:theme.color3}}>
        <h1 style={{color:'red',display:'block', position:'absolute', top: '50%', left: '50%',transform:'translate(-50%, -50%)'}}>
            404: Not Found
        </h1>
   </div> 
  )
}

export default NotFoundPage;