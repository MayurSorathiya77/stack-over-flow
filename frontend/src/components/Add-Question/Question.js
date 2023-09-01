import './CSS/Question.css'
import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/userSlice'
import axios from 'axios'


function Question() {
  const user = useSelector(selectUser)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([]);
  const [loading,setLoading] = useState(false)
  const [votes, setVotes] = useState(false);
  

  const history = useNavigate()

  const handleQuill = (value) => {
    setBody(value)
  }

  console.log(body?body:1);
  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };

  
  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
 
  const handleSubmit = async(e)=>{
      e.preventDefault()
      const flag =false;
      if(title!=="" && body!=="")
      {
        setLoading(true)
        const bodyJSON= {
          title : title,
          body : body,
          tag : JSON.stringify(tags),
          user : user

          
        }
        await axios.post('/api/question',bodyJSON).then((res)=>{
          alert('Question added successfully')
          setVotes(true);
          setLoading(false)
          history.push('/')
          flag = true;
        }).catch((err)=>{
          console.log('While Question Adding Problem')
          setLoading(false)
        })
               
      }   // add tages 
    


  }
  
  return (
    <div className='add-question'>
      <div className='add-question-container'>
        <div className='head-title'>
          <h1>Ask a Public Question</h1>
        </div>

        <div className='question-container'>
          <div className='question-options'>


            <div className='question-option'>
              <div className='title'>
                <h3>Body</h3>
                <small>Be Specific and imagine you're asking a question to another person</small>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='.....Question' />
              </div>
            </div>


            <div className='question-option'>
              <div className='title'>
                <h3>Body </h3>
                <small>Include all the information someone would need to answer  your question</small>
                <ReactQuill value={body} onChange={handleQuill} className='react-quill' theme='snow' />
              </div>
            </div>


            <div className='question-option'>
              <div className='title'>
                <h3>Tags</h3>
                <small>Add up to 5 tags to describe what your question is about</small>

                <div className="tag-container">
                  {tags.map((tag, index) => {
                    return (
                      <div key={index} className="tag">
                        {tag} <span onClick={() => removeTag(tag)}>x</span>
                      </div>
                    );
                  })}

                  <input onKeyDown={addTag} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button  type='submit' onClick={handleSubmit}  className='button'> {loading?'Adding Question..':'Add Your Question'}</button>
        </div>

      </div>

    </div>
  )
}

export default Question
