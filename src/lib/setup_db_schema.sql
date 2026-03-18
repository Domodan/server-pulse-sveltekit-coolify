-- 1️⃣ Create the database
-- Note: run this in the default postgres DB first
CREATE DATABASE server_pulse;

-- 2️⃣ Connect to the new database
\c server_pulse;

-- 3️⃣ Create the pulses table
CREATE TABLE pulses (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    server_info CHARACTER VARYING
);

-- 4️⃣ Create a function to update updated_at automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5️⃣ Create a trigger for pulses table
CREATE TRIGGER update_pulses_updated_at
BEFORE UPDATE ON pulses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ✅ Done