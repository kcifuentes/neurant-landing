-- Fix chatbot_type data and constraint
-- First, drop the existing constraint
ALTER TABLE waitlist_registrations DROP CONSTRAINT IF EXISTS check_chatbot_type;

-- Update existing data to valid values (if any exists)
-- This maps old values to new valid ones
UPDATE waitlist_registrations 
SET chatbot_type = CASE 
  WHEN chatbot_type = 'customer_support' THEN 'customer_service'
  WHEN chatbot_type = 'faq' THEN 'internal_operations'
  WHEN chatbot_type = 'booking' THEN 'internal_operations'
  WHEN chatbot_type = 'ecommerce' THEN 'sales'
  WHEN chatbot_type NOT IN ('customer_service', 'sales', 'lead_generation', 'internal_operations', 'other') THEN 'other'
  ELSE chatbot_type
END
WHERE chatbot_type IS NOT NULL;

-- Make chatbot_type optional (nullable) first
ALTER TABLE waitlist_registrations ALTER COLUMN chatbot_type DROP NOT NULL;

-- Add the corrected constraint with the right values
ALTER TABLE waitlist_registrations 
ADD CONSTRAINT check_chatbot_type 
CHECK (chatbot_type IS NULL OR chatbot_type IN ('customer_service', 'sales', 'lead_generation', 'internal_operations', 'other'));