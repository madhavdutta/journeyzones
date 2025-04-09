/*
  # Create packages table

  1. New Tables
    - `packages`
      - `id` (uuid, primary key)
      - `title` (text)
      - `destination` (text)
      - `location` (text)
      - `image` (text)
      - `duration` (text)
      - `price` (integer)
      - `rating` (numeric)
      - `reviews` (integer)
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `packages` table
    - Add policy for authenticated and anonymous users to read packages
*/

CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text NOT NULL,
  location text NOT NULL,
  image text NOT NULL,
  duration text NOT NULL,
  price integer NOT NULL,
  rating numeric NOT NULL DEFAULT 0,
  reviews integer NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read packages"
  ON packages
  FOR SELECT
  TO authenticated, anon
  USING (true);