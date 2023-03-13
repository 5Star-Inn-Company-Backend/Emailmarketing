import {FaTimesCircle} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AccordionsRoutes, ListRoute } from "./routes";
import { motion } from "framer-motion";
import { Brand } from "../../components/navbarbrand";

export const SideNav =({navToggler,showNavToggler,setShowNavToggler})=>{
    const navigate = useNavigate();
    const hideNav =()=>{
        setShowNavToggler(false)
        setTimeout(()=>{
            navToggler.current.classList.remove("active");
            setShowNavToggler(null)
        },400)
       
    }
    const variants = {
        open: { 
            opacity: 1, 
            x: 0, 
            transition: { 
                staggerChildren: 0.07, 
                delayChildren: 0.2 
            } 
        },
        default: { 
            opacity: 1
        },
        closed: {
             opacity: 0, 
             x: "-100%",
             transition: { 
                staggerChildren: 0.05, 
                staggerDirection: -1 
            } },
    }
    return(
        <motion.div
            animate={
                showNavToggler? "open": 
                showNavToggler===false ? 
                "closed":"default"
            }
            variants={variants}
        >
            <div className="d-flex justify-content-between align-items-center py-3 mb-2">
                <span className="d-flex align-items-center">
                   <Brand
                        handleClick={()=>navigate("/")}
                   />
                </span>
                <span className="hide-toggler">
                    <FaTimesCircle
                        size="2rem"
                        color="white"
                        onClick={hideNav}
                    />
                </span>
            </div>
            <div className="dashSideNav">
                {
                     ListRoute.map((uniqueroute, index)=>{
                        const {
                            icon,
                            name,
                            route
                        }=uniqueroute;
                        return(                            
                            <div 
                                className="d-flex align-items-center mb-4" 
                                key={index}
                                onClick={
                                    ()=>navigate(route)
                                }
                            >
                                <span className="mar-5">
                                    {icon}
                                </span>
                                <h2 
                                    className="text-white fs-6 w-100 mb-0" 
                                    id="headingOne"
                                >
                                    {name}
                                </h2>
                            </div>
                        )
                    })
                }
                {
                    AccordionsRoutes.map((route, index)=>{
                        const {
                            icon,
                            name,
                            subName,
                            id
                        }=route;
                        return(
                            <div className="d-flex align-items-center" key={index}>
                                <div 
                                    className="accordion" 
                                    id="accordionExample"
                                >
                                    <div className="accordion-item">
                                        <div className="d-flex align-items-center">
                                            <span className="me-3">
                                                {icon}
                                            </span>
                                            <h2 
                                                className="accordion-header w-100" 
                                                id="headingOne"
                                            >
                                            <button className="accordion-button"
                                                type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target={`#${id}`}
                                                aria-expanded="false" 
                                                aria-controls={id}>
                                                {name}
                                            </button>
                                            </h2>
                                        </div>
                                        <div id={id}
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample"
                                        >
                                        <div className="accordion-body">
                                            <div className="d-flex flex-column justify-content-center">
                                                {
                                                    subName.map((link,index)=>{
                                                        return(
                                                            <Link
                                                                key={index} 
                                                                to={`/${name}/${link}`}
                                                                className="decoration-none"
                                                            >
                                                                {link}
                                                            </Link>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="d-flex justify-content-center my-3">
                <img 
                    src="https://res.cloudinary.com/hamskid/image/upload/v1677151514/Frame_133_vi0rjh.svg" 
                    alt="object not found"
                    data-bs-toggle="modal" 
                    data-bs-target="#alertStaticBackdrop"
                    onClick={()=>navToggler.current.classList.remove("active")}
                />
            </div>
        </motion.div>
    )
    
}