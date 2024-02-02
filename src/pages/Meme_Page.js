import { useContext,useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/theme";
import { SessionContext } from "../contexts/session";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useRef } from "react";


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

    const memeIdRef = useRef('');

    useEffect(() => {
        const username = localStorage.getItem('username');

        const memes = JSON.parse(localStorage.getItem('memes'));


        memes.forEach((meme) => {
            if(meme.id === id) setMeme(meme);
            memeIdRef.current = meme.id;
        })
    },[])

    const formik = useFormik({
        initialValues: {
            body:''
        },
        onSubmit: values => {

            const comment = {
                author: localStorage.getItem('username'),
                body: values.body,
                who_liked: [],
                who_reported: []
            }

            meme.comments.push(comment);

            const memes = JSON.parse(localStorage.getItem('memes'));

            memes.forEach((meme_,index) => {
                if(meme_.id === meme.id) memes[index] = meme;
            })

            console.log(memes)
            localStorage.setItem('memes', JSON.stringify(memes));
        }
    })

    return(
        <div className="flex">
            <div style={{flex:'0.7'}} className="my-4 flex flex-col">
                <MemeComponent meme={meme}/>
                <div className="" style={{backgroundColor:theme.color4}}>
                    <div className="p-1">
                        <form onSubmit={formik.handleSubmit}>
                            <input className="w-full" name="body" type="text" placeholder="Comment" onChange={formik.handleChange} value={formik.values.body}/>
                            <button type="submit" className="w-24" style={{backgroundColor:theme.color3}} >Submit</button>
                        </form>
                    </div>
                    <div className="p-1">
                    {
                        meme.comments && meme.comments.map((comment) => {
                            return <CommentComponent memeId={meme.id} comment={comment} meme={meme}/>
                        })
                    }
                    </div>
                </div>
            </div>
            <div style={{flex:'0.3'}} >
                <MeComponent/>
            </div>
        </div>
    )
}

export default MemePage;