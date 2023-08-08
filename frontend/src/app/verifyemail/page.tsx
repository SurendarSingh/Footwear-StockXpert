"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlToken = window.location.href.split("=")[1];
    if (urlToken) setToken(urlToken);
  }, []);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post("/api/user/verifyemail", { token });
        setMessage(response.data.message);
      } catch (error: any) {
        setError(error.response.data.message);
      }
    };

    if (token) verifyEmail();
  }, [token]);

  return (
    <div className="container">
      <h1 className="title">Verify Email</h1>
      {message ? (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <p>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </p>
    </div>
  );
}
