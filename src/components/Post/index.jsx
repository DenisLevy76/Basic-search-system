import './styles.css'

export function Post( {post} ) {
  return (
    <div className="post-container">
      <img src={post.img} alt={post.title}/>
      <div className="post-body">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  )
}