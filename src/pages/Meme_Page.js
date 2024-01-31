import { useContext,useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";
import { useParams } from "react-router-dom";

import MemeComponent from "../components/MemeComponent";

function MemePage()
{
    const [meme, setMeme] = useState({});
    const {id} = useParams();

    const [comments, setComments] = useState({});

    useEffect(() => {
        fetch(`${HostUrl}/meme/${id}`, {    
            credentials: 'include',
            method: 'get',
        }).then(response => {
            if (response.status !== 200) {
                navigate('/login');
            }else{
                return response.json()
        }}).then(data => {
                setMeme(data)
        }).catch(error => {
             console.log(error);
        })
    })

    return(
        <div className="flex">
            <div style={{flex:'0.7'}} className="my-4 flex flex-col">
                <MemeComponent meme={meme}/>
                <div className="">
                    {
                        comments.map((comment) => {
                            
                        })
                    }
                </div>
            </div>
            <div style={{flex:'0.3'}} >
                <MeComponent/>
            </div>
        </div>
    )
}