-- Migration to update the country field from varchar(2) to varchar(100)
-- to store full country names instead of country codes for better analytics

-- Step 1: Add a temporary column for the new country field
ALTER TABLE public.waitlist_registrations 
ADD COLUMN country_name varchar(100);

-- Step 2: Update existing records with full country names (ASCII safe)
UPDATE public.waitlist_registrations 
SET country_name = CASE 
    WHEN country = 'CO' THEN 'Colombia'
    WHEN country = 'MX' THEN 'Mexico'
    WHEN country = 'AR' THEN 'Argentina'
    WHEN country = 'BR' THEN 'Brasil'
    WHEN country = 'CL' THEN 'Chile'
    WHEN country = 'PE' THEN 'Peru'
    WHEN country = 'EC' THEN 'Ecuador'
    WHEN country = 'VE' THEN 'Venezuela'
    WHEN country = 'BO' THEN 'Bolivia'
    WHEN country = 'PY' THEN 'Paraguay'
    WHEN country = 'UY' THEN 'Uruguay'
    WHEN country = 'PA' THEN 'Panama'
    WHEN country = 'CR' THEN 'Costa Rica'
    WHEN country = 'GT' THEN 'Guatemala'
    WHEN country = 'HN' THEN 'Honduras'
    WHEN country = 'SV' THEN 'El Salvador'
    WHEN country = 'NI' THEN 'Nicaragua'
    WHEN country = 'CU' THEN 'Cuba'
    WHEN country = 'DO' THEN 'Republica Dominicana'
    WHEN country = 'ES' THEN 'Espana'
    WHEN country = 'US' THEN 'Estados Unidos'
    ELSE country -- fallback to original value
END;

-- Step 3: Drop the old country column
ALTER TABLE public.waitlist_registrations 
DROP COLUMN country;

-- Step 4: Rename the new column to country
ALTER TABLE public.waitlist_registrations 
RENAME COLUMN country_name TO country;

-- Step 5: Add NOT NULL constraint
ALTER TABLE public.waitlist_registrations 
ALTER COLUMN country SET NOT NULL;

-- Step 6: Update the index
DROP INDEX IF EXISTS idx_waitlist_country;
CREATE INDEX idx_waitlist_country ON public.waitlist_registrations USING btree (country);

-- Step 7: Add check constraint for valid country names
ALTER TABLE public.waitlist_registrations 
ADD CONSTRAINT check_country_length CHECK (char_length(country) >= 2 AND char_length(country) <= 100);