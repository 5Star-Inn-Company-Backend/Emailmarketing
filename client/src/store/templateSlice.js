import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import  axios  from 'axios';
import { toast } from 'react-toastify';
import { apiBaseUrl, setHeaders } from './api';

export const GetUserTemplate = createAsyncThunk(
    'template/GetUserTemplate ', 
    async () =>{
    try{
        const response = await axios.get(
            `${apiBaseUrl}/viewusertemp`,
                setHeaders()
        )
        return response?.data
    } catch(err){
           toast.error(err.response?.data?.message);
        }
    }
)

export const GetGeneralTemplate = createAsyncThunk(
    'template/GetGeneralTemplate ', 
    async () =>{
    try{
        const response = await axios.get(
            `${apiBaseUrl}/generaltemp`,
                setHeaders()
        )
        return response?.data
    } catch(err){
            toast.error(err.response?.data?.message)
        }
    }
)

export const CreateTemplate  = createAsyncThunk(
    'template/CreateTemplate ', 
    async ({
        template_name,
        template_describ,
        design_content,
        design_html,
        template_type
    },{rejectWithValue}) =>{
    try{
        const response = await axios.post(
            `${apiBaseUrl}/usertemplate`,{
                template_name,
                template_describ,
                design_content,
                design_html,
                template_type
            },
            setHeaders()
        )
        return response?.data
    } catch(err){
        return rejectWithValue(
            err.response?.data?.message
        )
        }
    }
)


const template_Slice = createSlice({
    name:"template",
    initialState: {
        template:[],
        generalTemp:[],
        CreateTemplateStatus:'',
        CreateTemplateError:'',
        GetUserTemplateStatus:'',
        GetUserTemplateError:'',
        GetGeneralTemplateStatus:'',
        GetGeneralTemplateError:''
    },
    reducers:{},

    extraReducers:(builder)=>{

        builder.addCase(GetGeneralTemplate.pending,(state, action)=>{
            return {
                ...state,
                GetGeneralTemplateStatus:'pending'
            }

        });
        builder.addCase(GetGeneralTemplate.fulfilled,(state, action)=>{
            if(action.payload){
                const {
                    status
                }= action.payload
                if(status === true){
                    return{
                        ...state,
                        generalTemp:action.payload.message,
                        GetGeneralTemplateStatus:"success"
                    }
                }
                return{
                    ...state,
                    GetGeneralTemplateStatus:"success"
                }
            }else return{
                ...state,
                GetGeneralTemplateStatus:"failed"
            }
        })
        builder.addCase(GetGeneralTemplate.rejected,(state, action)=>{
            return{
                ...state,
                GetGeneralTemplateStatus:'rejected'
            }
        })

        builder.addCase(GetUserTemplate.pending,(state, action)=>{
            return {
                ...state,
                GetUserTemplateStatus:'pending'
            }

        });
        builder.addCase(GetUserTemplate.fulfilled,(state, action)=>{
            if(action.payload){
                const {
                    status
                }= action.payload
                if(status === true){
                    return{
                        ...state,
                        template:action.payload.message,
                        GetUserTemplateStatus:"success"
                    }
                }
                return{
                    ...state,
                    GetUserTemplateStatus:"success"
                }
            }else return{
                ...state,
                GetUserTemplateStatus:"failed"
            }
        })
        builder.addCase(GetUserTemplate.rejected,(state, action)=>{
            return{
                ...state,
                GetUserTemplateStatus:'rejected'
            }
        })

        builder.addCase(CreateTemplate.pending,(state, action)=>{
            return {
                ...state,
                CreateTemplateStatus:'pending'
            }

        });
        builder.addCase(CreateTemplate.fulfilled,(state, action)=>{
            if(action.payload){
                const {
                    status
                }= action.payload
                if(status === true){
                    toast(action.payload.message);
                    return{
                        ...state,
                        CreateTemplateStatus:"success"
                    }
                }
                return{
                    ...state,
                    CreateTemplateStatus:"success"
                }
            }else return{
                ...state,
                CreateTemplateStatus:"failed"
            }
        })
        builder.addCase(CreateTemplate.rejected,(state, action)=>{
            return{
                ...state,
                CreateTemplateStatus:'rejected'
            }
        })
    }
})


export default template_Slice;