import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function UserLayout({ search, setSearch }) {
  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayout;
