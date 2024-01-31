import { useContext,useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

import MemeComponent from "../components/MemeComponent";
import MeComponent from '../components/MeComponent';
import { HostUrl } from "../contexts/host";
import CommentComponent from "../components/CommentComponent";

function MemePage()
{
    const [meme, setMeme] = useState({});
    const {id} = useParams();

    const [comments, setComments] = useState([]);
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();

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

    const formik = useFormik({
        initialValues: {
            body:''
        },
        onsubmit: values => {

        }
    })

    return(
        <div className="flex">
            <div style={{flex:'0.7'}} className="my-4 flex flex-col">
                <MemeComponent meme={meme}/>
                <div className="" style={{backgroundColor:theme.color4}}>
                    <div>
                        <form on>
                            <input name="body" type="text" placeholder="Comment" onChange={formik.handleChange} value={formik.values.body}/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    {
                        comments.map((comment) => {
                            return <CommentComponent comment={comment}/>
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

export default MemePage;