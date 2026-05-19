import sharp from "sharp"

const TARGET_BYTES = 500 * 1024

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("image") as File | null
  if (!file) return new Response("No image", { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"

  const isWebP = ext === "webp"
  const isPNG = ext === "png"

  let quality = 82
  let output: Buffer
  let outExt: string
  let mimeType: string

  if (isPNG) {
    output = await sharp(buffer).png({ compressionLevel: 9, effort: 10 }).toBuffer()
    outExt = "png"
    mimeType = "image/png"
    if (output.length > TARGET_BYTES) {
      output = await sharp(buffer).webp({ quality: 80 }).toBuffer()
      outExt = "webp"
      mimeType = "image/webp"
    }
  } else {
    outExt = "webp"
    mimeType = "image/webp"
    output = await sharp(buffer).webp({ quality }).toBuffer()

    while (output.length > TARGET_BYTES && quality > 30) {
      quality -= 8
      output = await sharp(buffer).webp({ quality }).toBuffer()
    }
  }

  const baseName = file.name.replace(/\.[^.]+$/, "")
  const outName = `${baseName}-optimized.${outExt}`

  return new Response(output as unknown as BodyInit, {
    headers: {
      "Content-Type": mimeType,
      "Content-Disposition": `attachment; filename="${outName}"`,
      "X-Original-Size": String(buffer.length),
      "X-Optimized-Size": String(output.length),
    },
  })
}
