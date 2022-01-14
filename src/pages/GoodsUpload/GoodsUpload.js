import React from "react";
import './GoodsUpload.css'
import { CgClose } from 'react-icons/cg';
import GoodsImgUpload from "./GoodsImgUpload";
import { GrFormNext } from 'react-icons/gr';
import { MdPostAdd } from 'react-icons/md';
import { BsSliders } from 'react-icons/bs';

function GoodsUpload() {
  return (
    <form action="/goodsupload" method="POST">
    <div className="GoodsUploadTemplate">
      <div className="GoodsUploadHead">
        <div><CgClose /></div>
        <div>중고거래 글쓰기</div>
        <div>
          <label for="submit" style={ {"color":"orange"} }>완료</label>
          <input type="submit" id="goodsUpload_submit"/>
        </div>
      </div>
      <GoodsImgUpload />
      <div className="GoodsUploadTitle">
        <input type="text" placeholder="글 제목" className="GoodsUploadTitleBox" name="goods_title"/>
      </div>
      <div className="GoodsUploadCategory">
        <div>카테고리 선택</div>
        <GrFormNext />
      </div>
      <div className="GoodsUploadPrice">
        <input type="text" placeholder="₩ 가격 (선택사항)" onfocus="this.value='₩ '" className="GoodsUploadPriceBox" name="goods_price"/>
        <div>
          <input type="checkbox" id="goodsPrice" />
          <label for="goodsPrice">가격 제안받기</label>
        </div>
      </div>
      <div className="GoodsUploadContents">
      <input type="textarea" id="goodsContents" placeholder="000동에 올릴 게시글 내용을 작성해주세요.(가품 및 판매 금지품목은 게시가 제한될 수 있어요.)" name="goods_description"/>
      </div>
      <div className="GoodsUploadFooter">
        <div><MdPostAdd />자주 쓰는 문구 </div>
        <div><BsSliders /> 보여줄 동네 설정</div>
      </div>
    </div>
    </form>
  )
}

export default GoodsUpload;