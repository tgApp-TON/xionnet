-- Enable pg_cron extension (run once)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule event processor every minute
SELECT cron.schedule(
  'process-events',
  '* * * * *',  -- every minute
  $$
  SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/process-events',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'),
      'Content-Type', 'application/json'
    ),
    body := '{}'
  );
  $$
);

-- To check scheduled jobs:
-- SELECT * FROM cron.job;

-- To remove:
-- SELECT cron.unschedule('process-events');
