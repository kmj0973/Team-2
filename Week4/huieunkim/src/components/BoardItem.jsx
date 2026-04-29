function BoardItem({ post, onDelete }) {
  return (
    <li className="board-item">
      <div className="content-area">
        <h4>{post.title}</h4>
        <p>{post.content}</p>
      </div>
      <button onClick={() => onDelete(post.id)}>삭제</button>
    </li>
  );
}

export default BoardItem;