import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Genres from '../../components/Genres/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import useGenre from '../../hooks/useGenre';

const Series = () => {
  const [content, setContent] = useState([]);
  const [paginationState, setPaginationState] = useState({ curPage: 1, numOfPages: 0 });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${paginationState.curPage}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setPaginationState({ curPage: paginationState.curPage, numOfPages: data.total_pages });
  }

  useEffect(() => {
    fetchSeries()
    // eslint-disable-next-line
  }, [paginationState.curPage, genreforURL]);


  return (
    <div>
        <span className='pageTitle'>Trending</span>

        <Genres 
          type="tv" 
          selectedGenres={selectedGenres} 
          setSelectedGenres={setSelectedGenres} 
          genres={genres} 
          setGenres={setGenres}
          setPaginationState={setPaginationState}/>
        <div className='trending'>
          {content && content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name} date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}/>
          ))}
        </div>
        {paginationState.numOfPages > 1 && (
          <CustomPagination paginationState={paginationState} setPaginationState={setPaginationState}/>
        )}

    </div>
  )
}

export default Series