import Navbar from "@/components/Navbar";
import HeadTitle from "@/components/HeadTitle";
import MainBody from "@/components/MainBody";
import ProfileDetails from "@/components/ProfileDetails";
import axios from "axios";

export default async function ProfilePage() {
  // async function getProfile() {
  //   const res = await axios.get("/api/user/profile");
  //   return res;
  // }

  // const res = await getProfile();
  // console.log(res.data);

  return (
    <div>
      <Navbar />
      <HeadTitle title="Your Profile" />
      <MainBody>
        <ProfileDetails />
      </MainBody>
    </div>
  );
}
