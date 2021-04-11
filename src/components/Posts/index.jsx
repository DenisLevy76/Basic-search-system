import "./styles.css";
import p from "prop-types";
import { Post } from "../Post";

export function Posts({ posts }) {
  return (
    <div className="posts-container">
      <ul>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: p.arrayOf(
    p.shape({ id: p.number, title: p.string, body: p.string, img: p.string })
  ),
};
