import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {selectUser} from '../../features/userSlice'
import {useSelector} from 'react-redux'
import RestorePageIcon from '@mui/icons-material/RestorePage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReactQuill from 'react-quill'
import ReactHtmlParser from 'react-html-parser'
import 'react-quill/dist/quill.snow.css'
import './CSS/index.css'
import axios from 'axios';


function MainQuestion() {
  const user = useSelector(selectUser)
  const [show, setShow] = useState(false);
  const [body, setBody] = useState("")
  const [commentBody, setComment] = useState(null)
  const [questionData,setQuestionData] = useState([]);
  const [vote,setVote] = useState(Number);
  const [answers,setAnswers] = useState([]);  
  
  
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('q');

  const handleQuill = (value) => {
    setBody(value)
  }

  useEffect(() => {
    async function getComment() {
      try {
        const response = await fetch(`http://localhost:3000/api/comment/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const commentData = await response.json();
        setComment(commentData);
       console.log(commentData);
      } catch (error) {
        console.error('Error fetching comment:', error);
      }
    }
    
    async function getAnswers() {
      try {
        const response = await fetch(`http://localhost:3000/api/answer/${id}`);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log(data); 
        console.log("HHH");// Do something with the retrieved data
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    }
    
    getAnswers();
    
    getComment();
  }, [id]);
  
  useEffect(() => {
    async function getQuestionDetails() {
      try {
        const response = await axios.get(`/api/question?${id}`);
        //const re1 = await axios.get(API_URL);
          //console.log(re1.data);
          
          let current = response.data;
          current =  current.filter((data) =>{return data._id == id;})
          console.log(current);
          setQuestionData(current);
          // const answerArray = await axios.get(`http://localhost:3000/api/answer/${id}`);

          // //const answerArray = await axios.get(`http://localhost:3000/api/answer/64de04dbaef3fcf43d1bda6f`);
          // setAnswers(answerArray);
          // console.log(answerArray);

        console.log("Question fetched successfully");
      } catch (error) {
        console.log(error);
      }
    }

    async function myAsyncFunction() {
            
      let response = await axios.get(`http://localhost:3000/api/questionvote/${id}`);
      let dataa = response.data[0];
      
      let a  = dataa?.view;
      let b = dataa?.vote;
      
      setVote(b);
      
    }
  
    myAsyncFunction();
    
    getQuestionDetails();
    
  }, [id]);

 // upview

 async function incView()
    {
      let response = await axios.put(`http://localhost:3000/api/questionvote/upview/${id}`);
    }
   

  // upvote
  useEffect(()=>{
    incView();
    return ()=>console.log("inview called");
  },[])

  async function upvote() {
    try { 
      if(1){
        
       let response = await axios.put(`http://localhost:3000/api/questionvote/upvote/${id}`);
        
        setVote(response.data.newVote);
        
      }
    } catch (error) {
        console.error(error);
    }
}

// downvote

  async function downvote() {
    try { 
      if(1){
        
       let response = await axios.put(`http://localhost:3000/api/questionvote/downvote/${id}`);
        
        setVote(response.data.newVote);
        
      }
    } catch (error) {
        console.error(error);
    }
}
 

  // add Answer
  const hendlAnswerSubmit = async(e)=>
  {
    e.preventDefault()

    
    if(body!=="")
    { 
      
      console.log(body);

      const answerJSON= {
        question_id:id,
        answer : body,
        user: user,
      }
      const url = `http://localhost:3000/api/answer`;
      const re = await axios.post(url, answerJSON);
      
      
    }

  }
  ////  Added Answer


  // Add Comment

  const handleComment = async (e) => {
    e.preventDefault();
    if (commentBody !== null) {
      const commentJSON = {
        question_id: id,
        comment: commentBody,
        user: user,
      };
      
      
      const url = `http://localhost:3000/api/comment`;
       await axios.post(url, commentJSON).then((e)=>{console.log("oklkkk")}).catch((err)=>{console.error("err");})
      
      
    } else {
      console.log("Comment body is null");
    }
  };

  // get Answer  of The Question 

  const jsxElements = answers.map((question, index) => (
    
      <div className='all-questions-container'  key={index}>
        <div className='all-questions-left'>
          <div className='all-options'>
            <p className="arrow">▲</p>
            <p className="arrow">0</p>
            <p className="arrow">▼</p>
            <BookmarkIcon />
            <RestorePageIcon />
          </div>
        </div>
        <div className='question-answer'>
          <p>{question.answer}</p> {/* Replace with actual question text */}
          <div className='author'>
            <small>Time stamp : {questionData[0]?.user?.displayName ? questionData[0]?.user?.displayName:String(questionData[0]?.user?.email).split('@')[0]}</small> {/* Replace with actual author and timestamp */}
            <div className='auth-details'>
              <AccountCircleIcon />
              <p>-: {new Date(questionData[0]?.created_at).toLocaleString()}</p> {/* Replace with actual author name */}
            </div>
          </div>
        </div>
      </div>
    
  ));



  return (
    
    <div className='main'>
      <div className='main-container'>
        <div className='main-top'>
          <h2 className='main-question'>{questionData?.title}</h2>
          <Link to='/add-question'>
            <button>Ask Question</button>
          </Link>
        </div>

        <div className='main-desc'>
          <div className='info'>
            <p>Timestamp</p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed <span>43 times</span>
            </p>

          </div>
        </div>
        
      
      <>
       {questionData && 
        <div className='all-questions'>
          <div className='all-questions-container'>
            <div className='all-questions-left'>
              <div className='all-options'>
                <p className="arrow"><a onClick={upvote}>▲</a></p>

                <p className="arrow">{vote}</p>

                <p className="arrow"><a onClick={downvote}>▼</a></p>
                <a><BookmarkIcon /></a>
                <a><RestorePageIcon /></a>
              </div>
            </div>
            <div className='question-answer'>
              <p><b>{questionData[0]?.title}</b></p>
              <br/>
              <p style={{ maxWidth: '1400px',minHeight:'250px' ,maxHeight:'700px', overflow: 'scroll' }}>
                {ReactHtmlParser(questionData[0]?.body)}
              </p>
              <br/>
              <div className='author'>
                <small><b>Timestamp </b> : {new Date(questionData[0]?.created_at).toLocaleString()}</small>
                <div className='auth-details'>
                  
                  <p><b>Auther</b> : {questionData[0]?.user?.displayName ? questionData[0]?.user?.displayName:String(questionData[0]?.user?.email).split('@')[0]}</p>
                </div>
              </div>

              
              <div className='comments'>
                <div className='comment'>
                  <p>

                    This is Comment

                    <span>User Name</span>
                    <small>Timestamp</small>
                  </p>
                </div>



                <p onClick={() => setShow(!show)}>Add A comment</p>
                {
                  show && (
                    <div className='title'>

                      <textarea
                        type="text"
                        placeholder='Add Your Comment..'
                        rows={5}
                        value={commentBody}
                        onChange={(event) => setComment(event.target.value)}

                      >
                      </textarea>
                      <button onClick={handleComment}> Add Comment</button>

                    </div>
                  )
                }
              </div>
            </div>

          </div>
        </div>
       }
        </>
              

       

        <div className='all-questions'>
          <p className='no-fo-answer'>kkkkk</p>
          <div className='all-questions-container'>
            <div className='all-questions-left'>
              <div className='all-options'>
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>
                <BookmarkIcon />
                <RestorePageIcon />
              </div>
            </div>
            <div className='question-answer'>
              <p>This is Question Body</p>
              <div className='author'>
                <small>askwed : "Timestamp" </small>
                <div className='auth-details'>
                  <AccountCircleIcon />
                  <p>-: Mayur Sorthiya</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      

      <div className='main-answer'>
        <h3 className='h3-tital'>
          Your Answer
        </h3>
        <ReactQuill className='react-quill' theme='snow' style={{
          height: "250px"
        }} value={body} onChange={handleQuill}/>

      </div>
      <button className='last-button' onClick={hendlAnswerSubmit}>Post Your Answer</button>

    </div>
  )
}

export default MainQuestion
