
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Filter } from "lucide-react";

const SocialSidebar: React.FC = () => {
  return (
    <div className="w-full md:w-80 shrink-0">
      <div className="sticky top-20">
        <Card className="border border-border bg-card/50 backdrop-blur-md shadow-lg">
          <CardHeader className="p-4 border-b border-border/50">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              Explore
            </h3>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="relative">
                <Input 
                  placeholder="Search posts..."
                  className="bg-background/50 border-border/50 focus-visible:ring-primary"
                />
              </div>
              
              <h4 className="font-medium text-sm mt-4 mb-2">Trending Tags</h4>
              <div className="flex flex-wrap gap-2">
                {["algorithms", "leetcode", "dynamic-programming", "arrays", "hashmap", "optimization"].map((tag) => (
                  <button 
                    key={tag}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <h4 className="font-medium text-sm mb-2">Top Contributors</h4>
              <div className="space-y-3">
                {[
                  { username: "codemaster", posts: 123, avatar: "https://source.unsplash.com/random/100x100/?portrait&1" },
                  { username: "algoexpert", posts: 87, avatar: "https://source.unsplash.com/random/100x100/?portrait&2" },
                  { username: "pythonista", posts: 64, avatar: "https://source.unsplash.com/random/100x100/?portrait&3" },
                ].map((user) => (
                  <div key={user.username} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img 
                        src={user.avatar} 
                        alt={user.username} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.username}</div>
                      <div className="text-xs text-muted-foreground">{user.posts} posts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialSidebar;
