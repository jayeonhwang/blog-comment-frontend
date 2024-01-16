import axios from "axios"
import {useState, useEffect} from 'react'
import { PostIndex } from "./PostIndex"
import { PostNew } from "./PostNew"
import { Modal } from "./Modal";

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

const handleClose = () => {
  console.log("handleClsoe")
  setIsPostsShowVisible(false)
}

useEffect(getIndexPost, [])

  return (
    <main>
      <h1>Welcome to React!</h1>
      <PostNew onCreatePost={handleCreatePost} />
      <PostIndex posts ={posts} onShowPost={handelShowPost}/>
      <Modal show={isPostsShowVisible} onClose={handleClose}>
        <h1>Test</h1>
      </Modal>
    </main>
  )
}