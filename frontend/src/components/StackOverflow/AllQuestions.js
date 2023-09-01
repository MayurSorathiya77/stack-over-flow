import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './CSS/AllQuestions.css'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios';
import { set } from 'mongoose';


function AllQuestions({question}) {

    let tags = JSON.parse(question?.tags[0])
    const [vote,setVote] = useState(Number);
    const [views,setViews] = useState(Number);
    const id = question._id;
    
    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+" ........ ":str
    }
    //const tags = []

    useEffect(() => {
        // This code runs after the component renders
        // You can perform data fetching or other tasks here
        
        // Example: Fetch data from an API
        
        async function myAsyncFunction() {
            
            let response = await axios.get(`http://localhost:3000/api/questionvote/${id}`);
            let dataa = response.data[0];
            
            
            
            let a  = dataa?.view;
            let b = dataa?.vote;
            
            setViews(a);
            setVote(b);
            

        }
        myAsyncFunction();
      }, [id]);
      

      
    return (
        <div className='all-questions'>
            <div className='all-questions-container'>

                <div className='all-questions-left'>
                    <div className='all-options'>
                        <div className='all-option'>
                        <p>{vote}</p>
                            <span>Votes</span>
                        </div>
                        <div className='all-option'>
                            
                            <p>{question?.answerDetails?.length}</p>
                            <span>answers</span>
                        </div>
                        <div className='all-option'>
                            <p>{views}</p>
                            <span>views</span>
                        </div>

                    </div>
                </div>
                <div className='question-answer'>
                    <Link to={`/question?q=${question?._id}`}>{question?.title}</Link>
                    <div style={{ width: "90%" }}>
                        <div>{ReactHtmlParser(truncate(question?.body,200))}</div>
                    </div>
                    <div style={{ display: "flex" }}>
                    {
                        tags.map((_tag)=>(<>
                           
                                 <span className='question-tags'>{_tag}</span>
                            
                        </>))
                    }
                    </div>
                    
                    <div className='author'>
                        <small>{new Date(question?.created_at).toLocaleString()}</small>
                        <div className='author-details'>
                            <AccountCircleIcon src = {question?.user?.photo}/>
                            <p>{question?.user?.displayName ? question?.user?.displayName:String(question?.user?.email).split('@')[0]}</p>
                        </div>
                    </div>
                </div>




            </div>


        </div>
    )
}

export default AllQuestions
