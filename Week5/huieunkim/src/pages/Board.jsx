import { useState, useEffect } from "react";
import BoardForm from "../components/BoardForm";
import BoardList from "../components/BoardList";
import "../styles/Board.scss";

function Board() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("board-posts");

    if (savedPosts) {
      return JSON.parse(savedPosts); //
    } else {
      return [
        { id: 1, title: "첫번째 글", content: "안녕하세요! 반갑습니다." },
        { id: 2, title: "리엑트 라우터", content: "라우팅 실습 중입니다." },
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem("board-posts", JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="board-container">
      <h2>📝 자유 게시판</h2>

      <div className="board-section">
        <h3>게시글 작성 영역 (BoardForm)</h3>
        <BoardForm onAddPost={handleAddPost} />
      </div>

      <div className="board-section">
        <h3>게시글 목록 영역 (BoardList)</h3>
        <BoardList posts={posts} onDelete={handleDeletePost} />
      </div>
    </div>
  );
}

export default Board;
