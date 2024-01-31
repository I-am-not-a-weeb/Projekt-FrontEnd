import React from 'react'
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
        fetch(`http://localhost:7475/meme/${id}/givelike`,
        {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => response.json())
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
    return (
        <div className="mt-1 mb-1 p-2" style={{backgroundColor:theme.color4}}>
            <p>{title}</p>
            <div>
                {
                    //tags.map((tag) => 
                    //{
                    //    return (<span>{tag}</span>)
                    //})  
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
            <button onClick={handleLike}>
                Like
            </button>
            <button onClick={handleReport}>
                Report
            </button>
        </div>
    )
}

export default MemeComponent