-- Create processing_runs table
CREATE TABLE IF NOT EXISTS public.processing_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stage TEXT NOT NULL,
  lot_code TEXT NOT NULL,
  variety TEXT NOT NULL,
  input_weight_kg NUMERIC NOT NULL,
  total_output_kg NUMERIC NOT NULL,
  buckets JSONB,
  diff_kg NUMERIC GENERATED ALWAYS AS (input_weight_kg - total_output_kg) STORED,
  operator_email TEXT,
  notes TEXT,
  CONSTRAINT valid_stage CHECK (stage IN ('sbocciolo', 'beta', 'rifinitura'))
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_processing_runs_stage_lot ON public.processing_runs(stage, lot_code);
CREATE INDEX IF NOT EXISTS idx_processing_runs_created ON public.processing_runs(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.processing_runs ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for inserting data
CREATE POLICY "Allow insert for all users" ON public.processing_runs
  FOR INSERT
  WITH CHECK (true);

-- Create RLS policy for reading data
CREATE POLICY "Allow read for all users" ON public.processing_runs
  FOR SELECT
  USING (true);

-- Grant permissions
GRANT INSERT, SELECT ON public.processing_runs TO anon;
