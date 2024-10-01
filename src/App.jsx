import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import CreateBlog from "./Components/CreateBlog"
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Myblogs from "./Components/Myblogs";


function App() {
  const [blog, setBlog] = useState(true);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [json, setJson] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getmyData();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  //updation of myblog
  const [myJson, setmyJson] = useState([]);
  const getmyData = async () => {
    try {
      let decoded = jwtDecode(sessionStorage.getItem("token"));
      let res = await fetch(`${VITE_API_URL}/getBlogByid/${decoded._id}`);
      const response = await res.json();
      if (response.success) {
        setmyJson(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const uploadImg = async (file) => {
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
      console.log("Error uploading image");
    }
  };


  async function getData() {
    let res = await fetch(`${VITE_API_URL}/getBlog`)
    const datas = await res.json();
    setJson(datas.data);

  }

  async function createblog() {
    let decoded = null;
    decoded = jwtDecode(sessionStorage.getItem("token"));

    let imageUrl;

    if (!title) {
      toast.error("enter Title");
      return false;
    }
    else if (!body) {
      toast.error("enter description");
      return false;
    }
    else if (!imageFile) {
      toast.error("select Image");
      return false;
    }

    try {
      imageUrl = await uploadImg(imageFile);
      // console.log("imageurl", imageUrl);
    }
    catch (error) {
      console.log("error in uploading image")
    }
    let res = await fetch(`${VITE_API_URL}/createBlog`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: decoded._id,
        firebaseImageUrl: imageUrl,
        title: title,
        body: body,
        author: decoded.name
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    )
    if (res.ok) {
      toast.success('Blog is created successfully!');
      getData();
      console.log("called to home page get data after creating blog");
      const json = await res.json();

      setBlog(!blog);
      setImage("");
      setTitle("");
      setBody("");
      setAuthor("");
      setJson([]);
      setImageFile(null);
      return true;
    }
    else {
      toast.error('something went wrong while creating blog');

    }


  }




  return (
    <>


      <Router>
        <div className="App">

          <Navbar></Navbar>
          <Toaster />
          <Routes>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/SignUp' element={<SignUp />}></Route>
            <Route exact path='/' element={< Home json={json} />}></Route>
            <Route exact path='/Myblogs' element={< Myblogs blog={blog} Json={myJson} getData={getmyData} getHomedata={getData} />}></Route>
            <Route exact path='/createBlog' element={< CreateBlog setTitle={setTitle} setBody={setBody} setAuthor={setAuthor} createblog={createblog} setImageFile={setImageFile} getData={getmyData} />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
