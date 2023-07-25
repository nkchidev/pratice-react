import { useContext, useEffect, useState } from "react"
import { loginAPI } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const navigate = useNavigate();
    const {login} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowLoading, setIsShowLoading] = useState(false);


    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            navigate("/");
        }
    }, []);

    const handleLogin = async () => {
        if(!email || !password){
            toast.error("Email and password are required!");
            return;
        }
        setIsShowLoading(true);
        let res = await loginAPI(email.trim(),password);
        if(res && res.token){
            login(email, res.token);
            navigate("/");
            toast.success("Login success~");
        }else{
            if(res && res.status === 400){
                toast.error(res.data.error);
            }
        }
        setIsShowLoading(false);
    }

    const handleBack = () =>{
        navigate("/");
    }

    const handlePressEnter= (event) => {
        if(event && event.key === 'Enter'){
            handleLogin();
        }
    }

    return (<>
        <div id="form-login" className="col-12 col-sm-4">
            <p className="title-login">Log in</p>
            <p className="text-login">Email or Username ( eve.holt@reqres.in )</p>
            <input type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="email" 
                placeholder="Enter your email or username" />
            <div className="password">
                <input type={isShowPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                    placeholder="Enter your password" />
                <i 
                    className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button 
                disabled={email && password ? false : true}  
                className={email && password ? "btn-login active" : "btn-login"}
                onClick={() => handleLogin()}
            >
                {isShowLoading && <i className="fas fa-spinner fa-spin"></i>}
                &nbsp;Log in
            </button>
            <div className="back" style={{ cursor: "pointer" }} onClick={handleBack}>
                <i className="fa-solid fa-angles-left"></i>
                <span>Go back</span> 
            </div>
        </div>
    </>)
}

export default Login