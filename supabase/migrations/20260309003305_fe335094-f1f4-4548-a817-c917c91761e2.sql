SELECT cron.schedule(
  'send-daily-affirmations',
  '0 7 * * *',
  $$
  SELECT net.http_post(
    url := 'https://wxtleqzdwrxnbfufxmmc.supabase.co/functions/v1/send-daily-affirmations',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dGxlcXpkd3J4bmJmdWZ4bW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDUzNjIsImV4cCI6MjA4ODU4MTM2Mn0.Gjge6SH8RrGTEaMP_-7bP6FrNSrmNGIHolaMyh9sw0c"}'::jsonb,
    body := concat('{"time": "', now(), '"}')::jsonb
  ) AS request_id;
  $$
);