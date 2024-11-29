import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
	"https://lmdqbgkvyanzprplgoxl.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZHFiZ2t2eWFuenBycGxnb3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MzMyNTksImV4cCI6MjA0ODQwOTI1OX0.gBC-qsUzJ7y_f-5RAzjYZCDuOTkROKQonBk6IgtxFg8"
)
