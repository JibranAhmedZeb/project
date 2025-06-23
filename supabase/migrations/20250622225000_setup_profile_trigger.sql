-- Creates a public.users profile for a new user.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, display_name, plan, credits)
  values (new.id, new.email, new.raw_user_meta_data->>'display_name', 'free', 100);
  return new;
end;
$$;

-- Triggers the function after a new user is created.
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
