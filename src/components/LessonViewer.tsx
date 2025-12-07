import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ArrowLeft, CheckCircle, Circle, Play, Check, Square, BookOpen, Scale, GraduationCap, Target, FileText, ClipboardCheck, Volume2, Video, Bot, Lock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import placeholderImage from '../assets/Applied-Placeholder1.png';
import notebookLMImage from '../assets/Notebook.png';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { Confetti } from './Confetti';
import { BadgeNotification } from './BadgeNotification';
import { awardLessonCompletion, isLessonCompleted } from '../utils/progressSystem';
import type { Badge } from '../utils/progressSystem';
import { trackQuizAnswer, trackContentInteraction, ContentViewTracker, getUserId } from '../utils/mlTracking';

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
    videoUrl: "https://app.heygen.com/embedded-player/6acbfe0867184f0c94a4d93fa8291962",
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
      { title: "Hyperparameter Tuning Guide", url: "#" },
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b border-border sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-3 lg:px-8 py-3 lg:py-6 opacity-100">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-2 lg:mb-4 hover:bg-muted"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Button>
          
          <h1 className="text-xl lg:text-3xl mb-1 lg:mb-2">
            Micro-Learning module 1: Applied AI Governance & Organizational Blind Spots
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Lesson time • 15 min 55 seconds
          </p>
          <p className="text-sm lg:text-base text-muted-foreground">
            Knowledge Check • Untimed: self paced
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-2 lg:px-6 py-3 lg:py-8">
        <div className="space-y-4 lg:space-y-8">
          {displaySections.map((section, sectionIndex) => (
            <div key={section.id}>
              {/* Section Content */}
              <div id="lesson-content-activities" className="mb-3 lg:mb-6">
                <h2 className="text-lg lg:text-2xl mb-2 lg:mb-4">
                  Section {section.id}: {section.title}
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
                  {/* Left Side - Video Content */}
                  <div className="space-y-2 lg:space-y-3">
                    <Card className={`${section.id === 1 ? 'border-none' : 'border-border'} bg-card overflow-hidden rounded-xl ${pulsatingCards.includes('video-clicked') ? 'pulsate-alert' : ''}`}>
                      <CardContent className="p-0">
                        <div className="aspect-[9/16] bg-muted w-full max-w-[440px] mx-auto relative rounded-xl overflow-hidden">
                          {!videoPlaying[section.id] ? (
                            <>
                              <img
                                src={placeholderImage}
                                alt="Video placeholder - Applying Artificial Intelligence"
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => {
                                  setVideoPlaying(prev => ({ ...prev, [section.id]: true }));
                                  markActivityInteraction('video-clicked');
                                  // Trigger sentiment check-in after 2:54 (174 seconds) into video
                                  if (onVideoWatched) {
                                    setTimeout(() => {
                                      onVideoWatched();
                                    }, 174000);
                                  }
                                }}
                                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                                aria-label="Play video"
                              >
                                <div className="bg-white/90 group-hover:bg-white rounded-full p-6 transition-all group-hover:scale-110">
                                  <Play className="w-12 h-12 text-black fill-black" />
                                </div>
                              </button>
                            </>
                          ) : (
                            <iframe
                              width="100%"
                              height="100%"
                              src={section.videoUrl}
                              title={section.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Micro-Learning Goals */}
                    <div className="w-full max-w-[440px] mx-auto">
                      <Card className="border-border bg-card">
                        <CardContent className="p-3 lg:p-4">
                          <h3 className="mb-2 lg:mb-3 text-base lg:text-lg flex items-center gap-2">
                            <Target className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                            Micro-Learning Goals
                            <button
                              onClick={() => speakQuestion(
                                `micro-learning-${section.id}`,
                                `Micro-Learning Goals: Introduce core Applied AI concepts essential for practical application. Practice these concepts with real-world examples. Access to references for deeper understanding. Expand AI vocabulary and promote discussion.`
                              )}
                              className="ml-auto text-primary hover:text-primary/80 transition-colors"
                              aria-label="Listen to micro-learning goals"
                            >
                              <Volume2 className={`h-4 w-4 lg:h-5 lg:w-5 ${speakingQuestion === `micro-learning-${section.id}` ? 'animate-pulse' : ''}`} />
                            </button>
                          </h3>
                          <ul className="space-y-2 text-xs lg:text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Introduce core Applied AI concepts essential for practical application</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Practice these concepts with real-world examples</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Access to references for governance and deeper understanding</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Expand AI vocabulary and promote discussion</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* What is AI Literacy? */}
                    <div className="w-full max-w-[440px] mx-auto">
                      <Card className="border-border bg-card">
                        <CardContent className="p-3 lg:p-4">
                          <h3 className="mb-3 text-base lg:text-lg flex items-center gap-2">
                            What is AI Literacy?
                            <button
                              onClick={() => speakQuestion(
                                `ai-literacy-${section.id}`,
                                `What is AI Literacy? Definition: The ability to understand, use, and evaluate AI tools responsibly. Analogy: Just like computer literacy became essential in the 1990s, AI literacy is today's baseline skill. Career success increasingly depends on the ability to collaborate with AI systems, not just traditional skills - Forbes. WEF predicts 170 million new roles will be created by AI over the next decade, making AI literacy essential for workforce readiness - World Economic Forum Findings.`
                              )}
                              className="ml-auto text-primary hover:text-primary/80 transition-colors"
                              aria-label="Listen to AI literacy explanation"
                            >
                              <Volume2 className={`h-4 w-4 lg:h-5 lg:w-5 ${speakingQuestion === `ai-literacy-${section.id}` ? 'animate-pulse' : ''}`} />
                            </button>
                          </h3>
                          <div className="space-y-3 text-xs lg:text-sm text-muted-foreground">
                            <div>
                              <span className="text-foreground">Definition:</span> The ability to understand, use, and evaluate AI tools responsibly.
                            </div>
                            <div>
                              <span className="text-foreground">Analogy:</span> Just like computer literacy became essential in the 1990s, AI literacy is today's baseline skill.
                            </div>
                            <div>
                              "Career success increasingly depends on the ability to collaborate with AI systems, not just traditional skills" - <span className="italic">Forbes</span>
                            </div>
                            <div>
                              "WEF predicts 170 million new roles will be created by AI over the next decade, making AI literacy essential for workforce readiness" - <span className="italic">World Economic Forum (WEF) Findings</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-border">
                              <strong>AI Bias:</strong> Algorithms may weigh certain features (like word choice, school, or zip code) that highly correlate with race, gender, or socioeconomic status.
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>



                    {/* Reference Materials */}
                    {section.resources && section.resources.length > 0 && (
                      <div className="w-full max-w-[440px] mx-auto">
                        <Card className={`border-border bg-card ${(pulsatingCards.includes('microlesson-clicked') || pulsatingCards.includes('pixspy-clicked') || pulsatingCards.includes('notebook-clicked')) ? 'pulsate-alert' : ''}`}>
                          <CardContent className="p-3 lg:p-4">
                            {/* Micro-lesson Section */}
                            <div className="mb-4">
                              <div className="flex items-start justify-between gap-2 mb-3">
                                <h3 className="text-base lg:text-lg font-semibold text-primary flex-1">
                                  OpenAI Micro-lesson:<br />
                                  How AI Converts Information (tap to listen)
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-primary/20 transition-colors"
                                  onClick={() => {
                                    const text = `OpenAI Micro-lesson: How AI Converts Information. 
                                      Information to Data: AI breaks down text or speech into structured data.
                                      Vertexes and Numbers: Think of it like mapping words into points in a giant network, each linked by numerical weights.
                                      Tokens: Words, phrases, or chunks of text are converted into tokens (the basic units AI processes).
                                      Cost: Every token processed has a cost. More tokens equals higher expense.`;
                                    
                                    if ('speechSynthesis' in window) {
                                      window.speechSynthesis.cancel();
                                      const utterance = new SpeechSynthesisUtterance(text);
                                      utterance.rate = 0.9;
                                      utterance.pitch = 1;
                                      utterance.volume = 1;
                                      window.speechSynthesis.speak(utterance);
                                    }
                                  }}
                                >
                                  <Volume2 className="h-4 w-4 text-primary" />
                                </Button>
                              </div>
                              
                              <div className="space-y-[0.625rem] bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/30 rounded-lg p-3 lg:p-4">
                                <div className="space-y-1">
                                  <p className="text-xs lg:text-sm font-semibold text-foreground">
                                    Information → Data
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    AI breaks down text or speech into structured data.
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-xs lg:text-sm font-semibold text-foreground">
                                    Vertexes & Numbers
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    Think of it like mapping words into points in a giant network, each linked by numerical weights.
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-xs lg:text-sm font-semibold text-foreground">
                                    Tokens
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    Words, phrases, or chunks of text are converted into tokens (the basic units AI processes).
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-xs lg:text-sm font-semibold text-foreground">
                                    Cost
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    Every token processed has a cost. More tokens = higher expense.
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-xs lg:text-sm font-semibold text-foreground">
                                    Free Trial Credits
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    OpenAI's API, offers free credits (e.g., $5 worth) for a trial period. These let you experiment without paying.
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-xs lg:text-sm font-semibold text-foreground">
                                    Copilot Chat (Microsoft context)
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    If you're using Copilot inside Microsoft 365 (like Word, Excel, SharePoint), you don't see tokens directly — licensing covers usage.
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-xs lg:text-sm font-semibold text-foreground">
                                    Limits
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    Once you use up the free credits, you must pay per token. There is a "Pay-As-You-Go" structure. There's no unlimited free usage.
                                  </p>
                                </div>

                                <div className="pt-3 border-t border-primary/20">
                                  <a 
                                    href="https://openai.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={() => markActivityInteraction('microlesson-clicked')}
                                  >
                                    <Button 
                                      className="w-full bg-green-600 hover:bg-green-700 text-white h-auto py-3 text-center"
                                      size="lg"
                                    >
                                      <span className="block leading-tight">
                                        Visit OpenAI - ask questions to<br />build AI vocabulary!
                                      </span>
                                    </Button>
                                  </a>
                                </div>
                              </div>
                            </div>
                            
                            {/* Divider */}
                            <div className="my-4 border-t border-border"></div>
                            
                            {/* Real World Example */}
                            <div>
                              <h3 className="mb-2 lg:mb-3 text-base lg:text-lg flex items-center gap-2">
                                <BookOpen className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                                Real World Example
                              </h3>
                              <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src="https://www.youtube.com/embed/P5mVYUuYtHE"
                                  title="Real World Example Video"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full h-full"
                                />
                              </div>
                              <ul className="mt-3 space-y-2 text-xs lg:text-sm text-muted-foreground">
                                <li className="pt-4">
                                  <h3 className="mb-2 lg:mb-3 text-base lg:text-lg flex items-center gap-2">
                                    <Bot className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                                    The OpenAI framework
                                    <button
                                      onClick={() => speakQuestion(
                                        'openai-framework',
                                        'The OpenAI framework provides powerful capabilities for building AI applications. For shared use and experimentation, there are several open source tools available including PixSpy and NotebookLM. These tools are designed for collaborative exploration and hands-on learning, allowing you to experiment with AI concepts in practical scenarios.'
                                      )}
                                      className="ml-auto text-primary hover:text-primary/80 transition-colors"
                                      aria-label="Listen to OpenAI framework description"
                                    >
                                      <Volume2 className={`h-4 w-4 ${speakingQuestion === 'openai-framework' ? 'animate-pulse' : ''}`} />
                                    </button>
                                  </h3>
                                </li>
                                <li className="flex items-start gap-2 leading-relaxed">
                                  <span>Frameworks provide proven guardrails for success. The OpenAI framework provides powerful capabilities for shared use and experimentation, there are several open source tools available including{' '}
                                  <a href="https://pixspy.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    Pixspy.com
                                  </a>
                                  {' '}and{' '}
                                  <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    NotebookLM
                                  </a>
                                  . These tools are designed for collaborative exploration, innovation and hands-on learning, allowing you to experiment with AI concepts in practical scenarios.</span>
                                </li>
                              </ul>
                            </div>
                            
                            {/* Divider */}
                            <div className="my-4 border-t border-border"></div>
                            
                            {/* Real World Activity - Video */}
                            <div 
                              onClick={() => markActivityInteraction('pixspy-clicked')}
                              className={`cursor-pointer transition-all ${
                                activityInteractions['pixspy-clicked'] 
                                  ? 'opacity-100' 
                                  : 'hover:bg-primary/5 rounded-lg p-2 -m-2'
                              }`}
                            >
                              <h3 className="mb-2 lg:mb-3 text-base lg:text-lg flex items-center gap-2">
                                <Video className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                                Real World Activity
                                {activityInteractions['pixspy-clicked'] && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </h3>
                              
                              {/* A. Watch PixSpy.com */}
                              <div className="mb-4">
                                <p className="font-semibold text-sm lg:text-base text-foreground mb-2 flex items-center gap-2">
                                  A. Watch PixSpy.com
                                  <button
                                    onClick={() => speakQuestion(
                                      'watch-pixspy',
                                      'A. Watch PixSpy.com. Watch a few minutes of the video and explore PixSpy.com. Upload an image of your choice or a screen shot. This learning experience is yours to shape—what you discover and create with these tools is limited only by your imagination!'
                                    )}
                                    className="text-primary hover:text-primary/80 transition-colors"
                                    aria-label="Listen to Watch PixSpy activity"
                                  >
                                    <Volume2 className={`h-4 w-4 ${speakingQuestion === 'watch-pixspy' ? 'animate-pulse' : ''}`} />
                                  </button>
                                </p>
                                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                                  Watch a few minutes of the video and explore{' '}
                                  <a href="https://pixspy.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600">
                                    PixSpy.com
                                  </a>
                                  . Upload an image of your choice or a screen shot. This learning experience is yours to shape—what you discover and create with these tools is limited only by your imagination!
                                </p>
                              </div>
                            </div>
                            
                            {/* Divider */}
                            <div className="my-4 border-t border-border"></div>
                            
                            {/* Real World Activity - Notebook */}
                            <div 
                              onClick={() => markActivityInteraction('notebook-clicked')}
                              className={`cursor-pointer transition-all ${
                                activityInteractions['notebook-clicked'] 
                                  ? 'opacity-100' 
                                  : 'hover:bg-primary/5 rounded-lg p-2 -m-2'
                              }`}
                            >
                              <h3 className="mb-2 lg:mb-3 text-base lg:text-lg flex items-center gap-2">
                                <BookOpen className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                                Real World Activity
                                {activityInteractions['notebook-clicked'] && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </h3>
                              
                              {/* B. Make an OpenAI NotebookLM with Mind map */}
                              <div className="mb-4">
                                <p className="font-semibold text-sm lg:text-base text-foreground mb-2 flex items-center gap-2">
                                  B. Make an OpenAI NotebookLM with Mind map
                                  <button
                                    onClick={() => speakQuestion(
                                      'make-notebook',
                                      'B. Make an OpenAI NotebookLM with Mind map. LM stands for Language Model. NotebookLM is Google\'s AI‑powered research and note‑taking tool. A free notebook powered by a language model, it serves as a thinking partner to support research and learning. Start your own notebook today—for Applied AI or any topic you want to explore. Try this: Visit NotebookLM. Copy the text below: Create a new Notebook and paste the text where it says, "paste text - copied text". Then locate the studio sidebar and tap mind map "Generate a Mind Map" and explore! Reflect: How will you apply AI capabilities?'
                                    )}
                                    className="text-primary hover:text-primary/80 transition-colors"
                                    aria-label="Listen to Make AI Notebook activity"
                                  >
                                    <Volume2 className={`h-4 w-4 ${speakingQuestion === 'make-notebook' ? 'animate-pulse' : ''}`} />
                                  </button>
                                </p>
                                
                                <div className="text-xs lg:text-sm text-muted-foreground mb-3 space-y-1">
                                  <p>"LM" stands for Language Model.</p>
                                  <p>NotebookLM is Google's AI‑powered research and note‑taking tool. A free "notebook powered by a language model," it serves as a thinking partner to support research and learning. Start your own notebook today—for Applied AI or any topic you want to explore.</p>
                                </div>
                                
                                {/* NotebookLM Image */}
                                <div className="mb-4 rounded-lg overflow-hidden border border-border">
                                  <a 
                                    href="https://notebooklm.google.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block hover:opacity-90 transition-opacity cursor-pointer"
                                  >
                                    <img 
                                      src={notebookLMImage} 
                                      alt="NotebookLM Add Sources Interface" 
                                      className="w-full h-auto"
                                    />
                                  </a>
                                </div>
                                
                                {/* NotebookLM Activity */}
                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 lg:p-4 mb-4">
                                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                                    <strong>Try this:</strong> Visit{' '}
                                    <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600">
                                      NotebookLM
                                    </a>
                                    . Copy the text below: Create a new Notebook and paste the text where it says, "paste text - copied text". Then locate the studio sidebar and tap mind map <strong>"Generate a Mind Map"</strong> or a slide deck and explore! How will you apply AI capabilities?
                                  </p>
                                </div>
                                <div className="bg-background border border-border rounded p-2 lg:p-3 mb-2 text-xs lg:text-sm font-mono">
                                  "The OpenAI framework provides powerful capabilities for shared use and experimentation, there are several open source tools available including NotebookLM. These tools are designed for collaborative exploration and hands-on learning, allowing you to experiment with AI concepts in practical scenarios."
                                </div>
                                
                                {/* AI Agents Button */}
                                <div className="mt-4">
                                  <Button 
                                    variant="default"
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-2xl h-auto"
                                    size="lg"
                                    onClick={() => {
                                      markActivityInteraction('pdf-clicked');
                                      window.open('https://resources.nice.com/wp-content/uploads/2025/02/NICE-The-AI-Agent-Handbook.pdf', '_blank');
                                    }}
                                  >
                                    <div className="text-center py-6">
                                      <div className="text-sm font-bold">
                                        Tap to read<br />
                                        <span className="text-base">NICE-AI-Agent-Handbook.pdf</span><br />
                                        pages 12-14 now!
                                      </div>
                                    </div>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Knowledge Checks */}
                  <div className="space-y-2">
                    {/* Real World Reference Materials Card - Above Call to Action */}
                    {section.resources && section.resources.length > 0 && (
                      <Card className={`border-primary/20 bg-card ${pulsatingCards.includes('handbook-clicked') ? 'pulsate-alert' : ''}`}>
                        <CardContent className="p-3 lg:p-4">
                          <h3 className="mb-2 text-base lg:text-lg flex items-center gap-2">
                            <BookOpen className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                            Real World Reference Materials
                          </h3>
                          <p className="text-xs lg:text-sm text-muted-foreground mb-3 leading-relaxed">
                            These real world references are supplied to support continued learning at your own pace. Opening them now is optional and encouraged so you can make bookmarks.
                          </p>
                          <div className="space-y-2">
                            {section.resources.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 text-xs lg:text-sm text-primary hover:underline group"
                                onClick={() => {
                                  // Mark handbook activity as completed if it's the NICE AI Agent Handbook
                                  if (resource.title === 'NICE-AI-Agent-Handbook.pdf') {
                                    markActivityInteraction('handbook-clicked');
                                  }
                                }}
                              >
                                <FileText className="h-3 w-3 lg:h-4 lg:w-4 mt-0.5 flex-shrink-0" />
                                <span className="group-hover:text-primary/80 transition-colors">{resource.title}</span>
                              </a>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Call to Action Card */}
                    <Card className="border-green-600 bg-green-600">
                      <CardContent className="p-3 lg:p-4 text-center">
                        <p className="text-white text-sm lg:text-base font-semibold">
                          Answer 8 Questions to Complete this Learning Experience!
                        </p>
                      </CardContent>
                    </Card>

                    {!allActivitiesCompleted ? (
                      /* Locked Quiz State */
                      <Card className="border-border bg-muted/10 shadow-[inset_0_0_20px_rgba(192,192,192,0.3)]">
                        <CardContent className="p-6 lg:p-8 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="bg-primary/10 p-4 rounded-full">
                              <Lock className="h-8 w-8 lg:h-12 lg:w-12 text-primary" />
                            </div>
                            <div>
                              <h3 className="mb-2 text-base lg:text-lg">Quiz Locked</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Complete all <strong>7</strong> learning activities to unlock the quiz
                              </p>
                              <div className="space-y-3 text-left max-w-sm mx-auto">
                                <div className="flex items-center gap-2 text-sm">
                                  {activityInteractions['video-clicked'] ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className={activityInteractions['video-clicked'] ? 'text-foreground' : 'text-muted-foreground'}>
                                    Watch Applied AI course video (2:55 seconds)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  {activityInteractions['video-sentiment-completed'] ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className={activityInteractions['video-sentiment-completed'] ? 'text-foreground' : 'text-muted-foreground'}>
                                    Complete video sentiment survey (:45 seconds)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  {activityInteractions['microlesson-clicked'] ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className={activityInteractions['microlesson-clicked'] ? 'text-foreground' : 'text-muted-foreground'}>
                                    Listen to OpenAI Micro-lesson and click OpenAI button (1:30 seconds)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  {activityInteractions['pixspy-clicked'] ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className={activityInteractions['pixspy-clicked'] ? 'text-foreground' : 'text-muted-foreground'}>
                                    Click on PixSpy activity card to watch the video (6:30 seconds)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  {activityInteractions['notebook-clicked'] ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className={activityInteractions['notebook-clicked'] ? 'text-foreground' : 'text-muted-foreground'}>
                                    Goto NotebookLM & paste the text on activity card, generate a mind map, report or slide deck about AI (3:00 minutes)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  {activityInteractions['pdf-clicked'] ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className={activityInteractions['pdf-clicked'] ? 'text-foreground' : 'text-muted-foreground'}>
                                    Click and explore NICE-AI-Agent-Handbook.pdf listed in Real World References (2:00 minutes)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  {activityInteractions['survey-completed'] ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className={activityInteractions['survey-completed'] ? 'text-foreground' : 'text-muted-foreground'}>
                                    Submit All survey questions (1:20 seconds)
                                  </span>
                                </div>
                              </div>
                              
                              {/* Button to highlight incomplete activities */}
                              <Button 
                                onClick={() => {
                                  const incompleteActivities = requiredActivities.filter(activity => !activityInteractions[activity]);
                                  setPulsatingCards(incompleteActivities);
                                  setShowIncompleteAlert(true);
                                  
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
                                }}
                                variant="outline"
                                className="mt-4 border-primary text-primary hover:bg-primary/10"
                              >
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Show Me What Is Incomplete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      /* Unlocked Quiz */
                      <Card className="border-border bg-muted/10">
                        <CardContent className="p-2 lg:p-3">
                          <h3 className="mb-2 text-base lg:text-lg">Context Awareness & Knowledge Check</h3>
                          
                          <div className="space-y-3 lg:space-y-4">
                            {section.knowledgeChecks.map((check: any, checkIndex) => {
                            const key = `${section.id}-${checkIndex}`;
                            
                            // Drag and Drop Question
                            if (check.type === 'dragDrop') {
                              const showResults = showDragDropResults[key] || false;
                              const matchedMethodsForTargets = Object.keys(matchedMethods).filter(k => k.startsWith('t'));
                              const allTargetsMatched = check.targets.every((target: any) => matchedMethods[target.id]);
                              
                              return (
                                <div key={checkIndex} className="space-y-2">
                                  <div>
                                    <p className="text-sm lg:text-base flex items-start gap-2">
                                      <button
                                        onClick={() => speakQuestion(key, `Question ${checkIndex + 1}: ${check.question}`)}
                                        className="flex-shrink-0 mt-0.5 text-primary hover:text-primary/80 transition-colors"
                                        aria-label="Listen to question"
                                      >
                                        <Volume2 className={`h-4 w-4 ${speakingQuestion === key ? 'animate-pulse' : ''}`} />
                                      </button>
                                      <span>
                                        <span className="font-bold">Question {checkIndex + 1}:</span> {check.question}
                                      </span>
                                    </p>
                                    {check.questionSubtext && (
                                      <p className="italic text-xs lg:text-sm text-muted-foreground mt-1">
                                        {check.questionSubtext}
                                      </p>
                                    )}
                                  </div>
                                  
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                                    {/* Methods to drag */}
                                    <div className="space-y-2">
                                      <p className="text-xs font-semibold text-muted-foreground">Methods:</p>
                                      <div className="space-y-2">
                                        {check.methods.map((method: any) => {
                                          const isMatched = Object.values(matchedMethods).some(
                                            (m: any) => m.methodId === method.id
                                          );
                                          return (
                                            <div key={method.id}>
                                              <DraggableMethod
                                                id={method.id}
                                                text={method.text}
                                                isMatched={isMatched}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    
                                    {/* Drop targets */}
                                    <div className="space-y-2">
                                      <p className="text-xs font-semibold text-muted-foreground">Descriptions:</p>
                                      <div className="space-y-2">
                                        {check.targets.map((target: any) => (
                                          <DropTarget
                                            id={target.id}
                                            description={target.description}
                                            matchedMethodText={matchedMethods[target.id]?.methodText || null}
                                            matchedMethodId={matchedMethods[target.id]?.methodId || null}
                                            correctMethodId={target.correctMethodId}
                                            onDrop={handleMethodDrop}
                                            showResults={showResults}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    {!showResults && allTargetsMatched && (
                                      <Button 
                                        onClick={() => checkDragDropAnswers(section.id, checkIndex)}
                                        className="flex-1"
                                      >
                                        Review Answer(s)
                                      </Button>
                                    )}
                                    
                                    {(allTargetsMatched || showResults) && (
                                      <Button 
                                        onClick={() => resetDragDropQuestion(section.id, checkIndex)}
                                        variant="outline"
                                        className="flex-1"
                                      >
                                        Reset
                                      </Button>
                                    )}
                                  </div>
                                  
                                  {showResults && (
                                    <div className="p-2 lg:p-3 rounded-lg bg-primary/10">
                                      <p className="text-xs lg:text-sm">
                                        Review your matches above. Green borders indicate correct matches, red borders indicate incorrect matches.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                            
                            // Text Input Question
                            if (check.type === 'textInput') {
                              const textAnswer = textInputAnswers[key] || '';
                              const hasSubmitted = submittedQuizzes[key] || false;
                              const isCorrect = hasSubmitted ? isTextInputAnswerCorrect(section.id, checkIndex, check.acceptableAnswers) : null;
                              
                              return (
                                <div key={checkIndex} className="space-y-2">
                                  <div>
                                    <div className="flex items-start gap-2">
                                      <button
                                        onClick={() => speakQuestion(key, `Question ${checkIndex + 1}: ${check.question}`)}
                                        className="flex-shrink-0 mt-0.5 text-primary hover:text-primary/80 transition-colors"
                                        aria-label="Listen to question"
                                      >
                                        <Volume2 className={`h-4 w-4 ${speakingQuestion === key ? 'animate-pulse' : ''}`} />
                                      </button>
                                      <p className="text-sm lg:text-base font-bold flex-1">
                                        Question {checkIndex + 1}: {check.question}
                                      </p>
                                    </div>
                                    {check.questionLink && (
                                      <p className="text-sm lg:text-base mt-1">
                                        <a 
                                          href={check.questionLink} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
                                        >
                                          Visit: OpenAI Pricing Page →
                                        </a>
                                      </p>
                                    )}
                                    {check.questionSubtext && (
                                      <p className="italic font-bold text-xs lg:text-sm text-muted-foreground mt-1">
                                        {check.questionSubtext}
                                      </p>
                                    )}
                                  </div>
                                  
                                  <input
                                    type="text"
                                    maxLength={30}
                                    value={textAnswer}
                                    onChange={(e) => handleTextInputAnswer(section.id, checkIndex, e.target.value)}
                                    placeholder="$ Enter your answer..."
                                    disabled={hasSubmitted && isCorrect === true}
                                    className="w-full p-3 border rounded-lg text-sm lg:text-base bg-background dark:bg-white/10 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                  />
                                  
                                  {textAnswer && !hasSubmitted && (
                                    <Button 
                                      onClick={() => handleSubmitQuiz(section.id, checkIndex)}
                                      className="w-full"
                                    >
                                      Review Answer(s)
                                    </Button>
                                  )}
                                  
                                  {hasSubmitted && isCorrect !== null && (
                                    <div className={`p-2 lg:p-3 rounded-lg ${isCorrect ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-500/10 text-red-700 dark:text-red-400'}`}>
                                      <p className="text-xs lg:text-sm">
                                        {isCorrect ? '✓ Correct! Great job!' : (
                                          <>
                                            <span className="block mb-1">✗ Incorrect. Please try again.</span>
                                            <span className="text-xs opacity-90">{check.explanation}</span>
                                          </>
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                            
                            // Regular Multiple Choice Question
                            const userAnswer = selectedAnswers[key];
                            const isCorrect = userAnswer !== undefined ? isAnswerCorrect(section.id, checkIndex, check.correctAnswer) : null;
                            const isMultiSelect = Array.isArray(check.correctAnswer);
                            const hasSubmitted = submittedQuizzes[key] || false;
                            
                            return (
                              <div key={checkIndex} className="space-y-2">
                                <div>
                                  <div className="flex items-start gap-2">
                                    <button
                                      onClick={() => speakQuestion(key, `Question ${checkIndex + 1}: ${check.question}`)}
                                      className="flex-shrink-0 mt-0.5 text-primary hover:text-primary/80 transition-colors"
                                      aria-label="Listen to question"
                                    >
                                      <Volume2 className={`h-4 w-4 ${speakingQuestion === key ? 'animate-pulse' : ''}`} />
                                    </button>
                                    <p className="text-sm lg:text-base font-bold flex-1">
                                      Question {checkIndex + 1}: {check.question}
                                    </p>
                                  </div>
                                  {check.questionSubtext && (
                                    <p className="italic font-bold text-xs lg:text-sm text-muted-foreground mt-1">
                                      {check.questionSubtext}
                                    </p>
                                  )}
                                </div>
                                
                                <div className="space-y-1.5">
                                  {check.options.map((option: string, optionIndex: number) => {
                                    const isSelected = Array.isArray(userAnswer) ? userAnswer.includes(optionIndex) : userAnswer === optionIndex;
                                    const correctAnswerArray = Array.isArray(check.correctAnswer) ? check.correctAnswer : [check.correctAnswer];
                                    const isCorrectAnswer = correctAnswerArray.includes(optionIndex);
                                    
                                    let buttonClass = "w-full justify-start text-left h-auto py-1.5 px-3 text-sm lg:text-base ";
                                    
                                    // Only show feedback if quiz has been submitted
                                    if (hasSubmitted && !isCorrect) {
                                      // Show feedback after submission only if incorrect
                                      if (isSelected && isCorrectAnswer) {
                                        buttonClass += "border-green-500 bg-green-500/10 hover:bg-green-500/20";
                                      } else if (isSelected && !isCorrectAnswer) {
                                        buttonClass += "border-red-500 bg-red-500/10 hover:bg-red-500/20";
                                      } else if (!isSelected && isCorrectAnswer) {
                                        // Show correct answers they missed
                                        buttonClass += "border-green-500/50 bg-green-500/5";
                                      }
                                    } else if (hasSubmitted && isCorrect) {
                                      // If correct and submitted, show green for selected correct answer
                                      if (isSelected && isCorrectAnswer) {
                                        buttonClass += "border-green-500 bg-green-500/10 hover:bg-green-500/20";
                                      }
                                    } else {
                                      // Before submission, just show selection state
                                      buttonClass += isSelected ? "bg-primary/20 border-primary" : "";
                                    }
                                    
                                    return (
                                      <Button
                                        key={optionIndex}
                                        variant="outline"
                                        className={buttonClass}
                                        onClick={() => handleAnswerSelect(section.id, checkIndex, optionIndex, isMultiSelect)}
                                        disabled={hasSubmitted && isCorrect}
                                      >
                                        <div className="flex items-start gap-3 w-full">
                                          {isMultiSelect ? (
                                            // Checkbox for multi-select
                                            isSelected ? (
                                              <Check className="h-4 w-4 flex-shrink-0 mt-0.5 border border-primary rounded" />
                                            ) : (
                                              <Square className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-50" />
                                            )
                                          ) : (
                                            // Radio button for single select
                                            isSelected ? (
                                              <div className="h-4 w-4 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <div className="h-2 w-2 rounded-full bg-white" />
                                              </div>
                                            ) : (
                                              <Circle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                            )
                                          )}
                                          <span className="flex-1 whitespace-normal break-words">{option}</span>
                                        </div>
                                      </Button>
                                    );
                                  })}
                                </div>
                                
                                {/* Submit Quiz button for multi-select questions */}
                                {isMultiSelect && userAnswer !== undefined && !hasSubmitted && (
                                  <Button 
                                    onClick={() => handleSubmitQuiz(section.id, checkIndex)}
                                    className="w-full"
                                  >
                                    Review Answer(s)
                                  </Button>
                                )}
                                
                                {/* Show results only after submission */}
                                {hasSubmitted && isCorrect !== null && (
                                  <div className={`p-2 lg:p-3 rounded-lg ${isCorrect ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-500/10 text-red-700 dark:text-red-400'}`}>
                                    <p className="text-xs lg:text-sm">
                                      {isCorrect ? '✓ Correct! Great job!' : (
                                        <>
                                          <span className="block mb-1">✗ Incorrect. Please try again.</span>
                                          <span className="text-xs opacity-90">{check.explanation}</span>
                                        </>
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    )}

                    {/* Incomplete Activities Alert */}
                    {showIncompleteAlert && !allActivitiesCompleted && (
                      <Card className="border-red-500 bg-red-50 dark:bg-red-950/20 mt-4">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <h3 className="mb-2 text-base lg:text-lg font-semibold text-red-700 dark:text-red-400">
                              ⚠️ Complete All Activities First
                            </h3>
                            <p className="text-sm text-red-600 dark:text-red-300 mb-3">
                              Please complete all learning activities before submitting the quiz. The incomplete activities are highlighted above with a pulsing red border.
                            </p>
                            <Button 
                              onClick={() => {
                                setShowIncompleteAlert(false);
                                setPulsatingCards([]);
                              }}
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20"
                            >
                              Got it!
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Submit Quiz Button */}
                    {!quizSubmitted && allActivitiesCompleted && (
                      <Card className="border-primary/30 bg-primary/5 mt-4">
                        <CardContent className="p-3">
                          <div className="text-center">
                            <h3 className="mb-1.5 text-base lg:text-lg font-semibold">Ready to Submit?</h3>
                            <p className="text-xs lg:text-sm text-muted-foreground mb-3">
                              Submit your quiz to see your score and review answers
                            </p>
                            <Button 
                              onClick={handleSubmitEntireQuiz}
                              size="lg"
                              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                            >
                              <ClipboardCheck className="w-4 h-4 mr-2" />
                              Complete Quiz for Grade
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Feedback Card - Compact Display - Only show when quiz is unlocked */}
                    {!quizSubmitted && allActivitiesCompleted && (
                      <Card className="mt-4 border-primary/20 bg-card">
                        <CardContent className="p-3 lg:p-4">
                          <h4 className="text-sm font-semibold mb-3">Your Feedback Matters</h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            Tell us what we can do better or mention your favorite part of the micro-learning experience.
                          </p>
                          <div className="space-y-3">
                            {/* Question 1 */}
                            <div className="space-y-1.5">
                              <p className="text-xs font-medium">1. Enough hands-on content?</p>
                              <div className="flex gap-1.5">
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">Yes</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">Somewhat</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">No</Button>
                              </div>
                            </div>

                            {/* Question 2 */}
                            <div className="space-y-1.5">
                              <p className="text-xs font-medium">2. Confident applying what you learned?</p>
                              <div className="flex gap-1.5">
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">Yes</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">Somewhat</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">No</Button>
                              </div>
                            </div>

                            {/* Question 3 */}
                            <div className="space-y-1.5">
                              <p className="text-xs font-medium">3. Format easy to navigate?</p>
                              <div className="flex gap-1.5">
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">Very easy</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">Somewhat</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">Difficult</Button>
                              </div>
                            </div>

                            {/* Question 4 */}
                            <div className="space-y-1.5">
                              <p className="text-xs font-medium">4. Several high quality, real world references were supplied to support my continued learning at my own pace.</p>
                              <div className="flex gap-1.5">
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">Yes</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800">No</Button>
                              </div>
                            </div>

                            {/* Question 5 - NPS */}
                            <div className="space-y-1.5">
                              <p className="text-xs font-medium">5. Recommend to a colleague?</p>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <Button 
                                    key={num}
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 w-7 p-0 text-xs border border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800"
                                  >
                                    {num}
                                  </Button>
                                ))}
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Not likely</span>
                                <span>Very likely</span>
                              </div>
                            </div>

                            <Button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white" size="sm">Submit Feedback</Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Quiz Results */}
                    {quizSubmitted && quizScore && (
                      <Card className="border-green-500/30 bg-green-500/5 mt-4">
                        <CardContent className="p-3 lg:p-4">
                          <div className="text-center">
                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                            <h3 className="mb-2 text-xl lg:text-2xl font-bold">Quiz Submitted!</h3>
                            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                              {quizScore.correct} / {quizScore.total} Points
                            </div>
                            <p className="text-sm lg:text-base text-muted-foreground mb-4">
                              {quizScore.correct}% Score
                            </p>
                            {quizScore.correct === 100 ? (
                              <p className="text-sm lg:text-base text-green-600 font-semibold">
                                🎉 Perfect Score! Excellent work!
                              </p>
                            ) : quizScore.correct >= 70 ? (
                              <p className="text-sm lg:text-base text-blue-600 font-semibold">
                                Great job! You've demonstrated strong understanding.
                              </p>
                            ) : (
                              <p className="text-sm lg:text-base text-orange-600 font-semibold">
                                Good effort! Review the resources and try again.
                              </p>
                            )}
                            {pointsEarned > 0 && quizScore.correct >= 70 && (
                              <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
                                <p className="text-sm font-medium text-primary">
                                  🎯 Lesson Complete! +{pointsEarned} points earned
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider Line */}
              {sectionIndex < displaySections.length - 1 && (
                <div className="border-t border-border my-12" />
              )}
            </div>
          ))}
        </div>

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
                <Button>
                  Next Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        )}


      </div>

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
  // Use TouchBackend for mobile, HTML5Backend for desktop
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  const backend = isTouchDevice ? TouchBackend : HTML5Backend;
  
  return (
    <DndProvider backend={backend}>
      <LessonViewerContent {...props} />
    </DndProvider>
  );
}