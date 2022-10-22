import Header from './components/Header/Header.js'
import SimpleBottomNavigation from './components/MainNav.js';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/system';
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      < Header />
      <div className="app">
        <Container>
          <Routes>
            <Route exact path="/" element={<Trending/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/series" element={<Series/>}/>
            <Route path="/search" element={<Search/>}/>
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
