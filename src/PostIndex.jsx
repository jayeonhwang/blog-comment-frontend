export function PostIndex(props) {

  return (
    <div>
      {props.posts.map(post => (
        <div className ="post" key ={post.id} >
          <p>Title: {post.title} </p>
          <img src={post.image}/>
          <p>Body: {post.body}</p>
        </div>
      ))}
    </div>
  )
} 
