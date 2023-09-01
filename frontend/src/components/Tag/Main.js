import React from 'react'
import { Link } from 'react-router-dom'


import FilterList from '@mui/icons-material/FilterList';
import './CSS/Main.css'
function Main({ questions }) {
  return (

    <div className='main'>
      <div className='main-container'>

        <div className='main-top'>
          <h2>All Tags</h2>
          <Link to='/add-question'>
            <button>Ask Question</button>
          </Link>
        </div>

        <div className='main-desc '>
          <p>{questions && questions?.length} Questions </p>
          <div className='main-filter'>
            <div className='main-tabs'>
              <div className='main-tab'>
                <Link>Newest</Link>
              </div>
              <div className='main-tab'>
                <Link>Active</Link>
              </div>
              <div className='main-tab'>
                <Link>More</Link>
              </div>
            </div>
            <div className='main-filter-item'>
              <FilterList />
              <p>Filter</p>
            </div>
          </div>
        </div>

        <div className="card-container">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <h5 className="card-title">Card {index + 1}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
              </div>
            </div>
          ))}
        </div>







      </div>
    </div>
  )
}

export default Main

