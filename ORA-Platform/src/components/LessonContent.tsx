import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, BookOpen, Video, FileText, CheckCircle, Lock, Brain } from "lucide-react";
import { useState } from "react";
import { LessonViewer } from "./LessonViewer";

interface LessonContentProps {
  onBack: () => void;
  onVideoWatched?: () => void;
}

const lessons = [
  {
    id: 1,
    title: "Micro-Learning module 1: Applied AI Governance\n& Organizational Blind Spots",
    description: "Learn fundamental Applied AI concepts to identify and address organizational blind spots when implementing AI governance frameworks.",
    duration: "15 min 55 seconds",
    type: "tutorial",
    completed: false,
    locked: false
  },
  {
    id: 2,
    title: "Applied AI for Workforce Readiness",
    description: "Learn the fundamentals of AI development and how to accelerate your digital transformation",
    duration: "15 min",
    type: "video",
    completed: false,
    locked: true
  },
  {
    id: 3,
    title: "Artificial Intelligence Foundation",
    description: "Step-by-step guide to configuring your workspace for AI projects and spotting opportunities for automation",
    duration: "15 min 55 seconds",
    type: "tutorial",
    completed: false,
    locked: true
  },
  {
    id: 4,
    title: "Language Models & Machine Learning Basics\nPart I",
    description: "Core concepts and terminology you need to know before diving deeper.",
    duration: "15 min",
    type: "reading",
    completed: false,
    locked: true
  },
  {
    id: 5,
    title: "Language Models & Machine Learning Basics\nPart II",
    description: "Core concepts and terminology you need to know before diving deeper.",
    duration: "15 min",
    type: "reading",
    completed: false,
    locked: true
  }
];

export function LessonContent({ onBack, onVideoWatched }: LessonContentProps) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const getIcon = (type: string) => {
    switch(type) {
      case 'video': return Video;
      case 'tutorial': return BookOpen;
      case 'reading': return FileText;
      default: return BookOpen;
    }
  };

  // If a lesson is selected, show the LessonViewer
  if (selectedLesson !== null) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    if (lesson) {
      return (
        <LessonViewer 
          lessonTitle={lesson.title}
          onBack={() => setSelectedLesson(null)}
          onVideoWatched={onVideoWatched}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 -mt-5">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-[22px] hover:bg-muted -mt-[18px] h-[26px] py-0 text-[0.85em]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl mb-2">
            AI Accelerator Learning Program
          </h1>
          <p className="text-xl text-muted-foreground flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Complete module 1 and submit feedback to unlock next lesson and more valuable content.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-0 pb-12">
        {/* Lessons Grid */}
        <div className="space-y-4">
          <h2 className="text-sm mb-4 mt-1">Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson) => {
              const IconComponent = getIcon(lesson.type);
              
              return (
                <Card 
                  key={lesson.id} 
                  className={`group transition-all duration-300 border-border gap-3 ${ 
                    lesson.locked ? 'bg-muted/30 opacity-75' : 'bg-card hover:shadow-lg'
                  }`}
                >
                  <CardHeader className="px-4 pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {lesson.title}
                          {lesson.locked && (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </CardTitle>
                        <div className="flex flex-col gap-1 mt-1">
                          {lesson.id === 2 || lesson.id === 3 || lesson.id === 4 || lesson.id === 5 ? (
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  Lesson time
                                </span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">
                                  {lesson.duration}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Knowledge Check • Untimed: self paced
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground capitalize">
                                {lesson.type}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {lesson.completed && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 px-4">
                    <CardDescription className="text-sm">
                      {lesson.description}
                    </CardDescription>
                    
                    {lesson.id === 1 && (
                      <div className="pt-4 border-t border-border">
                        <h4 className="mb-2 text-sm text-foreground">Learning Objectives</h4>
                        <p className="text-xs text-muted-foreground mb-2">By the end of this lesson, learners will be able to:</p>
                        <ul className="space-y-2 text-xs text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Define AI literacy in simple terms.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Identify 2 ways AI capabilities can effect research, learning or career success.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Expand AI vocabulary for identifying costs and risks when applying AI.</span>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full h-7 py-0.5"
                      variant={lesson.completed ? "outline" : "default"}
                      onClick={() => setSelectedLesson(lesson.id)}
                      disabled={lesson.locked}
                    >
                      {lesson.locked ? (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </>
                      ) : lesson.completed ? (
                        "Review Lesson"
                      ) : (
                        "Start Learning"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="mt-12 border-border bg-muted/30">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Access additional resources and support
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1 h-7 py-0.5">
              View Documentation
            </Button>
            <div className="relative group flex-1">
              <Button variant="outline" className="w-full h-7 py-0.5" disabled>
                <Lock className="h-3 w-3 mr-1.5" />
                Join Community Forum
              </Button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border z-10">
                Coming Soon
              </div>
            </div>
            <Button variant="outline" className="flex-1 h-7 py-0.5">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}