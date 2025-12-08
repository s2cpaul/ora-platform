import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDrag, useDrop } from 'react-dnd';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Play, Target, Volume2, BookOpen, CheckCircle, Lock, Video, FileText } from 'lucide-react';
import placeholderImage from '../assets/Applied-Placeholder1.png';
import notebookLMImage from '../assets/notebookLM.png';
import { awardLessonCompletion, isLessonCompleted } from '../utils/progressSystem';
import type { Badge } from '../utils/progressSystem';
import { trackQuizAnswer, trackContentInteraction, ContentViewTracker, getUserId } from '../utils/mlTracking';
import { Confetti } from './Confetti';
import { BadgeNotification } from "./BadgeNotification";

interface LessonViewerProps {
  lessonTitle: string;
  onBack: () => void;
  onVideoWatched?: () => void;
}

// Drag and drop types
const ItemTypes = {
  METHOD: 'method',
};

interface DraggableMethodProps {
  id: string;
  text: string;
  isMatched: boolean;
}

function DraggableMethod({ id, text, isMatched }: DraggableMethodProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.METHOD,
    item: { id, text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: !isMatched,
  }));

  return (
    <div
      ref={drag}
      className={`p-2 bg-primary/10 border border-primary/30 rounded-lg text-xs cursor-move transition-opacity h-[50px] flex items-center justify-center ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isMatched ? 'opacity-30 cursor-not-allowed' : ''}`}
    >
      {text}
    </div>
  );
}

interface DropTargetProps {
  id: string;
  description: string;
  matchedMethodText: string | null;
  matchedMethodId: string | null;
  correctMethodId: string;
  onDrop: (methodId: string, methodText: string, targetId: string) => void;
  showResults: boolean;
}

