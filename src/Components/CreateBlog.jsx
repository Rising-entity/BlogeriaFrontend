import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import spinner from "./Images/spinner.gif"
export default function CreateBlog(props) {
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);

    async function create() {
        setCheck(true);
        const success = await props.createblog();
        setCheck(false);
        console.log(success);
        if (success) {
            props.getData();
            navigate('/Myblogs');
        }



    }




    return (

        <>{check ? (
            <div className='h-[86vh] flex justify-center items-center'>
                <img loading="lazy" src={spinner} alt="" className='block mx-[auto] my-[10px] w-[100px]' />
            </div>
        ) :

            <div className='min-h-[90vh]  flex justify-center items-center '>
                <div className=' min-w-[40%] [box-shadow:0px_0px_5px_0px_gray] rounded-[11px] bg-[#f6f6f6]'>
                    <p className='text-[30px] mx-[10px] my-[5px] text-center text-[#058df1] font-bold'>Write Your Blog</p>
                    <label htmlFor="title" className='mx-[10px] my-[5px] text-[#494949]'>Title</label>
                    <div >
                        <input onChange={function (e) { props.setTitle(e.target.value); }} className='block rounded-[5px]  w-[96%] h-[40px] my-[10px] mx-auto border-[1px]  border-[#8080808c] bg-[#f6f6f6]' id="title" type="text" />

                    </div>
                    <label htmlFor="blog" className='mx-[10px] my-[5px] text-[#494949]'>Description</label>
                    <div>
                        <textarea name="" onChange={function (e) { props.setBody(e.target.value); }} className='block rounded-[5px] border-[1px]  border-[#8080808c] bg-[#f6f6f6] w-[96%] h-[100px] my-[10px] mx-auto' id="blog"></textarea>

                    </div>
                    <label className='mx-[10px] my-[5px] text-[#494949]' htmlFor="img">Select image:</label>
                    <div className=' rounded-[5px] border-[1px]  border-[#8080808c] bg-[#f6f6f6] w-[96%] h-[40px] my-[10px] mx-auto flex items-center'>
                        <input onChange={function (e) { props.setImageFile(e.target.files[0]); }} type="file" id="img" name="img" accept="image/*" className='ml-[4px] text-[#494949]' ></input>
                    </div>


                    <div className='my-[16px]'>
                        <button className='block w-4/5 rounded-[10px] p-[4px] bg-[#058df1] text-[white] font-bold my-16px mx-auto hover:bg-green-500' onClick={create} >create blog</button>
                    </div>

                </div>
            </div >
        }

        </>
    )
}
