import axios from "axios"
import {useState, useEffect} from 'react'
import { PostIndex } from "./PostIndex"
import { PostNew } from "./PostNew"
import { Modal } from "./Modal";
import { PostShow } from "./PostShow";

export function Content() {
  const[posts, setPosts] = useState([])
  const[isPostsShowVisible, setIsPostsShowVisible] = useState(false)
  const[currentPost, setCurrentPost] = useState({})


 const getIndexPost = () => {
  console.log('getting posts')
  axios.get("http://localhost:3000/posts.json").then(response => {
    console.log(response.data)
    setPosts(response.data)
 })
}

const handleCreatePost =(params, successCallback) => {
  console.log("handleCreatePost", params)
  axios.post("http://localhost:3000/posts.json", params).then(response => {
    setPosts([...posts, response.data])
    successCallback();
  })
}

const handelShowPost = (post) => {
  console.log("handleShowPost", post)
  setIsPostsShowVisible(true)
  setCurrentPost(post)
}


const handleUpdatePost = (id, params, successCallback) => {
  console.log("handleUpdatePost", params)
  axios.patch(`http://localhost:3000/posts/${id}.json`,params).then(response =>{
    setPosts(
      posts.map(post => {
       if (post.id === response.data.id) {
        return response.data
       } else{
        return post
       }
      })
    )
    successCallback()
    handleClose()
  })
}

const handleClose = () => {
  console.log("handleClsoe")
  setIsPostsShowVisible(false)
}

const handleDestroyPost = (post) => {
  console.log("handleDestroyPost", post)
  axios.delete(`http://localhost:3000/posts/${id}.json`).then(response => {
    setPosts(posts.filter(p=>p.id !== post.id));
    handleClose()
  })
}

useEffect(getIndexPost, [])

  return (
    <main>
      <h1>Welcome to React!</h1>
      <PostNew onCreatePost={handleCreatePost} />
      <PostIndex posts ={posts} onShowPost={handelShowPost}/>
      <Modal show={isPostsShowVisible} onClose={handleClose}>
        <h1>Test</h1>
        <PostShow post={currentPost} onUpdatePost={handleUpdatePost} onDestroyPost={handleDestroyPost}/>
      </Modal>
    </main>
  )
}