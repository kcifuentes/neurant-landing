-- Fix expected_volume constraint to allow correct values
-- First, drop the existing constraint
ALTER TABLE waitlist_registrations DROP CONSTRAINT IF EXISTS check_expected_volume;

-- Update existing data to valid values (if any exists)
UPDATE waitlist_registrations 
SET expected_volume = CASE 
  WHEN expected_volume = 'low' THEN '<100'
  WHEN expected_volume = 'medium' THEN '100-500'
  WHEN expected_volume = 'high' THEN '500-1000'
  WHEN expected_volume = 'very_high' THEN '1000-5000'
  WHEN expected_volume NOT IN ('<100', '100-500', '500-1000', '1000-5000', '5000+') THEN '100-500'
  ELSE expected_volume
END
WHERE expected_volume IS NOT NULL;

-- Add the corrected constraint with the right values
ALTER TABLE waitlist_registrations 
ADD CONSTRAINT check_expected_volume 
CHECK (expected_volume IS NULL OR expected_volume IN ('<100', '100-500', '500-1000', '1000-5000', '5000+'));