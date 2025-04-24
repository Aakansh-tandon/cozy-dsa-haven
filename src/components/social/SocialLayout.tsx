
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import { motion } from "framer-motion";
import NewPostForm from "./NewPostForm";
import PostCard from "./PostCard";
import SocialSidebar from "./SocialSidebar";
import { Post, Comment } from "@/types/social";
import { toast } from "sonner";

interface SocialLayoutProps {
  posts: Post[];
  showNewPost: boolean;
  setShowNewPost: (show: boolean) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SocialLayout: React.FC<SocialLayoutProps> = ({
  posts: initialPosts,
  showNewPost,
  setShowNewPost
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts.map(post => ({
    ...post,
    commentsList: post.commentsList || []
  })));
  
  const handleShare = (postId: string) => {
    toast.success("Post copied to clipboard!");
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
    toast.success("Post liked!");
  };

  const handleComment = (postId: string) => {
    // This is now just toggling the comments section
    // No message needed as comments are actually shown
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                  <span className="text-primary">Social</span> Feed
                </h1>
              </div>
              
              {showNewPost && <NewPostForm onClose={() => setShowNewPost(false)} />}
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onShare={handleShare}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                ))}
              </motion.div>
            </div>
            
            <SocialSidebar />
          </div>
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default SocialLayout;
