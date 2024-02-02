import React from 'react';
import { useNavigate } from 'react-router-dom';

function MemeRankComponent(props) {
    const meme = props.meme;
    const navigate = useNavigate();
    return (
        <div className="flex flex-col p-5" onClick={() => {navigate(`/meme/${meme.id}`)}}>
            <img style={{width:'100%'}} src={`data:image/${meme.payload_type};base64,${meme.payload}`}/>
            <div className="flex flex-row justify-between p-2">
                <p>{meme.title}</p>
                <p>{meme.who_liked && meme.who_liked.length}</p>
            </div>
            <p className="p-2">{meme.author}</p>
        </div>
    )
}

export default MemeRankComponent;