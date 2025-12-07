import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { FileText, Video, ArrowLeft, Upload } from "lucide-react";
import { PDFLibrary } from "./PDFLibrary";
import { VideoLibrary } from "./VideoLibrary";

interface LibraryProps {
  onBack?: () => void;
}

export function Library({ onBack }: LibraryProps) {
  const [activeTab, setActiveTab] = useState<'pdfs' | 'videos'>('pdfs');

  return (
    <div className="min-h-screen bg-background pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        )}

        {/* Header with Tabs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
              <p className="text-muted-foreground">
                Manage and access your training materials, documents, and video content
              </p>
            </div>
          </div>
          
          {/* Tabs */}
          <Card>
            <CardContent className="p-1">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'pdfs' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('pdfs')}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  PDF Documents
                </Button>
                <Button
                  variant={activeTab === 'videos' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('videos')}
                  className="flex-1"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Video Library
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        {activeTab === 'pdfs' ? (
          <PDFLibrary />
        ) : (
          <VideoLibrary />
        )}
      </div>
    </div>
  );
}