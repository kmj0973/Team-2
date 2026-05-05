import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "../styles/Auth.scss";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // 타자 칠 때마다 실시간 검사
  });

  const onSubmit = (data) => {
    const savedUsers = JSON.parse(localStorage.getItem("fake-db-users")) || [];

    // 데이터 없는 경우
    if (savedUsers.length === 0) {
      alert("가입된 정보가 없습니다. 회원가입을 먼저 진행해주세요!");
      return;
    }

    const foundUser = savedUsers.find((user) => user.userId === data.userId);

    if (!foundUser) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }

    if (foundUser.password !== data.password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("[로그인 제출]", data);
    alert("로그인 성공!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>🔑 로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="userIdInput">아이디</label>
          <div className="input-wrapper">
            <input
              id="userIdInput"
              type="text"
              placeholder="아이디를 입력해주세요"
              {...register("userId", {
                required: "아이디를 입력해주세요.",
                pattern: {
                  value: /^[a-zA-Z0-9]{4,20}$/,
                  message:
                    "아이디는 영문과 숫자만 사용하여 4~20자로 입력해주세요.",
                },
              })}
            />
          </div>
          {errors.userId && (
            <p className="error-msg">{errors.userId.message}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="passwordInput">비밀번호</label>
          <div className="input-wrapper">
            <input
              id="passwordInput"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                validate: (value) =>
                  (value.length >= 8 &&
                    /[a-zA-Z]/.test(value) &&
                    /[0-9]/.test(value)) ||
                  "비밀번호는 영문과 숫자를 모두 포함하여 \n8자 이상이어야 합니다.",
              })}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={!isValid}>
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
