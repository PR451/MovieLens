import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if(value===0)
      navigate("/")
    else if(value===1)
      navigate("/movies")
    else if(value===2)
      navigate("/series")
    else
      navigate("/search")

  }, [value,navigate])
  

  return (
    <BottomNavigation
      value={value}
      style = {{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2d313a",
        zIndex: 100,
      }}
      onChange={(event, newValue) => {
          setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        style={{ color: "white", backgroundColor: "#2d313a" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction 
        style={{ color: "white", backgroundColor: "#2d313a" }}
        label="Movies" 
        icon={<MovieIcon />} />
      <BottomNavigationAction 
        style={{ color: "white", backgroundColor: "#2d313a" }}
        label="TV Series" 
        icon={<TvIcon />} />
      <BottomNavigationAction 
        style={{ color: "white", backgroundColor: "#2d313a" }}
        label="Search" 
        icon={<SearchIcon />} />
    </BottomNavigation>
  );
}