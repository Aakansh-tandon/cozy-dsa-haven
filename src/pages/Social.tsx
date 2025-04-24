
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
    comments: 3,
    shares: 5,
    tags: ["leetcode", "arrays", "hashmap"],
    commentsList: [
      {
        id: "c1",
        username: "algoexpert",
        avatar: "https://source.unsplash.com/random/100x100/?portrait&2",
        comment: "Nice optimization! Using a hashmap reduces the time complexity from O(n²) to O(n).",
        timestamp: "1 hour ago",
        likes: 8
      },
      {
        id: "c2",
        username: "jsdev",
        avatar: "https://source.unsplash.com/random/100x100/?portrait&4",
        comment: "I implemented this in Python and it was much faster than my previous solution!",
        timestamp: "45 minutes ago",
        likes: 3
      },
      {
        id: "c3",
        username: "newcoder",
        avatar: "https://source.unsplash.com/random/100x100/?portrait&5",
        comment: "Could you explain how this works with duplicate values in the array?",
        timestamp: "20 minutes ago",
        likes: 1
      }
    ]
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
    comments: 2,
    shares: 15,
    tags: ["dynamic-programming", "algorithms", "optimization"],
    commentsList: [
      {
        id: "c4",
        username: "recursionmaster",
        avatar: "https://source.unsplash.com/random/100x100/?portrait&3",
        comment: "Much better than the recursive approach! No more stack overflow for large n.",
        timestamp: "3 hours ago",
        likes: 12
      },
      {
        id: "c5",
        username: "codemaster",
        avatar: "https://source.unsplash.com/random/100x100/?portrait&1",
        comment: "Great space optimization by only storing the last two values!",
        timestamp: "2 hours ago",
        likes: 7
      }
    ]
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
    comments: 1,
    shares: 9,
    tags: ["binary-search", "recursion", "searching"],
    commentsList: [
      {
        id: "c6",
        username: "jsdev",
        avatar: "https://source.unsplash.com/random/100x100/?portrait&4",
        comment: "I prefer the iterative approach for binary search to avoid stack overflow with large arrays.",
        timestamp: "12 hours ago",
        likes: 5
      }
    ]
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
