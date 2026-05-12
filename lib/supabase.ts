import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

const BUCKET_PREFIX = `${process.env.SUPABASE_URL}/storage/v1/object/public/plants/`

export async function deleteStorageFile(url: string | null) {
  if (!url || !url.startsWith(BUCKET_PREFIX)) return
  const filename = url.slice(BUCKET_PREFIX.length)
  if (filename) await supabase.storage.from("plants").remove([filename])
}

export async function deleteStorageFiles(urls: (string | null)[]) {
  const filenames = urls
    .filter((u): u is string => !!u && u.startsWith(BUCKET_PREFIX))
    .map(u => u.slice(BUCKET_PREFIX.length))
    .filter(Boolean)
  if (filenames.length) await supabase.storage.from("plants").remove(filenames)
}
