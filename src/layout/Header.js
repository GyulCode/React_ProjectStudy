import {NavLink} from "react-router-dom";

function Header(){
    return(
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <NavLink className="navbar-brand" to={"/"}>React(Hooks)</NavLink>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><NavLink to={"/"}>Home</NavLink></li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">맛집
                            <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><NavLink to={"/food/find"}>지역별 맛집 찾기</NavLink></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">여행
                            <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><NavLink to={"/seoul/location"}>명소</NavLink></li>
                            <li><NavLink to={"/seoul/nature"}>자연</NavLink></li>
                            <li><NavLink to={"/seoul/shop"}>쇼핑</NavLink></li>
                        </ul>
                    </li>
                    <li><a href="#">커뮤니티</a></li>
                    <li><a href="/news/news_find">오늘의 뉴스</a></li>
                </ul>
            </div>
        </nav>
    )
}
export default Header;