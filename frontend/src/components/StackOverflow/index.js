import React from 'react'
import './CSS/index.css'
import Sidebar from './Sidebar'
import Main from './Main'
import {useState,useEffect} from 'react'
import  axios  from 'axios'
function Index() {
  const [questions,setQuestions] = useState([]);
  useEffect(()=>{
    async function getQuestion()
    {
        await axios.get('/api/question').then((res)=>{
          
          setQuestions(res.data.reverse())
        }).catch((err)=>{
          console.log(err)
        })
    }
    getQuestion()
  },[])
  

  return (
  
    <div className='stack-index'>
        <div className='stack-index-content'>
            <Sidebar/>
            <Main questions = {questions}/>
        </div>
    </div>
  )
}

export default Index
//