import React from "react";
import Axion from "axios";
import './GoodsPage.css'
import { IoShareOutline } from 'react-icons/io5';
import { IoMdMore } from 'react-icons/io';

function GoodsPage() {
  return(
    // <form action="/goodspage" method="GET">
      <div className="GoodsPgTemplate">
        <div className="GoodsPgNav">
          <IoShareOutline />
          <IoMdMore />
          <div><a href="/goodspage/delete/:id">삭제</a></div>
          <div><a href="/goodspage/delete/:id">수정</a></div>
        </div>
        <div className="GoodsImages">
          {/* 받아온 이미지 */}
        </div>
        <div className="GoodsPgUserInfo">
          <div className="GoodsPgUserInfoLeft">
            <div className="GoodsPgUserImg" />이미지
            <div>
              <div /> 이름
              <div /> 동네
            </div>
          </div>
          <div>매너온도</div>
        </div>
        <div className="GoodsPgContent">
          <div>
            <select>
            <option>판매중</option>
            <option>예약중</option>
            <option>거래완료</option>
            </select>
          </div>
          {/* 뭘로 받아와야하는거지? */}
          <div><h4>제목</h4></div>
          <div><h6>카테고리</h6></div>
          <div>내용</div>
          <div className="GoodsPgContentBottom">
            <div>채팅</div>
            <div>관심</div>
            <div>조회</div>
          </div>
        </div>
        <div className="GoodsPgReport">
          이 게시글 신고하기
        </div>
        <div className="GoodsPgUsersGoods">
          <div className="GoodsPgUserGoodsUserid">
            <div>아이디 님의 판매 상품</div>
            <div>더보기</div>
          </div>
          <div>
            <div>사진</div>
            <div>제목</div>
            <div>가격</div>
          </div>
        </div>
      </div>
    // </form>
  );
};

export default GoodsPage;