import { useState } from 'react'
import { useContext,useEffect } from 'react'

import { ThemeContext } from '../contexts/theme'
import { useParams,useNavigate } from 'react-router-dom'

import { HostUrl } from '../contexts/host'
import { SessionContext } from '../contexts/session'

import  MemeComponent from './MemeComponent'

function FeedComponent(props) {
    const theme = useContext(ThemeContext);

    const [feed,setFeed] = useState([])

    const page = props.page;

    useEffect(() => {
        fetch(`${HostUrl}/feed/${page}`,
            {
                method: 'GET',
                credentials: 'include',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFeed(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [page]);

    return (
        <div className="my-4 py-4 mr-4" style={{backgroundColor:theme.color4}}>
            {
                feed.map((meme)=>
                {
                    return <MemeComponent meme={meme}/>
                })
            }
        </div>
    )
}

export default FeedComponent