import { Button, Tab, Tabs, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [paginationState, setPaginationState] = useState({curPage: 1, numOfPages: 0});

  const fetchSearch = async () => {
    try {
      if(searchText !== ""){
        const {data} = await axios.get(
          `https://api.themoviedb.org/3/search/${type ? "tv":"movie"}?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&query=${searchText}&page=${paginationState.curPage}&include_adult=false`
        )
        setContent(data.results);
        setPaginationState({curPage: paginationState.curPage, numOfPages: data.total_pages});
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onClickFn = () => {
    fetchSearch();
    setIsSearch(true);
  }

  const onTextChangeFn = (e) => {
    setSearchText(e.target.value);
    setIsSearch(false);
  }

  useEffect(() => {
    fetchSearch()
    // eslint-disable-next-line
  }, [type, paginationState.curPage]);

  return (
    <div>
        <span className='pageTitle'>Search</span>
        <ThemeProvider theme={darkTheme}>
          <div style={{display: 'flex', margin: "15px 0"}}>
            <TextField
                style={{ flex: 1 }}
                className="searchBox"
                label="Search"
                variant="filled"
                onChange={onTextChangeFn}
              />
            <Button 
              variant='contained' 
              style={{marginLeft:10}}
              onClick={onClickFn}>
              <SearchIcon /> 
            </Button>
          </div>

          <Tabs 
            value={type} 
            indicatorColor="primary" 
            textColor='primary'
            onChange={(event, newValue) => {
              setType(newValue);
              setPaginationState({curPage:1, numOfPages:0})
            }}
            style={{paddingBottom: 5 }}>
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>

        </ThemeProvider>

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

        {searchText && isSearch &&
            content.length === 0 &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}

        {paginationState.numOfPages > 1 && (
          <CustomPagination paginationState={paginationState} setPaginationState={setPaginationState}/>
        )}



    </div>
  )
}

export default Search