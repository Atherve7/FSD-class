import { useMemo, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const ENDPOINTS = {
  login: "/api/auth/login",
  signup: "/api/auth/register",
};

function extractErrorMessage(error) {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "Something went wrong. Please try again.";
}

export default function App() {
  const [mode, setMode] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isLogin = mode === "login";

  const heading = useMemo(() => {
    return isLogin ? "Login to Your Account" : "Create Your Account";
  }, [isLogin]);

  const subHeading = useMemo(() => {
    return isLogin
      ? "Use your email and password to continue"
      : "Fill the form to register a new account";
  }, [isLogin]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetMessages();
    setFormData((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrorMessage("Password and confirm password must match.");
      return;
    }

    setIsSubmitting(true);

    const url = `${API_BASE_URL}${isLogin ? ENDPOINTS.login : ENDPOINTS.signup}`;
    const payload = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const message =
        response?.data?.message ||
        (isLogin ? "Login successful." : "Sign up successful.");
      setSuccessMessage(message);

      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.headerArea}>
          <h1 style={styles.heading}>{heading}</h1>
          <p style={styles.subHeading}>{subHeading}</p>
        </div>

        <div style={styles.switchContainer}>
          <button
            type="button"
            onClick={() => switchMode("login")}
            style={{
              ...styles.switchButton,
              ...(isLogin ? styles.switchButtonActive : {}),
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            style={{
              ...styles.switchButton,
              ...(!isLogin ? styles.switchButtonActive : {}),
            }}
          >
            Sign Up
          </button>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <label style={styles.fieldBlock}>
              Full Name
              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          )}

          <label style={styles.fieldBlock}>
            Email
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label style={styles.fieldBlock}>
            Password
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </label>

          {!isLogin && (
            <label style={styles.fieldBlock}>
              Confirm Password
              <input
                style={styles.input}
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={6}
                required
              />
            </label>
          )}

          <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {successMessage && <p style={styles.successText}>{successMessage}</p>}
        {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

        <p style={styles.note}>
          API Base URL: {API_BASE_URL}
          <br />
          Set <strong>VITE_API_BASE_URL</strong> in your frontend .env file for custom backend URLs.
        </p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
    transition: "background 0.5s ease",
  },
  card: {
    width: "100%",
    maxWidth: "430px",
    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 1px rgba(148, 163, 184, 0.1)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  headerArea: {
    marginBottom: "28px",
    transition: "all 0.4s ease",
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "1.75rem",
    color: "#f1f5f9",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    transition: "color 0.3s ease",
  },
  subHeading: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: "0.95rem",
    fontWeight: 400,
    transition: "color 0.3s ease",
  },
  switchContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "rgba(15, 23, 42, 0.5)",
    border: "1px solid rgba(148, 163, 184, 0.15)",
    borderRadius: "12px",
    padding: "5px",
    marginBottom: "20px",
    gap: "5px",
    transition: "all 0.3s ease",
  },
  switchButton: {
    border: "none",
    borderRadius: "10px",
    background: "transparent",
    color: "#94a3b8",
    fontWeight: 600,
    padding: "11px 14px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: "0.95rem",
  },
  switchButtonActive: {
    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "#ffffff",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
  },
  form: {
    display: "grid",
    gap: "16px",
  },
  fieldBlock: {
    display: "grid",
    gap: "8px",
    color: "#e2e8f0",
    fontWeight: 500,
    fontSize: "0.92rem",
    transition: "color 0.3s ease",
  },
  input: {
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "0.95rem",
    outline: "none",
    background: "rgba(30, 41, 59, 0.6)",
    color: "#f1f5f9",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  submitButton: {
    marginTop: "8px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "#ffffff",
    fontSize: "0.96rem",
    fontWeight: 700,
    padding: "13px 16px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.2)",
  },
  successText: {
    marginTop: "14px",
    color: "#86efac",
    fontWeight: 600,
    fontSize: "0.94rem",
    animation: "fadeIn 0.4s ease",
    transition: "color 0.3s ease",
  },
  errorText: {
    marginTop: "14px",
    color: "#ff6b6b",
    fontWeight: 600,
    fontSize: "0.94rem",
    animation: "fadeIn 0.4s ease",
    transition: "color 0.3s ease",
  },
  note: {
    marginTop: "18px",
    fontSize: "0.83rem",
    color: "#94a3b8",
    lineHeight: 1.5,
    transition: "color 0.3s ease",
  },
};