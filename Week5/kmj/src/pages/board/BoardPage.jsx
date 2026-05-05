import { useState } from 'react';
import BoardItem from './components/BoardItem';
import { BoardList } from './components/BoardList';
import { BoardForm } from './components/BoardForm';
import styles from './BoardPage.module.scss';
import { v4 as uuidv4 } from 'uuid';

export const BoardPage = () => {
  // 💡 실습 1. 여기에 가짜 데이터 상태(useState)를 만들게 됩니다.
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem('posts');
    return stored ? JSON.parse(stored) : [];
  });

  const addPost = ({ title, content }) => {
    const newTitle = title.trim();
    const newContent = content.trim();

    if (newTitle.length === 0 || newContent.length === 0) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }

    const newPost = { id: uuidv4(), title: newTitle, content: newContent };

    setPosts([...posts, newPost]);

    localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));

    localStorage.setItem(
      'posts',
      JSON.stringify(posts.filter((post) => post.id !== id)),
    );
  };

  const updatePost = (id, title, content) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, title, content } : post,
      ),
    );

    localStorage.setItem(
      'posts',
      JSON.stringify(
        posts.map((post) =>
          post.id === id ? { ...post, title, content } : post,
        ),
      ),
    );
  };

  return (
    <div className={styles.boardContainer}>
      <h2>📝 자유 게시판</h2>

      {/* 💡 실습 2. 입력 폼 컴포넌트(BoardForm)가 들어갈 자리 */}
      <div className={styles.boardFormContainer}>
        <h3 className={styles.boardFormTitle}>게시글 작성 영역 (BoardForm)</h3>
        <BoardForm addPost={addPost} />
      </div>

      {/* 💡 실습 3. 게시글 목록 컴포넌트(BoardList & BoardItem)가 들어갈 자리 */}
      <div className={styles.boardListContainer}>
        <h3 className={styles.boardListTitle}>게시글 목록 영역 (BoardList)</h3>
        <BoardList>
          {posts.length === 0 ? (
            <li>아직 작성된 글이 없습니다.</li>
          ) : (
            posts.map((post) => (
              <BoardItem
                key={post.id}
                post={post}
                deletePost={deletePost}
                updatePost={updatePost}
              />
            ))
          )}
        </BoardList>
      </div>
    </div>
  );
};
