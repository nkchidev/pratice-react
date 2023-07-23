import { useEffect, useState } from "react"
import { loginAPI } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowLoading, setIsShowLoading] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            navigate("/");
        }
    }, [])

    const handleLogin = async () => {
        if(!email || !password){
            toast.error("Email and password are required!");
            return;
        }
        setIsShowLoading(true);
        let res = await loginAPI(email,password);
        if(res && res.token){
            localStorage.setItem("token", res.token);
            navigate("/");
            toast.success("Login success~");
        }else{
            if(res && res.status === 400){
                toast.error(res.data.error);
            }
        }
        setIsShowLoading(false);
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
                    placeholder="Enter your password" />
                <i 
                    class={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button 
                disabled={email && password ? false : true}  
                className={email && password ? "btn-login active" : "btn-login"}
                onClick={() => handleLogin()}
            >
                {isShowLoading && <i class="fas fa-spinner fa-spin"></i>}
                &nbsp;Log in
            </button>
            <div className="back">
                <i class="fa-solid fa-angles-left"></i>
                Go back
            </div>
        </div>
    </>)
}

export default Login