import { useForm } from "react-hook-form";
import { CustomFormField } from "../../../components/customFomField"
import { useDispatch, useSelector} from "react-redux";
import { Createsubscriber } from "../../../store/subscriberSlice";

export const SubscriberModalContent =()=>{
    const subsriber = useSelector(
        state => state.subscriber
    )
    const dispatch = useDispatch();
    const { 
        handleSubmit, 
        register,
        formState: { errors } 
    } = useForm();

    const SubmitHandler=({
        email,
        fname,
        lname,
        country,
        state,
        phone,
        dob,
        tag
    })=>{
        dispatch(
            Createsubscriber({
                email,
                fname,
                lname,
                country,
                state,
                phone,
                dob,
                tag
            })
        )
    }
    return(
        <form onSubmit={handleSubmit(SubmitHandler)}>
            <CustomFormField
                label ="Email"
                name ="email"
                placeholder="email"
                type="text"
                register={register}
                errors={errors.email}
            />
             <CustomFormField
                label ="First Name"
                name ="fname"
                placeholder="first name"
                type="text"
                register={register}
                errors={errors.fname}
            />
             <CustomFormField
                label ="Last Name"
                name ="lname"
                placeholder="last name"
                type="text"
                register={register}
                errors={errors.lname}
            />
             <CustomFormField
                label ="Country"
                name ="country"
                placeholder="country"
                type="text"
                register={register}
                errors={errors.country}
            />
             <CustomFormField
                label ="State"
                name ="state"
                placeholder="state"
                type="text"
                register={register}
                errors={errors.state}
            />
             <CustomFormField
                label ="Phone No"
                name ="phone"
                placeholder="phone"
                type="number"
                register={register}
                errors={errors.phone}
            />
             <CustomFormField
                label ="Date of Birth"
                name ="dob"
                placeholder="dob"
                type="date"
                register={register}
                errors={errors.dob}
            />
            <CustomFormField
                label ="Tag"
                name ="tag"
                placeholder="tag"
                type="text"
                register={register}
                errors={errors.tag}
            />
            <CustomFormField
                value="submit"
                type="btn"
                loadingStatus={subsriber.CreatesubscriberStatus}
            />
        </form>
    )
}