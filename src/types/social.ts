
export interface Post {
  id: string;
  username: string;
  avatar: string;
  timestamp: string;
  title: string;
  description?: string;
  code: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  commentsList?: Comment[];
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  comment: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}
