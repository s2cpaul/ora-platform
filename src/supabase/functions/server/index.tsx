import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as mlTracking from "./ml_tracking.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Create PDF storage bucket on startup
(async () => {
  const bucketName = 'make-3504d096-pdfs';
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
  if (!bucketExists) {
    await supabase.storage.createBucket(bucketName, { public: false });
    console.log(`Created bucket: ${bucketName}`);
  }
  
  // Create video storage bucket
  const videoBucketName = 'make-3504d096-videos';
  const videosBucketExists = buckets?.some(bucket => bucket.name === videoBucketName);
  if (!videosBucketExists) {
    await supabase.storage.createBucket(videoBucketName, { public: false });
    console.log(`Created bucket: ${videoBucketName}`);
  }
})();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-3504d096/health", (c) => {
  return c.json({ status: "ok" });
});

// PDF Library Routes

// Upload PDF
app.post("/make-server-3504d096/pdf/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string || '';
    const category = formData.get('category') as string || 'General';
    const tags = formData.get('tags') as string || '';
    const isPublic = formData.get('isPublic') === 'true';
    const userId = formData.get('userId') as string || 'anonymous';

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    if (!title) {
      return c.json({ error: 'Title is required' }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
    
    // Upload to Supabase Storage
    const bucketName = 'make-3504d096-pdfs';
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ error: `Failed to upload file: ${uploadError.message}` }, 500);
    }

    // Create signed URL (valid for 1 year)
    const { data: urlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000);

    if (!urlData) {
      return c.json({ error: 'Failed to generate file URL' }, 500);
    }

    // Store metadata in KV store
    const pdfId = crypto.randomUUID();
    const metadata = {
      id: pdfId,
      title,
      description,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      fileName,
      fileUrl: urlData.signedUrl,
      fileSize: file.size,
      uploadDate: new Date().toISOString(),
      userId,
      isPublic,
      originalFileName: file.name
    };

    await kv.set(`pdf:${pdfId}`, metadata);

    return c.json({ 
      success: true, 
      pdf: metadata 
    });
  } catch (error) {
    console.error('PDF upload error:', error);
    return c.json({ error: `Server error during upload: ${error.message}` }, 500);
  }
});

// Get all PDFs
app.get("/make-server-3504d096/pdf/list", async (c) => {
  try {
    const pdfs = await kv.getByPrefix('pdf:');
    
    // Sort by upload date (newest first)
    const sortedPdfs = pdfs.sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );

    return c.json({ pdfs: sortedPdfs });
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    return c.json({ error: `Failed to fetch PDFs: ${error.message}` }, 500);
  }
});

// Get single PDF by ID
app.get("/make-server-3504d096/pdf/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const pdf = await kv.get(`pdf:${id}`);

    if (!pdf) {
      return c.json({ error: 'PDF not found' }, 404);
    }

    // Refresh signed URL if needed
    const bucketName = 'make-3504d096-pdfs';
    const { data: urlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(pdf.fileName, 31536000);

    if (urlData) {
      pdf.fileUrl = urlData.signedUrl;
    }

    return c.json({ pdf });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return c.json({ error: `Failed to fetch PDF: ${error.message}` }, 500);
  }
});

