import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, BookOpen, Video, FileText, CheckCircle, Lock, Brain } from "lucide-react";
import { useState } from "react";
import { LessonViewer } from './LessonViewer';

interface Module1Props {
  onBack: () => void;
  onVideoWatched?: () => void;
}

const lessons = [
	{
		id: 1,
		title: "Applied AI Governance & Organizational Blind Spots",
		description:
			"Learn fundamental Applied AI concepts to identify and address organizational blind spots when implementing AI governance frameworks.",
		duration: "15 min 55 seconds",
		type: "tutorial",
		completed: false,
		locked: false,
	},
	{
		id: 2,
		title: "AI Literacy",
		description:
			"Build essential knowledge and vocabulary for AI implementation and decision-making.",
		duration: "10 min",
		type: "reading",
		completed: false,
		locked: true,
	},
	{
		id: 3,
		title: "Open AI Costs",
		description:
			"Understand the financial implications and cost structures of AI implementation.",
		duration: "12 min",
		type: "reading",
		completed: false,
		locked: true,
	},
	{
		id: 4,
		title: "Frameworks",
		description:
			"Explore core frameworks for AI governance and machine learning basics.",
		duration: "20 min",
		type: "tutorial",
		completed: false,
		locked: true,
	},
];

export function Module1({ onBack, onVideoWatched }: Module1Props) {
	const [selectedLesson, setSelectedLesson] = useState(null);

	const getIcon = (type: string) => {
		switch (type) {
			case "video":
				return Video;
			case "tutorial":
				return BookOpen;
			case "reading":
				return FileText;
			case "tool":
				return Brain;
			default:
				return BookOpen;
		}
	};

	// If a lesson is selected, show the LessonViewer
	if (selectedLesson !== null) {
		const lesson = lessons.find((l) => l.id === selectedLesson);
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
						className="mb-4 hover:bg-muted h-10 py-2 text-sm"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to All Lessons
					</Button>
					<p className="text-sm text-muted-foreground mb-2">15 min or less</p>
					<h1 className="text-3xl font-bold mb-2">Applied AI Governance & Organizational Blind Spots</h1>
					<p className="text-lg text-muted-foreground mb-4">Micro-learning module</p>
					<h2 className="text-xl font-semibold mb-3">Learning Objectives</h2>
					<ul className="space-y-2 text-sm text-muted-foreground mb-8">
						<li>• Define AI literacy as it is applied to critical workforce discussions.</li>
						<li>• Identify 2 ways AI capabilities can effect research, learning or career success.</li>
						<li>• Expand AI vocabulary for identifying costs and risks when applying AI.</li>
						<li>• Practice using modern AI capabilites.</li>
					</ul>
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
										lesson.locked
											? "bg-muted/30 opacity-75"
											: "bg-card hover:shadow-lg"
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
													{lesson.id === 1 ||
													lesson.id === 2 ||
													lesson.id === 3 ||
													lesson.id === 4 ||
													lesson.id === 5 ? (
														<div className="flex flex-col gap-0.5">
															<div className="flex items-center gap-2">
																<span className="text-xs text-muted-foreground">
																	Lesson time
																</span>
																<span className="text-xs text-muted-foreground">
																	•
																</span>
																<span className="text-xs text-muted-foreground">
																	{lesson.duration}
																</span>
															</div>
														</div>
													) : (
														<div className="text-xs text-muted-foreground">
															Lesson time • 15 min Knowledge Check • Untimed: self paced
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
												<h4 className="mb-2 text-sm text-foreground">
													Learning Objectives
												</h4>
												<p className="text-xs text-muted-foreground mb-2">
													By the end of this lesson, learners will be able to:
												</p>
												<ul className="space-y-2 text-xs text-muted-foreground">
													<li className="flex items-start gap-2">
														<span className="text-primary mt-1">•</span>
														<span>
															Define AI literacy as it is applied to critical workforce discussions.
														</span>
													</li>
													<li className="flex items-start gap-2">
														<span className="text-primary mt-1">•</span>
														<span>
															Identify 2 ways AI capabilities can effect
															research, learning or career success.
														</span>
													</li>
													<li className="flex items-start gap-2">
														<span className="text-primary mt-1">•</span>
														<span>
															Expand AI vocabulary for identifying costs and
															risks when applying AI.
														</span>
													</li>
													<li className="flex items-start gap-2">
														<span className="text-primary mt-1">•</span>
														<span>
															Practice using modern AI capabilites.
														</span>
													</li>
												</ul>
											</div>
										)}

										<Button
											className="w-full h-7 py-0.5"
											variant={
												lesson.completed ? "outline" : "default"
											}
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

				{/* What is AI Literacy? Card */}
				<div className="border rounded-lg p-6 bg-muted/10 flex flex-col">
					<h4 className="font-semibold mb-3 text-lg">What is AI Literacy?</h4>
					<div className="space-y-3 text-sm flex-grow">
						<p><strong>Definition:</strong> AI literacy is the ability to understand, use, and evaluate AI tools responsibly while leveraging them to enhance innovation, creativity, and productivity across personal, educational, and professional contexts.</p>
						
						<blockquote className="border-l-4 border-green-500 pl-3 italic text-xs bg-green-50 p-3 rounded-r text-black">
							"Career success increasingly depends on the ability to collaborate with AI systems, not just traditional skills"
							<br /><span className="text-black font-medium">- Forbes</span>
						</blockquote>
						
						<blockquote className="border-l-4 border-green-500 pl-3 italic text-xs bg-green-50 p-3 rounded-r text-black">
							"WEF predicts 170 million new roles will be created by AI over the next decade, making AI literacy essential for workforce readiness"
							<br /><span className="text-black font-medium">- World Economic Forum (WEF) Findings</span>
						</blockquote>
						
						<h5 className="font-semibold">Bias and Risk in AI</h5>
						<p>Bias and risk in AI are not just technical problems. They are human-centered, social, ethical, and political challenges. AI literacy is the new baseline for responsible AI governance. Without it, discussions about bias, risk and return on AI investments collapse. With it, they become actionable, and trustworthy.</p>
						
						<p><strong>AI Bias:</strong> Algorithms may weigh certain features (like word choice, school, or zip code) that highly correlate with race, gender, or socioeconomic status.</p>
						
						<h5 className="font-semibold">The Risk of Vendor Lock-In in AI</h5>
						<p>Vendor lock-in isn't just about cost or contracts — it's about agility. When you tie your organization to a single provider, you risk falling behind as AI evolves at breakneck speed, wasting time and money while the competition accelerates.</p>
						
						<p><strong>Why It's Especially Risky in AI:</strong></p>
						<p>Rapid evolution of capabilities: New language models and AI frameworks are released every few months. A single vendor simply cannot keep up or be the expert in them all.</p>
					</div>
				</div>

				{/* Additional Content Cards */}
				<div className="space-y-6 mt-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* RACI Video */}
						<div className="border rounded-lg bg-muted/10 overflow-hidden">
							<video controls className="w-full h-full object-cover" style={{ aspectRatio: '16/9' }}>
								<source src="/Risk-RACI-Adoption.mp4" type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</div>
						
						{/* NotebookLM */}
						<div className="border rounded-lg p-6 bg-muted/10 flex flex-col">
							<h4 className="font-semibold mb-3 text-lg">NotebookLM</h4>
							<div className="space-y-3 text-sm flex-grow">
								<p>NotebookLM is Google's free AI-powered research and productivity tool. Think of it as a "thinking partner" that helps you organize, analyze, and generate insights from your own sources.</p>
								
								<h5 className="font-semibold">Steps to use it:</h5>
								<ul className="text-xs list-disc list-inside space-y-1">
									<li>Open NotebookLM in a new tab.</li>
									<li>Pick a topic you want to learn or just copy this text.</li>
									<li>Paste your text from your notes, or upload PDFs, YouTube links, or documents.</li>
									<li>Click Generate and wait a few minutes.</li>
								</ul>
								
								<h5 className="font-semibold">What you'll get:</h5>
								<ul className="text-xs list-disc list-inside space-y-1">
									<li>Audio overview (like a podcast)</li>
									<li>Flashcards and quizzes</li>
									<li>Video overview</li>
									<li>Interactive mind maps — tap any node to explore</li>
								</ul>
								
								<p className="text-xs italic">This makes learning or teaching faster, more engaging, and interactive.</p>
								
								<div className="mt-4">
									<button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
										Mark as Complete
									</button>
								</div>
							</div>
						</div>
						
						{/* Micro-Lesson Open AI Costs */}
						<div className="border rounded-lg p-6 bg-muted/10 flex flex-col">
							<h4 className="font-semibold mb-3 text-lg">Micro-Lesson Open AI Costs</h4>
							<div className="space-y-3 text-sm flex-grow">
								<ul className="text-xs list-disc list-inside space-y-2">
									<li><strong>AI breaks down text or speech into structured data</strong></li>
									<li><strong>Vertexes & Numbers:</strong> Think of it like mapping words into points in a giant network, each linked by numerical weights.</li>
									<li><strong>Tokens:</strong> Words, phrases, or chunks of text are converted into tokens (the basic units AI processes).</li>
									<li><strong>Cost:</strong> Every token processed has a cost. More tokens = higher expense.</li>
									<li><strong>Free Trial Credits:</strong> OpenAI's API offers free credits (e.g., $5 worth) for a trial period. These let you experiment without paying.</li>
									<li><strong>Copilot Chat (Microsoft context):</strong> If you're using Copilot inside Microsoft 365 (like Word, Excel, SharePoint), you don't see tokens directly — licensing covers usage.</li>
									<li><strong>Limits:</strong> Once you use up the free credits, you must pay per token. There is a "Pay-As-You-Go" structure. There's no unlimited free usage.</li>
								</ul>
								
								<div className="mt-4 border-l-4 border-green-500 pl-3 bg-green-50 p-3 rounded-r text-black">
									<p className="text-sm font-medium mb-2">Cost Considerations:</p>
									<p className="text-xs mb-2">Identify the faster, cheaper version of GPT-5 designed for well-defined tasks with lowest token cost.</p>
									<a href="https://openai.com/api/pricing/" className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">Reference: https://openai.com/api/pricing/</a>
									<p className="text-xs mt-2 italic">Enter the model name (hint: it's optimized for speed and efficiency)</p>
								</div>
							</div>
						</div>
						
						{/* Proven Frameworks */}
						<div className="border rounded-lg p-6 bg-muted/10 flex flex-col">
							<h4 className="font-semibold mb-3 text-lg">Proven Frameworks</h4>
							<div className="space-y-3 text-sm flex-grow">
								<p>Frameworks are proven guardrails for success when working within complex systems. They are strategic enablers to ensure that AI innovation is responsible, scalable, and human-centered.</p>
								
								<div className="space-y-2">
									<p><strong>NIST AI RMF:</strong> <span className="text-xs">National American Standard for Risk Management. Framework for AI trustworthiness, transparency, fairness, accountability</span></p>
									<p><strong>Agile:</strong> <span className="text-xs">Rapid feedback, iterative development, flexibility</span></p>
									<p><strong>Scrum:</strong> <span className="text-xs">Clear roles, accountability, daily rhythm, sprint events, iterative, evidence based</span></p>
								</div>
								
								<div className="border-l-4 border-green-500 pl-3 bg-green-50 p-3 rounded-r text-black">
									<p className="text-xs font-semibold mb-2">Effective AI risk management requires:</p>
									<ul className="text-xs list-disc list-inside space-y-1 pl-4">
										<li><strong>Continuous monitoring and assessment</strong></li>
										<li><strong>Transparent decision-making processes</strong></li>
										<li><strong>Regular audits and compliance checks</strong></li>
										<li><strong>Stakeholder engagement and communication</strong></li>
										<li><strong>Adaptation to evolving regulatory landscapes</strong></li>
									</ul>
								</div>
								
								<h5 className="font-semibold">Why Frameworks Matter</h5>
								<ul className="text-xs list-disc list-inside space-y-1">
									<li>Consistency and trust</li>
									<li>Governance alignment</li>
									<li>Scalable innovation</li>
									<li>Human-in-the-loop</li>
								</ul>
								
								<h5 className="font-semibold">Risks and Trade-offs</h5>
								<ul className="text-xs list-disc list-inside space-y-1">
									<li><strong>Over-automation:</strong> Relying too heavily on AI agents without governance can erode trust.</li>
									<li><strong>Cultural resistance:</strong> Teams may struggle to adapt if frameworks are perceived as restrictive.</li>
									<li><strong>Complexity:</strong> Combining AI with governance frameworks requires careful integration to avoid slowing down innovation.</li>
								</ul>
								
								<h5 className="font-semibold">Frameworks for Applied AI</h5>
								<div className="space-y-1 text-xs">
									<p><strong>NIST AI RMF:</strong> Manage AI risks, align innovation with governance</p>
									<p><strong>Agile Framework:</strong> Accelerate AI experimentation and learning</p>
									<p><strong>Scrum Framework:</strong> Automate prioritization, enhance analytics</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
