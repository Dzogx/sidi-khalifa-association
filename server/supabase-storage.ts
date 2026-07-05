import { supabase } from './supabase';

const BUCKET_NAME = 'sidi-khalifa-assets';

/**
 * Initialize storage bucket
 */
export async function initializeStorage() {
  try {
    // Try to get the bucket
    const { data, error } = await supabase.storage.getBucket(BUCKET_NAME);
    
    if (error && error.message.includes('not found')) {
      // Create bucket if it doesn't exist
      const { data: newBucket, error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      });

      if (createError) {
        console.error('[Storage] Failed to create bucket:', createError);
        return false;
      }

      console.log('[Storage] Bucket created successfully');
      return true;
    }

    if (error) {
      console.error('[Storage] Failed to get bucket:', error);
      return false;
    }

    console.log('[Storage] Bucket already exists');
    return true;
  } catch (error) {
    console.error('[Storage] Error initializing storage:', error);
    return false;
  }
}

/**
 * Upload file to storage
 */
export async function uploadFile(
  filePath: string,
  fileBuffer: Buffer,
  contentType: string = 'application/octet-stream'
): Promise<{ url: string; path: string } | null> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error('[Storage] Failed to upload file:', error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error('[Storage] Error uploading file:', error);
    return null;
  }
}

/**
 * Delete file from storage
 */
export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('[Storage] Failed to delete file:', error);
      return false;
    }

    console.log('[Storage] File deleted successfully');
    return true;
  } catch (error) {
    console.error('[Storage] Error deleting file:', error);
    return false;
  }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(filePath: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * List files in storage
 */
export async function listFiles(folderPath: string = ''): Promise<any[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folderPath);

    if (error) {
      console.error('[Storage] Failed to list files:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('[Storage] Error listing files:', error);
    return [];
  }
}

/**
 * Upload image for gallery
 */
export async function uploadGalleryImage(
  fileName: string,
  fileBuffer: Buffer
): Promise<{ url: string; path: string } | null> {
  const timestamp = Date.now();
  const filePath = `gallery/${timestamp}-${fileName}`;
  return uploadFile(filePath, fileBuffer, 'image/jpeg');
}

/**
 * Upload document
 */
export async function uploadDocument(
  fileName: string,
  fileBuffer: Buffer
): Promise<{ url: string; path: string } | null> {
  const timestamp = Date.now();
  const filePath = `documents/${timestamp}-${fileName}`;
  return uploadFile(filePath, fileBuffer, 'application/pdf');
}

/**
 * Delete gallery image
 */
export async function deleteGalleryImage(filePath: string): Promise<boolean> {
  return deleteFile(filePath);
}

/**
 * Delete document
 */
export async function deleteDocument(filePath: string): Promise<boolean> {
  return deleteFile(filePath);
}
