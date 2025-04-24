
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import LikeButton from "./LikeButton";

interface Comment {
  id: string;
  username: string;
  avatar: string;
  comment: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

interface CommentSectionProps {
  initialComments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      username: "You", // In a real app, this would come from auth
      avatar: "https://source.unsplash.com/random/100x100/?portrait&me",
      comment: newComment.trim(),
      timestamp: "Just now",
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setNewComment("");
    toast.success("Comment added successfully!");
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { 
              ...comment, 
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked
            }
          : comment
      )
    );
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Comments</h3>
        <span className="text-sm text-muted-foreground">{comments.length} comments</span>
      </div>
      
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="p-3 rounded-lg border border-border/50 bg-background/20">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img src={comment.avatar} alt={comment.username} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{comment.username}</h4>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-sm mt-1">{comment.comment}</p>
                <div className="flex items-center gap-3 mt-2">
                  <LikeButton 
                    initialLikes={comment.likes} 
                    onLike={() => handleLikeComment(comment.id)}
                  />
                  <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-3 border-t border-border/50">
        <div className="flex gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img 
              src="https://source.unsplash.com/random/100x100/?portrait&me" 
              alt="You" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              className="w-full min-h-[80px] border-border/50 bg-background/50 focus-visible:ring-primary"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button 
                size="sm"
                onClick={handleAddComment}
                className="bg-primary hover:bg-primary/90"
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
