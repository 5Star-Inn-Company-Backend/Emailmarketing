import { useState } from "react"
import { FaCircleNotch } from "react-icons/fa";
import { PieChart } from "../../../../components/piechat";
import {BarChart} from "../../../../components/barchat";
import { userdata } from "../../campaign/component/userdata";

export const Subscribers=()=>{
    const piedata=[
        {
            name:"Subscribed",
            number:50
        },{
            name:"Unsubscribed",
            number:20
        },{
            name:"Spam Report",
            number:10
        },{
            name:"Blacklisted",
            number:5
        }
    ]
    const [
        userData
    ] = useState({
        labels:userdata?.map(
            (data)=>data.name
        ),
        datasets:[{
            label:"key email marketing metrics",
            data:userdata?.map(
                (data)=>data.number
            )
        }]
    });
    const [
        subData
    ] = useState({
        labels:piedata?.map(
            (data)=>data.name
        ),
        datasets:[{
            label:"Subscribers",
            data:piedata?.map(
                (data)=>data.number
            )
        }]
    });
    return(
        <>
            <div className="d-flex align-items-center mt-5 mb-3">
                <span className="me-3">
                   <FaCircleNotch
                        size="1.5rem"
                        color="grey"
                    />
                </span>
                <h2 
                    className="fs-4 w-100 mb-0"
                >
                    List growth
                </h2>
            </div>
            <div className="chat-flex align-items-end wrap">
                <div className="my-3 rounded border p-1 bar-container me-3 w-63">
                    <BarChart data={userData}/>
                </div>                  
                <div className="my-3 rounded border p-1 chat-container me-3 w-32">
                    <PieChart data={subData}/>
                </div>                  
            </div>
        </>
    )
}