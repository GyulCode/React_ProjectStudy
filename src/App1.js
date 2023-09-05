import {Fragment,useState,useEffect} from "react";
import axios from "axios";

function App1(){
    // 1. 변수 설정 => 변경시 자동 화면에 영향을 미침 => 일반변수:useState()
    const [category,setCategory] = useState([])
    // === data:{category:[]}
    useEffect(() => {
        // 자동으로 호출되는 함수 == mounted:function(){} => window.load = function()
        // componentDidMount()
        axios.get("http://localhost/food/category1")
            .then(res=>{
                console.log(res.data)
                setCategory(res.data)
            })
    }, []);

    // 이벤트 처리
    const changeCategory=(cno)=> {
        if (cno === 1) {
            axios.get("http://localhost/food/category1")
                .then(res => {
                    setCategory(res.data)
                })
        } else if (cno === 2) {
            axios.get("http://localhost/food/category2")
                .then(res => {
                    setCategory(res.data)
                })
        } else if (cno === 3) {
            axios.get("http://localhost/food/category3")
                .then(res => {
                    setCategory(res.data)
                })
        }
    }
    const html=category.map((c,key)=>
        <div className="col-md-4" key={c.cno}>
            <div className="thumbnail">
                <a href="#">
                    <img src={c.poster} alt="Lights" style={{"width":"100%"}}/>
                    <div className="caption">
                        <p>{c.title}</p>
                    </div>
                </a>
            </div>
        </div>
    )

    return (
        <Fragment>
            <div className={"row"}>
                <div className={"text-center"}>
                    <input type={"button"} className={"btn btn-sm btn-danger"}
                           value={"믿고보는 맛집 리스트"} onClick={()=>changeCategory(1)}/>
                    <input type={"button"} className={"btn btn-sm btn-primary"}
                           value={"지역별 맛집 리스트"} onClick={()=>changeCategory(2)}/>
                    <input type={"button"} className={"btn btn-sm btn-success"}
                           value={"메뉴별 맛집 리스트"} onClick={()=>changeCategory(3)}/>
                </div>
            </div>
            <div style={{"height":"20px"}}></div>
            <div className={"row"}>
                {html}
            </div>
        </Fragment>
    )
}
export default App1;