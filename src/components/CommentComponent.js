import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { useRef } from 'react';
import {useForwardedRef} from 'react';

import { ThemeContext } from '../contexts/theme';

function CommentComponent(props)
{  
    const theme = useContext(ThemeContext);
    const username = localStorage.getItem('username');
    const comment = props.comment;
    const meme = props.meme;

    const {id} = useParams();

    const memeId = props.memeId;
    const admins = JSON.parse(localStorage.getItem('admins'));

    function handleLike()
    {
        
        const comments = meme.comments;

        comments.forEach((comment_) => {
            if(comment_.author === comment.author && comment_.body === comment.body)
            {
                if(comment_.who_liked.includes(username)) return;
                comment_.who_liked.push(username);
            }
        })

        const memes = JSON.parse(localStorage.getItem('memes'));

        memes.forEach((meme_,index) => {
            if(meme_.id === memeId) memes[index] = meme;
        })

        localStorage.setItem('memes', JSON.stringify(memes));
    }

    function handleReport()
    {
        const comments = meme.comments;

        comments.forEach((comment_) => {
            if(comment_.author === comment.author && comment_.body === comment.body)
            {
                if(comment_.who_reported.includes(username)) return;
                comment_.who_reported.push(username);
            }
        })

        const memes = JSON.parse(localStorage.getItem('memes'));

        memes.forEach((meme_,index) => {
            if(meme_.id === memeId) memes[index] = meme;
        })

        localStorage.setItem('memes', JSON.stringify(memes));
    }

    function handleDelete() {
        const comments = meme.comments;
        console.log(comments);
        comments.forEach((comment_,index) => {
            if(comment_.author === comment.author && comment_.body === comment.body)
            {
                comments.splice(index,1);
            }
        })

        const memes = JSON.parse(localStorage.getItem('memes'));

        memes.forEach((meme_,index) => {
            if(meme_.id === memeId) memes[index] = meme;
        })

        localStorage.setItem('memes', JSON.stringify(memes));
    }

    return (
        <div className='p-2'>
            <p>{comment.body}</p>
            <button onClick={handleLike} className='m-1 w-12' style={{backgroundColor:theme.color3}}>
                {comment.who_liked.length}
            </button>
            <button onClick={handleReport} className='m-1 w-24'style={{backgroundColor:theme.color3}}>
                Report
            </button>
            {admins && admins.includes(username) && <button onClick={handleDelete}>DELETE</button>}
        </div>
    );
}

export default CommentComponent;