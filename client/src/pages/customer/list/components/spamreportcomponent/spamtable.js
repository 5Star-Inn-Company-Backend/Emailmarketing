import { useEffect } from "react";
import { FaCartArrowDown} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../components/spinner/spinner";
import { GetSpamReported } from "../../../../../store/SpamReportedSlice";
import { Actions } from "./spamaction";

export const SpamContainer = () => {
    const spam = useSelector(
        state => state.SpamReported
    )
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetSpamReported(null));
    }, [dispatch])

    if (spam.GetSpamReportedStatus === 'pending') {
        return <Spinner />
    }
    return (
        <>
            <Actions/>
            <div className="w-overflow">
                <table className=" table table-striped table-hover table-bordered table-responsive caption-top mb-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            spam
                                .SpamReported?.map((spam, index) => {
                                    const {
                                        email,
                                        updated_at,
                                        created_at
                                    } = spam
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{email}</td>
                                            <td>{
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
                                }
                                )
                        }

                    </tbody>
                </table>
            </div>

            {
                spam
                    .SpamReported.length === 0 && (
                    <div className="d-flex flex-column jutstify-content-center align-items-center border rounded my-3 py-5 px-2">
                        <FaCartArrowDown
                            size="7rem"
                            color="grey"
                        />
                        <p className="fw-bold">
                            Your Spam List is presently empty
                        </p>
                    </div>
                )
            }
        </>
    )
}