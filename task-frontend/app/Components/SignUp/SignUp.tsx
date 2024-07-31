"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/signup`, { email, password });
      const { authToken } = response.data;
      localStorage.setItem('token', authToken);
      router.push('/');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.errors[0].msg || 'Something went wrong');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>
          <span className="welcome-text">Create Your </span>
          <span className="workflo-text">Workflo</span>
          <span className="welcome-text"> Account!</span>
        </h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <Link href="/login">
            Log In
          </Link>
        </p>
      </div> 
      <style jsx>{`
        .signup-container {
          display: flex;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          background: linear-gradient(360deg, #7C7CE5, #ffffff);
          color: #000;
        }
        .signup-box {
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          margin-top: 7rem;
          box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
          width: 30rem;
          height: 24rem;
          text-align: center;
        }
        .welcome-text {
          color: black;
          font-size: 1.75rem;
          font-weight: bold;
        }
        .workflo-text {
          color: #4747DA;
          font-size: 1.75rem;
          font-weight: bold;
        }
        .signup-box form {
          margin-top: 1.5rem;
        }
        .signup-box input {
          display: block;
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.8rem;
          border-radius: 0.05rem;
          border: 0.05rem solid #ddd;
        }
        .signup-box button {
          width: 100%;
          padding: 0.8rem;
          border-radius: 0.05rem;
          border: none;
          background-color: #7C7CE5;
          color: #fff;
          cursor: pointer;
        }
        .signup-box button:hover {
          background-color: #45a049;
        }
        .error-message {
          color: #f44336; /* Red color for error messages */
        }
        .login-link {
          color: #4747DA;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
