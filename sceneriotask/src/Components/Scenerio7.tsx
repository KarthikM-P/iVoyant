import { useState, useEffect } from "react";

function Scenerio7() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/posts")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default Scenerio7;
