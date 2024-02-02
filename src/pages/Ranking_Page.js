import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/theme";
import { HostUrl } from "../contexts/host";
import AccountRankComponent from "../components/AccountRankComponent";
import MemeRankComponent from "../components/MemeRankComponent";
import CommentRankComponent from "../components/CommentRankComponent";
import { useNavigate } from "react-router-dom";



function RankingPage() {
    const theme = useContext(ThemeContext);

    const [accounts, setAccounts] = useState([]);
    const [memes, setMemes] = useState([]);
    const [comments, setComments] = useState([]);

    const [rankMemes,setRankMemes] = useState([]);
    const [rankAccounts,setRankAccounts] = useState([]);
    const [rankComments,setRankComments] = useState([]);

    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
      if(username === null || username === '') {navigate('/login'); return};

      setAccounts(JSON.parse(localStorage.getItem('accounts')));
      setMemes(JSON.parse(localStorage.getItem('memes')))
    
    },[])

    useEffect(() => {
      setRankAccounts(accounts.sort((a,b) => b.who_liked.length - a.who_liked.length))
    },[accounts])

    useEffect(() => {

      const comments = [];

      memes.forEach((meme) => {
        meme.comments.forEach((comment) => {
          comments.push(comment)
        })
      })
      
      setComments(comments)
      setRankMemes(memes.sort((a,b) => b.who_liked.length -a.who_liked.length))
    },[memes])

    useEffect(() => {
      
      setRankComments(comments.sort((a,b) => b.who_liked.length - a.who_liked.length))
    },[comments])

  return (
    <div className="flex flex-row">
      <div className="flex-1 mr-1" style={{backgroundColor:theme.color4}}>
        {
            rankAccounts && rankAccounts.map((account) => {
                return <AccountRankComponent account={account}/>
            })
        }
      </div>
      <div className="flex-1 ml-1 mr-1" style={{backgroundColor:theme.color4}}>
        {
            rankMemes && rankMemes.map((meme) => {
                return <MemeRankComponent meme={meme}/>
            })
        }
      </div>
      <div className="flex-1 ml-1" style={{backgroundColor:theme.color4}}>
        {
            rankComments && rankComments.map((comment) => {
                return <CommentRankComponent comment={comment}/>
            })
        }
      </div>
    </div>
  );
}

export default RankingPage;