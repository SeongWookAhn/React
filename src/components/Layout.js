import {Outlet, Link} from 'react-router-dom';

const Layout = () => {
    const ulStyle = {
        display: 'inline'
    };
    const onLogoutHandler  = () => {
        window.localStorage.clear("loginUser")
        window.location.replace("/")
    };

    if ( window.localStorage.getItem("loginStatus") ) {
        return(
            <>
                <nav>
                    <ul style={ulStyle}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/mypage">Mypage</Link>
                        </li>
                        <li>
                            <a onClick={onLogoutHandler}>Logout</a>
                        </li>
                        <li>
                            <Link to="/map">MapContainer</Link>
                        </li>
                        <li>
                          <Link to="/chat">Chat</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </>
        );
    } else {
        return(
            <>
                <nav>
                    <ul style={ulStyle}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/Signin">Signin</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </>
        );
    };
};

export default Layout;