function DropTarget({ id, description, matchedMethodText, matchedMethodId, correctMethodId, onDrop, showResults }: DropTargetProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.METHOD,
    drop: (item: { id: string; text: string }) => {
      onDrop(item.id, item.text, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isCorrect = matchedMethodId && showResults ? matchedMethodId === correctMethodId : false;
  const isActive = isOver && canDrop;

  let borderClass = 'border-border';
  let bgClass = 'bg-muted/30';

  if (isActive) {
    borderClass = 'border-primary';
    bgClass = 'bg-primary/5';
  }

  if (showResults && matchedMethodText) {
    if (isCorrect) {
      borderClass = 'border-green-500';
      bgClass = 'bg-green-500/10';
    } else {
      borderClass = 'border-red-500';
      bgClass = 'bg-red-500/10';
    }
  }

  return (
    <div
      ref={drop}
      className={`p-2 border-2 rounded-lg h-[50px] transition-all flex items-center justify-center ${borderClass} ${bgClass}`}
    >
      <div className="flex items-center gap-2 w-full">
        <p className="text-xs text-muted-foreground flex-1">{description}</p>
        {matchedMethodText && (
          <div className="px-2 py-1 bg-primary/20 border border-primary/40 rounded text-xs whitespace-nowrap">
            {matchedMethodText}
          </div>
        )}
        {showResults && !matchedMethodText && (
          <p className="text-xs text-red-500 italic">No match</p>
        )}
      </div>
    </div>
  );
}

const lessonSections = [
  {
    id: 1,
    title: "Applied AI Governance & Organizational Blind Spots",
    subtitle: "tutorial",
    duration: "15 min or less",
    videoUrl: "/RACI-Risk-In.mp4", // replaced HeyGen link with local video
    knowledgeChecks: [
      {
        question: "Cost Considerations: Identify the faster, cheaper version of GPT-5 designed for well-defined tasks with the lowest token cost.",
        questionLink: "https://openai.com/api/pricing/",
        questionSubtext: "Enter the model name (hint: it's optimized for speed and efficiency)",
        type: "textInput",
        acceptableAnswers: ["GPT-5 mini", "Mini", "GPT-5 Mini", "gpt-5 mini", "mini", "gpt-5-mini", "GPT-5-mini"],
        explanation: "GPT-5 Mini is the faster, more cost-effective version of GPT-5, specifically optimized for well-defined tasks where speed and efficiency matter most. It has the lowest token cost in the GPT-5 family. AI models are priced based on tokens—the pieces of words that models process. For reference, 1,000 tokens ≈ 750 words. GPT-5 Mini delivers excellent performance for focused use cases like customer support, content moderation, data extraction, and classification tasks, while significantly reducing costs compared to the full GPT-5 model. Always match your model choice to your specific use case requirements to optimize both performance and budget."
      },
      {
        question: "Which statement best reflects the purpose of Applied AI?",
        options: [
          "Applied AI is only for Data Scientists and boardroom discussions.",
          "Applied AI maximizes efficiency during routine operations by automating workflows. It focuses on practical use cases that impact daily work and logical decision-making. It requires the workforce to up-skill and adapt.",
          "Applied AI is limited to academic research and siloed studies.",
          "Applied AI is exclusively for technical engineers building models."
        ],
        correctAnswer: 1,
        explanation: "Applied AI is designed to be accessible and practical for everyone in an organization. It focuses on real-world applications that directly impact daily workflows and decision-making processes, and it is ideal for routine operations. While it does require workforce upskilling, it creates new opportunities and roles rather than being limited to specialized groups like data scientists, academics, or engineers."
      },
      {
        question: "What provides the foundation for trustworthy AI systems?",
        options: [
          "Advanced algorithms, performance computing and vendor outsourcing",
          "Engaged and informed leadership ensuring governance with routine oversight, data visibility, transparency, valid data, security protocols and traceable data lineage",
          "Marketing strategies and user engagement campaigns",
          "Large volumes of outdated and siloed data"
        ],
        correctAnswer: 1,
        explanation: "Trustworthy AI requires a comprehensive framework: data visibility for insight, transparency for understanding decisions, governance for oversight, connected systems for collaboration, valid data for accuracy, and traceable lineage to track data origins and transformations."
      },
      {
        question: "What is the primary function of a RACI Matrix in AI governance?",
        options: [
          "To track project budgets and financial allocations",
          "To define roles and responsibilities and ensure proper oversight",
          "To monitor AI model performance metrics",
          "To document technical specifications and requirements"
        ],
        correctAnswer: 1,
        explanation: "A RACI Matrix (Responsible, Accountable, Consulted, Informed) is a project management tool that clearly defines roles and responsibilities to ensure proper oversight in AI initiatives. It identifies who is Responsible for execution, who is Accountable for decisions, who should be Consulted for input, and who needs to be Informed of outcomes. This clarity is essential for effective AI governance, preventing gaps in accountability and ensuring all stakeholders understand their role in the AI lifecycle."
      },
      {
        question: "Spot the Blind Spots",
        questionSubtext: "Drag the correct answer to match each possible blind spot below.",
        type: "dragDrop",
        methods: [
          { id: "vendorDependency", text: "Vendor Dependency" },
          { id: "biasAwareness", text: "Bias Awareness" },
          { id: "oversightCapacity", text: "Oversight Capacity" },
          { id: "technicalLiteracy", text: "Technical Literacy" }
        ],
        targets: [
          { id: "t1", description: "Single reviewer", correctMethodId: "oversightCapacity" },
          { id: "t2", description: "Lack of skills and AI literacy to evaluate outputs", correctMethodId: "technicalLiteracy" },
          { id: "t3", description: "Failure to audit and test for diverse groups", correctMethodId: "biasAwareness" },
          { id: "t4", description: "Lock‑in and reduced adaptability", correctMethodId: "vendorDependency" }
        ]
      },
      {
        question: "Air‑gapping can be practiced for isolating networks with additional security and compliance needs because it… (Select all that apply)",
        options: [
          "Prevents external actors from accessing the model or the data it processes (Security & Confidentiality)",
          "Meets strict regulatory requirements such as DoD, GDPR, or HIPAA (Policy Compliance)",
          "Guarantees that only vetted, approved datasets are used (Controlled Inputs)",
          "Keeps operations running even if external networks are compromised (Resilience)",
          "Provides unlimited real‑time access to external data sources"
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: "Air-gapping isolates systems from external networks, providing multiple security and compliance benefits: preventing unauthorized access, meeting strict regulatory requirements, ensuring only approved data is used, and maintaining operational resilience. However, it specifically prevents access to external data sources, making option E incorrect."
      },
      {
        question: "What are the main goals of applied artificial intelligence using connected agents?",
        questionSubtext: "Select all that are true.",
        options: [
          "To entirely replace human work and automate all business processes.",
          "Supporting operational excellence and decision making through an ecosystem of connected agents positioned as collaborative, not siloed.",
          "Automated Value: Reduces burden of basic security checks, improves accuracy, accelerates review cycles.",
          "Governance anchor: Automated compliance checks make the system auditable and policy‑aligned.",
          "Human‑centric: Oversight remains with people, reinforcing accountability."
        ],
        correctAnswer: [1, 2, 3, 4],
        explanation: "Applied AI using connected agents focuses on collaboration, immediate value through efficiency, governance through automated compliance, and human oversight. The goal is never to entirely replace human work, but to augment and enhance human capabilities while maintaining accountability."
      },
      {
        question: "What are the potential consequences for organizations that fail to adopt AI?",
        questionSubtext: "Select all that apply.",
        options: [
          "Loss of funding",
          "Loss of competitive edge",
          "Increased innovation and market leadership",
          "Less resilience and agility, and lesser ability to adapt to change"
        ],
        correctAnswer: [0, 1, 3],
        explanation: "Organizations that fail to adopt AI face multiple risks: loss of funding as investors favor AI-ready companies, loss of competitive edge as competitors leverage AI for efficiency and innovation, and reduced resilience and agility making it harder to adapt to market changes. However, increased innovation and market leadership are benefits of successful AI adoption, not consequences of failure to adopt."
      }
    ],
    resources: [
      { title: "McKinsey - The State of AI", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" },
      { title: "NIST AI Risk Management Framework", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" },
      { title: "IEEE Ethics of AI Standards", url: "https://standards.ieee.org/news/get-program-ai-ethics/" },
      { title: "AI Governance Frameworks Oxford", url: "https://academic.oup.com/edited-volume/41989" },
      { title: "Responsible AI Toolkit", url: "https://airc.nist.gov/airmf-resources/playbook/" },
      { title: "MIT Workforce Intelligence", url: "https://mitsloan.mit.edu/sites/default/files/2025-09/MIT%20Sloan%20-%20Workforce%20Intelligence-digital.pdf" },
      { title: "NICE-AI-Agent-Handbook.pdf", url: "https://resources.nice.com/wp-content/uploads/2025/02/NICE-The-AI-Agent-Handbook.pdf" }
    ]
  },
  {
    id: 2,
    title: "Understanding Neural Networks",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "What is a neural network inspired by?",
        options: [
          "Computer circuits",
          "The human brain",
          "Social networks",
          "Telecommunication networks"
        ],
        correctAnswer: 1,
        explanation: "Neural networks are computational models inspired by the structure and function of the human brain, specifically how neurons connect and process information through networks."
      },
      {
        question: "What is the basic unit of a neural network called?",
        options: [
          "Node",
          "Neuron or Perceptron",
          "Synapse",
          "Layer"
        ],
        correctAnswer: 1,
        explanation: "A neuron (or perceptron) is the fundamental computational unit in a neural network that receives inputs, applies weights and activation functions, and produces an output."
      }
    ],
    resources: [
      { title: "Neural Network Architecture Guide", url: "#" },
      { title: "Deep Learning Frameworks", url: "#" },
      { title: "Training Data Best Practices", url: "#" }
    ]
  },
  {
    id: 3,
    title: "Data Preprocessing Techniques",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "Why is data preprocessing important in AI?",
        options: [
          "It makes data look prettier",
          "It improves model accuracy and performance",
          "It's not really necessary",
          "It only matters for large datasets"
        ],
        correctAnswer: 1,
        explanation: "Data preprocessing is crucial for AI success because clean, properly formatted data leads to better model accuracy, faster training, and more reliable predictions. Poor quality data leads to poor results."
      },
      {
        question: "What is normalization in data preprocessing?",
        options: [
          "Removing duplicate data",
          "Scaling data to a standard range",
          "Deleting missing values",
          "Converting text to numbers"
        ],
        correctAnswer: 1,
        explanation: "Normalization is the process of scaling numerical data to a common range (typically 0-1 or -1 to 1), ensuring all features contribute equally to the model and preventing features with larger ranges from dominating."
      }
    ],
    resources: [
      { title: "Data Cleaning Checklist", url: "#" },
      { title: "Feature Engineering Guide", url: "#" },
      { title: "Common Preprocessing Pitfalls", url: "#" }
    ]
  },
  {
    id: 4,
    title: "Supervised Learning Methods",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "What defines supervised learning?",
        options: [
          "Learning without any data",
          "Learning from labeled training data",
          "Learning only from errors",
          "Learning without human intervention"
        ],
        correctAnswer: 1,
        explanation: "Supervised learning uses labeled training data where each input has a known correct output. The model learns to map inputs to outputs by studying these labeled examples, like learning from a teacher who provides correct answers."
      },
      {
        question: "Which is an example of supervised learning?",
        options: [
          "Clustering customers by behavior",
          "Email spam detection",
          "Finding patterns in data",
          "Generating new images"
        ],
        correctAnswer: 1,
        explanation: "Email spam detection is supervised learning because the model is trained on emails labeled as 'spam' or 'not spam.' It learns patterns from these labeled examples to classify new emails correctly."
      }
    ],
    resources: [
      { title: "Classification vs Regression", url: "#" },
      { title: "Popular Algorithms Overview", url: "#" },
      { title: "Model Evaluation Metrics", url: "#" }
    ]
  },
  {
    id: 5,
    title: "Unsupervised Learning Concepts",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "What is the main characteristic of unsupervised learning?",
        options: [
          "Uses labeled data",
          "Finds patterns in unlabeled data",
          "Requires constant supervision",
          "Only works with images"
        ],
        correctAnswer: 1,
        explanation: "Unsupervised learning works with unlabeled data to discover hidden patterns, structures, or relationships without predefined categories or correct answers. The algorithm explores the data independently to find meaningful groupings or patterns."
      },
      {
        question: "Which is a common unsupervised learning technique?",
        options: [
          "Linear Regression",
          "Decision Trees",
          "Clustering (K-Means)",
          "Logistic Regression"
        ],
        correctAnswer: 2,
        explanation: "K-Means clustering is an unsupervised learning technique that groups similar data points together based on their characteristics without predefined labels. It discovers natural groupings in the data by minimizing distances within clusters."
      }
    ],
    resources: [
      { title: "Clustering Algorithms Guide", url: "#" },
      { title: "Dimensionality Reduction", url: "#" },
      { title: "Anomaly Detection Techniques", url: "#" }
    ]
  },
  {
    id: 6,
    title: "Natural Language Processing Basics",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "What is Natural Language Processing (NLP)?",
        options: [
          "Programming in natural language",
          "Processing human language with computers",
          "A new programming language",
          "Processing only English text"
        ],
        correctAnswer: 1,
        explanation: "Natural Language Processing (NLP) is a branch of AI that enables computers to understand, interpret, and generate human language in a meaningful way. It bridges the gap between human communication and computer understanding."
      },
      {
        question: "Which is an application of NLP?",
        options: [
          "Image recognition",
          "Sentiment analysis",
          "Data encryption",
          "Network security"
        ],
        correctAnswer: 1,
        explanation: "Sentiment analysis uses NLP to determine the emotional tone and opinions expressed in text, such as analyzing customer reviews to understand whether feedback is positive, negative, or neutral."
      }
    ],
    resources: [
      { title: "Tokenization & Text Processing", url: "#" },
      { title: "Language Models Explained", url: "#" },
      { title: "Sentiment Analysis Tutorial", url: "#" }
    ]
  },
  {
    id: 7,
    title: "Computer Vision Fundamentals",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "What is computer vision?",
        options: [
          "Computers with eyes",
          "Teaching computers to interpret visual information",
          "A type of monitor",
          "Virtual reality technology"
        ],
        correctAnswer: 1,
        explanation: "Computer vision enables machines to derive meaningful information from digital images, videos, and visual inputs. It allows computers to 'see' and understand visual content similarly to how humans process visual information."
      },
      {
        question: "Which is a computer vision task?",
        options: [
          "Text translation",
          "Speech recognition",
          "Object detection",
          "Sound synthesis"
        ],
        correctAnswer: 2,
        explanation: "Object detection is a fundamental computer vision task that identifies and locates objects within images or video frames, drawing bounding boxes around detected items and classifying what they are."
      }
    ],
    resources: [
      { title: "Image Classification Methods", url: "#" },
      { title: "Convolutional Neural Networks", url: "#" },
      { title: "Real-world CV Applications", url: "#" }
    ]
  },
  {
    id: 8,
    title: "Model Training & Optimization",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "What is the purpose of model training?",
        options: [
          "To make the model faster",
          "To adjust parameters to minimize error",
          "To increase model size",
          "To create more data"
        ],
        correctAnswer: 1,
        explanation: "Model training adjusts the internal parameters (weights and biases) of the model to minimize prediction errors. Through iterative learning, the model improves its ability to make accurate predictions on new data."
      },
      {
        question: "What is overfitting?",
        options: [
          "Model is too large",
          "Model performs well on training but poorly on new data",
          "Model trains too quickly",
          "Model uses too much memory"
        ],
        correctAnswer: 1,
        explanation: "Overfitting occurs when a model learns the training data too well, including noise and outliers, resulting in excellent training performance but poor generalization to new, unseen data. It's like memorizing answers instead of understanding concepts."
      }
    ],
    resources: [
      { title: "Gradient Descent Explained", url: "#" },
      { title: "Preventing Overfitting", url: "#" }
    ]
  },
  {
    id: 9,
    title: "AI Ethics & Responsible AI",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "Why is AI ethics important?",
        options: [
          "It's not important",
          "To ensure fair and responsible use of AI",
          "To slow down AI development",
          "To make AI more expensive"
        ],
        correctAnswer: 1,
        explanation: "AI ethics ensures that AI systems are developed and deployed responsibly, fairly, and transparently. It addresses bias, privacy, accountability, and societal impact to prevent harm and build trust in AI technologies."
      },
      {
        question: "What provides the foundation for trustworthy AI systems?",
        options: [
          "Advanced algorithms and high‑performance computing",
          "Trust built on data visibility, transparency, governance, connected AI systems, valid data, and traceable data lineage",
          "Marketing strategies and user engagement campaigns",
          "Large volumes of outdated and siloed data"
        ],
        correctAnswer: 1,
        explanation: "Trustworthy AI requires a comprehensive framework: data visibility for insight, transparency for understanding decisions, governance for oversight, connected systems for collaboration, valid data for accuracy, and traceable lineage to track data origins and transformations."
      },
      {
        question: "Drag and Drop: Checking a Language Model for Bias",
        questionSubtext: "Match each bias‑testing method with its correct description by dragging the method to the appropriate description.",
        type: "dragDrop",
        methods: [
          { id: "dataAudit", text: "Data Audit" },
          { id: "outputComparison", text: "Output Comparison" },
          { id: "fairnessMetrics", text: "Fairness Metrics" },
          { id: "biasBenchmarks", text: "Bias Benchmarks" },
          { id: "redTeaming", text: "Red‑Teaming" },
          { id: "humanReview", text: "Human Review" }
        ],
        targets: [
          { id: "t1", description: "Review training datasets for imbalances (e.g., overrepresentation of certain groups or languages).", correctMethodId: "dataAudit" },
          { id: "t2", description: "Test prompts with demographic variations (e.g., male vs. female names) and compare responses.", correctMethodId: "outputComparison" },
          { id: "t3", description: "Apply measures like demographic parity, equalized odds, or calibration to quantify bias.", correctMethodId: "fairnessMetrics" },
          { id: "t4", description: "Use standardized datasets (e.g., StereoSet, CrowS‑Pairs) to detect stereotypical associations.", correctMethodId: "biasBenchmarks" },
          { id: "t5", description: "Stress‑test the model with adversarial or edge‑case prompts to reveal hidden biases.", correctMethodId: "redTeaming" },
          { id: "t6", description: "Involve diverse reviewers to evaluate outputs for stereotypes, tone, or cultural insensitivity.", correctMethodId: "humanReview" }
        ]
      }
    ],
    resources: [
      { title: "AI Ethics Framework", url: "#" },
      { title: "Bias Detection Tools", url: "#" },
      { title: "Responsible AI Guidelines", url: "#" }
    ]
  },
  {
    id: 10,
    title: "Deploying AI in Production",
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
    knowledgeChecks: [
      {
        question: "What is model deployment?",
        options: [
          "Deleting the model",
          "Making the model available for real-world use",
          "Training the model again",
          "Sharing model code"
        ],
        correctAnswer: 1,
        explanation: "Model deployment is the process of integrating a trained AI model into a production environment where it can receive real-world data, make predictions, and deliver value to users or business processes."
      },
      {
        question: "What is important when deploying AI models?",
        options: [
          "Making models as complex as possible",
          "Monitoring performance and maintaining models",
          "Never updating the model",
          "Hiding the model from users"
        ],
        correctAnswer: 1,
        explanation: "Continuous monitoring and maintenance are critical for deployed models. Performance can degrade over time due to changing data patterns (model drift), requiring regular evaluation, updates, and retraining to maintain accuracy and reliability."
      }
    ],
    resources: [
      { title: "MLOps Best Practices", url: "#" },
      { title: "Model Monitoring Guide", url: "#" },
      { title: "Deployment Strategies", url: "#" }
    ]
  }
];

