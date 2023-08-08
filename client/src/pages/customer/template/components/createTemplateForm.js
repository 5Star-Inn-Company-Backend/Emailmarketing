import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CustomFormField } from "../../../../components/customFomField";
import { CreateTemplate } from "../../../../store/templateSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TemplateForm =({EditedInfo,hidemodal})=>{
    const template = useSelector(
        state => state.template
    )
    const [templateSaved, setTemplateSaved] = useState(false)
    const navigate = useNavigate();
    const dispatch  = useDispatch()
    const { 
        handleSubmit, 
        register,
        formState: { errors } 
    } = useForm();

    const SubmitHandler=({
        template_name,
        template_describ
    })=>{
        dispatch(
            CreateTemplate({
                template_name,
                template_describ,
                design_content:EditedInfo.design,
                design_html:EditedInfo.html,
                template_type:"private"
            })
        )
        setTemplateSaved(true);
    }

    useEffect(()=>{
        if(templateSaved && template.CreateTemplateStatus === 'success'){
            hidemodal.current.click()
            localStorage.setItem(
                'templateInfo',
                JSON.stringify(EditedInfo.html)
            )
            navigate("/campaigns/Create");
        }
    },[templateSaved,template.CreateTemplateStatus])
    return(
       
        <form onSubmit={handleSubmit(SubmitHandler)}>
            <CustomFormField
                label ="Name"
                name ="template_name"
                placeholder="name"
                type="text"
                register={register}
                errors={errors.template_name}
            />
            <CustomFormField
                label ="Brief description"
                name ="template_describ"
                placeholder="Brief description"
                type="text"
                register={register}
                errors={errors.template_describ}
            />
            <CustomFormField
                value="submit"
                type="btn"
                loadingStatus={template.CreateTemplateStatus}
            />
        </form>
    )
}