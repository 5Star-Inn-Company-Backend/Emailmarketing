import { FaCircleNotch, FaRegClone } from "react-icons/fa"
import LetteredAvatar from 'react-lettered-avatar';

export const ActivitiesLog =()=>{
    return(
        <>
            <div className="d-flex align-items-center mt-5 mb-3">
                <span className="me-3">
                   <FaRegClone
                        size="1.5rem"
                    />
                </span>
                <h2 
                    className="fs-4 w-100 mb-0"
                >
                    Activity log
                </h2>
            </div>
            <div className="row align-items-center">
                <div className="col-md-1 mbm-2">
                    <span>
                        <LetteredAvatar
                            backgroundColor="brown"
                            color="white"
                            name="Hamzat Avatar"
                            
                        />
                    </span>
                </div>
                <div className="col-md-11">
                    <div className="d-flex flex-row align-items-center justify-content-between border rounded p-2 wrap">
                        <span className="d-flex flex-column">
                            <h3 className="fw-bold fs-6">
                                Jolie Kennedy
                            </h3>
                            <h3 className="fs-6 break">
                                A new campaign "My test campaign" was created!
                            </h3>
                        </span>
                        <span className="fs-6">
                            1 year ago
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}