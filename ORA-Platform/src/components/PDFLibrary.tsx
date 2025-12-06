import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Upload, 
  Search, 
  FileText, 
  Download, 
  Trash2, 
  Edit, 
  Eye, 
  Filter, 
  Grid3x3, 
  List,
  X,
  Tag,
  FolderOpen,
  Calendar,
  CheckCircle,
  AlertCircle,
  QrCode
} from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PDF {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadDate: string;
  userId: string;
  isPublic: boolean;
  originalFileName: string;
  updatedDate?: string;
}

interface PDFLibraryProps {
  onBack?: () => void;
}

export function PDFLibrary({ onBack }: PDFLibraryProps) {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [filteredPdfs, setFilteredPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPdf, setEditingPdf] = useState<PDF | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedPdfForQR, setSelectedPdfForQR] = useState<PDF | null>(null);
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'Training Materials',
    tags: '',
    isPublic: true,
    file: null as File | null
  });

  const categories = [
    'Training Materials',
    'Handbooks',
    'References',
    'Guides',
    'Templates',
    'Reports',
    'General'
  ];

  useEffect(() => {
    fetchPDFs();
  }, []);

  useEffect(() => {
    filterPDFs();
  }, [searchQuery, selectedCategory, pdfs]);

  const fetchPDFs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3504d096/pdf/list`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch PDFs');
      }

      const data = await response.json();
      setPdfs(data.pdfs || []);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      alert('Failed to load PDF library. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterPDFs = () => {
    let filtered = [...pdfs];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(pdf => pdf.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pdf =>
        pdf.title.toLowerCase().includes(query) ||
        pdf.description.toLowerCase().includes(query) ||
        pdf.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPdfs(filtered);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      alert('Please select a PDF file');
      return;
    }

    if (!uploadForm.title) {
      alert('Please enter a title');
      return;
    }

    try {
      setUploadProgress('Uploading...');
      
      const formData = new FormData();
      formData.append('file', uploadForm.file);
      formData.append('title', uploadForm.title);
      formData.append('description', uploadForm.description);
      formData.append('category', uploadForm.category);
      formData.append('tags', uploadForm.tags);
      formData.append('isPublic', String(uploadForm.isPublic));
      formData.append('userId', 'user-1'); // TODO: Replace with actual user ID

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3504d096/pdf/upload`,
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
          category: 'Training Materials',
          tags: '',
          isPublic: true,
          file: null
        });
        fetchPDFs();
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress('');
      alert(`Upload failed: ${error.message}`);
    }
  };

  const handleDelete = async (pdfId: string) => {
    if (!confirm('Are you sure you want to delete this PDF?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3504d096/pdf/${pdfId}`,
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

      fetchPDFs();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete PDF. Please try again.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingPdf) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3504d096/pdf/${editingPdf.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: editingPdf.title,
            description: editingPdf.description,
            category: editingPdf.category,
            tags: editingPdf.tags,
            isPublic: editingPdf.isPublic
          })
        }
      );

      if (!response.ok) {
        throw new Error('Update failed');
      }

      setShowEditModal(false);
      setEditingPdf(null);
      fetchPDFs();
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update PDF. Please try again.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const downloadQRCode = (pdf: PDF) => {
    // Create a canvas element
    const svg = document.getElementById('pdf-qr-code') as unknown as SVGElement;
    if (!svg) return;
    
    // Create a new canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = 512;
    canvas.height = 512;
    
    // Convert SVG to canvas
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);
      
      // Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${pdf.title}-QR.png`;
        a.click();
        URL.revokeObjectURL(a.href);
      });
    };
    
    img.src = url;
  };

  const copyToClipboard = (text: string) => {
    // Fallback method for copying text to clipboard
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
          Upload PDF
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
            <span>{filteredPdfs.length} of {pdfs.length} documents</span>
            <span>•</span>
            <span>{selectedCategory !== 'all' ? selectedCategory : 'All categories'}</span>
          </div>
        </CardContent>
      </Card>

      {/* PDF Grid/List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading library...</p>
        </div>
      ) : filteredPdfs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No PDFs found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your filters'
                : 'Upload your first PDF to get started'}
            </p>
            {!searchQuery && selectedCategory === 'all' && (
              <Button onClick={() => setShowUploadModal(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload PDF
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPdfs.map(pdf => (
            <Card key={pdf.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <FileText className="w-8 h-8 text-primary" />
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => window.open(pdf.fileUrl, '_blank')}
                      title="View PDF"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingPdf(pdf);
                        setShowEditModal(true);
                      }}
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(pdf.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedPdfForQR(pdf);
                        setShowQRModal(true);
                      }}
                      title="Generate QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{pdf.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {pdf.description || 'No description'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FolderOpen className="w-4 h-4" />
                    <span>{pdf.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(pdf.uploadDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{formatFileSize(pdf.fileSize)}</span>
                  </div>
                  {pdf.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pdf.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
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
                    a.href = pdf.fileUrl;
                    a.download = pdf.originalFileName;
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
          {filteredPdfs.map(pdf => (
            <Card key={pdf.id}>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <FileText className="w-10 h-10 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 truncate">{pdf.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {pdf.description || 'No description'}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{pdf.category}</span>
                      <span>•</span>
                      <span>{formatDate(pdf.uploadDate)}</span>
                      <span>•</span>
                      <span>{formatFileSize(pdf.fileSize)}</span>
                      {pdf.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{pdf.tags.join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => window.open(pdf.fileUrl, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = pdf.fileUrl;
                        a.download = pdf.originalFileName;
                        a.click();
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setEditingPdf(pdf);
                        setShowEditModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(pdf.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSelectedPdfForQR(pdf);
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
                <CardTitle>Upload PDF</CardTitle>
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
                Add a new PDF to your library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">PDF File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadForm(prev => ({ ...prev, file }));
                      }
                    }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., AI Training Handbook"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the PDF content"
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
                      placeholder="e.g., training, AI, handbook"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={uploadForm.isPublic}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isPublic">Make this PDF publicly accessible</Label>
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
      {showEditModal && editingPdf && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Edit PDF</CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingPdf(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>
                Update PDF metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title *</Label>
                  <Input
                    id="edit-title"
                    value={editingPdf.title}
                    onChange={(e) => setEditingPdf(prev => prev ? { ...prev, title: e.target.value } : null)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingPdf.description}
                    onChange={(e) => setEditingPdf(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <select
                      id="edit-category"
                      value={editingPdf.category}
                      onChange={(e) => setEditingPdf(prev => prev ? { ...prev, category: e.target.value } : null)}
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
                      value={editingPdf.tags.join(', ')}
                      onChange={(e) => setEditingPdf(prev => prev ? {
                        ...prev,
                        tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                      } : null)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-isPublic"
                    checked={editingPdf.isPublic}
                    onChange={(e) => setEditingPdf(prev => prev ? { ...prev, isPublic: e.target.checked } : null)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="edit-isPublic">Make this PDF publicly accessible</Label>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingPdf(null);
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

      {/* QR Code Modal */}
      {showQRModal && selectedPdfForQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <QrCode className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>QR Code</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedPdfForQR.title}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setShowQRModal(false);
                    setSelectedPdfForQR(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center p-8 bg-white dark:bg-gray-100 rounded-lg">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <QRCodeSVG
                    id="pdf-qr-code"
                    value={selectedPdfForQR.fileUrl}
                    size={256}
                    level="H"
                    includeMargin={true}
                    className="mx-auto"
                  />
                </div>
              </div>

              {/* Document Info */}
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Document</p>
                    <p className="text-sm text-muted-foreground">{selectedPdfForQR.title}</p>
                  </div>
                </div>
                
                {selectedPdfForQR.description && (
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{selectedPdfForQR.description}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <FolderOpen className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-muted-foreground">{selectedPdfForQR.category}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Size</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(selectedPdfForQR.fileSize)}</p>
                  </div>
                </div>
              </div>

              {/* QR Code Link Info */}
              <div className="space-y-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      QR Code Links To:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-green-500/20 px-2 py-1 rounded text-green-800 dark:text-green-200 break-all flex-1">
                        {selectedPdfForQR.fileUrl}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          copyToClipboard(selectedPdfForQR.fileUrl);
                        }}
                        className="flex-shrink-0"
                        title="Copy link"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </Button>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                      ✓ Hosted on Supabase Storage • Signed URL with 1-year validity
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  How to use this QR Code
                </h4>
                <ul className="text-sm space-y-1 ml-6 list-disc">
                  <li>Scan with any smartphone camera or QR code reader</li>
                  <li>The PDF will open in your mobile browser</li>
                  <li>Download the QR code image to print or share</li>
                  <li>Perfect for presentations, handouts, or training materials</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => {
                    setShowQRModal(false);
                    setSelectedPdfForQR(null);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => downloadQRCode(selectedPdfForQR)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}