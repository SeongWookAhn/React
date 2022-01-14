import React from "react";
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import { useEffect, useState} from 'react';
import styled from "styled-components";

function MainBoardIdx({match}) {
    const [viewContent , setViewContent] = useState([]);

    useEffect(()=>{
      Axios.get('http://localhost:5001/api/mainboard/idx').then((response)=>{
        setViewContent(response.data);
      })
    },[viewContent])
    

return(
    <> 
    <div className="App">
                <h1>Movie Review</h1>
                <div className='movie-container'>
                    {viewContent.map(element =>
                        <div className="title">
                            <a href={`mainboard/${element.idx}`}>
                            <b>{element.title}</b>  
                            </a>
                            &nbsp; {element.addr}
                        </div>
                    ).reverse()}
                </div>
            </div>
    <a href="../board">
        <Button2>
            글 쓰기
        </Button2>
    </a>
</>
    )
}

export default MainBoardIdx;

const Button2 = styled.button`
  width: 140px;
  border-radius: 5px;
  border: solid 1px #ffdcc5;
  box-sizing: border-box;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 7px;
  height: 40px;
  margin: 0px 5px;
  background-color: #ffffff;
  color: #666666;
`;