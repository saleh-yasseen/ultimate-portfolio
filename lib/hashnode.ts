const HASHNODE_GQL = "https://gql.hashnode.com";
const PUBLICATION_HOST = "saifmohamedsv.hashnode.dev";

export interface HashnodeTag {
  name: string;
  slug: string;
}

export interface HashnodePost {
  id: string;
  title: string;
  slug: string;
  brief: string;
  coverImage: { url: string } | null;
  publishedAt: string;
  readTimeInMinutes: number;
  tags: HashnodeTag[];
  content: { markdown: string };
  seo: { title: string; description: string } | null;
  ogMetaData: { image: string } | null;
  subtitle: string;
  url: string;
}

interface HashnodeResponse {
  data: {
    publication: {
      posts: {
        edges: { node: HashnodePost }[];
      };
    } | null;
  };
}

interface HashnodeSingleResponse {
  data: {
    publication: {
      post: HashnodePost | null;
    } | null;
  };
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(HASHNODE_GQL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Hashnode API error: ${res.status}`);
  return res.json();
}

const POST_FIELDS = `
  id
  title
  slug
  brief
  coverImage { url }
  publishedAt
  readTimeInMinutes
  tags { name slug }
  seo { title description }
  ogMetaData { image }
  subtitle
  url
`;

export async function getHashnodePosts(first = 20): Promise<HashnodePost[]> {
  const data = await gql<HashnodeResponse>(`
    query GetPosts($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              ${POST_FIELDS}
              content { markdown }
            }
          }
        }
      }
    }
  `, { host: PUBLICATION_HOST, first });

  if (!data.data.publication) return [];
  return data.data.publication.posts.edges.map((e) => e.node);
}

export async function getHashnodePost(slug: string): Promise<HashnodePost | null> {
  const data = await gql<HashnodeSingleResponse>(`
    query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          ${POST_FIELDS}
          content { markdown }
        }
      }
    }
  `, { host: PUBLICATION_HOST, slug });

  return data.data.publication?.post ?? null;
}

export async function getLatestHashnodePosts(n: number): Promise<HashnodePost[]> {
  const posts = await getHashnodePosts(n);
  return posts.slice(0, n);
}
