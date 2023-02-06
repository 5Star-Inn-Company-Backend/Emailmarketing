import { FaSlidersH } from "react-icons/fa"
import { Actions } from "../../../../components/actions"
import { ListTable } from "./listtable"

export const ListContent =()=>{
    return(
        <>
            <div className="d-flex align-items-center mb-5">
                <span className="me-3">
                    <FaSlidersH
                        size="1.5rem"
                    />
                </span>
                <div className="fs-1 cl-blue fw-bold">
                    My lists
                </div>
            </div>
            <Actions
                actionName="+ Create list"
            />
            <ListTable/>
        </>
    )
}