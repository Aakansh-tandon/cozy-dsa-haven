
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface NewPostFormProps {
  onClose: () => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onClose }) => {
  const [content, setContent] = useState({
    title: "",
    description: "",
    code: "",
    tags: ""
  });

  const handlePostSubmit = () => {
    if (!content.title || !content.code) {
      toast.error("Title and code are required!");
      return;
    }
    
    toast.success("Post shared successfully!");
    setContent({ title: "", description: "", code: "", tags: "" });
    onClose();
  };

  return (
    <Card className="mb-6 border border-border bg-card/50 backdrop-blur-md shadow-lg">
      <CardHeader className="p-4 border-b border-border/50">
        <h3 className="text-lg font-medium">Share Your Code</h3>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input 
            placeholder="E.g., Efficient Binary Search Implementation"
            value={content.title}
            onChange={(e) => setContent({...content, title: e.target.value})}
            className="mt-1 bg-background/50 border-border/50 focus-visible:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Description (Optional)</label>
          <Textarea 
            placeholder="Describe your approach or any insights"
            value={content.description}
            onChange={(e) => setContent({...content, description: e.target.value})}
            className="mt-1 bg-background/50 border-border/50 focus-visible:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Code</label>
          <Textarea 
            placeholder="Paste your code snippet here"
            value={content.code}
            onChange={(e) => setContent({...content, code: e.target.value})}
            className="mt-1 font-mono bg-background/50 border-border/50 focus-visible:ring-primary min-h-[150px]"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Tags (Comma separated)</label>
          <Input 
            placeholder="E.g., algorithms, binary-search, optimization"
            value={content.tags}
            onChange={(e) => setContent({...content, tags: e.target.value})}
            className="mt-1 bg-background/50 border-border/50 focus-visible:ring-primary"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t border-border/50 flex justify-end gap-2">
        <Button 
          variant="outline"
          onClick={() => {
            setContent({ title: "", description: "", code: "", tags: "" });
            onClose();
          }}
          className="border-border/50 hover:bg-background/50"
        >
          Cancel
        </Button>
        <Button 
          onClick={handlePostSubmit}
          className="bg-primary hover:bg-primary/90"
        >
          Share Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewPostForm;
