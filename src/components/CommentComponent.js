import React from 'react';
import { useParams } from 'react-router-dom';

function CommentComponent(props)
{
    const comment = props.comment;

    const {id} = useParams();

    function handleLike()
    {
        fetch(`http://localhost:7475/comment/${id}/givelike`,
        {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => response.json())
    }
    function handleReport()
    {
        fetch(`http://localhost:7475/comment/${id}/report`,
        {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => response.json())
    }

    return (
        <div>
            <p>{comment.body}</p>
            <button onClick={handleLike}>
                Like
            </button>
            <button onClick={handleReport}>
                Report
            </button>
        </div>
    );
}

export default CommentComponent;