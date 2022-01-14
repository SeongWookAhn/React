import React, { useEffect, useState }   from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DaumPostCode from 'react-daum-postcode';

export default function Mypage() {
  const [usernickname, setUsernickname] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userphonenumber, setUserphonenumber] = useState('');
  const [useraddress, setUseraddress] = useState('');
  const [isDaumPost, setIsDaumPost] = useState(false);

  useEffect(()=>{
    axios.post("http://ec2-3-36-93-166.ap-northeast-2.compute.amazonaws.com:3000/api/mypage", {
      signinid: window.localStorage.getItem("loginUser"),
  }).then((response)=>{
      setUsernickname(response.data.usernickname)
      setUseremail(response.data.useremail)
      setUserphonenumber(response.data.userphonenumber)
      setUseraddress(response.data.useraddress)
    })
  },[])

  const onUsernicknameHandler = (event) => {
    setUsernickname(event.currentTarget.value)
  }
  const onUseremailHandler = (event) => {
      setUseremail(event.currentTarget.value)
  }
  const onUserphonenumberHandler = (event) => {
      setUserphonenumber(event.currentTarget.value)
  }

  const onOpenPosthandler = () => {
    setIsDaumPost(true)
  }
  const onAddresshandler = (data) => {
    let AllAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setUseraddress(AllAddress);
    setIsDaumPost(false)
  }

  const onChangeUserSubmitHandler = async() => {
    axios.post("http://ec2-3-36-93-166.ap-northeast-2.compute.amazonaws.com:3000/api/changeuser", {
      userid: window.localStorage.getItem("loginUser"),
      usernickname: usernickname,
      useremail: useremail,
      userphonenumber: userphonenumber,
      useraddress: useraddress
    }).then(window.localStorage.setItem("loginUserAddr", useraddress))
      .then(window.location.replace("/"));
  };

  return (
    <>
      <div>
        <h2>{window.localStorage.getItem("loginUser")}님의 MyPage</h2>
        <form onSubmit={onChangeUserSubmitHandler}>
          <label>닉네임 : </label>
          <input type="text" value={usernickname || ''} onChange={onUsernicknameHandler} />
          <br />
          <label>이메일 : </label>
          <input type="text" value={useremail || ''} onChange={onUseremailHandler} />
          <br />
          <label>전화번호 : </label>
          <input type="text" value={userphonenumber || ''} onChange={onUserphonenumberHandler} />
          <br />
          <label>주소 : </label>
          <input type="text" value={useraddress || ''} onClick={onOpenPosthandler} readOnly/>
          {
            isDaumPost ?
              <DaumPostCode
                onComplete={onAddresshandler}
                autoClose
                isDaumPost={isDaumPost}
              />
            : null
          }
          <br />
          <button type="submit">회원정보 수정</button>
        </form>
      </div>
    </>
  );
}