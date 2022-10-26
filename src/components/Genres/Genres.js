import { Chip } from '@mui/material';
import axios from 'axios'
import React, { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPaginationState
}) => {

  const hanldeAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPaginationState({curPage: 1, numOfPages:0});
  }

  const hanldeRemove = (genre) => {
    setGenres([...genres, genre]);
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setPaginationState({curPage: 1, numOfPages:0});
  }

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{padding: "6px 0"}}>
      <ThemeProvider theme={darkTheme}>
        {selectedGenres && selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2}}
            size="small"
            color='primary'
            clickable
            key={genre.id}
            onDelete={() =>{hanldeRemove(genre)}}
          />
        ))}
        {genres && genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2}}
            size="small"
            clickable
            key={genre.id}
            onClick={() => {hanldeAdd(genre)}}
          />
        ))}
      </ThemeProvider>
    </div>
  )
}

export default Genres