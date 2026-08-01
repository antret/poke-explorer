const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts'

export async function createPost({ title, body }) {
  const response = await fetch(POSTS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      body,
      userId: 1,
    }),
  })

  if (!response.ok) {
    throw new Error('No se pudo crear la publicación')
  }

  return response.json()
}