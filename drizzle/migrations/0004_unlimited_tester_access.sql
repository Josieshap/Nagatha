-- Testing is unlimited for every authenticated account, without changing paid entitlements.
CREATE OR REPLACE FUNCTION public.consume_daily_message(_limit integer DEFAULT 10)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _uid uuid := auth.uid();
  _today date := (now() AT TIME ZONE 'America/Los_Angeles')::date;
  _count integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  INSERT INTO public.user_daily_usage (user_id, usage_date, message_count)
  VALUES (_uid, _today, 1)
  ON CONFLICT (user_id, usage_date) DO UPDATE
    SET message_count = public.user_daily_usage.message_count + 1
  RETURNING message_count INTO _count;
  RETURN jsonb_build_object('allowed', true, 'pro', true, 'unlimited', true, 'used', _count, 'limit', _limit);
END;
$$;
REVOKE ALL ON FUNCTION public.consume_daily_message(integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.consume_daily_message(integer) TO authenticated;
COMMENT ON FUNCTION public.consume_daily_message(integer) IS 'Testing: always permits signed-in users and counts every request; pro in the legacy response denotes unlimited access, not a paid subscription.';
CREATE OR REPLACE FUNCTION public.get_daily_usage(_limit integer)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN jsonb_build_object(
    'pro', true, 'unlimited', true, 'limit', _limit,
    'used', COALESCE((SELECT message_count FROM public.user_daily_usage
      WHERE user_id = auth.uid() AND usage_date = (now() AT TIME ZONE 'America/Los_Angeles')::date), 0)
  );
END;
$$;
REVOKE ALL ON FUNCTION public.get_daily_usage(integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_daily_usage(integer) TO authenticated;