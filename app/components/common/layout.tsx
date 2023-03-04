import { Link } from "@remix-run/react";
import type { ReactElement } from "react";
import Banner from "./banner";

type LayoutProps = {
  children: JSX.Element;
  tags: string[];
  tag?: string;
};

export default function Layout({
  children,
  tags,
  tag,
}: LayoutProps): ReactElement {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="/">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Global Feed
                  </a>
                </li>
                {tag && (
                  <li className="nav-item">
                    <span className="nav-link active">#{tag}</span>
                  </li>
                )}
              </ul>
            </div>
            {children}
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {tags.map((tag) => (
                  <Link
                    to={`/tag/${tag}`}
                    className="tag-pill tag-default"
                    key={tag}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