// Delete PDF
app.delete("/make-server-3504d096/pdf/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const pdf = await kv.get(`pdf:${id}`);

    if (!pdf) {
      return c.json({ error: 'PDF not found' }, 404);
    }

    // Delete from storage
    const bucketName = 'make-3504d096-pdfs';
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([pdf.fileName]);

    if (deleteError) {
      console.error('Storage deletion error:', deleteError);
    }

    // Delete metadata
    await kv.del(`pdf:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    return c.json({ error: `Failed to delete PDF: ${error.message}` }, 500);
  }
});

// Update PDF metadata
app.put("/make-server-3504d096/pdf/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const pdf = await kv.get(`pdf:${id}`);

    if (!pdf) {
      return c.json({ error: 'PDF not found' }, 404);
    }

    const body = await c.req.json();
    const updatedPdf = {
      ...pdf,
      title: body.title ?? pdf.title,
      description: body.description ?? pdf.description,
      category: body.category ?? pdf.category,
      tags: body.tags ?? pdf.tags,
      isPublic: body.isPublic ?? pdf.isPublic,
      updatedDate: new Date().toISOString()
    };

    await kv.set(`pdf:${id}`, updatedPdf);

    return c.json({ success: true, pdf: updatedPdf });
  } catch (error) {
    console.error('Error updating PDF:', error);
    return c.json({ error: `Failed to update PDF: ${error.message}` }, 500);
  }
});

// Video Library Routes

// Upload Video
app.post("/make-server-3504d096/video/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string || '';
    const category = formData.get('category') as string || 'General';
    const tags = formData.get('tags') as string || '';
    const isPublic = formData.get('isPublic') === 'true';
    const userId = formData.get('userId') as string || 'anonymous';
    const customerEmail = formData.get('customerEmail') as string || '';

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    if (!title) {
      return c.json({ error: 'Title is required' }, 400);
    }

    // Validate video file type
    const validVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm'];
    if (!validVideoTypes.includes(file.type)) {
      return c.json({ error: 'Invalid video format. Please upload MP4, MOV, AVI, MKV, or WebM' }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
    
    // Upload to Supabase Storage
    const bucketName = 'make-3504d096-videos';
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Video upload error:', uploadError);
      return c.json({ error: `Failed to upload video: ${uploadError.message}` }, 500);
    }

    // Create signed URL (valid for 1 year)
    const { data: urlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000);

    if (!urlData) {
      return c.json({ error: 'Failed to generate video URL' }, 500);
    }

    // Store metadata in KV store
    const videoId = crypto.randomUUID();
    const metadata = {
      id: videoId,
      title,
      description,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      fileName,
      fileUrl: urlData.signedUrl,
      fileSize: file.size,
      duration: 0, // Client will need to determine actual duration
      uploadDate: new Date().toISOString(),
      userId,
      isPublic,
      originalFileName: file.name,
      customerEmail
    };

    await kv.set(`video:${videoId}`, metadata);

    return c.json({ 
      success: true, 
      video: metadata 
    });
  } catch (error) {
    console.error('Error uploading video:', error);
    return c.json({ error: `Failed to upload video: ${error.message}` }, 500);
  }
});

// Get all Videos
app.get("/make-server-3504d096/video/list", async (c) => {
  try {
    const userEmail = c.req.query('email') || '';
    const videos = await kv.getByPrefix('video:');
    
    // Admin emails can see all videos
    const adminEmails = ['cara@oratf.info', 'carapaulson1@gmail.com'];
    const isAdmin = adminEmails.some(admin => 
      userEmail.toLowerCase() === admin.toLowerCase()
    );
    
    // Filter videos based on user email
    let filteredVideos = videos;
    if (!isAdmin && userEmail) {
      filteredVideos = videos.filter(video => {
        // Show video if:
        // 1. It's public, OR
        // 2. Customer email matches user email, OR
        // 3. No customer email set (legacy videos)
        return video.isPublic || 
               !video.customerEmail || 
               video.customerEmail.toLowerCase() === userEmail.toLowerCase();
      });
    }
    
    // Sort by upload date (newest first)
    const sortedVideos = filteredVideos.sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );

    return c.json({ 
      videos: sortedVideos,
      isAdmin,
      userEmail 
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return c.json({ error: `Failed to fetch videos: ${error.message}` }, 500);
  }
});

// Get single Video by ID
app.get("/make-server-3504d096/video/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const video = await kv.get(`video:${id}`);

    if (!video) {
      return c.json({ error: 'Video not found' }, 404);
    }

    // Refresh signed URL if needed
    const bucketName = 'make-3504d096-videos';
    const { data: urlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(video.fileName, 31536000);

    if (urlData) {
      video.fileUrl = urlData.signedUrl;
    }

    return c.json({ video });
  } catch (error) {
    console.error('Error fetching video:', error);
    return c.json({ error: `Failed to fetch video: ${error.message}` }, 500);
  }
});

// Delete Video
app.delete("/make-server-3504d096/video/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const video = await kv.get(`video:${id}`);

    if (!video) {
      return c.json({ error: 'Video not found' }, 404);
    }

    // Delete from storage
    const bucketName = 'make-3504d096-videos';
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([video.fileName]);

    if (deleteError) {
      console.error('Video storage deletion error:', deleteError);
    }

    // Delete metadata
    await kv.del(`video:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    return c.json({ error: `Failed to delete video: ${error.message}` }, 500);
  }
});

// Update Video metadata
app.put("/make-server-3504d096/video/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const video = await kv.get(`video:${id}`);

    if (!video) {
      return c.json({ error: 'Video not found' }, 404);
    }

    const body = await c.req.json();
    const updatedVideo = {
      ...video,
      title: body.title ?? video.title,
      description: body.description ?? video.description,
      category: body.category ?? video.category,
      tags: body.tags ?? video.tags,
      isPublic: body.isPublic ?? video.isPublic,
      updatedDate: new Date().toISOString()
    };

    await kv.set(`video:${id}`, updatedVideo);

    return c.json({ success: true, video: updatedVideo });
  } catch (error) {
    console.error('Error updating video:', error);
    return c.json({ error: `Failed to update video: ${error.message}` }, 500);
  }
});

