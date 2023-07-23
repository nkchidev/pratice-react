import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (<>
        <div id="form-login" className="col-12 col-sm-4">
            <p className="title-login">Log in</p>
            <p className="text-login">Email or Username</p>
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
            >
                Log in
            </button>
            <div className="back">
                <i class="fa-solid fa-angles-left"></i>
                Go back
            </div>
        </div>
    </>)
}

export default Login