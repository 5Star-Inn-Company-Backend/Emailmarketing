import { useEffect } from "react";
import { FaCartArrowDown, FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../components/spinner/spinner";
import { GetSubscribers } from "../../../../../store/subscriberSlice";
import { IndividualSubActions } from "./individualsubactions";
import { IndividualSubEdit } from "./individualsubedit";

export const IndividualSubTable =({
    setListSection
})=>{
    const subsriber = useSelector(
        state => state.subscriber
    )
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetSubscribers(null));
    },[dispatch])
    
    if(subsriber.GetSubscribersStatus ==='pending'){
        return <Spinner/>
    }
        return(
            <>
            <IndividualSubActions
                setListSection={setListSection}
            />
            <div className="w-overflow">
                <table className="table table-striped table-hover table-bordered table-responsive caption-top mb-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">State</th>
                            <th scope="col">Phone</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subsriber
                                .subscribers?.map((sub,index)=>{
                                    const{
                                        email,
                                        fname,
                                        lname,
                                        country,
                                        state,
                                        phone,
                                        dob
                                    }=sub
                                    return(
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{email}</td>
                                            <td>{fname}</td>
                                            <td>{lname}</td>
                                            <td>{country}</td>
                                            <td>{state}</td>
                                            <td>{phone}</td>
                                            <td>{dob}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div
                                                        className="d-flex align-items-center me-2 text-white bg bg-success rounded p-2"
                                                        onClick={
                                                            ()=>setListSection({
                                                                name:"Edit",
                                                                components:<IndividualSubEdit/>
                                                            })
                                                        }
                                                    >
                                                        <span className="me-1">
                                                            <FaPencilAlt/>
                                                        </span>
                                                        <span>
                                                            Edit
                                                        </span>
                                                    </div>
                                                    <div className="dropdown">
                                                        <button 
                                                            className="btn btn-secondary dropdown-toggle" 
                                                        >
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li
                                                                className="dropdown-item"
                                                            >
                                                                Subscribe
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                            >
                                                                Unsubscribe
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                            >
                                                                Send Confirmation Email
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                            >
                                                                Delete
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>
                 
                 {
                    subsriber
                    .subscribers?.length === 0 &&(
                        <div className="d-flex flex-column jutstify-content-center align-items-center border rounded my-3 py-5 px-2">
                            <FaCartArrowDown
                                color="grey"
                                size="7rem"
                            />
                            <p className="fw-bold">
                                Your Subscribers List is presently empty
                            </p>
                            <div>
                                Dont worry click on new subscribers to get started. 
                            </div>
                        </div>
                    )
                }
            </>
           
        )
}