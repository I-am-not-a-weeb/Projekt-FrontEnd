import React, { useState } from "react";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';


import { ThemeContext } from "../contexts/theme";

function UploadMemeComponent() {
  const [meme, setMeme] = useState(null);
  const theme = useContext(ThemeContext);
  const [tags, setTags] = useState([]); // ['tag1', 'tag2'

  const validationSchema = Yup.object({
    meme: Yup.string().required('Avatar is required'),
    title: Yup.string().required('Title is required'),
    //tags: Yup.array().of(Yup.string()).required('Tags are required'),
  });

  const formik = useFormik({
    initialValues: {
      //meme: '',
      title: '',
      //tags: []
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('1');
      const { title } = values;
      console.log(12);
      const username = localStorage.getItem('username');
      console.log(15);
      const prom =  new Promise((resolve) => {

        if(!meme) return alert('Please select a meme');
        const reader = new FileReader(); 
        reader.readAsDataURL(meme);
      
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          const image = base64String;
          const imageType = meme.type;
          resolve({ image, imageType });
      };
    });

    prom.then(({ image, imageType }) => {
      const data = {
          'id':uuidv4(),
          'payload':image,
          'payload_type':imageType.split('/')[1],
          'title':title,
          'tags':tags,
          'author': username,
          'comments':[],
          'who_liked':[],
          "who_reported":[],
      }


      if(localStorage.getItem('memes') === null) localStorage.setItem('memes', JSON.stringify([]));

      if(title.length === 0 ) return alert('Title must be at least 8 characters');

      console.log(data)
    
      const memes = JSON.parse(localStorage.getItem('memes'))

      localStorage.setItem('memes', JSON.stringify([...memes,data]));

    })
  }});

  const handleMemeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMeme(e.target.files[0]);
    }
    formik.handleChange(e);
  }
  
  const handleTagsChange = (e) => {
    formik.handleChange(e);
  }
  const handleTagAdd = (e) => {
    setTags([ formik.values.tags,...tags]);
  }

  return (
    <div className="py-4 mr-4" style={{ backgroundColor: theme.color4 }}>
          <form onSubmit={formik.handleSubmit} className="p-2 flex flex-col">
              <input
                id="meme"
                type="file"
                accept="image/*, video/*"
                onChange={handleMemeChange}
                value={formik.values.meme}
              />
              <img style={{maxHeight:'250px',maxWidth:'250px'}} src={meme ? URL.createObjectURL(meme) : ''}/>

              <label htmlFor="title">Title</label>
              <input name="title" type="text" onChange={formik.handleChange} value={formik.values.title}/>
              <div className="flex flex-row p-1">

              {tags.map((el)=>
              {
                return <div className="m-1 p-1" style={{backgroundColor:theme.color2, color:theme.color4}}>{el}</div>
              })}

              </div>
              <span>
                <label className="m-1" htmlFor="tags">Tags</label>
                <input className="m-1" name="tags" type="text" onChange={handleTagsChange} value={formik.values.tags}/>
                <button type="button" onClick={handleTagAdd}>
                  Add tag
                </button>
              </span>

              <button type="submit" className="w-32" style={{ backgroundColor: theme.color1, color: theme.color3}}>Submit</button>
          </form>
    </div>
  );
}

export default UploadMemeComponent;