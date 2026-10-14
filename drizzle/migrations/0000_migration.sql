CREATE TABLE public.nag_settings (
  user_id uuid PRIMARY KEY,
  nag_time text NOT NULL DEFAULT 'off',
  nag_mode text NOT NULL DEFAULT 'gentle',
  nag_theme text NOT NULL DEFAULT 'productivity',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.nag_settings TO authenticated;
GRANT ALL ON public.nag_settings TO service_role;
ALTER TABLE public.nag_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own nag settings" ON public.nag_settings
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER nag_settings_updated_at BEFORE UPDATE ON public.nag_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();