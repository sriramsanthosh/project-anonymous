import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MyToastContainer = () => {
    return(
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar  theme="colored" /> 
    )
}

export default MyToastContainer;