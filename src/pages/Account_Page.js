import { useContext,useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";
import { useParams } from "react-router-dom";
import axios from 'axios';



import { HostUrl } from "../contexts/host";
import MemeComponent from "../components/MemeComponent";

function AccountPage() {
    const theme = useContext(ThemeContext);
    const session = useContext(SessionContext);
    const navigate = useNavigate();       
    
    const {username} = useParams();

    const [account, setAccount] = useState({});
    const [accountMemes, setAccountMemes] = useState([]);

    useEffect(() => {
        if(username === null) navigate('/login');

        if(localStorage.getItem('accounts')!== null) 
        {
            const accounts = JSON.parse(localStorage.getItem('accounts'));
            setAccount(accounts.filter(account => account.username === username)[0]);
        }

        if(localStorage.getItem('memes')!== null) 
        {
            const memes = JSON.parse(localStorage.getItem('memes'));
            setAccountMemes(memes.filter(meme => meme.author === username));
        }

        /*fetch(`${HostUrl}/account/${username}`, {    
            credentials: 'include',
            method: 'get',
        }).then(response => {
            if (response.status !== 200) {
                navigate('/login');
            }else{
                return response.json()
        }}).then(data => {
                setAccount(data)
        }).catch(error => {
             console.log(error);
        })

        fetch(`${HostUrl}/account/${username}/memes`, {
            credentials: 'include',
            method: 'get',
         }).then(response => {
            return response.json()
         }).then(data => {
                console.log("data"+data) 
                setAccountMemes(data)
         }).catch(error => {
            console.log(error);
         })*/

    },[]);

    return (
        <div className="flex">
            <div className="my-4 mr-4" style={{flex:'0.7',backgroundColor:theme.color4}}>
                {
                    accountMemes === 0 ? <div className="self-center">No memes</div> : (accountMemes.length === 0 ? <div className="self-center"> Loading.... </div> : accountMemes.map((meme) => {
                            return (
                                <MemeComponent meme={meme}/>
                            )
                        })
                    )
                }
            </div>
            <div style={{flex:'0.3',backgroundColor:theme.color4, height:'10em'}} className='my-4 py-4 ml-4'>
                <div >
                    <div style={{width:'100%'}}>
                        <img src={`data:image/${account.image_type};base64,${account.avatar}`} style={{width:'100px',height:'100px'}}/>
                        <div>
                            Username: {account.username}
                        </div>
                        <div>
                            Nickname: {account.nickname}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default AccountPage