import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { CreateCampaigns } from "../../../../store/campaignSlice"
import { Recipient } from "./recipient"
import { Schedule } from "./schedule"
import { Setup } from "./setup"
import { TemplateChoice } from "./templatechoice"

export const Confirm =({
    setCampaignSection,
    setCampaignparams,
    campaignParams
})=>{
    const campaign = useSelector(
        state => state.campaign
    )
    const dispatch = useDispatch()
    const handleSend=()=>{
        let filledRequired = false;
        [
            campaignParams.ToWhichListShallWeSend,
            campaignParams.NameYourCampaign,
            campaignParams.EmailSubject,
            campaignParams.FromName,
            campaignParams.ReplyTo
        ]?.map((camp)=>{
            if(!camp){
                filledRequired= true;
            }
        })
        if(filledRequired){
                toast.error('Please fill in all the required information')
        }else{
            dispatch(
                CreateCampaigns({
                    title:campaignParams.NameYourCampaign,
                    recipient:campaignParams.ReplyTo,
                    from:campaignParams.FromName,
                    subject:campaignParams.ToWhichListShallWeSend,
                    content:campaignParams.EmailSubject
                })
            )
        }
    }
    return(
        <div className="d-flex flex-column justify-content-center m-auto wt-75">
            <p className="fs-2 text-center fw-bold">You're all set to send!</p>
            <p className="fs-6 text-center">Review the feedback below before sending your campaignParams.</p>
            <div>
                {
                    [
                        {
                            name:"Campaign Default",
                            content:campaignParams.default?"true":"false",
                            section:"Recipients",
                            components:<Recipient
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:0
                        },
                        {
                            name:"To which list shall we send?",
                            content:campaignParams.ToWhichListShallWeSend,
                            section:"Recipients",
                            components:<Recipient
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:0
                        },
                        {
                            name:"Name your campaign *",
                            content:campaignParams.NameYourCampaign,
                            section:"Setup",
                            components:<Setup
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:1
                        },
                        {
                            name:"Email subject *",
                            content:campaignParams.EmailSubject,
                            section:"Setup",
                            components:<Setup                            
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:1
                        },
                        {
                            name:"From name *",
                            content:campaignParams.FromName,
                            section:"Setup",
                            components:<Setup                            
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:1
                        },
                        {
                            name:"From email *",
                            content:campaignParams.FromEmail,
                            section:"Setup",
                            components:<Setup                            
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:1
                        },
                        {
                            name:"Reply To *",
                            content:campaignParams.ReplyTo,
                            section:"Setup",
                            components:<Setup                           
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:1
                        },
                        {
                            name:"Add DKIM signature  *",
                            content:campaignParams.ADS?"true":"false",
                            section:"Setup",
                            components:<Setup                           
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:1
                        },
                        {
                            name:"Custom Tracking Domain *",
                            content:campaignParams.CTD?"true":"false",
                            section:"Setup",
                            components:<Setup                           
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:1
                        },
                        {
                            name:"Use sending server's default value * *",
                            content:campaignParams.SDV?"true":"false",
                            section:"Setup",
                            components:<Setup                           
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:1
                        },
                        {
                            name:"Template",
                            content:campaignParams.template?"Available":"Unavailable",
                            section:"Template",
                            components:<TemplateChoice                                           
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection} 
                            />,
                            active:2
                        }
                        ,
                        {
                            name:"Delivery date *",
                            content:campaignParams.DeliveryDate,
                            section:"Schedule",
                            components:<Schedule                            
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}
                            />,
                            active:3
                        },
                        {
                            name:"Delivery Time *",
                            content:campaignParams.DeliveryTime,
                            section:"Schedule",
                            components:<Schedule                           
                                campaignParams={campaignParams}
                                setCampaignparams={setCampaignparams}
                                setCampaignSection={setCampaignSection}                           
                            />,
                            active:3
                        }
                    ]?.map((sect,index)=>{
                        const{
                            name,
                            content,
                            section,
                            components,
                            active
                        }=sect
                        return(
                            <div 
                                className="d-flex justify-content-between align-items-center"
                                key={index}
                            >
                                <div>
                                    <h6 className="fs-4">{name}</h6>
                                    <h6 className="fs-6">{content?content:"Unavailable"}</h6>
                                </div>
                                <div>
                                    <button 
                                        className="btn btn-md b-grey"
                                        onClick={
                                            ()=>
                                            {
                                                setCampaignSection({
                                                    name:section,
                                                    components:components
                                                })
                                                 setCampaignparams({
                                                    ...campaignParams,
                                                    sectionCompleted:active
                                                })
                                            }
                                        }
                                        >Edit</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <hr className="b-grey mb-0 mt-0"/>
            {
                    campaign.CreateCampaignsStatus === "pending"?(
                        <button 
                            className="btn btn-md btn-success mt-0 fl-r mb-5 mt-2 me-2 w-fit-content"
                        >
                            <span 
                                className="spinner-border spinner-border-sm" 
                                role="status" 
                                aria-hidden="true">
                            </span>
                                Submitting...Please wait
                        </button>
                    ):(
                        <button 
                            className="btn btn-md btn-success mt-0 fl-r mb-5 mt-2 me-2 w-fit-content"
                            onClick={handleSend}
                        >
                            Send Now
                        </button>
                    )
                }
            
        </div>
    )
}