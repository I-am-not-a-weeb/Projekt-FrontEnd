import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/theme";
import { HostUrl } from "../contexts/host";
import AccountRankComponent from "../components/AccountRankComponent";
import MemeRankComponent from "../components/MemeRankComponent";
import CommentRankComponent from "../components/CommentRankComponent";




function RankingPage() {
    const theme = useContext(ThemeContext);

    const [accounts, setAccounts] = useState([]);
    const [memes, setMemes] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`${HostUrl}/ranking/accounts`, {    
            credentials: 'include',
            method: 'get',
        }).then(response => {
                return response.json()
        }).then(data => {
                setAccounts(data)
        }).catch(error => {
             console.log(error);
        })

        fetch(`${HostUrl}/ranking/memes`, {    
            credentials: 'include',
            method: 'get',
        }).then(response => {
                return response.json()
        }).then(data => {
                setMemes(data)
        }).catch(error => {
             console.log(error);
        })
        fetch(`${HostUrl}/ranking/comments`, {    
            credentials: 'include',
            method: 'get',
        }).then(response => {
                return response.json()
        }).then(data => {
                setComments(data)
        }).catch(error => {
             console.log(error);
        })
    },[])
  return (
    <div className="flex flex-row">
      <div className="flex-1 mr-1" style={{backgroundColor:theme.color4}}>
        {
            accounts.map((account) => {
                return <AccountRankComponent account={account}/>
            })
        }
      </div>
      <div className="flex-1 ml-1 mr-1" style={{backgroundColor:theme.color4}}>
        {
            memes.map((meme) => {
                return <MemeRankComponent meme={meme}/>
            })
        }
      </div>
      <div className="flex-1 ml-1" style={{backgroundColor:theme.color4}}>
        {
            comments.map((comment) => {
                return <CommentRankComponent comment={comment}/>
            })
        }
      </div>
    </div>
  );
}

export default RankingPage;