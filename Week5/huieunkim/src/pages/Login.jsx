import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Auth.scss";

function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isUserIdValid = /^[a-zA-Z0-9]{4,20}$/.test(userId);
  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const isAllValid = isUserIdValid && isPasswordValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAllValid) return;

    // 로컬 스토리지(가짜 DB)에서 방금 가입한 유저 정보 꺼내기
    const savedUsersStr = localStorage.getItem("fake-db-users");

    // 데이터 없는 경우
    if (!savedUsersStr) {
      alert("가입된 정보가 없습니다. 회원가입을 먼저 진행해주세요!");
      return;
    }

    const savedUsers = JSON.parse(savedUsersStr);
    const foundUser = savedUsers.find((user) => user.userId === userId);

    if (!foundUser.userId !== userId) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }

    if (foundUser.password !== password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("[로그인 제출]", { userId, password });
    alert("로그인 성공!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>🔑 로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userIdInput">아이디</label>
          <div className="input-wrapper">
            <input
              id="userIdInput"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디를 입력해주세요"
            />
          </div>
          {userId.length > 0 && !isUserIdValid && (
            <p className="error-msg">
              아이디는 영문과 숫자만 사용하여 4~20자로 입력해주세요.
            </p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="passwordInput">비밀번호</label>
          <div className="input-wrapper">
            <input
              id="passwordInput"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {password.length > 0 && !isPasswordValid && (
            <p className="error-msg">
              비밀번호는 영문과 숫자를 모두 포함하여 8자 이상이어야 합니다.
            </p>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={!isAllValid}>
          로그인
        </button>

        {/* 회원가입 이동 링크 */}
        <p className="auth-nav-text">
          아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
