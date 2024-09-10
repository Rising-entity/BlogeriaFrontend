import React, { useState } from 'react';
import writeBlog from "./Images/writeBlog.png";
import seeBlog from "./Images/seeBlog.png";
import post from "./Images/post.png";

export default function Home(props) {
    // Function to truncate text to a specified number of words
    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <>
            <div>

                <div className='Home flex justify-center items-center mx-auto min-h-[100vh]'>
                </div>

                <div className=" min-h-[80vh] mx-[auto] my-[46px] text-[#454545] ">
                    <h1 className='text-center text-[34px] font-bold m-[20px]'>How It Works</h1>
                    <div className=' container mx-auto grid sm:grid-cols-3 gap-[3.5rem] justify-items-center'>
                        <div className='[box-shadow:0px_1px_7px_gray] rounded-[8px]  sm:w-[100%] w-[80%]'>
                            <div>
                                <img className='w-[80%] block mx-auto' src={writeBlog} alt="" />
                            </div>
                            <div>
                                <p className='text-center text-[20px] font-bold'>Write Blogs</p>
                                <p className='text-center my-[10px]'>Discover captivating stories and insightful articles on our diverse blog</p>

                            </div>
                        </div>
                        <div className='[box-shadow:0px_1px_7px_gray] rounded-[8px] sm:w-[100%] w-[80%] '>
                            <div>
                                <img className='w-[80%] block mx-auto' src={seeBlog} alt="" />
                            </div>
                            <div>
                                <p className='text-center text-[20px] font-bold'>See Other's Blogs</p>
                                <p className='text-center my-[10px]'>Explore diverse ideas from technology to lifestyle in our rich blog.</p>

                            </div>
                        </div>
                        <div className='[box-shadow:0px_1px_7px_gray] rounded-[8px] sm:w-[100%] w-[80%] '>
                            <div>
                                <img className='w-[80%] block mx-auto' src={post} alt="" />
                            </div>
                            <div>
                                <p className='text-center text-[20px] font-bold'>Post Blogs</p>
                                <p className='text-center  my-[10px]'>Dive into diverse posts, spark conversations, engage enthusiasts.</p>

                            </div>
                        </div>
                    </div>
                </div>

                {/* section3 started */}

                <div>
                    <div className="flex h-[64px] justify-center items-center">
                        <p className='text-[30px] font-bold text-[#454545]'>Recently Posted Blogs</p>
                    </div>

                    <div className="flex justify-center items-center my-[50px] text-[#454545]">
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[10px] px-[5%]'>
                            {props.json.map((element, index) => {
                                const [isExpanded, setIsExpanded] = useState(false);

                                return (
                                    <div key={index} className='border border-[#00000045] p-[10px] rounded-[10px]'>
                                        <div>
                                            <img className='w-full h-[200px] object-cover rounded-[10px]' src={element.firebaseImageUrl} alt="image" />
                                        </div>

                                        <div className='mt-[10px]'>
                                            <p className='text-[16px] font-bold text-[#0074d0] border-b-2'>{element.title}</p>
                                            <p className='mt-2 text-[14px] text-[#454545]'>
                                                {isExpanded ? element.body : truncateText(element.body, 20)}
                                            </p>
                                            <button
                                                className='text-blue-500 text-sm mt-2'
                                                onClick={() => setIsExpanded(!isExpanded)}
                                            >
                                                {isExpanded ? 'Read Less' : 'Read More'}
                                            </button>
                                            <p className='text-[12px] mt-2'><span className='text-[#0074d0]'>Author:</span> {element.author}</p>
                                            <p className='text-[12px]'><span className='text-[#0074d0]'>created at:</span>  {new Date(element.createdAt).toLocaleDateString()}</p>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* section4 started */}

                <div className="grid sm:grid-cols-9 grid-cols-2 min-h-[34vh] text-center bg-[#89cdc2] text-[#454545] pt-[24px]">
                    <div className='sm:col-span-2 '>
                        <p className='text-[21px] font-bold'>Info</p>
                        <p className='my-[5px]'>About Us</p>
                        <p className='my-[5px]'>Contact</p>
                        <p className='my-[5px]'>Blog </p>

                    </div>
                    <div className='sm:col-span-2  '>
                        <p className='text-[21px] font-bold'>
                            Explore
                        </p>
                        <p className='my-[5px]'>
                            Featured Articles

                        </p>
                        <p className='my-[5px]'>
                            Trending Topics

                        </p>
                        <p className='my-[5px]'>
                            Categories

                        </p>

                    </div>
                    <div className='sm:col-span-2  '>
                        <p className='text-[21px] font-bold'>
                            Legal
                        </p>
                        <p className='my-[5px]'>
                            Terms of Service
                        </p>
                        <p className='my-[5px]'>
                            Privacy Policy

                        </p>
                        <p className='my-[5px]'>
                            Cookie Policy


                        </p>
                    </div>
                    <div className='sm:col-span-3  '>
                        <p className='text-[21px] font-bold'>
                            Newsletter
                        </p>
                        <p className='my-[5px]'>
                            Stay informed with our blog updates. Subscribe for the latest articles, tips, and exclusive content.
                        </p>
                        <div className='my-[10px]'>
                            <input type="email" placeholder='Your Email' className='border-[1px] border-[solid] pl-[10px]  sm:px-[10px] sm:py-[5px] rounded-[10px]  w-[80%]' />
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}
