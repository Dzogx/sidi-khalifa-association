import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Get user by ID from Supabase Auth
 */
export async function getUserById(userId: string) {
  try {
    const { data, error } = await supabase.auth.admin.getUserById(userId);
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('[Supabase] Failed to get user:', error);
    return null;
  }
}

/**
 * Create a new user in Supabase Auth
 */
export async function createUser(email: string, password: string, metadata?: Record<string, any>) {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: metadata,
    });
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('[Supabase] Failed to create user:', error);
    return null;
  }
}

/**
 * Update user metadata
 */
export async function updateUserMetadata(userId: string, metadata: Record<string, any>) {
  try {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: metadata,
    });
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('[Supabase] Failed to update user:', error);
    return null;
  }
}

/**
 * Delete user
 */
export async function deleteUser(userId: string) {
  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[Supabase] Failed to delete user:', error);
    return false;
  }
}

/**
 * List all users
 */
export async function listUsers(limit: number = 100) {
  try {
    const { data, error } = await supabase.auth.admin.listUsers({
      perPage: limit,
    });
    if (error) throw error;
    return data.users;
  } catch (error) {
    console.error('[Supabase] Failed to list users:', error);
    return [];
  }
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string) {
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('[Supabase] Failed to verify token:', error);
    return null;
  }
}
