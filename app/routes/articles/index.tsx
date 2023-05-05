import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/common/layout";
import { articleListSchema, tagsSchema } from "~/schemas/articles.schema";

export async function loader({ request }: LoaderArgs) {
  // TODO: Move all fetch requests to server functions to reuse
  const response = await fetch(`${process.env.PUBLIC_API_BASE_URL}/articles`);
  const jsonResonse = await response.json();
  const articlesResponse = articleListSchema.parse(jsonResonse);
  const tagsResponse = await fetch(`${process.env.PUBLIC_API_BASE_URL}/tags`);
  const tagsJsonResonse = await tagsResponse.json();
  const tags = tagsSchema.parse(tagsJsonResonse);
  return json({ articles: articlesResponse.articles, tags: tags.tags });
}

// TODO: Move these to components
export default function Articles() {
  const { articles, tags } = useLoaderData<typeof loader>();
  console.log("articlesarticles", articles, tags);
  return (
    <Layout tags={tags}>
      <>
        {/* // TODO: Make a component */}
        {/* {articles.map((article) => (
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
            <Link to={`/articles/${article.slug}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
              {article.tagList.length > 0 && (
                <ul className="tag-list">
                  {article.tagList.map((tag) => (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          </div>
        ))} */}
        <h1>sdfdssdf</h1>
      </>
    </Layout>
  );
}
