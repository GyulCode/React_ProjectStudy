import {Fragment, useState, useEffect} from "react";
import axios from "axios";

function News(){
    const [newsList, setNewslist]=useState([])
    const [fd, setFd]=useState('맛집')

    useEffect(() => {
        axios.get("http://localhost/news/news_find_react",{
            params:{
                fd:fd
            }
        }).then(res=>{
            console.log(res.data)
            setNewslist(res.data)
        }).catch(error=>{
            console.log(error.res)
        })
    }, []);
    const newsChange=(e)=>{
        setFd(e.target.value)
    }
    const findBtn=()=>{
        axios.get("http://localhost/news/news_find_react",{
            params:{
                fd:fd
            }
        }).then(res=>{
            console.log(res.data)
            setNewslist(res.data)
        }).catch(error=>{
            console.log(error.res)
        })
    }
    let html=newsList.map((news)=>
        <table className={"table"}>
            <tbody>
            <tr>
                <td><a href={news.link} target={"_blank"}>
                    <h3 style={{"color":"orange"}} dangerouslySetInnerHTML={{__html:news.title}}></h3>
                </a></td>
            </tr>
            <tr>
                <td>
                    {news.desc}
                </td>
            </tr>
            <tr>
                <td className={"text-right"} dangerouslySetInnerHTML={{__html:news.pubdate}}></td>
            </tr>
            </tbody>
        </table>
    )
    return(
        <Fragment>
            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td>
                            <input type={"text"} className={"input-sm"}
                                   size={"25"} onChange={newsChange} />
                            <input type={"button"} className={"btn btn-sm btn-primary"}
                                   value={"검색"} onClick={findBtn}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style={{"height":"10px"}}></div>
            <div className={"row"}>
                <table className={"table"}>
                    <tr>
                        <td>
                            {html}
                        </td>
                    </tr>
                </table>
            </div>
        </Fragment>
    )
}
export default News