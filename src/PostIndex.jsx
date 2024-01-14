import axios from "axios"
import { useState, useEffect } from "react"

export function PostIndex() {
 const [posts, setPosts] = useState([])
 const getIndexPost = () => {
  console.log('getting posts')
  axios.get("http://localhost:3000/posts.json").then(response => {
    console.log(response.data)
    setPosts(response.data)
 })
}
  useEffect(getIndexPost, [])

  return (
    <div>
      <p> This is all posts </p>
      {posts.map(post => (
        <div key ={post.id}>
          <p>Title: {post.title} </p>
          <img src={post.image}/>
          <p>Body: {post.body}</p>
        </div>
      ))}
    </div>
  )
} 
