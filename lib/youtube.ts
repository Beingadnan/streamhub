// YouTube API utility functions

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface Video {
  id: {
    kind: string;
    videoId: string;
  } | string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    title: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    publishedAt: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

export interface SearchResponse {
  items: Video[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

// Fetch trending/popular videos
export async function fetchPopularVideos(maxResults: number = 24): Promise<SearchResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=${maxResults}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular videos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    throw error;
  }
}

// Search videos
export async function searchVideos(
  query: string,
  maxResults: number = 24,
  pageToken?: string
): Promise<SearchResponse> {
  try {
    let url = `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}&key=${API_KEY}`;
    
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to search videos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
}

// Fetch video by ID
export async function fetchVideoById(videoId: string): Promise<Video> {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }
    
    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
}

// Fetch related videos
// Note: relatedToVideoId is deprecated, so we fetch videos from the same channel instead
export async function fetchRelatedVideos(videoId: string, maxResults: number = 12): Promise<SearchResponse> {
  try {
    // First, get the video details to find the channel
    const videoResponse = await fetch(
      `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );
    
    if (!videoResponse.ok) {
      // Fallback to popular videos if we can't get the video details
      return await fetchPopularVideos(maxResults);
    }
    
    const videoData = await videoResponse.json();
    const channelId = videoData.items[0]?.snippet?.channelId;
    
    if (!channelId) {
      // Fallback to popular videos
      return await fetchPopularVideos(maxResults);
    }
    
    // Search for videos from the same channel
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&type=video&channelId=${channelId}&maxResults=${maxResults}&order=date&key=${API_KEY}`
    );
    
    if (!response.ok) {
      // Fallback to popular videos
      return await fetchPopularVideos(maxResults);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching related videos:', error);
    // Fallback to popular videos instead of throwing
    try {
      return await fetchPopularVideos(maxResults);
    } catch (fallbackError) {
      console.error('Error fetching fallback videos:', fallbackError);
      throw error;
    }
  }
}

// Fetch videos by category
export async function fetchVideosByCategory(
  categoryId: string,
  maxResults: number = 24
): Promise<SearchResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=${categoryId}&regionCode=US&maxResults=${maxResults}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch videos by category');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    throw error;
  }
}

// Format view count
export function formatViewCount(count: string | number): string {
  const num = typeof count === 'string' ? parseInt(count) : count;
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Format date (e.g., "2 days ago")
export function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHours = Math.floor(diffInMin / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  }
  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  if (diffInMin > 0) {
    return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
  }
  return 'Just now';
}

