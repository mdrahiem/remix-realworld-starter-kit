import { Outlet } from "@remix-run/react";
import Banner from "~/components/common/banner";

export default function Index() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <Outlet />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              {/* <Tags /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
