
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

interface AddProblemFormProps {
  setSelectedTab: (tab: string) => void;
}

const AddProblemForm: React.FC<AddProblemFormProps> = ({ setSelectedTab }) => {
  const { platform } = useParams<{ platform: string }>();
  const [newProblem, setNewProblem] = useState({ 
    title: "", 
    difficulty: "Easy", 
    tags: "", 
    problem: "", 
    solution: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProblem = () => {
    if (!newProblem.title || !newProblem.problem) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Problem "${newProblem.title}" added to ${platform} successfully!`);
      setSelectedTab("problems");
      setNewProblem({ title: "", difficulty: "Easy", tags: "", problem: "", solution: "" });
      setIsSubmitting(false);
    }, 1000);
    
    // In a real app, you would add the problem to the database here
  };

  return (
    <Card className="border border-border bg-card/50 backdrop-blur-md shadow-lg">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add New {platform ? `${platform.charAt(0).toUpperCase() + platform.slice(1)} ` : ""}Problem
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Problem Title<span className="text-red-500">*</span></label>
            <Input 
              placeholder="Enter problem title" 
              value={newProblem.title}
              onChange={(e) => setNewProblem({...newProblem, title: e.target.value})}
              className="bg-background/50 border-border/50 focus-visible:ring-primary"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty<span className="text-red-500">*</span></label>
              <select 
                className="w-full p-2 rounded-md border border-border/50 bg-background/50 focus:ring focus:ring-primary/50 outline-none"
                value={newProblem.difficulty}
                onChange={(e) => setNewProblem({...newProblem, difficulty: e.target.value})}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input 
                placeholder="Array, String, DP" 
                value={newProblem.tags}
                onChange={(e) => setNewProblem({...newProblem, tags: e.target.value})}
                className="bg-background/50 border-border/50 focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Problem Description<span className="text-red-500">*</span></label>
          <Textarea 
            placeholder="Enter problem description" 
            className="min-h-32 bg-background/50 border-border/50 focus-visible:ring-primary"
            value={newProblem.problem}
            onChange={(e) => setNewProblem({...newProblem, problem: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Solution</label>
          <Textarea 
            placeholder="Enter your solution (code)" 
            className="min-h-32 font-mono bg-background/50 border-border/50 focus-visible:ring-primary"
            value={newProblem.solution}
            onChange={(e) => setNewProblem({...newProblem, solution: e.target.value})}
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setNewProblem({ title: "", difficulty: "Easy", tags: "", problem: "", solution: "" })}
            className="border-border/50 hover:bg-background/50"
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button 
            onClick={handleAddProblem}
            className="bg-primary hover:bg-primary/90 gap-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Problem
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddProblemForm;
