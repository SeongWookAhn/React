import React, { useState, useEffect } from "react";
import Axios from "axios";
import './GoodsBoard.css';
import { BsHeart } from 'react-icons/bs';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { response } from "express";
import res from "express/lib/response";


function GoodsBoard() {
  const [goodsContent, setGoodsContent] = useState([]);

    useEffect(()=>{
      Axios.get('/api/goodsboard')
      .then((response) => {setGoodsContent(response.data)})
      .catch(err=>console.log(err))
    }, [goodsContent]);

    // const { name, value } = e.target;
    // setGoodsContent({
    //   ...goodsContent,
    //   [name]: value
    // })
 
  return (
    <>
    <div className="goodsBoardTemplate">
      <div className="goodsBoardHead">중고거래 인기매물</div>
      <div className="goodsBoardAreaSelect">
        <select>
          <option>지역을 선택하세요</option>
          <option>서울특별시</option>
        </select>
      </div>
      <div>
        <div className="goodsBoardWrap_Goods">
          {goodsContent.map(element =>
            <>
            <div className="goodsBoardImg" />
            <div className="goodsBoardContents">
              <div className="goodsBoardName"><a href="./goodspage/:goods_number">{element.goods_title}</a></div>
              <div>
                <div className="goodsBoardPrice">{element.goods_price}</div>
                {/* <div>올린 시간</div> */}
              </div>
              <div className="goodsBoardCity">지역</div>
              <div className="goodsBoard">
                <div><BsHeart /></div>
                <div><IoChatbubblesOutline /></div>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default GoodsBoard;