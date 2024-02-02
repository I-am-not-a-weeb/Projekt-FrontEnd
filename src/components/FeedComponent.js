import { useState } from 'react'
import { useContext,useEffect } from 'react'

import { ThemeContext } from '../contexts/theme'
import { useParams,useNavigate } from 'react-router-dom'

import { HostUrl } from '../contexts/host'
import { SessionContext } from '../contexts/session'

import  MemeComponent from './MemeComponent'
import { useFormik } from 'formik'

function FeedComponent(props) {
    const theme = useContext(ThemeContext);

    const [feed,setFeed] = useState([])


    useEffect(() => {
        localStorage.getItem('memes')!== null ? setFeed(JSON.parse(localStorage.getItem('memes'))) : setFeed([]);

    }, []);

    const formik = useFormik({
        initialValues:{
            searchbar:'',
            tag:''
        },
        onSubmit: values =>
        {
            console.log('aaaaa');
            const {searchbar,tag} = values;

            const tagQuery = (tag === '') ? '' : `tag=${tag}`;
            const searchQuery = (searchbar === '') ? '' : `search=${searchbar}`;
            const query = ((tagQuery!=='' || searchQuery!=='') ? '?': '')+tagQuery + ((tagQuery!==''&&searchQuery!=='') ? '&' : '') + searchQuery;

            console.log(query);

            const memes = JSON.parse(localStorage.getItem('memes'));


            const feed_memes = memes.filter((meme) =>{
                if(tag !== '' && searchbar !== '')
                {
                    return meme.tags.includes(tag) && meme.title.includes(searchbar);
                }
                else if(tag !== '')
                {
                    return meme.tags.includes(tag);
                }
                else if(searchbar !== '')
                {
                    return meme.title.includes(searchbar);
                }
                else
                {
                    return true;
                }
            })
            setFeed(feed_memes);

        }
    })

    return (
        <div  className="my-4 py-4 mr-4">
            <div  className='p-2' style={{backgroundColor:theme.color4}}>
                <form onSubmit={formik.handleSubmit} className='flex justify-evenly'>
                    <input id='searchbar' name='searchbar' type='text' onChange={formik.handleChange} value={formik.values.searchbar}/>
                    <label htmlFor='tag'>Tag:</label>
                    <input id='tag' name='tag' type='text'onChange={formik.handleChange} value={formik.values.tag}/>
                    <input type='submit' value='Search' className='w-16' style={{backgroundColor:theme.color1, color: theme.color3}}/>
                </form>
            </div>

            <div className='mt-2' >
                {
                    feed.map((meme)=>
                    {
                        return <MemeComponent meme={meme}/>
                    })
                }
            </div>
        </div>
    )
}

export default FeedComponent