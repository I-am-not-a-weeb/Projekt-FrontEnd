import { useContext,useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";
import { useParams } from "react-router-dom";
import axios from 'axios';

import { HostUrl } from "../contexts/host";

function AccountPage() {
    const theme = useContext(ThemeContext);
    const session = useContext(SessionContext);
    const navigate = useNavigate();       
    
    const {username} = useParams();

    const [account, setAccount] = useState({});
    
    useEffect(() => {
        console.log(username)
        fetch(`${HostUrl}/account/${username}`, {    
            credentials: 'include',
            method: 'get',

         }).then(response => {
            if (response.status !== 200) {
                navigate('/login');
            }else{
                setAccount(response.data);
            }
         }).catch(error => {
             console.log(error);
         })
    },[]);

    return (
        <div>
            
        </div>
    )
    
}

export default AccountPage