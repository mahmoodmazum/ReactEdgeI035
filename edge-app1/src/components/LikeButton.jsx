import { useState } from "react";

function LikeButton(props) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleUnlike = () => {
    setLikes(likes > 0 ? likes - 1 : 0);
  };

  return (
    <div
      style={{
        border: "2px solid #e2e8f0",
        padding: "20px",
        margin: "10px",
        borderRadius: "12px",
        width: "280px",
      }}
    >
      <h3>📝 {props.title}</h3>
      <p>{props.description}</p>

      <p style={{ fontSize: "22px", fontWeight: "bold" }}>❤️ {likes} Likes</p>

      {likes >= 5 && (
        <p style={{ color: "orange", fontWeight: "bold" }}>🔥 Popular!</p>
      )}

      <button
        onClick={handleLike}
        style={{ marginRight: "8px", padding: "8px 16px", cursor: "pointer" }}
      >
        ❤️ Like
      </button>

      <button
        onClick={handleUnlike}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        💔 Unlike
      </button>
    </div>
  );
}

export default LikeButton;