// Add Purchase Data to Video (Receipt Image & Order Script)
app.post("/make-server-3504d096/video/:id/purchase", async (c) => {
  try {
    const id = c.req.param('id');
    const video = await kv.get(`video:${id}`);

    if (!video) {
      return c.json({ error: 'Video not found' }, 404);
    }

    const formData = await c.req.formData();
    const purchaseImage = formData.get('purchaseImage') as File | null;
    const orderScript = formData.get('orderScript') as string || '';
    const customerEmail = formData.get('customerEmail') as string || '';

    let purchaseImageUrl = video.purchaseImage;

    // Upload purchase receipt image if provided
    if (purchaseImage) {
      const fileExt = purchaseImage.name.split('.').pop();
      const fileName = `purchase-${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
      
      const bucketName = 'make-3504d096-videos';
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, purchaseImage, {
          contentType: purchaseImage.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Purchase image upload error:', uploadError);
        return c.json({ error: `Failed to upload receipt image: ${uploadError.message}` }, 500);
      }

      // Create signed URL (valid for 1 year)
      const { data: urlData } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(fileName, 31536000);

      if (urlData) {
        purchaseImageUrl = urlData.signedUrl;
      }
    }

    // Update video with purchase data
    const updatedVideo = {
      ...video,
      purchaseImage: purchaseImageUrl,
      orderScript: orderScript || video.orderScript,
      customerEmail: customerEmail || video.customerEmail,
      updatedDate: new Date().toISOString()
    };

    await kv.set(`video:${id}`, updatedVideo);

    return c.json({ 
      success: true, 
      video: updatedVideo 
    });
  } catch (error) {
    console.error('Error adding purchase data:', error);
    return c.json({ error: `Failed to add purchase data: ${error.message}` }, 500);
  }
});

// ML Tracking Routes

// Track quiz answer
app.post("/make-server-3504d096/ml/track-quiz", async (c) => {
  try {
    const body = await c.req.json();
    await mlTracking.trackQuizAnswer(body);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking quiz answer:', error);
    return c.json({ error: `Failed to track quiz answer: ${error.message}` }, 500);
  }
});

// Track content interaction
app.post("/make-server-3504d096/ml/track-interaction", async (c) => {
  try {
    const body = await c.req.json();
    await mlTracking.trackContentInteraction(body);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking content interaction:', error);
    return c.json({ error: `Failed to track interaction: ${error.message}` }, 500);
  }
});

// Get ML analytics
app.get("/make-server-3504d096/ml/analytics", async (c) => {
  try {
    const analytics = await mlTracking.getMLAnalytics();
    return c.json(analytics);
  } catch (error) {
    console.error('Error fetching ML analytics:', error);
    return c.json({ error: `Failed to fetch analytics: ${error.message}` }, 500);
  }
});

// Check user progress for quiz locking
app.get("/make-server-3504d096/ml/progress/:userId/:lessonId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const lessonId = c.req.param('lessonId');
    const progress = await mlTracking.getUserContentProgress(userId, lessonId);
    return c.json(progress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return c.json({ error: `Failed to fetch progress: ${error.message}` }, 500);
  }
});

// Track user engagement
app.post("/make-server-3504d096/ml/track-engagement", async (c) => {
  try {
    const body = await c.req.json();
    await mlTracking.trackEngagement(body);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking engagement:', error);
    return c.json({ error: `Failed to track engagement: ${error.message}` }, 500);
  }
});

// Get engagement trends
app.get("/make-server-3504d096/ml/engagement-trends", async (c) => {
  try {
    const days = parseInt(c.req.query('days') || '30');
    const trends = await mlTracking.getEngagementTrends(days);
    return c.json(trends);
  } catch (error) {
    console.error('Error fetching engagement trends:', error);
    return c.json({ error: `Failed to fetch engagement trends: ${error.message}` }, 500);
  }
});

// Track all user activities in batch
app.post("/make-server-3504d096/ml/track-all-activity", async (c) => {
  // EMERGENCY KILL SWITCH - Immediately return success without tracking
  // Set to false to re-enable tracking after database recovers
  const EMERGENCY_DISABLE_TRACKING = true;
  
  if (EMERGENCY_DISABLE_TRACKING) {
    return c.json({ success: true, accepted: 0, disabled: true });
  }
  
  try {
    const body = await c.req.json();
    const activities = body.activities || [];
    
    if (activities.length > 0) {
      // Fire and forget - don't await to prevent blocking the response
      mlTracking.trackAllActivity(activities).catch(err => {
        // Silent fail - tracking errors should not impact user experience
      });
    }
    
    // Respond immediately without waiting for tracking to complete
    return c.json({ success: true, accepted: activities.length });
  } catch (error) {
    // Always respond with success - tracking is non-critical
    return c.json({ success: true, accepted: 0 });
  }
});

Deno.serve(app.fetch);