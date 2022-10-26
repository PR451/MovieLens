import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import "./Trending.css"

const Trending = () => {
  const [content, setContent] = useState([]);
  const [paginationState, setPaginationState] = useState({curPage: 1, numOfPages: 10});

  const fetchTrending = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${paginationState.curPage}`
    );

    setContent(data.results);
  }

  useEffect(() => {
    fetchTrending()
  }, [paginationState.curPage])
  

  return (
    <div>
        <span className='pageTitle'>Trending</span>
        <div className='trending'>
          {content && content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name} date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}/>
          ))}
        </div>
        
        <CustomPagination paginationState={paginationState} setPaginationState={setPaginationState}/>

    </div>
  )
}

export default Trending