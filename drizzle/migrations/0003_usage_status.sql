CREATE OR REPLACE FUNCTION public.get_daily_usage(_limit integer)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT jsonb_build_object(
    'pro', public.is_pro(auth.uid()),
    'limit', _limit,
    'used', COALESCE((SELECT message_count FROM public.user_daily_usage
      WHERE user_id = auth.uid() AND usage_date = (now() AT TIME ZONE 'America/Los_Angeles')::date), 0)
  )
$$;
REVOKE ALL ON FUNCTION public.get_daily_usage(integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_daily_usage(integer) TO authenticated;
ALTER TABLE public.user_subscriptions ADD COLUMN plan text;
COMMENT ON COLUMN public.user_subscriptions.plan IS 'monthly | yearly | lifetime. Lifetime = is_pro true with expires_at NULL.';