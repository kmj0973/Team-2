import { useState } from 'react';
import styles from './BoardItem.module.scss';

const BoardItem = ({ post, deletePost, updatePost }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className={styles.boardItemWrapper}>
      {isEditing ? (
        <>
          <div className={styles.boardItemContentWrapper}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className={styles.boardItemButtonWrapper}>
            <button
              className={styles.boardItemDeleteButton}
              onClick={() => {
                setTitle(post.title);
                setContent(post.content);
                setIsEditing(false);
              }}
            >
              취소
            </button>
            <button
              className={styles.boardItemUpdateButton}
              onClick={() => {
                if (title.trim().length === 0 || content.trim().length === 0) {
                  alert('제목과 내용을 모두 입력해주세요!');
                  return;
                }
                updatePost(post.id, title.trim(), content.trim());
                setIsEditing(!isEditing);
              }}
            >
              수정 완료
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.boardItemContentWrapper}>
            <h4 className={styles.boardItemTitle}>{post.title}</h4>
            <p className={styles.boardItemContent}>{post.content}</p>
          </div>
          <div className={styles.boardItemButtonWrapper}>
            <button
              className={styles.boardItemDeleteButton}
              onClick={() => {
                deletePost(post.id);
              }}
            >
              삭제
            </button>
            <button
              className={styles.boardItemUpdateButton}
              onClick={() => setIsEditing(!isEditing)}
            >
              수정
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default BoardItem;
