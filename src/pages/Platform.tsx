
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import ProblemList from "@/components/platform/ProblemList";
import SolutionView from "@/components/platform/SolutionView";
import AddProblemForm from "@/components/platform/AddProblemForm";
import { mockProblems, mockSolutions, mockComments } from "@/data/mockData";
import { toast } from "sonner";

const PlatformPage: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("problems");
  const [currentSolution, setCurrentSolution] = useState("");
  const [problems, setProblems] = useState<any[]>([]);

  // Validate if platform exists in mockProblems
  useEffect(() => {
    if (platform && !Object.keys(mockProblems).includes(platform)) {
      // Navigate to leetcode if platform is invalid
      navigate("/platform/leetcode");
    }
  }, [platform, navigate]);

  // Initialize problems from mockData
  useEffect(() => {
    if (platform) {
      setProblems(mockProblems[platform as keyof typeof mockProblems] || []);
    }
  }, [platform]);

  // Update the current solution when a problem is selected
  useEffect(() => {
    if (selectedProblem && platform) {
      const solutionKey = `${platform}-${selectedProblem}`;
      const solution = mockSolutions[solutionKey as keyof typeof mockSolutions];
      if (solution) {
        setCurrentSolution(solution);
      } else {
        setCurrentSolution("// No solution available yet.\n// Click 'Add Solution' to add one.");
      }
    }
  }, [selectedProblem, platform]);

  // When tab changes to "add", clear selection
  useEffect(() => {
    if (selectedTab === "add") {
      setSelectedProblem(null);
    }
  }, [selectedTab]);

  // Function to add a new problem
  const handleAddProblem = (newProblem: any) => {
    if (platform) {
      // Generate a unique ID for the new problem
      const newId = String(Math.max(...problems.map(p => Number(p.id)), 0) + 1);
      const problemWithId = { ...newProblem, id: newId };
      
      setProblems(prevProblems => [...prevProblems, problemWithId]);
      toast.success("Problem added successfully!");
      setSelectedTab("problems");
      setSelectedProblem(newId);
    }
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <Tabs 
            defaultValue="problems" 
            value={selectedTab} 
            onValueChange={setSelectedTab} 
            className="w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1 text-gradient">
                  {platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : "Platform"} <span className="text-primary">Problems</span>
                </h1>
                <p className="text-muted-foreground">Browse and solve problems or add your own solutions</p>
              </div>
              
              <TabsList className="bg-muted/50 border border-border p-1">
                <TabsTrigger value="problems" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BookOpen className="h-4 w-4" />
                  Problems
                </TabsTrigger>
                <TabsTrigger value="add" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Plus className="h-4 w-4" />
                  Add New
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="problems" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Problems List */}
                <ProblemList 
                  problems={problems}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedProblem={selectedProblem}
                  setSelectedProblem={setSelectedProblem}
                />

                {/* Solution View */}
                <SolutionView 
                  selectedProblem={selectedProblem}
                  platform={platform}
                  currentSolution={currentSolution}
                  setCurrentSolution={setCurrentSolution}
                  comments={mockComments}
                  setSelectedTab={setSelectedTab}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="add">
              <AddProblemForm setSelectedTab={setSelectedTab} onAddProblem={handleAddProblem} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default PlatformPage;
