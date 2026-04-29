function BoardItem({ post, onDelete }) {
  return (
    <li className="board-item">
      <div className="content-area">
        <h4>{post.title}</h4>
        <p>{post.content}</p>
      </div>
      <button
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            onDelete(post.id);
          }
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default BoardItem;
