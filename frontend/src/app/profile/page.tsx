"use client";

import Navbar from "../../components/Navbar";
import HeadTitle from "../../components/HeadTitle";
import MainBody from "../../components/MainBody";

export default function ProfilePage() {
  return (
    <div>
      <Navbar />
      <HeadTitle title="Dashboard" />
      <MainBody>
        <h1>Profile</h1>
      </MainBody>
    </div>
  );
}
