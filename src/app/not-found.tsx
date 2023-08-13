import Link from "next/link";
import React from "react";
import Navbar from "@/components/Navbar";
import HeadTitle from "@/components/HeadTitle";
import MainBody from "@/components/MainBody";
import NotFound from "@/components/NotFound";

export default function NotFoundPage() {
  return (
    <div>
      <Navbar />
      {/* <HeadTitle title="Not Found" /> */}
      <MainBody>
        <NotFound />
      </MainBody>
    </div>
  );
}
