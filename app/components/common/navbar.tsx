import { useMatches } from "@remix-run/react";

export default function Navbar() {
  const matches = useMatches();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <span>conduit</span>
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a href="/" className="nav-link ">
              Home
            </a>
          </li>
          {/* <li className="nav-item">
            <a href="/editor/new">
              <i className="ion-compose" />
              &nbsp;New Post
            </a>
          </li>
          <li className="nav-item">
            <a href="/user/settings">
              <i className="ion-gear-a" />
              &nbsp;Settings
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/"
            >
              <span>username</span>
            </a>
          </li> */}
          <li className="nav-item">
            <a
              href="/login"
              className={
                matches.some((p) => p.pathname.includes("/login"))
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {" "}
              Sign in
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/register"
              className={
                matches.some((p) => p.pathname.includes("/register"))
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
