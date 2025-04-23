
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PlatformPage: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("problems");
  const [currentSolution, setCurrentSolution] = useState("");
  const [problems, setProblems] = useState<any[]>([]);
  const [useUserSubmissions, setUseUserSubmissions] = useState(false);
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [userSolvedQuestions, setUserSolvedQuestions] = useState<any[]>([]);
  const [isFetchingProblems, setIsFetchingProblems] = useState(false);

  // Validate if platform exists in mockProblems
  useEffect(() => {
    if (platform && !Object.keys(mockProblems).includes(platform)) {
      // Navigate to leetcode if platform is invalid
      navigate("/platform/leetcode");
    }
  }, [platform, navigate]);

  // Initialize problems from mockData or user submissions
  useEffect(() => {
    if (platform) {
      if (platform === "leetcode" && useUserSubmissions && userSolvedQuestions.length > 0) {
        setProblems(userSolvedQuestions);
      } else {
        setProblems(mockProblems[platform as keyof typeof mockProblems] || []);
      }
    }
  }, [platform, useUserSubmissions, userSolvedQuestions]);

  // Update the current solution when a problem is selected
  useEffect(() => {
    if (selectedProblem && platform) {
      let solutionKey = `${platform}-${selectedProblem}`;
      let solution = mockSolutions[solutionKey as keyof typeof mockSolutions];
      // If user questions, try to get some dummy, otherwise fall back to default
      if (useUserSubmissions && platform === "leetcode") {
        // Instead of using mockSolutions, simulate fetch from Google API
        setCurrentSolution(`Searching for best solution online for: ${selectedProblem} ...`);
        // You can replace the below with Google API logic
      } else if (solution) {
        setCurrentSolution(solution);
      } else {
        setCurrentSolution("// No solution available yet.\n// Click 'Add Solution' to add one.");
      }
    }
  }, [selectedProblem, platform, useUserSubmissions]);

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

  // Handle LeetCode API fetch.
  const handleFetchUserQuestions = async () => {
    if (!leetcodeUsername) {
      toast.error("Please enter your LeetCode username.");
      return;
    }
    setIsFetchingProblems(true);
    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/submission`);
      if (!res.ok) {
        throw new Error("Failed to fetch user submissions");
      }
      const data = await res.json();
      // data.submissions should have solved problems (array of objects)
      const solved = (data?.submissions || [])
        .filter((item: any) => item.status_display === "Accepted")
        .map((item: any, idx: number) => ({
          id: item.title_slug || `${idx}-${item.title}`,
          title: item.title,
          difficulty: item.difficulty || "Unknown",
          tags: [], // can't get tags from API, omit or fill with placeholder
        }))
        // Deduplicate by title, most recent first
        .reduce((acc: any[], curr: any) => {
          if (!acc.some(e => e.title === curr.title)) acc.push(curr);
          return acc;
        }, []);
      setUserSolvedQuestions(solved);
      setUseUserSubmissions(true);
      toast.success("Fetched your LeetCode solved problems!");
    } catch (e) {
      toast.error("Failed to fetch user problems.");
      setUserSolvedQuestions([]);
      setUseUserSubmissions(false);
    }
    setIsFetchingProblems(false);
  };

  // Option to reset to site defaults
  const handleResetProblems = () => {
    setLeetcodeUsername("");
    setUserSolvedQuestions([]);
    setUseUserSubmissions(false);
    toast.info("Switched to default question list.");
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1 text-gradient">
                  {platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : "Platform"} <span className="text-primary">Problems</span>
                </h1>
                <p className="text-muted-foreground">Browse and solve problems or add your own solutions</p>
              </div>
              {/* Username Input and Button (LeetCode only) */}
              {platform === "leetcode" && (
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Input 
                    value={leetcodeUsername}
                    onChange={e => setLeetcodeUsername(e.target.value)}
                    placeholder="Enter your LeetCode username"
                    className="w-[180px]"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleFetchUserQuestions}
                    disabled={isFetchingProblems}
                  >
                    {isFetchingProblems ? "Loading..." : "Load My Questions"}
                  </Button>
                  {useUserSubmissions && (
                    <Button size="sm" variant="ghost" onClick={handleResetProblems}>
                      Reset
                    </Button>
                  )}
                </div>
              )}

              <TabsList className="bg-muted/50 border border-border p-1 ml-auto">
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
