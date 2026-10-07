-- Run once in the portfolio-visitors D1 database's Console.
-- Safe to run again: existing counts are preserved.
CREATE TABLE IF NOT EXISTS visitor_locations (
    bucket TEXT PRIMARY KEY,
    country_code TEXT NOT NULL,
    label TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    visits INTEGER NOT NULL DEFAULT 0 CHECK (visits >= 0),
    updated_at TEXT NOT NULL,
    CHECK ((latitude IS NULL AND longitude IS NULL) OR
           (latitude IS NOT NULL AND longitude IS NOT NULL AND
            latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180))
);
