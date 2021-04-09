import './styles.css'

import { Post } from '../Post'
export function Posts( {posts} ) {
  return (
    <div className="posts-container">
      <ul>
        {posts.map( post => (
          <Post post={post} key={post.id}/>
        ))}
      </ul>
    </div>
  )
}