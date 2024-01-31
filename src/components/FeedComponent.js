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

    const page = props.page;

    useEffect(() => {
        console.log('page: '+page)
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

            fetch(`${HostUrl}/search/${query}`,{
                method:'GET',
                credentials:'include',
            }).then(res => {
                if(res.status === 200){
                    return res.json();
                }
                else{
                    alert('Error in searching');
                }
            }).then(data => {
                setFeed(data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    })

    return (
        <div  className="my-4 py-4 mr-4">
            <div  className='p-2' style={{backgroundColor:theme.color4}}>
                <form onSubmit={formik.onSubmit} className='flex justify-evenly'>
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