function LessonViewerContent({ lessonTitle, onBack, onVideoWatched }: LessonViewerProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number | number[] }>({});
  const [videoPlaying, setVideoPlaying] = useState<{ [key: number]: boolean }>({});
  const [matchedMethods, setMatchedMethods] = useState<{ [key: string]: { methodId: string; methodText: string } }>({});
  const [showDragDropResults, setShowDragDropResults] = useState<{ [key: string]: boolean }>({});
  const [submittedQuizzes, setSubmittedQuizzes] = useState<{ [key: string]: boolean }>({});
  const [textInputAnswers, setTextInputAnswers] = useState<{ [key: string]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [lessonAlreadyCompleted, setLessonAlreadyCompleted] = useState(false);
  const [speakingQuestion, setSpeakingQuestion] = useState<string | null>(null);
  const [activityInteractions, setActivityInteractions] = useState<{ [key: string]: boolean }>({});
  const [viewTrackers, setViewTrackers] = useState<{ [key: string]: ContentViewTracker }>({});
  const [showIncompleteAlert, setShowIncompleteAlert] = useState(false);
  const [pulsatingCards, setPulsatingCards] = useState<string[]>([]);

  // Check if lesson is already completed on mount
  useEffect(() => {
    const completed = isLessonCompleted(lessonTitle);
    setLessonAlreadyCompleted(completed);
    
    // Track lesson page view
    trackContentInteraction(
      `lesson-${lessonTitle}`,
      'lesson',
      lessonTitle,
      'view'
    );
  }, [lessonTitle]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Filter lessonSections to only show the section matching the current lesson
  // For the first lesson, only show section 1 (AI Governance & Organizational Blind Spots)
  const currentSections = lessonSections.filter(section => {
    // Match section 1 for the AI Governance lesson
    if (lessonTitle.includes("Applied AI Governance") && section.id === 1) {
      return true;
    }
    // Add more matching logic here as other lessons are unlocked
    return false;
  });

  // If no sections match, show the first section as fallback
  const displaySections = currentSections.length > 0 ? currentSections : [lessonSections[0]];

  // Check if all required activities have been interacted with
  const requiredActivities = [
    'video-clicked',
    'video-sentiment-completed',
    'microlesson-clicked',
    'pixspy-clicked',
    'notebook-clicked',
    'pdf-clicked',
    'handbook-clicked'
  ];
  const allActivitiesCompleted = requiredActivities.every(activity => activityInteractions[activity]);

  const markActivityInteraction = (activityKey: string) => {
    setActivityInteractions(prev => ({
      ...prev,
      [activityKey]: true
    }));
    
    // Track content interaction
    trackContentInteraction(
      `${lessonTitle}-${activityKey}`,
      'activity',
      activityKey,
      'click'
    );
  };

  const handleAnswerSelect = (sectionId: number, checkIndex: number, answerIndex: number, isMultiSelect: boolean) => {
    const key = `${sectionId}-${checkIndex}`;
    
    if (isMultiSelect) {
      setSelectedAnswers(prev => {
        const current = prev[key] as number[] | undefined;
        if (!current) {
          return { ...prev, [key]: [answerIndex] };
        }
        
        // Toggle selection
        if (current.includes(answerIndex)) {
          const newSelection = current.filter(i => i !== answerIndex);
          return { ...prev, [key]: newSelection.length > 0 ? newSelection : undefined };
        } else {
          return { ...prev, [key]: [...current, answerIndex].sort() };
        }
      });
    } else {
      setSelectedAnswers(prev => ({
        ...prev,
        [key]: answerIndex
      }));
    }
  };

  const isAnswerCorrect = (sectionId: number, checkIndex: number, correctAnswer: number | number[]) => {
    const key = `${sectionId}-${checkIndex}`;
    const userAnswer = selectedAnswers[key];
    
    if (userAnswer === undefined) return null;
    
    if (Array.isArray(correctAnswer)) {
      // Multi-select: check if arrays match
      if (!Array.isArray(userAnswer)) return false;
      if (userAnswer.length !== correctAnswer.length) return false;
      const sortedUser = [...userAnswer].sort();
      const sortedCorrect = [...correctAnswer].sort();
      return sortedUser.every((val, idx) => val === sortedCorrect[idx]);
    } else {
      // Single select
      return userAnswer === correctAnswer;
    }
  };

  const handleMethodDrop = (methodId: string, methodText: string, targetId: string) => {
    setMatchedMethods(prev => ({
      ...prev,
      [targetId]: { methodId, methodText }
    }));
  };

  const resetDragDropQuestion = (sectionId: number, checkIndex: number) => {
    const key = `${sectionId}-${checkIndex}`;
    // Clear all matched methods for this question
    setMatchedMethods(prev => {
      const newMatched = { ...prev };
      // Remove all target matches (t1, t2, t3, t4)
      ['t1', 't2', 't3', 't4'].forEach(targetId => {
        delete newMatched[targetId];
      });
      return newMatched;
    });
    // Clear results
    setShowDragDropResults(prev => ({
      ...prev,
      [key]: false
    }));
  };

  const checkDragDropAnswers = (sectionId: number, checkIndex: number) => {
    const key = `${sectionId}-${checkIndex}`;
    setShowDragDropResults(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const handleSubmitQuiz = (sectionId: number, checkIndex: number) => {
    const key = `${sectionId}-${checkIndex}`;
    setSubmittedQuizzes(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const handleTextInputAnswer = (sectionId: number, checkIndex: number, answer: string) => {
    const key = `${sectionId}-${checkIndex}`;
    setTextInputAnswers(prev => ({
      ...prev,
      [key]: answer
    }));
  };

  const speakQuestion = (questionKey: string, questionText: string) => {
    // Stop any currently speaking question
    window.speechSynthesis.cancel();
    
    // If clicking the same question that's speaking, just stop
    if (speakingQuestion === questionKey) {
      setSpeakingQuestion(null);
      return;
    }
    
    // Speak the new question
    const utterance = new SpeechSynthesisUtterance(questionText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => setSpeakingQuestion(null);
    utterance.onerror = () => setSpeakingQuestion(null);
    
    setSpeakingQuestion(questionKey);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmitEntireQuiz = () => {
    // Check if all required activities have been completed
    if (!allActivitiesCompleted) {
      setShowIncompleteAlert(true);
      
      // Find which activities are incomplete and mark them for pulsating
      const incompleteActivities = requiredActivities.filter(activity => !activityInteractions[activity]);
      setPulsatingCards(incompleteActivities);
      
      // Scroll to the content section to show incomplete activities
      const contentSection = document.getElementById('lesson-content-activities');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Clear pulsating after 5 seconds
      setTimeout(() => {
        setPulsatingCards([]);
        setShowIncompleteAlert(false);
      }, 5000);
      
      return; // Don't submit the quiz
    }
    
    let totalPoints = 0;
    let totalQuestions = 0;
    const pointsPerQuestion = 12.5; // Each question is worth 12.5 points (8 questions = 100 points)

    // Mark all questions as submitted
    const allSubmitted: { [key: string]: boolean } = {};

    displaySections.forEach((section) => {
      section.knowledgeChecks.forEach((check, checkIndex) => {
        const key = `${section.id}-${checkIndex}`;
        totalQuestions++;
        allSubmitted[key] = true;

        // Check different question types
        if (check.type === 'multiSelect' || Array.isArray(check.correctAnswer)) {
          const userAnswer = selectedAnswers[key] as number[] | undefined;
          if (userAnswer && Array.isArray(check.correctAnswer)) {
            const sortedUserAnswer = [...userAnswer].sort();
            const sortedCorrectAnswer = [...check.correctAnswer].sort();
            
            // Check if all correct answers selected (and no incorrect ones)
            const isCorrect = JSON.stringify(sortedUserAnswer) === JSON.stringify(sortedCorrectAnswer);
            
            if (isCorrect) {
              totalPoints += pointsPerQuestion; // 12.5 points for all correct
            } else {
              // Question 5: Give 3 points for each correct answer selected
              let correctCount = 0;
              userAnswer.forEach(answer => {
                if (check.correctAnswer.includes(answer)) {
                  correctCount++;
                }
              });
              totalPoints += correctCount * 3; // 3 points per correct answer
            }
            
            // Track quiz answer for ML
            trackQuizAnswer(
              lessonTitle,
              lessonTitle,
              key,
              check.question,
              userAnswer?.map(i => check.options?.[i]).join(', ') || 'No answer',
              check.correctAnswer.map(i => check.options?.[i]).join(', '),
              isCorrect
            );
          }
        } else if (check.type === 'textInput') {
          const userAnswer = textInputAnswers[key]?.trim().toLowerCase();
          let isCorrect = false;
          
          if (userAnswer && check.acceptableAnswers) {
            // Check if answer contains "mini" - any answer with mini is correct for question 1
            const containsMini = userAnswer.includes('mini');
            
            if (containsMini) {
              totalPoints += pointsPerQuestion; // Add 12.5 points
              isCorrect = true;
            }
          }
          
          // Track quiz answer for ML
          trackQuizAnswer(
            lessonTitle,
            lessonTitle,
            key,
            check.question,
            userAnswer || 'No answer',
            check.acceptableAnswers?.[0] || '',
            isCorrect
          );
        } else if (check.type === 'dragDrop') {
          // Question 4: Spot the Blind Spots - 3 points per correct match or 12.5 when all correct
          let correctMatches = 0;
          const totalMatches = check.targets?.length || 0;
          
          check.targets?.forEach(target => {
            const matched = matchedMethods[target.id];
            if (matched && matched.methodId === target.correctMethodId) {
              correctMatches++;
            }
          });
          
          const isAllCorrect = correctMatches === totalMatches && totalMatches > 0;
          
          // If all correct, give 12.5 points; otherwise 3 points per correct match
          if (isAllCorrect) {
            totalPoints += pointsPerQuestion; // 12.5 points for all correct
          } else {
            totalPoints += correctMatches * 3; // 3 points per correct match
          }
          
          // Track quiz answer for ML
          trackQuizAnswer(
            lessonTitle,
            lessonTitle,
            key,
            check.question,
            `${correctMatches}/${totalMatches} correct matches`,
            'All matches correct',
            isAllCorrect
          );
        } else {
          // Standard single-choice question (including Question 3)
          const userAnswer = selectedAnswers[key] as number | undefined;
          const isCorrect = userAnswer === check.correctAnswer;
          
          if (isCorrect) {
            totalPoints += pointsPerQuestion; // Add 12.5 points for correct answer
          }
          
          // Track quiz answer for ML
          trackQuizAnswer(
            lessonTitle,
            lessonTitle,
            key,
            check.question,
            userAnswer !== undefined && check.options ? check.options[userAnswer] : 'No answer',
            check.options?.[check.correctAnswer as number] || '',
            isCorrect
          );
        }
      });
    });

    // Update all questions to be marked as submitted
    setSubmittedQuizzes(allSubmitted);
    setQuizScore({ correct: totalPoints, total: 100 }); // Score out of 100 points
    setQuizSubmitted(true);

    // Show confetti for passing scores (70% or higher)
    if (totalPoints >= 70) {
      setShowConfetti(true);
      
      // Award points and badge for lesson completion (only if not already completed)
      if (!lessonAlreadyCompleted) {
        const result = awardLessonCompletion(lessonTitle, lessonTitle, totalPoints);
        setPointsEarned(result.pointsEarned);
        setEarnedBadge(result.newBadge);
        setLessonAlreadyCompleted(true);
      }
    }
  };

  const isTextInputAnswerCorrect = (sectionId: number, checkIndex: number, acceptableAnswers: string[]) => {
    const key = `${sectionId}-${checkIndex}`;
    const userAnswer = textInputAnswers[key];
    
    if (userAnswer === undefined) return null;
    
    // Check if answer contains "mini" - any answer with mini is correct for question 1
    const userAnswerLower = userAnswer.toLowerCase();
    return userAnswerLower.includes('mini');
  };

  return (
    <div>
      {displaySections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {/* Section content goes here */}

          {/* Divider Line */}
          {sectionIndex < displaySections.length - 1 && (
            <div className="border-t border-border my-12" />
          )}
        </div>
      ))}

      {/* Completion Card */}
      {quizSubmitted && quizScore && quizScore.correct >= 70 && (
        <Card className="mt-12 border-border bg-primary/5">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl mb-2">Lesson Complete!</h3>
            <p className="text-muted-foreground mb-6">
              You've reached the end of this lesson. Review any sections as needed or continue to the next lesson.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={onBack}>
                Back to All Lessons
              </Button>
              <Button>Next Lesson</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confetti Animation */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {/* Badge Notification */}
      {earnedBadge && pointsEarned > 0 && (
        <BadgeNotification
          badge={earnedBadge}
          pointsEarned={pointsEarned}
          onClose={() => {
            setEarnedBadge(null);
            setPointsEarned(0);
          }}
        />
      )}
    </div>
  );
}

export function LessonViewer(props: LessonViewerProps) {
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;
  const backend = isTouchDevice ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <LessonViewerContent {...props} />
    </DndProvider>
  );
}