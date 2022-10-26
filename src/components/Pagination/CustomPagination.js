import { Pagination } from '@mui/material'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CustomPagination = ({paginationState, setPaginationState}) => {
    
  const handlePageChange = (page) => {
    window.scroll(0,0);
    setPaginationState({curPage: parseInt(page), numOfPages: paginationState.numOfPages});
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination 
          page={paginationState.curPage}
          count={paginationState.numOfPages}
          color="primary"
          size="small"
          onChange={(e) => handlePageChange(e.target.textContent)}
          hideNextButton
          hidePrevButton/>
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination