import "./styles.css";
import p from "prop-types";

export function Post({ post }) {
  return (
    <div className="post-container">
      <img src={post.img} alt={post.title} />
      <div className="post-body">
        <h2>
          {post.title} {post.id}
        </h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: p.object.isRequired,
};
