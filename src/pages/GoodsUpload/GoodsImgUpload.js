import React, { useState } from "react";
import { IoIosCamera } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti'

function GoodsImgUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImgChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      if (filesArray.length + selectedFiles.length <= 10) {
        // console.log("filesArray: ", filesArray);

        setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        Array.from(e.target.files).map(
          (file) => URL.revokeObjectURL(file) // avoid memory leak
        );
      } else {
        alert("10개 이하로 올려주세요")
      }
    }
    console.log(selectedFiles);
  };

  const removeSelectedImage = (e) => {
    console.log(e.target.length);
    // setSelectedFiles((prevImages) => prevImages.splice(e.target.id, 1));
    //사진이 업로드 될 때만 나타나야하고 클릭시 아이콘 없어짐,setImgNum -1, setSelectedFiles -1
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return (
        <div>
          <TiDelete className="deleteIcons"
            onClick={removeSelectedImage}
            id={source.indexOf(photo)}
          />
          <img src={photo} alt="" key={photo} />
        </div>
      );
    });
  };

  return (
      <div className="GoodsImgUploadBlock">
        <div className="imgSelect">
          <form action="/goodsupload" encType="multipart/form-data" method="post">
            <input
              type="file"
              id="imgFile"
              multiple
              accept="image/*"
              name="goods_img"
              onChange={handleImgChange}
            />
            <label for="imgFile">
              <IoIosCamera />
              <div>{ selectedFiles.length } / 10</div>
            </label>
          </form>
        </div>
        <div className="imgResult">
            {renderPhotos(selectedFiles)}
        </div>
      </div>
  )
}

export default React.memo(GoodsImgUpload);
