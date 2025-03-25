-- Create about table
CREATE TABLE IF NOT EXISTS public.about (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  profile_image TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  read BOOLEAN DEFAULT FALSE NOT NULL
);

-- Enable RLS
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to about table"
  ON public.about
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to contact_messages table"
  ON public.contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample data
INSERT INTO public.about (name, role, description, profile_image, skills)
VALUES (
  'Nyamskie',
  'Software Developer',
  'I am a passionate software developer with a keen interest in Linux and open-source technologies. My journey in tech has been driven by a desire to create efficient, elegant solutions to complex problems.',
  '/images/profile.jpg',
  ARRAY['Linux', 'JavaScript', 'Vue.js', 'Node.js', 'TypeScript', 'Git', 'Docker']
); 