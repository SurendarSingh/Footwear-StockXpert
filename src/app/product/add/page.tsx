import Navbar from "@/components/Navbar";
import HeadTitle from "@/components/HeadTitle";
import MainBody from "@/components/MainBody";
import AddProduct from "@/components/AddProduct";
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
      <HeadTitle title="Add Product" />
      <MainBody>
        <AddProduct />
      </MainBody>
    </div>
  );
}
