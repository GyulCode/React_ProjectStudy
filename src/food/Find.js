import {NavLink} from "react-router-dom";
import {useState,useEffect,Fragment} from "react";
import axios from "axios";


function Find(){
    // 변수 설정
    const [curpage,setCurpage]=useState(1)
    const [totalpage,setTotalpage]=useState(0)
    const [findList,setFoodList]=useState([])
    const [startPage,setStartPage]=useState(0)
    const [endPage,setEndPage]=useState(0)
    const [address,setAddress]=useState('마포')


    // 데이터 읽기
    useEffect(() => {
        axios.get('http://localhost/food/food_find_react',{
            params:{
                address:address,
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setFoodList(response.data)
        }).catch(error=>{
            console.log(error.response)
        })
        // 페이지
        axios.get('http://localhost/food/food_page_react',{
            params:{
                address:address,
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setCurpage(response.data.curpage)
            setTotalpage(response.data.totalpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
        }).catch(error=>{
            console.log(error.response)
        })
    }, []);
    // 이벤트 처리
    // 입력값으로 변환
    const findChange=(e)=>{
        setAddress(e.target.value)
    }
    // 버튼 클릭시 처리

    const findBtn=()=>{
        setCurpage(1)
        axios.get('http://localhost/food/food_find_react',{
            params:{
                address:address,
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setFoodList(response.data)


        }).catch(error=>{
            console.log(error.response)
        })

        axios.get('http://localhost/food/food_page_react',{
            params:{
                address:address,
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setCurpage(response.data.curpage)
            setTotalpage(response.data.totalpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
        }).catch(error=>{
            console.log(error.response)
        })
    }
    const html=findList.map((c,key)=>

        <div className="col-md-3" key={c.cno}>
            <div className="thumbnail">
                <NavLink to={"/food/food_list/"+c.cno}>
                    <img src={c.poster} alt="Lights" style={{"width": "100%"}}/>
                    <div className="caption">
                        <p>{c.name}</p>
                    </div>
                </NavLink>
            </div>
        </div>

    )


    // 페이지 변경
    const pages=(page)=>{
        axios.get('http://localhost/food/food_find_react',{
            params:{
                address:address,
                page:page
            }
        }).then(response=>{
            console.log(response.data)
            setFoodList(response.data)
        }).catch(error=>{
            console.log(error.response)
        })

        axios.get('http://localhost/food/food_page_react',{
            params:{
                address:address,
                page:page
            }
        }).then(response=>{
            console.log(response.data)
            setCurpage(response.data.curpage)
            setTotalpage(response.data.totalpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
        }).catch(error=>{
            console.log(error.response)
        })
    }
    const pageChange=(page)=>{
        pages(page)
    }
    const pagePrev=()=>{
        pages(startPage-1)
    }
    const pageNext=()=>{
        pages(endPage+1)
    }

    let row=[]
    if(startPage>1)
    {
        row.push(<li><a href={"#"} onClick=
            {()=>pagePrev(startPage>1?startPage-1:startPage)}>&lt;</a></li>)
    }

    for(let i=startPage;i<=endPage;i++)
    {
        if(i===curpage)
        {
            row.push(<li className={"active"}><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }
        else
        {
            row.push(<li><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }
    }
    if(endPage<totalpage)
    {
        row.push(<li><a href={"#"}
                        onClick={()=>pageNext(endPage<totalpage?endPage+1:endPage)}>&gt;</a></li>)
    }
    return (
        <Fragment>
            <div className={"row"}>
                <table className={"table"}>
                    <tr>
                        <td>
                            <input type={"text"} className={"input-sm"}
                                   size={"25"} value={address} onChange={findChange}/>
                            <input type={"button"} className={"btn btn-sm btn-primary"}
                                   value={"검색"} onClick={findBtn}/>
                        </td>
                    </tr>
                </table>
            </div>
            <div style={{"height":"20px"}}></div>
            <div className={"row"}>
                {html}
            </div>
            <div style={{"height":"10px"}}></div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <ul className="pagination">

                        {row}

                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
export default Find;