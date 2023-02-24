import { useRef } from "react";
// import "../homepage/home.css";
import { SideNav } from "./sideNav";
import { NavToggler } from "../../components/navToggler";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import LetteredAvatar from 'react-lettered-avatar';
import { useSelector } from "react-redux";

export const Layout=({routeChildren})=>{
    const navToggler = useRef(null);
    const navigate = useNavigate();
    const auth = useSelector(
        state => state.auth
    )
    const showNav =()=>{
        navToggler.current.classList.add("active");
    }
    return(
        <div className="container-fluid whitesmoke">
            <div className="row no-wrap">
                <div className="col-md-2 px-3 sideNav bg-slate-grey w-230" ref={navToggler}>
                   <SideNav navToggler={navToggler}/>
                </div>
                <div className="col-md-10 dashboardvh bg-smoke">
                        <div>
                            <div className="d-flex justify-content-between py-2 px-4 navHeader align-items-center">
                                <span className="fs-4 fw-bold bg-blue">
                                    Dashboard
                                </span>
                                <span className="d-flex align-items-center">
                                    <span className="me-3 rounded-circle border search-icon">
                                        <FaSearch
                                            color="goldenrod"
                                        />
                                    </span>
                                    <div className="d-flex align-items-center my-3">
                                        <span className="me-2 dropdown">
                                            <span 
                                                className="dropdown-toggle d-flex align-items-center" 
                                                data-bs-toggle="dropdown" 
                                                aria-expanded="false">
                                                <LetteredAvatar
                                                    backgroundColor="brown"
                                                    color="white"
                                                    name={auth.userdata?.user?.name}
                                                />
                                            </span>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a 
                                                        className="dropdown-item" 
                                                        href="/account/profile">
                                                        Profile
                                                    </a>
                                                </li>
                                            </ul>
                                        </span>
                                     </div>                                   
                                </span>
                            </div>
                            <div className="children">
                            {
                                routeChildren
                            }
                            </div>
                        </div>                   
                    <NavToggler
                        showNav={showNav}
                    />
                </div>
            </div>
        </div>
    )
    
}