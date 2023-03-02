import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import HTMLReactParser from "html-react-parser";
import { articleSingleSchema, commentsSchema } from "~/schemas/articles.schema";

export async function loader({ params }: LoaderArgs) {
  const articleSlug = params.article;
  if (!articleSlug) {
    throw Error("No slug found!");
  }
  const response = await fetch(
    `${process.env.PUBLIC_API_BASE_URL}/articles/${articleSlug}`
  );
  const jsonResonse = await response.json();
  const articleResponse = articleSingleSchema.parse(jsonResonse);
  const commentsResponse = await fetch(
    `${process.env.PUBLIC_API_BASE_URL}/articles/${articleSlug}/comments`
  );
  const commentsJsonResonse = await commentsResponse.json();
  console.log("commentsJsonResonsecommentsJsonResonse", commentsJsonResonse);
  const comments = commentsSchema.parse(commentsJsonResonse);
  return json({
    article: articleResponse.article,
    comments: comments?.comments ?? [],
  });
}

export default function ArticleSingle() {
  const { article, comments } = useLoaderData<typeof loader>();
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

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
              <span className="date">
                {new Date(article.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author.username}{" "}
              {/* // TODO check if there are followers 
               <span className="counter">({article.author.})</span> */}
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post{" "}
              <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{HTMLReactParser(article.body)}</p>

            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
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
              <span className="date">
                {new Date(article.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author.username}{" "}
              {/* // TODO check if there are followers 
               <span className="counter">({article.author.})</span> */}
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post{" "}
              <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <p>
              <a href="/login">Sign in</a> or <a href="/register">sign up</a> to
              add comments on this article.
            </p>
            {/* Post comment form */}
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}
                ></textarea>
              </div>
              <div className="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                  alt=""
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            {/* Comment single */}
            {comments.map((comment) => (
              <div className="card" key={comment.id}>
                <div className="card-block">
                  <p className="card-text">{HTMLReactParser(comment.body)}</p>
                </div>
                <div className="card-footer">
                  <a
                    href={`/author/${comment.author.username}`}
                    className="comment-author"
                  >
                    <img
                      src={comment.author.image}
                      className="comment-author-img"
                      alt={comment.author.username}
                    />
                  </a>
                  &nbsp;
                  <a href="/" className="comment-author">
                    {comment.author.username}
                  </a>
                  <span className="date-posted">
                    {new Date(comment.updatedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
