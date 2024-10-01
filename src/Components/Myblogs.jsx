import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Myblogs(props) {
    const navigate = useNavigate();
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    // const [Json, setJson] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [editImage, setEditImage] = useState(null);
    const [expanded, setExpanded] = useState({}); // New state for managing read more/less

    // const getData = async () => {
    //     try {
    //         let decoded = jwtDecode(sessionStorage.getItem("token"));
    //         let res = await fetch(`${VITE_API_URL}/getBlogByid/${decoded._id}`);
    //         const response = await res.json();
    //         if (response.success) {
    //             setJson(response.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleDelete = async (id) => {
        try {
            await fetch(`${VITE_API_URL}/deleteBlog/${id}`, {
                method: 'DELETE',
            });
            props.getData();
            props.getHomedata();
        } catch (error) {
            console.log(error);
        }
    }

    const handleImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await axios.post(`${VITE_API_URL}/upload`, formData);
            if (response.status === 200) {
                return response.data.imageUrl;
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleUpdate = async (id) => {
        let imageUrl = null;
        if (editImage) {
            imageUrl = await handleImageUpload(editImage);
            console.log(imageUrl);
        }

        try {
            await fetch(`${VITE_API_URL}/updateBlog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firebaseImageUrl: imageUrl || props.Json[editIndex].firebaseImageUrl,
                    // firebaseImageUrl: imageUrl,
                    title: editTitle,
                    body: editBody
                }),
            });
            props.getData();
            props.getHomedata();
            setEditIndex(null);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (index, title, body) => {
        setEditIndex(index);
        setEditTitle(title);
        setEditBody(body);
    }

    const toggleReadMore = (index) => {
        setExpanded(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };


    // useEffect(() => {
    //     getData();
    // }, [props.blog]);

    return (
        <>
            {props.Json.length !== 0 ? (
                <>
                    <p className='mt-[5px]  text-center text-[24px] font-bold text-[#636262]'>my blogs</p>
                    <div className="flex justify-center items-center my-[20px] text-[#454545] w-full">
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4'>
                            {props.Json.map((element, index) => (
                                <div key={index} className='border border-[#00000045] p-4 rounded-lg'>
                                    {editIndex === index ? (
                                        <div>
                                            <div className='my-2 text-blue-500'>
                                                <label htmlFor="title">Update Title</label>
                                            </div>
                                            <input
                                                id='title'
                                                className='w-full mb-2 p-2 border rounded'
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                            />
                                            <div className='my-2 text-blue-500'>
                                                <label htmlFor="body">Update Description</label>
                                            </div>
                                            <textarea
                                                id='body'
                                                className='w-full h-[150px] mb-2 p-2 border rounded'
                                                value={editBody}
                                                onChange={(e) => setEditBody(e.target.value)}
                                            />
                                            <div className='my-2 text-blue-500'>
                                                <label htmlFor="img">Update Image</label>
                                            </div>
                                            <input
                                                onChange={(e) => setEditImage(e.target.files[0])}
                                                type="file"
                                                id="img"
                                                name="img"
                                                accept="image/*"
                                                className='mb-2'
                                            />
                                            <button
                                                className='block bg-blue-500 text-white rounded p-2 mb-2'
                                                onClick={() => handleUpdate(element._id)}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='[word-wrap:break-word]'>
                                            <img loading="lazy" className='w-full h-[200px] object-cover rounded' src={element.firebaseImageUrl} alt="" />
                                            <p className='text-[16px] font-bold text-[#0074d0] border-b-2'>{element.title}</p>
                                            <p className='mt-2 text-[14px] text-[#454545]'>
                                                {expanded[index] ? element.body : `${element.body.substring(0, 100)}...`}
                                                <button
                                                    className='ml-2 text-blue-500'
                                                    onClick={() => toggleReadMore(index)}
                                                >
                                                    {expanded[index] ? 'Read Less' : 'Read More'}
                                                </button>
                                            </p>
                                            <p className='text-[12px] mt-2'><span className='text-[#0074d0]'>author:</span> {element.author}</p>
                                            <p className='text-[12px]'><span className='text-[#0074d0]'>created at:</span>  {new Date(element.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    )}

                                    <div className="flex justify-between mt-4">
                                        <button
                                            className='bg-red-500 text-white rounded p-2'
                                            onClick={() => handleDelete(element._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className='bg-yellow-500 text-white rounded p-2'
                                            onClick={() => handleEdit(index, element.title, element.body)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>

            ) : (
                <div className='mt-[63px] text-center'>
                    <p className='text-[19px] text-[orangered]'>You don't have any blog create your first blog</p>
                    <button
                        className='block rounded-[11px] mx-[auto] my-[72px] p-[10px] font-bold text-[white] bg-[#1E88E5]'
                        onClick={() => navigate("/createblog")}
                    >
                        Create your first blog
                    </button>

                </div>

            )}
        </>
    )
}
