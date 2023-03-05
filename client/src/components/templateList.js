import { useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Spinner from "./spinner/spinner";
import { GetUserTemplate } from "../store/templateSlice";
import { EditTemplateView } from "../pages/customer/campaign/component/editCampaignTemplate";
import { Actions } from "./templateActions"

export const MyTemplateList =({
    campaign,
    setCampaignSection,
    setCampaignparams,
    campaignParams
})=>{
    const navigate = useNavigate();
    const template = useSelector(
        state => state.template
    )
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(GetUserTemplate(null));
    },[dispatch])
    
    if(template.GetUserTemplateStatus ==='pending'){
        return <Spinner/>
    }
    return(
        <>
            <Actions
                campaign={campaign}
                setCampaignSection={setCampaignSection}
                setCampaignparams={setCampaignparams}
                campaignParams={campaignParams}
            />
            <div className="w-overflow">
                <table className=" table table-striped table-hover table-bordered table-responsive mb-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">Name</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            template.template?.map((temp,index)=>{
                                const{
                                    template_name,
                                    id,
                                    template_describ,
                                    created_at,
                                    updated_at,
                                }=temp
                                const category="personal"
                                return(
                                    <tr key={index}>
                                        <th scope="row">1</th>
                                        <td>
                                            <img 
                                                src="https://res.cloudinary.com/hamskid/image/upload/v1675956826/import-contacts_rymusv.png"
                                                alt="object not found"
                                                className="thumb rounded"
                                            />
                                        </td>
                                        <td>{template_name}</td>
                                        <td>{template_describ}</td>
                                        <td>
                                            {
                                                new Date(created_at)
                                                    .toLocaleString()
                                            }
                                            </td>
                                            <td>{
                                                new Date(updated_at)
                                                    .toLocaleString()
                                            }</td>
                                        <td>
                                        <div className="d-flex align-items-center">
                                                <div 
                                                    onClick={()=>{

                                                    }}
                                                    className="d-flex align-items-center me-2 text-white bg bg-success rounded p-2">
                                                    {
                                                        campaign?(
                                                            <span 
                                                                onClick={
                                                                    ()=>{
                                                                        setCampaignSection({
                                                                            name:"Template",
                                                                            components:<EditTemplateView 
                                                                                id={id}
                                                                                campaignParams={campaignParams}
                                                                                setCampaignparams={setCampaignparams}
                                                                                setCampaignSection={setCampaignSection}
                                                                            />
                                                                        })
                                                                    }
                                                                }
                                                            >
                                                                Edit
                                                            </span>
                                                        ):(
                                                            <span 
                                                                onClick={
                                                                    ()=>navigate(`/edit/template/${category}/${id}`)
                                                                }
                                                            >
                                                                Edit
                                                            </span>
                                                        )
                                                    }
                                                </div>
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
            
        </>
    )
}