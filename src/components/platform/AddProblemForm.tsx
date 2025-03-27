
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlusCircle, X, Code } from "lucide-react";
import { toast } from "sonner";

interface AddProblemFormProps {
  setSelectedTab: (tab: string) => void;
  onAddProblem: (problem: any) => void;
}

const AddProblemForm: React.FC<AddProblemFormProps> = ({ 
  setSelectedTab,
  onAddProblem 
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<string>("Easy");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const addTag = () => {
    if (currentTag.trim() !== "" && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a problem title");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a problem description");
      return;
    }

    const newProblem = {
      title,
      difficulty,
      tags,
      description
    };
    
    onAddProblem(newProblem);
    
    // Reset form
    setTitle("");
    setDescription("");
    setDifficulty("Easy");
    setTags([]);
  };

  return (
    <Card className="border border-border bg-card/50 backdrop-blur-md shadow-lg">
      <CardHeader className="p-4 border-b border-border/50">
        <CardTitle className="text-xl flex items-center">
          <PlusCircle className="h-5 w-5 mr-2 text-primary" />
          Add New Problem
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Problem Title</Label>
                <Input
                  id="title"
                  placeholder="E.g., Two Sum"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Problem Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the problem..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="E.g., Array, Hash Table"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addTag}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Add
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="h-3.5 w-3.5 rounded-full flex items-center justify-center hover:bg-secondary/20"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedTab("problems")}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary/90 gap-1"
            >
              <Code className="h-4 w-4" />
              Add Problem
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProblemForm;
