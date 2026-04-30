import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "../styles/Auth.scss";

const getInitialData = () => {
  const savedDraft = sessionStorage.getItem("signup-draft");
  return savedDraft ? JSON.parse(savedDraft) : {};
};

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // 선택 조건: 비밀번호 숨기기/보이기 상태 관리

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: getInitialData(),
  });

  const formValues = watch();
  useEffect(() => {
    sessionStorage.setItem("signup-draft", JSON.stringify(formValues));
  }, [formValues]);

  const onSubmit = (data) => {
    console.log("[회원가입 제출]", data);
    alert("회원가입이 완료되었습니다!");
    sessionStorage.removeItem("signup-draft");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>👤 회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 아이디 입력 */}
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
                  message: "영문과 숫자만 사용하여 4~20자로 입력해주세요.",
                },
              })}
            />
          </div>
          {/* 아이디 에러 메시지 */}
          {errors.userId && (
            <p className="error-msg">{errors.userId.message}</p>
          )}
        </div>

        {/* 💡 이메일 입력 (누락됐던 닫는 태그와 에러 메시지 복구 완료!) */}
        <div className="input-group">
          <label htmlFor="emailInput">이메일</label>
          <div className="input-wrapper">
            <input
              id="emailInput"
              type="text"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "올바른 이메일 형식을 입력해주세요.\n(ex: user@example.com)",
                },
              })}
            />
          </div>
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        {/* 비밀번호 입력 */}
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
                  "비밀번호는 영문과 숫자를 모두 포함하여 8자 이상이어야 합니다.",
              })}
            />
            {/* 눈 아이콘 토글 버튼 */}
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

        {/* 비밀번호 확인 입력 */}
        <div className="input-group">
          <label htmlFor="passwordConfirmInput">비밀번호 확인</label>
          <div className="input-wrapper">
            <input
              id="passwordConfirmInput"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 입력해주세요"
              {...register("passwordConfirm", {
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value, formValues) =>
                  value === formValues.password ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
          </div>
          {errors.passwordConfirm && (
            <p className="error-msg">{errors.passwordConfirm.message}</p>
          )}
        </div>

        {/* 💡 제출 버튼 (isAllValid를 isValid로 수정 완료!) */}
        <button type="submit" className="submit-btn" disabled={!isValid}>
          가입하기
        </button>

        {/* 로그인 이동 링크 */}
        <p className="auth-nav-text">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
