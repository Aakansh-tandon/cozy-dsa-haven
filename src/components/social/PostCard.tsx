
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share, Clock } from "lucide-react";
import { Post } from "@/types/social";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
  onShare: (postId: string) => void;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onShare, onLike, onComment }) => {
  return (
    <Card className="border border-border futuristic-card hover:shadow-xl overflow-hidden">
      <CardHeader className="p-4 border-b border-border/40 bg-muted/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-primary/20">
            <img 
              src={post.avatar} 
              alt={post.username} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.username}</span>
              <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full text-primary">
                Pro
              </span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.timestamp}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          {post.description && (
            <p className="text-muted-foreground mt-1">{post.description}</p>
          )}
        </div>
        
        <div className="rounded-md bg-background/50 border border-border/50 p-4 overflow-x-auto">
          <pre className="font-mono text-sm">
            <code>{post.code}</code>
          </pre>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full border border-secondary/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t border-border/40 flex justify-between">
        <div className="flex items-center gap-6">
          <button 
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => onLike(post.id)}
          >
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </button>
          <button 
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => onComment(post.id)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </button>
          <button 
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => onShare(post.id)}
          >
            <Share className="h-4 w-4" />
            <span>{post.shares}</span>
          </button>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/30 text-primary hover:bg-primary/10"
          onClick={() => {
            navigator.clipboard.writeText(post.code);
            toast.success("Code copied to clipboard!");
          }}
        >
          Copy Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
