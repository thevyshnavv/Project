import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function UserLayout({ search, setSearch }) {
  return (
    <div>
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <Header search={search} setSearch={setSearch} />
      </div>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default UserLayout;
