import axios from "axios"
import {useState, useEffect} from 'react'
import { PostIndex } from "./PostIndex"
import { PostNew } from "./PostNew"

export function Content() {
  const[posts, setPosts] = useState([])
  
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

useEffect(getIndexPost, [])

  return (
    <main>
      <h1>Welcome to React!</h1>
      <PostNew onCreatePost={handleCreatePost}/>
      <PostIndex posts ={posts}/>
    </main>
  )
}