import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

function MemeComponent(props) {
    const meme = props.meme;
    const {title,payload,payload_type,tags,id} = meme;

    const navigate = useNavigate();

    const theme = useContext(ThemeContext);

    function handleLike()
    {
        const username = localStorage.getItem('username');

        const memes = JSON.parse(localStorage.getItem('memes'));

        let flag_found = false;

        meme.who_liked.forEach((user) => {
            if(user === username) flag_found = true;
        })

        if(!flag_found)
        {
            meme.who_liked.push(username);
            memes.forEach((meme_, index) => {
                if(meme_.id === id) memes[index] = meme;
            })
            localStorage.setItem('memes', JSON.stringify(memes));
        }
    }

    function handleReport()
    {
        fetch(`http://localhost:7475/meme/${id}/report`,
        {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => response.json())
    }
    function handleClickToMemePage()
    {
        navigate(`/meme/${id}`);
    }

    useEffect(() => {
        
    },[])
    return (
        <div className="mb-1 p-2" style={{backgroundColor:theme.color4}}>
            <h2 className='font-bold'>{title}</h2>
            <div className='flex'>
                {tags &&
                    tags.map((tag) => 
                    {
                        return (<span className='p-1'>{tag}</span>)
                    })  
                }
            </div>
            <div onClick={handleClickToMemePage}>
                {(payload_type === 'png' || payload_type === 'jpg' || payload_type === 'jpeg' )&& (
                    <img src={`data:image/${payload_type};base64,${payload}`} style={{width:'100%'}}/>
                )}
                {payload_type === 'mp4' && (
                    <video src={`data:video/${payload_type};base64,${id}`} controls />
                )}
            </div>
            <div className='flex justify-around'>
                <button onClick={handleReport} className='m-1' style={{width:'100%',backgroundColor:theme.color3}}>
                    Report
                </button>
                <button onClick={handleLike} className='m-1' style={{width:'100%',backgroundColor:theme.color3}}>
                    {meme.who_liked && meme.who_liked.length}
                </button>
            </div>
        </div>
    )
}

export default MemeComponent