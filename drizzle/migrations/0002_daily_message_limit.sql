CREATE TABLE public.user_daily_usage (
  user_id uuid NOT NULL,
  usage_date date NOT NULL,
  message_count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, usage_date)
);
GRANT SELECT ON public.user_daily_usage TO authenticated;
GRANT ALL ON public.user_daily_usage TO service_role;
ALTER TABLE public.user_daily_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own usage" ON public.user_daily_usage FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.user_subscriptions (
  user_id uuid PRIMARY KEY,
  is_pro boolean NOT NULL DEFAULT false,
  expires_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.user_subscriptions TO authenticated;
GRANT ALL ON public.user_subscriptions TO service_role;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own subscription" ON public.user_subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.is_pro(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin') OR EXISTS (
    SELECT 1 FROM public.user_subscriptions
    WHERE user_id = _user_id AND is_pro AND (expires_at IS NULL OR expires_at > now())
  )
$$;

CREATE OR REPLACE FUNCTION public.consume_daily_message(_limit integer DEFAULT 5)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _uid uuid := auth.uid();
  _today date := (now() AT TIME ZONE 'America/Los_Angeles')::date;
  _count integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF public.is_pro(_uid) THEN
    RETURN jsonb_build_object('allowed', true, 'pro', true, 'used', 0, 'limit', _limit);
  END IF;
  INSERT INTO public.user_daily_usage (user_id, usage_date, message_count)
  VALUES (_uid, _today, 1)
  ON CONFLICT (user_id, usage_date) DO UPDATE
    SET message_count = public.user_daily_usage.message_count + 1
    WHERE public.user_daily_usage.message_count < _limit
  RETURNING message_count INTO _count;
  IF _count IS NULL THEN
    RETURN jsonb_build_object('allowed', false, 'pro', false, 'used', _limit, 'limit', _limit);
  END IF;
  RETURN jsonb_build_object('allowed', true, 'pro', false, 'used', _count, 'limit', _limit);
END;
$$;
REVOKE ALL ON FUNCTION public.consume_daily_message(integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.consume_daily_message(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_pro(uuid) TO authenticated;