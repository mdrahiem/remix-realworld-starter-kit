import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { articleListSchema } from "~/schemas/articles.schema";
import { authorBioSchema } from "~/schemas/author.schema";

export async function loader({ request, params }: LoaderArgs) {
  const url = new URL(request.url);

  const isFavourited = url.searchParams.get("favourited") === "true";
  console.log("isFavouritedisFavourited", isFavourited);
  const authorName = params.author;

  if (!authorName) {
    throw json({});
  }

  const authorResponse = await fetch(
    `${process.env.PUBLIC_API_BASE_URL}/profiles/${authorName}`
  );
  const jsonResonse = await authorResponse.json();
  const authorBio = authorBioSchema.parse(jsonResonse);

  const response = await fetch(
    `${process.env.PUBLIC_API_BASE_URL}/articles?${
      isFavourited ? "favorited" : "author"
    }=${encodeURI(authorName)}&limit=5&offset=0`
  );
  const articleJsonResonse = await response.json();
  console.log(articleJsonResonse);
  const articlesResponse = articleListSchema.parse(articleJsonResonse);
  return json({
    author: authorBio.profile,
    articlesResponse,
    isFavourited,
  });
}

export default function AuthorProfile() {
  const { author, articlesResponse, isFavourited } =
    useLoaderData<typeof loader>();
  const location = useLocation();

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                className="user-img"
                src={author.image}
                alt={author.username}
              />
              <h4 className="ng-binding">{author.username}</h4>
              <p>{author.bio}</p>

              <button className="btn btn-sm action-btn ng-binding btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {author.username}
                {/* // TODO check if there are followers 
               <span className="counter">({article.author.})</span> */}
              </button>

              {/* <a
                ui-sref="app.settings"
                className="btn btn-sm btn-outline-secondary action-btn ng-hide"
                ng-show="$ctrl.isUser"
                href="#/settings"
              >
                <i className="ion-gear-a"></i> Edit Profile Settings
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a
                    className={`nav-link ${!isFavourited && "active"}`}
                    href={location.pathname}
                  >
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${isFavourited && "active"}`}
                    href="?favourited=true"
                  >
                    Favourited Articles
                  </a>
                </li>
              </ul>
            </div>
            {articlesResponse.articles.length > 0 ? (
              articlesResponse.articles.map((article) => (
                <div className="article-preview" key={article.slug}>
                  <div className="article-meta">
                    <Link to={`/author/${article.author.username}`}>
                      <img src={article.author.image} alt="" />
                    </Link>
                    <div className="info">
                      <Link
                        to={`/author/${article.author.username}`}
                        className="author"
                      >
                        {article.author.username}
                      </Link>
                      <span className="date">{article.updatedAt}</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                      <i className="ion-heart"></i> {article.favoritesCount}
                    </button>
                  </div>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="preview-link"
                  >
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    {article.tagList.length > 0 && (
                      <ul className="tag-list">
                        {article.tagList.map((tag) => (
                          <li
                            className="tag-default tag-pill tag-outline"
                            key={tag}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Link>
                </div>
              ))
            ) : (
              <div className="article-preview">
                <p>No articles are here... yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
