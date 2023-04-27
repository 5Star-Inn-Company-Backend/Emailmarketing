import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CustomFormField } from "../../../../components/customFomField";
import { CreateTemplate } from "../../../../store/templateSlice";

export const TemplateForm =({
    campaignParams,
    setCampaignparams,
    EditedInfo
})=>{
    const template = useSelector(
        state => state.template
    )
    const dispatch = useDispatch()
    const { 
        handleSubmit, 
        register,
        formState: { errors } 
    } = useForm();

    const SubmitHandler=({
        name,
        bdesc
    })=>{
        dispatch(
            CreateTemplate({
                template_name:name,
                template_describ:bdesc,
                design_content:EditedInfo.design_content,
                design_html:EditedInfo.design_html,
                template_type:"private"
            })
        ) 
    }

    return(
       
        <form onSubmit={handleSubmit(SubmitHandler)}>
            <CustomFormField
                label ="Name"
                defaultValue={EditedInfo.template_name?EditedInfo.template_name:""}
                name ="name"
                placeholder="name"
                type="text"
                register={register}
                errors={errors.name}
            />
            <CustomFormField
                defaultValue={EditedInfo.template_describ?EditedInfo.template_describ:""}
                label ="Brief description"
                name ="bdesc"
                placeholder="Brief description"
                type="text"
                register={register}
                errors={errors.bdesc}
            />
            <div className="d-flex justify-content-between">
                <CustomFormField
                    value="submit"
                    type="btn"
                    loadingStatus={template.CreateTemplateStatus}
                />
                {
                    template.CreateTemplateStatus === 'success'&&(
                        <div
                            onClick={()=>{
                                setCampaignparams({
                                    ...campaignParams,
                                    content:EditedInfo.design_html,
                                    sectionCompleted:3
                                })
                            }}
                            className="btn btn-sm bg-success text-white fl-r"
                            data-bs-dismiss="modal"
                            >
                            Proceed
                        </div>
                    )
                }
            </div>
        </form>
    )
}