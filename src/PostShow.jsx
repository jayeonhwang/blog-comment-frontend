export function PostShow(props) {
  return (
    <div>
      <img src = {props.post.image}/>
      <p>Title: {props.post.title} </p>
      <p>Body: {props.post.body}</p>
    </div>
  );
}