-- Add images column to blog_posts to store array of image URLs
ALTER TABLE IF EXISTS blog_posts
ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb;

-- Optional: create index on images if you plan to query it (not necessary now)
-- CREATE INDEX IF NOT EXISTS idx_blog_posts_images ON blog_posts USING gin (images jsonb_path_ops);
