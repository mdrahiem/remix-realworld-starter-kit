// export async function loader({ request }: LoaderArgs) {
//   // TODO: Move all fetch requests to server functions to reuse
//   const response = await fetch(`${process.env.PUBLIC_API_BASE_URL}/articles`);
//   const jsonResonse = await response.json();
//   const articlesResponse = articleListSchema.parse(jsonResonse);
//   const tagsResponse = await fetch(`${process.env.PUBLIC_API_BASE_URL}/tags`);
//   const tagsJsonResonse = await tagsResponse.json();
//   const tags = tagsSchema.parse(tagsJsonResonse);
//   return json({ articles: articlesResponse.articles, tags: tags.tags });
// }

// TODO: Move these to components
export default function Articles() {
  // const { articles, tags } = useLoaderData<typeof loader>();
  return (
    // <Layout tags={tags}>
    <h1>Articles</h1>
    // </Layout>
  );
}
