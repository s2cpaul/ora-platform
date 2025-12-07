import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Volume2, ArrowLeft, Brain, Lightbulb, Target, Book } from "lucide-react";

interface AINotebookProps {
  onBack?: () => void;
}

export function AINotebook({ onBack }: AINotebookProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNode, setCurrentNode] = useState<string | null>(null);

  // Mind map data structure
  const mindMapData = {
    center: {
      id: "center",
      title: "AI Learning Journey",
      description: "Your personalized path to mastering AI concepts",
    },
    nodes: [
      {
        id: "foundations",
        title: "AI Foundations",
        description: "Core concepts and principles of artificial intelligence",
        color: "bg-blue-500",
        position: "top-left",
      },
      {
        id: "applications",
        title: "Real-World Applications",
        description: "How AI is transforming industries and daily life",
        color: "bg-green-500",
        position: "top-right",
      },
      {
        id: "ethics",
        title: "AI Ethics & Governance",
        description: "Responsible AI development and organizational blind spots",
        color: "bg-purple-500",
        position: "bottom-left",
      },
      {
        id: "future",
        title: "Future Skills",
        description: "Preparing for AI-driven career transitions",
        color: "bg-orange-500",
        position: "bottom-right",
      },
    ],
  };

  const handlePlayAudio = (nodeId: string, text: string) => {
    setCurrentNode(nodeId);
    setIsPlaying(true);

    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentNode(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
      setIsPlaying(false);
      setCurrentNode(null);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentNode(null);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl lg:text-4xl tracking-wide">AI Foundations Notebook</h1>
          </div>
          <p className="text-muted-foreground">
            Your interactive mind map is a an interactive guide for AI learning - tap any node to listen.
            <br />
            Visit <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://notebooklm.google.com</a> to create a notebook today!
          </p>
        </div>

        {/* Mind Map Container */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Learning Mind Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mind Map Visualization */}
            <div className="relative min-h-[350px] lg:min-h-[500px] p-2 lg:p-6">
              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <Card className="border-2 border-primary bg-primary/10 shadow-lg">
                  <CardContent className="p-2 lg:p-4 text-center">
                    <div className="flex flex-col items-center gap-1 lg:gap-2">
                      <Lightbulb className="h-4 w-4 lg:h-6 lg:w-6 text-primary" />
                      <h3 className="text-xs lg:text-base">
                        {mindMapData.center.title}
                      </h3>
                      <p className="text-[10px] lg:text-xs text-muted-foreground max-w-[100px] lg:max-w-[150px]">
                        {mindMapData.center.description}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handlePlayAudio(
                            mindMapData.center.id,
                            `${mindMapData.center.title}. ${mindMapData.center.description}`
                          )
                        }
                        disabled={isPlaying && currentNode === mindMapData.center.id}
                        className="mt-1 h-6 text-[10px] lg:h-8 lg:text-sm px-2"
                      >
                        <Volume2 className="h-2.5 w-2.5 lg:h-3 lg:w-3 mr-1" />
                        {isPlaying && currentNode === mindMapData.center.id ? "Playing..." : "Listen"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Connecting Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                {/* Top-left line */}
                <line
                  x1="50%"
                  y1="50%"
                  x2="20%"
                  y2="20%"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-muted-foreground/30"
                />
                {/* Top-right line */}
                <line
                  x1="50%"
                  y1="50%"
                  x2="80%"
                  y2="20%"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-muted-foreground/30"
                />
                {/* Bottom-left line */}
                <line
                  x1="50%"
                  y1="50%"
                  x2="20%"
                  y2="80%"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-muted-foreground/30"
                />
                {/* Bottom-right line */}
                <line
                  x1="50%"
                  y1="50%"
                  x2="80%"
                  y2="80%"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-muted-foreground/30"
                />
              </svg>

              {/* Outer Nodes */}
              {mindMapData.nodes.map((node, index) => {
                const positions = {
                  "top-left": "top-[3%] left-[1%] lg:top-[5%] lg:left-[5%]",
                  "top-right": "top-[3%] right-[1%] lg:top-[5%] lg:right-[5%]",
                  "bottom-left": "bottom-[3%] left-[1%] lg:bottom-[5%] lg:left-[5%]",
                  "bottom-right": "bottom-[3%] right-[1%] lg:bottom-[5%] lg:right-[5%]",
                };

                return (
                  <div
                    key={node.id}
                    className={`absolute ${positions[node.position as keyof typeof positions]} max-w-[90px] lg:max-w-[180px]`}
                  >
                    <Card className={`border-2 ${node.color} bg-card shadow-lg hover:shadow-xl transition-shadow`}>
                      <CardContent className="p-2 lg:p-3">
                        <div className="flex flex-col gap-1 lg:gap-1.5">
                          <Target className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                          <h4 className="text-[10px] lg:text-sm leading-tight">
                            {node.title}
                          </h4>
                          <p className="text-[9px] lg:text-xs text-muted-foreground line-clamp-2 leading-tight">
                            {node.description}
                          </p>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              handlePlayAudio(
                                node.id,
                                `${node.title}. ${node.description}`
                              )
                            }
                            disabled={isPlaying && currentNode === node.id}
                            className="mt-0.5 w-full h-6 lg:h-7 text-[9px] lg:text-xs px-1"
                          >
                            <Volume2 className="h-2.5 w-2.5 lg:h-3 lg:w-3 mr-0.5" />
                            {isPlaying && currentNode === node.id ? "Play..." : "Listen"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Stop Audio Button */}
            {isPlaying && (
              <div className="mt-4 text-center">
                <Button onClick={stopAudio} variant="destructive">
                  Stop Audio
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="mt-6 border-border">
          <CardHeader>
            <CardTitle>Your Learning Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <h4 className="font-semibold mb-1">Key Insight</h4>
                <p className="text-sm text-muted-foreground">
                  AI is transforming how we learn, work, and solve problems. Understanding foundational concepts helps build a strong career foundation.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-semibold mb-1">Action Item</h4>
                <p className="text-sm text-muted-foreground">
                  Complete all knowledge checks to earn badges and track your progress in the AI learning journey.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h4 className="font-semibold mb-1">Reflection</h4>
                <p className="text-sm text-muted-foreground">
                  How can you apply AI concepts in your current role or future career path?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}