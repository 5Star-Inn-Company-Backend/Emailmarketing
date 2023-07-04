import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../components/modal/modal";
import { CreateNav } from "./components/createNav";
import EmailEditor from 'react-email-editor';
import { TemplateForm } from "./components/templateform";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl, setHeaders } from "../../../store/api";
import { toast } from "react-toastify";

export const EditView =()=>{
    const emailEditorRef = useRef(null);
    const {id,category} = useParams();

    const [
        EditedInfo, 
        setEditedInfo
    ] = useState({})
    const hidemodal=useRef(null)

    const FetchTemplate = async () =>{
        try{
            const response = category=="personal"?
                await axios.get(
                    `${apiBaseUrl}/viewusertemp`,
                        setHeaders()
                ):await axios.get(
                    `${apiBaseUrl}/generaltemp`,
                        setHeaders()
                )
            console.log(
               response?.data
            )
            const {
                status,
                message
            }=response?.data

            if(status){
                 message?.map((temp)=>{ 
                    if(temp.id == id ){
                        setEditedInfo(temp)
                    }
                 })
            }
            return response?.data
        } catch(err){
                toast(err.response?.data?.message)
        }
    }
    const exportHtml = () => {
        emailEditorRef
            .current.editor
            .exportHtml((data) => {
            const { design, html } = data;
            console.log('exportHtml', html);
            setEditedInfo({
                ...EditedInfo,
                design_content:JSON.stringify(design),
                design_html:html
            })
            
        });
    };

    useEffect(()=>{
        if(EditedInfo.design_content){
            emailEditorRef.current.editor.loadDesign(JSON.parse(EditedInfo.design_content))
        }
    },[EditedInfo])

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        FetchTemplate()
        console.log(EditedInfo.design_content)
       
    }

    const onReady = () => {
        // editor is ready
        console.log('onReady');
    };

    const handleSave=()=>{
        exportHtml();
        // console.log("html", EditedInfo.html);
        console.log("design", EditedInfo.design_content);
    }

    return(
        <>
            <CreateNav
                handleSave={handleSave}
            />
            <div className="w-overflow">
                <EmailEditor 
                    ref={emailEditorRef} 
                    onLoad={onLoad} 
                    onReady={onReady} 
                    editorId="editor_container"
                />
            </div>          
            <Modal
                title="Edit Template Information"
                body={<TemplateForm
                    EditedInfo={EditedInfo}
                    hidemodal={hidemodal}
                />}
                hidemodal={hidemodal}
            />
        </>
    )
}
