import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Banner from "~/components/common/banner";
import { articleListSchema, tagsSchema } from "~/schemas/articlelist.schema";

export async function loader({ request }: LoaderArgs) {
  const response = await fetch(`${process.env.PUBLIC_API_BASE_URL}/articles`);
  const jsonResonse = await response.json();
  const articlesResponse = articleListSchema.parse(jsonResonse);
  const tagsResponse = await fetch(`${process.env.PUBLIC_API_BASE_URL}/tags`);
  const tagsJsonResonse = await tagsResponse.json();
  const tags = tagsSchema.parse(tagsJsonResonse);
  return json({ articles: articlesResponse.articles, tags: tags.tags });
}

// TODO: Move these to components
export default function Index() {
  const { articles, tags } = useLoaderData<typeof loader>();
  console.log(articles);
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
                  <a className="nav-link active" href="/">
                    Global Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/tags/javsc">
                    #javascript
                  </a>
                </li>
              </ul>
            </div>

            {articles.map((article) => (
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
                <Link to={`/${article.slug}`} className="preview-link">
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
            ))}
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
