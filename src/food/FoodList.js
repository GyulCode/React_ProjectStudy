import {useParams} from "react-router";
import {useState,useEffect,Fragment} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function FoodList(){
    const {cno}=useParams()
    const [cateInfo,setCateInfo]= useState({}) //vo,entity
    const [foodList,setFoodList]=useState([]) //dao?
    useEffect(() => {
        axios.get("http://localhost/food/category_info_react",{
            params:{
                cno:cno
            }
        }).then(res=>{
            console.log(res.data)
            setCateInfo(res.data)
        }).catch(error=>{
            console.log(error.res)
        })
        axios.get("http://localhost/food/food_list_react",{
            params:{
                cno:cno
            }
        }).then(res=>{
            console.log(res.data)
            setFoodList(res.data)
        })
    }, []);
    const html=foodList.map((food,key)=>
        <table className={"table"} key={food.fno}>
            <tbody>
            <tr>
                <td width={"30%"} className={"text-center"} rowSpan={"4"}>
                    <NavLink to={"/food/food_detail/"+food.fno}>
                        <img src={food.poster} style={{"width":"250px","height":"180px"}}/>
                    </NavLink>
                </td>
                <td width={"70%"}>
                    <h3>
                        <NavLink to={"/food/food_detail/"+food.fno}>
                            {food.name}&nbsp;<span style={{"color":"orange"}}>{food.score}</span>
                        </NavLink>
                    </h3>
                </td>
            </tr>
            <tr>
                <td width={"70%"}>{food.address}</td>
            </tr>
            <tr>
                <td width={"70%"}>{food.phone}</td>
            </tr>
            <tr>
                <td width={"70%"}>{food.type}</td>
            </tr>
            </tbody>
        </table>
    )
    return(
        <Fragment>
            <div className={"jumbotron"}>
                <h3 className={"text-center"}>{cateInfo.title}</h3>
                <h4 className={"text-center"}>{cateInfo.subject}</h4>
            </div>
            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td>
                            {html}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
export default FoodList