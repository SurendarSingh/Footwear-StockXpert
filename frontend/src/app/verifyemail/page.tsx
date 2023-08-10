"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeadTitle from "@/components/HeadTitle";
import MainBody from "@/components/MainBody";
import EmailVerify from "@/components/EmailVerify";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verified, setVerified] = useState(false);
  const [process, setProcess] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post("/api/user/verifyemail", { token });
        if (response.data.message === "Verified") setVerified(true);
        else {
          setVerified(false);
          setError(response.data.message);
        }
      } catch (error: any) {
        setVerified(false);
        setError(error.response.data.message);
      } finally {
        setProcess(false);
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div>
      <Navbar />
      <HeadTitle title="Verify Email" />
      <MainBody>
        <EmailVerify verified={verified} process={process} error={error} />
      </MainBody>
    </div>
  );
}
