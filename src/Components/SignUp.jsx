import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import loaderimg from "./Images/loader.gif";

export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async () => {

        try {
            setLoader(true);
            const response = await axios.post(`${VITE_API_URL}/signUp`, {
                name,
                email,
                password
            })
            setLoader(false);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');

            }
            else {
                toast.error(response.data.message);

            }
        }
        catch (error) {
            console.log(error.message);
        }
    }



    return (
        <>
            {
                loader ? (<div className='w-full h-screen flex justify-center items-center'>
                    <img className="w-[6%]" src={loaderimg} alt="" />
                </div>) :
                    (
                        <div className="login flex items-center justify-center ">
                            <div className='min-h-[56%] w-[85%] sm:w-[25%] bg-[#ffffff5b]  flex items-center justify-center '>
                                <div className='h-[90%] w-[72%] bg-[white] [box-shadow:0px_1px_8px_#8080804d] rounded-[10px] mt-[10px]'>
                                    <div>
                                        <p className='text-[#320566c4] text-[23px] font-[bolder] m-[10px] text-center '>Sign Up</p>
                                    </div >
                                    <div>
                                        <input type="text" placeholder='name' className='block mx-[auto] my-[10px] mt-[66px] w-[70%] px-[10px] py-[5px] border-[none] border-b-[1px_solid_#320566c4] text-[14px]' value={name}
                                            onChange={function (e) { setName(e.target.value); }} style={{ border: "none", borderBottom: "1px solid #613f89" }} />
                                    </div>
                                    <div>
                                        <input type="email" placeholder='email' className='block mx-[auto] my-[10px]  w-[70%] px-[10px] py-[5px] border-[none] border-b-[1px_solid_#320566c4] text-[14px]' value={email}
                                            onChange={function (e) { setEmail(e.target.value); }} style={{ border: "none", borderBottom: "1px solid #613f89" }} />
                                    </div>

                                    <div>
                                        <input type="password" name="" id="" placeholder='password' className='h-[48%] block mx-[auto] my-[10px] w-[70%] px-[10px] py-[5px] border-[none] border-b-[1px_solid_#320566c4]  text-[14px]' value={password}
                                            onChange={function (e) { setPassword(e.target.value); }} style={{ border: "none", borderBottom: "1px solid #613f89" }} />
                                    </div>
                                    <div>
                                        <button className='block cursor-pointer mx-[auto] my-[22px] w-[46%] p-[4px] rounded-[10px] bg-[#320566c4] text-[white] font-bold ' onClick={handleSubmit}>sign up</button>

                                    </div>
                                    <div>
                                        <p className='text-center text-[12px]  text-[gray] pb-[10px]'>already have an account? <span className='text-black font-semibold cursor-pointer ' onClick={function () {
                                            navigate('/login');
                                        }}>login</span></p>
                                    </div>
                                </div >

                            </div >

                        </div >
                    )


            }

        </>
    )
}
