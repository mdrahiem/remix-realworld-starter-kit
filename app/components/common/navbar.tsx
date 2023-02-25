export default function Navbar() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <span>conduit</span>
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a href="/">Home</a>
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
            <a href="/login">Sign in</a>
          </li>
          <li className="nav-item">
            <a href="/register">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
