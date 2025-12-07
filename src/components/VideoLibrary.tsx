import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Upload, 
  Search, 
  Video, 
  Download, 
  Trash2, 
  Edit, 
  Eye, 
  Grid3x3, 
  List,
  X,
  FolderOpen,
  Calendar,
  CheckCircle,
  QrCode,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
  Film
} from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface VideoFile {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  fileName: string;
  fileUrl: string;
  fileSize: number;
  duration: number; // in seconds
  thumbnailUrl?: string;
  uploadDate: string;
  userId: string;
  isPublic: boolean;
  originalFileName: string;
  updatedDate?: string;
  customerEmail?: string; // Email of the customer who paid for this video
  purchaseImage?: string; // Receipt/proof of purchase image
  orderScript?: string; // Order form script/details
}

interface VideoLibraryProps {
  onBack?: () => void;
}

export function VideoLibrary({ onBack }: VideoLibraryProps) {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoFile | null>(null);
  const [playingVideo, setPlayingVideo] = useState<VideoFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedVideoForQR, setSelectedVideoForQR] = useState<VideoFile | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>(() => {
    return localStorage.getItem('videoLibraryEmail') || '';
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'Training Videos',
    tags: '',
    isPublic: true,
    customerEmail: '',
    file: null as File | null
  });

  const categories = [
    'Training Videos',
    'Tutorials',
    'Demos',
    'Presentations',
    'Webinars',
    'Courses',
    'General'
  ];

  useEffect(() => {
    // Check if user email is stored
    if (!currentUserEmail && !showEmailModal) {
      setShowEmailModal(true);
    } else if (currentUserEmail) {
      fetchVideos();
    }
  }, [currentUserEmail]);

  useEffect(() => {
    filterVideos();
  }, [searchQuery, selectedCategory, videos]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const emailParam = currentUserEmail ? `?email=${encodeURIComponent(currentUserEmail)}` : '';
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3504d096/video/list${emailParam}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      setVideos(data.videos || []);
      setIsAdmin(data.isAdmin || false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      alert('Failed to load video library. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterVideos = () => {
    let filtered = [...videos];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredVideos(filtered);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      alert('Please select a video file');
      return;
    }

    if (!uploadForm.title) {
      alert('Please enter a title');
      return;
    }

    try {
      setUploadProgress('Uploading video...');
      
      const formData = new FormData();
      formData.append('file', uploadForm.file);
      formData.append('title', uploadForm.title);
      formData.append('description', uploadForm.description);
      formData.append('category', uploadForm.category);
      formData.append('tags', uploadForm.tags);
      formData.append('isPublic', String(uploadForm.isPublic));
      formData.append('userId', 'user-1'); // TODO: Replace with actual user ID
      formData.append('customerEmail', uploadForm.customerEmail);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3504d096/video/upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();
      
      setUploadProgress('Upload successful!');
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadProgress('');
        setUploadForm({
          title: '',
          description: '',
          category: 'Training Videos',
          tags: '',
          isPublic: true,
          customerEmail: '',
          file: null
        });
        fetchVideos();
      }, 1500);
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadProgress('');
      alert(`Upload failed: ${error.message}`);
    }
  };

  const handleDelete = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3504d096/video/${videoId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      fetchVideos();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete video. Please try again.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingVideo) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3504d096/video/${editingVideo.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: editingVideo.title,
            description: editingVideo.description,
            category: editingVideo.category,
            tags: editingVideo.tags,
            isPublic: editingVideo.isPublic
          })
        }
      );

      if (!response.ok) {
        throw new Error('Update failed');
      }

      setShowEditModal(false);
      setEditingVideo(null);
      fetchVideos();
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update video. Please try again.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const downloadQRCode = (video: VideoFile) => {
    const svg = document.getElementById('video-qr-code') as unknown as SVGElement;
    if (!svg) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 512;
    canvas.height = 512;
    
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);
      
      canvas.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${video.title}-QR.png`;
        a.click();
        URL.revokeObjectURL(a.href);
      });
    };
    
    img.src = url;
  };

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy link. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <>
      {/* Upload Button */}
      <div className="flex items-center justify-end mb-6">
        <Button onClick={() => setShowUploadModal(true)} size="lg">
          <Upload className="w-4 h-4 mr-2" />
          Upload Video
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-[1fr_auto_auto] gap-4 items-end">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
            <span>{filteredVideos.length} of {videos.length} videos</span>
            <span>•</span>
            <span>{selectedCategory !== 'all' ? selectedCategory : 'All categories'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid/List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading library...</p>
        </div>
      ) : filteredVideos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No videos found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your filters'
                : 'Upload your first video to get started'}
            </p>
            {!searchQuery && selectedCategory === 'all' && (
              <Button onClick={() => setShowUploadModal(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <Card key={video.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {/* Video Thumbnail */}
                <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-3 group cursor-pointer"
                  onClick={() => {
                    setPlayingVideo(video);
                    setShowPlayerModal(true);
                  }}
                >
                  {video.thumbnailUrl ? (
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {formatDuration(video.duration)}
                  </div>
                </div>
                
                <div className="flex items-start justify-between mb-2">
                  <Video className="w-8 h-8 text-primary" />
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setPlayingVideo(video);
                        setShowPlayerModal(true);
                      }}
                      title="Play Video"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingVideo(video);
                        setShowEditModal(true);
                      }}
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(video.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedVideoForQR(video);
                        setShowQRModal(true);
                      }}
                      title="Generate QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {video.description || 'No description'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FolderOpen className="w-4 h-4" />
                    <span>{video.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(video.uploadDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(video.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Video className="w-4 h-4" />
                    <span>{formatFileSize(video.fileSize)}</span>
                  </div>
                  {video.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {video.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-purple-500/10 text-purple-500 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = video.fileUrl;
                    a.download = video.originalFileName;
                    a.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVideos.map(video => (
            <Card key={video.id}>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-32 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden cursor-pointer group relative"
                    onClick={() => {
                      setPlayingVideo(video);
                      setShowPlayerModal(true);
                    }}
                  >
                    {video.thumbnailUrl ? (
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Film className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                      {formatDuration(video.duration)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 truncate">{video.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {video.description || 'No description'}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{video.category}</span>
                      <span>•</span>
                      <span>{formatDate(video.uploadDate)}</span>
                      <span>•</span>
                      <span>{formatDuration(video.duration)}</span>
                      <span>•</span>
                      <span>{formatFileSize(video.fileSize)}</span>
                      {video.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{video.tags.join(', ')}</span>
                        </>
                      )}
                    </div>
                    {/* Purchase Information for Admin */}
                    {isAdmin && (video.customerEmail || video.purchaseImage || video.orderScript) && (
                      <div className="mt-3 p-2 bg-primary/5 rounded border border-primary/20">
                        <p className="text-xs font-semibold text-primary mb-1">Purchase Details:</p>
                        {video.customerEmail && (
                          <p className="text-xs text-muted-foreground">Customer: {video.customerEmail}</p>
                        )}
                        {video.purchaseImage && (
                          <p className="text-xs text-muted-foreground">Receipt: Available</p>
                        )}
                        {video.orderScript && (
                          <p className="text-xs text-muted-foreground truncate">Order: {video.orderScript}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setPlayingVideo(video);
                        setShowPlayerModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = video.fileUrl;
                        a.download = video.originalFileName;
                        a.click();
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setEditingVideo(video);
                        setShowEditModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(video.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSelectedVideoForQR(video);
                        setShowQRModal(true);
                      }}
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upload Video</CardTitle>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadProgress('');
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>
              Add a new video to your library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Video File *</Label>
                <Input
                  id="file"
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadForm(prev => ({ ...prev, file }));
                    }
                  }}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: MP4, MOV, AVI, MKV, WebM
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., AI Training Module 1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the video content"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="upload-category">Category</Label>
                  <select
                    id="upload-category"
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="e.g., training, AI, tutorial"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email (Optional)</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={uploadForm.customerEmail}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                  placeholder="e.g., customer@example.com"
                />
                <p className="text-xs text-muted-foreground">
                  Only this customer and admin (Cara@oratf.info) will be able to view this video
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={uploadForm.isPublic}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="w-4 h-4"
                />
                <Label htmlFor="isPublic">Make this video publicly accessible</Label>
              </div>

              {uploadProgress && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${
                  uploadProgress.includes('successful') 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {uploadProgress.includes('successful') ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  )}
                  <span>{uploadProgress}</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadProgress('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!!uploadProgress}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )}

    {/* Edit Modal */}
    {showEditModal && editingVideo && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Edit Video</CardTitle>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingVideo(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>
              Update video information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo(prev => prev ? { ...prev, title: e.target.value } : null)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingVideo.description}
                  onChange={(e) => setEditingVideo(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <select
                    id="edit-category"
                    value={editingVideo.category}
                    onChange={(e) => setEditingVideo(prev => prev ? { ...prev, category: e.target.value } : null)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                  <Input
                    id="edit-tags"
                    value={editingVideo.tags.join(', ')}
                    onChange={(e) => setEditingVideo(prev => prev ? { 
                      ...prev, 
                      tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) 
                    } : null)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-isPublic"
                  checked={editingVideo.isPublic}
                  onChange={(e) => setEditingVideo(prev => prev ? { ...prev, isPublic: e.target.checked } : null)}
                  className="w-4 h-4"
                />
                <Label htmlFor="edit-isPublic">Make this video publicly accessible</Label>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingVideo(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )}

    {/* Video Player Modal */}
    {showPlayerModal && playingVideo && (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-5xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">{playingVideo.title}</h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setShowPlayerModal(false);
                setPlayingVideo(null);
                setIsPlaying(false);
                if (videoRef.current) {
                  videoRef.current.pause();
                }
              }}
              className="text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={playingVideo.fileUrl}
              className="w-full aspect-video"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Custom Controls */}
            <div className="bg-gray-900 p-4">
              <div className="mb-2">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={togglePlayPause}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  
                  <span className="text-sm">
                    {formatDuration(currentTime)} / {formatDuration(duration)}
                  </span>
                </div>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {playingVideo.description && (
            <p className="text-white mt-4 text-sm">{playingVideo.description}</p>
          )}
        </div>
      </div>
    )}

    {/* QR Code Modal */}
    {showQRModal && selectedVideoForQR && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Video QR Code</CardTitle>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setShowQRModal(false);
                  setSelectedVideoForQR(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>
              Scan to access {selectedVideoForQR.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG
                  id="video-qr-code"
                  value={selectedVideoForQR.fileUrl}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Direct Link</Label>
              <div className="flex gap-2">
                <Input
                  value={selectedVideoForQR.fileUrl}
                  readOnly
                  className="text-sm"
                />
                <Button
                  onClick={() => copyToClipboard(selectedVideoForQR.fileUrl)}
                  variant="outline"
                >
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => downloadQRCode(selectedVideoForQR)}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR
              </Button>
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1"
              >
                Print
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )}

    {/* Email Authentication Modal */}
    {showEmailModal && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Video Library Access</CardTitle>
            <CardDescription>
              Enter your email to access your videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const email = formData.get('email') as string;
              if (email) {
                localStorage.setItem('videoLibraryEmail', email);
                setCurrentUserEmail(email);
                setShowEmailModal(false);
              }
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="access-email">Email Address *</Label>
                <Input
                  id="access-email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  {isAdmin ? 'Admin access - You can see all videos' : 'You will see videos associated with your email'}
                </p>
              </div>

              <Button type="submit" className="w-full">
                Access Library
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )}
    </>
  );
}