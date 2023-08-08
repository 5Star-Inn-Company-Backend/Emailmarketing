import { useRef, useState } from "react";
import { Modal } from "../../../components/modal/modal";
import { CreateNav } from "./components/createNav";
import EmailEditor from 'react-email-editor';
import { TemplateForm } from "./components/createTemplateForm";
export const CreateView =()=>{
    const emailEditorRef = useRef(null);
    const [
        EditedInfo, 
        setEditedInfo
    ] = useState({
        html:null,
        design:null
    })

    const hidemodal=useRef(null)

    const exportHtml = () => {
        emailEditorRef
            .current.editor
            .exportHtml((data) => {
            const { design, html } = data;
            console.log('exportHtml', html);
            setEditedInfo({
                html,
                design:JSON.stringify(design)
            })
        });
    };

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    }

    const onReady = () => {
        // editor is ready
        FetchTemplate()
        console.log(EditedInfo.design_content)
        console.log('onReady');
    };

    const handleSave=()=>{
        exportHtml();
        // console.log("html", EditedInfo.html);
        console.log("design", EditedInfo.design);
    }

    return(
        <>
            <CreateNav
                handleSave={handleSave}
            />
            <div className="w-overflow">
                <EmailEditor 
                    editorId="editor_container"
                    ref={emailEditorRef}
                    onReady={onReady} 
                />
            </div>          
            <Modal
                title="Template Information"
                body={<TemplateForm
                    EditedInfo={EditedInfo}
                    hidemodal={hidemodal}
                />}
                hidemodal={hidemodal}
            />
        </>
    )
}