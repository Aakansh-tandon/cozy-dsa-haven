import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Post } from "@/types/social";
import SocialLayout from "@/components/social/SocialLayout";

const mockPosts: Post[] = [
  {
    id: "1",
    username: "codemaster",
    avatar: "https://source.unsplash.com/random/100x100/?portrait&1",
    timestamp: "2 hours ago",
    title: "Optimized Solution for Two Sum Problem",
    description: "Check out my O(n) solution for the Two Sum problem using a hashmap.",
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    likes: 42,
    comments: 12,
    shares: 5,
    tags: ["leetcode", "arrays", "hashmap"]
  },
  {
    id: "2",
    username: "algoexpert",
    avatar: "https://source.unsplash.com/random/100x100/?portrait&2",
    timestamp: "5 hours ago",
    title: "Dynamic Programming Approach for Fibonacci",
    description: "A bottom-up DP approach to calculate Fibonacci numbers in O(n) time with O(1) space.",
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return b;
}`,
    likes: 87,
    comments: 23,
    shares: 15,
    tags: ["dynamic-programming", "algorithms", "optimization"]
  },
  {
    id: "3",
    username: "recursionmaster",
    avatar: "https://source.unsplash.com/random/100x100/?portrait&3",
    timestamp: "1 day ago",
    title: "Binary Search Implementation",
    description: "An elegant recursive binary search implementation with log(n) time complexity.",
    code: `function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) return mid;
  if (arr[mid] > target) return binarySearch(arr, target, left, mid - 1);
  return binarySearch(arr, target, mid + 1, right);
}`,
    likes: 64,
    comments: 18,
    shares: 9,
    tags: ["binary-search", "recursion", "searching"]
  }
];

const SocialPage: React.FC = () => {
  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <>
      <div className="fixed top-24 right-4 z-10">
        <Button 
          className="bg-primary hover:bg-primary/90 gap-2"
          onClick={() => setShowNewPost(!showNewPost)}
        >
          <Plus className="h-4 w-4" />
          {showNewPost ? "Cancel" : "Share Code"}
        </Button>
      </div>
      
      <SocialLayout
        posts={mockPosts}
        showNewPost={showNewPost}
        setShowNewPost={setShowNewPost}
      />
    </>
  );
};

export default SocialPage;
