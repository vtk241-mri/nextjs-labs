import type { Comment, Post } from "@/types/jsonPlaceholder";

const API_URL = "https://jsonplaceholder.typicode.com";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getPosts() {
  return request<Post[]>("/posts");
}

export function getPost(id: number, init?: RequestInit) {
  return request<Post>(`/posts/${id}`, init);
}

export function getPostComments(id: number, init?: RequestInit) {
  return request<Comment[]>(`/posts/${id}/comments`, init);
}
