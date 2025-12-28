import { supabase } from '../config/supabase.js';
import fs from 'fs';
import path from 'path';

export const getAllPosts = async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        content,
        excerpt,
        images,
        created_at,
        updated_at,
        published,
        author:users!blog_posts_author_id_fkey(id, username, email)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        content,
        excerpt,
        images,
        created_at,
        updated_at,
        published,
        author:users!blog_posts_author_id_fkey(id, username, email)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error || !post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        content,
        excerpt,
        created_at,
        updated_at,
        published,
        author:users!blog_posts_author_id_fkey(id, username, email)
      `)
      .eq('author_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, excerpt, published = false } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert([{
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        author_id: req.user.id,
        published,
        images: []
      }])
      .select(`
        id,
        title,
        content,
        excerpt,
        images,
        created_at,
        updated_at,
        published,
        author:users!blog_posts_author_id_fkey(id, username, email)
      `)
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create post' });
    }

    // If files were uploaded via multer, upload them to Supabase storage
    const uploadedUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const bucket = 'post-images';
          const destPath = `${post.id}/${file.filename}`;
          const fileStream = fs.createReadStream(file.path);

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(destPath, fileStream);

          if (uploadError) {
            console.error('Upload error:', uploadError);
            continue;
          }

          const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(destPath);
          if (urlData && urlData.publicUrl) uploadedUrls.push(urlData.publicUrl);
        } catch (e) {
          console.error('File upload failed', e);
        } finally {
          // remove temp file
          try { fs.unlinkSync(file.path); } catch (e) { /* ignore */ }
        }
      }

      if (uploadedUrls.length > 0) {
        await supabase.from('blog_posts').update({ images: uploadedUrls }).eq('id', post.id);
        post.images = uploadedUrls;
      }
    }

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, published } = req.body;

    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (published !== undefined) updateData.published = published;

    const { data: post, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .eq('author_id', req.user.id)
      .select(`
        id,
        title,
        content,
        excerpt,
        images,
        created_at,
        updated_at,
        published,
        author:users!blog_posts_author_id_fkey(id, username, email)
      `)
      .maybeSingle();

    if (error || !post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    // handle newly uploaded files
    if (req.files && req.files.length > 0) {
      const bucket = 'post-images';
      const newUrls = [];
      for (const file of req.files) {
        try {
          const destPath = `${id}/${file.filename}`;
          const fileStream = fs.createReadStream(file.path);
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(destPath, fileStream);
          if (uploadError) continue;
          const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(destPath);
          if (urlData && urlData.publicUrl) newUrls.push(urlData.publicUrl);
        } catch (e) {
          console.error('Update file upload failed', e);
        } finally {
          try { fs.unlinkSync(file.path); } catch (e) { }
        }
      }

      if (newUrls.length > 0) {
        // merge with existing images
        const { data: existing } = await supabase.from('blog_posts').select('images').eq('id', id).maybeSingle();
        const merged = (existing && existing.images) ? existing.images.concat(newUrls) : newUrls;
        await supabase.from('blog_posts').update({ images: merged }).eq('id', id);
        if (post) post.images = merged;
      }
    }

    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
      .eq('author_id', req.user.id);

    if (error) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
