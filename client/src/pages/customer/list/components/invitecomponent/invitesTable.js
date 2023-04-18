import { useEffect } from "react";
import { FaCartArrowDown, FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../components/spinner/spinner";
import { GetInviteSent, collab_SliceActions } from "../../../../../store/collaborationSlice";
import { Actions } from "./collabAction";

export const InvitesContainer =()=>{
    const collab = useSelector(
        state => state.collab
    )
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetInviteSent(null));
    },[dispatch])

    const handleInputChange=(e)=>{
        dispatch(collab_SliceActions.searchdata({
            type:"invite",
            data:e.target.value
        }))
    }

    if(collab.GetInviteSentStatus ==='pending'){
        return <Spinner/>
    }

    return(
        <>
        <Actions
            handleInputChange={handleInputChange}
            actionName="Invite Collaborators"
        />
        <div className="w-overflow">
            <table className=" table table-striped table-hover table-bordered table-responsive caption-top mb-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Invites Sent</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        collab.inviteSent?.map(
                            (collaboration,index)=>{
                            const{
                                name,
                                email
                            }= collaboration
                        
                            return(
                                <tr key={index}>
                                    <th scope="row">{index +1}</th>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle" 
                                                    type="button" 
                                                    data-bs-toggle="dropdown" 
                                                    aria-expanded="false"  
                                                >
                                                </button>
                                                <ul className="dropdown-menu">
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
            collab
            .inviteSent?.length === 0 &&(
                <div className="d-flex flex-column jutstify-content-center align-items-center border rounded my-3 py-5 px-2">
                    <FaCartArrowDown
                        color="grey"
                        size="7rem"
                    />
                    <p className="fw-bold">
                    You have not invited any account to Collaborate with you!!
                    </p>
                </div>
            )
        }
        </>
    )
}