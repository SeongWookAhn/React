import React from "react";
import Button from "../elements/Button"

function Home () {
    // let loginstate = window.localStorage.getItem("loginStatus").status;
    // let loginuser = window.localStorage.setItem("loginUser").user;
    // return (
    //     <div>
    //         <h1>Home</h1>
    //     </div>
    // );
    if ( window.localStorage.getItem("loginStatus") ) {
        return (
            <div>
                <h1>Home</h1>
                <b>{window.localStorage.getItem("loginUser")}님이 로그인 중입니다</b>
                <b>{window.localStorage.getItem("loginUserAddr")}</b>
                <a href="./mainboard">
                  <Button>
                    글 보는곳
                  </Button>
                </a>
            </div>
        );
    } else {
        return (
            <>
            <div>
                <h1>Home</h1>
            </div>
            <a href="./mainboard">
              <Button>
                글 보는곳
              </Button>
            </a>
            </>
        );
    };
};

export default Home;