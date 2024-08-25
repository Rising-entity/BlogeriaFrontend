import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${VITE_API_URL}/login`, {
                email,
                password
            })
            // console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
                sessionStorage.setItem("token", response.data.token);
                navigate('/');
            }
            else {
                toast.error(response.data.message);

            }
        }
        catch (error) {
            console.log("im in catch")
            console.log(error.message);
        }
    }

    return (


        <div className="login flex items-center justify-center ">
            <div className='min-h-[56%] w-[85%] sm:w-[25%] bg-[#ffffff5b]  flex items-center justify-center '>
                <div className='h-[90%] w-[72%] bg-[white] [box-shadow:0px_1px_8px_#8080804d] rounded-[10px] mt-[10px]'>
                    <div>
                        <p className='text-[#320566c4] text-[23px] font-[bolder] m-[10px] text-center '>Login</p>
                    </div>
                    <div>
                        <input type="email" placeholder='email' className='block mx-[auto] my-[21px] mt-[66px] w-[70%] px-[10px] py-[5px]  text-[14px] ' value={email}
                            onChange={function (e) { setEmail(e.target.value); }}  style={{border:"none" , borderBottom:"1px solid #613f89"}}/>
                    </div>

                    <div>
                        <input type="password" name="" id="" placeholder='password' className='h-[48%] block mx-[auto] my-[10px] w-[70%] px-[10px] py-[5px]   text-[14px]' value={password}
                            onChange={function (e) { setPassword(e.target.value); }} style={{border:"none" , borderBottom:"1px solid #613f89"}} />
                    </div>
                    <div>
                        <button className='block cursor-pointer mx-[auto] my-[22px] w-[46%] p-[4px] rounded-[10px] bg-[#320566c4] text-[white] font-bold ' onClick={handleSubmit}>login</button>

                    </div>
                    <div>
                        <p className='text-center text-[12px]  text-[gray] pb-[10px]'>don't have an account? <span className='text-black font-semibold cursor-pointer' onClick={function () {
                            navigate('/SignUp');
                        }}>SignUp</span></p>
                    </div>
                </div>

            </div>

        </div>
    )
}
