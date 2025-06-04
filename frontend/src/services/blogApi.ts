// Blog API Service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  author_id: number;
  author_name: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface BlogPostFilter {
  status?: string;
  category?: string;
  author_id?: number;
  search?: string;
  limit?: number;
  offset?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface BlogStats {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  total_views: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

class BlogApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is ok and has content
      if (!response.ok) {
        // Handle different error status codes
        if (response.status === 404) {
          return {
            success: false,
            error: 'Endpoint not found - Please check if the server is running and the API endpoint exists',
          };
        } else if (response.status === 401) {
          return {
            success: false,
            error: 'Unauthorized - Please login again',
          };
        } else if (response.status === 403) {
          return {
            success: false,
            error: 'Forbidden - You do not have permission to access this resource',
          };
        } else {
          return {
            success: false,
            error: `Server error: ${response.status} ${response.statusText}`,
          };
        }
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return {
          success: false,
          error: 'Server did not return JSON response',
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      if (error instanceof SyntaxError) {
        return {
          success: false,
          error: 'Invalid JSON response from server',
        };
      }
      return {
        success: false,
        error: 'Network error occurred - Please check if the server is running',
      };
    }
  }

  // Public blog endpoints
  async getPublishedPosts(filter: BlogPostFilter = {}): Promise<ApiResponse<BlogPost[]>> {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });

    const endpoint = `/blog/posts${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<BlogPost[]>(endpoint);
  }

  async getPublishedPost(id: number, incrementView = true): Promise<ApiResponse<BlogPost>> {
    const params = incrementView ? '?increment_view=true' : '';
    return this.request<BlogPost>(`/blog/posts/${id}${params}`);
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/blog/categories');
  }

  // Protected blog management endpoints
  async getAllPosts(filter: BlogPostFilter = {}): Promise<ApiResponse<BlogPost[]>> {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });

    const endpoint = `/blog/manage/posts${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<BlogPost[]>(endpoint);
  }

  async getPost(id: number): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blog/manage/posts/${id}`);
  }

  async createPost(post: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>('/blog/manage/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  async updatePost(id: number, post: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blog/manage/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  }

  async deletePost(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/blog/manage/posts/${id}`, {
      method: 'DELETE',
    });
  }

  async publishPost(id: number): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blog/manage/posts/${id}/publish`, {
      method: 'POST',
    });
  }

  async unpublishPost(id: number): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blog/manage/posts/${id}/unpublish`, {
      method: 'POST',
    });
  }

  async getStats(): Promise<ApiResponse<BlogStats>> {
    return this.request<BlogStats>('/blog/manage/stats');
  }
}

export const blogApi = new BlogApiService(); 