import fs from "fs/promises"
import path from "path"
import GalleryPageClient from "./gallery-client"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => {
        // Extract numeric part from filename for proper numerical sorting
        const numA = parseInt(a.match(/\/(\d+)\./)?.[1] || "0", 10)
        const numB = parseInt(b.match(/\/(\d+)\./)?.[1] || "0", 10)
        return numA - numB
      })
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const mobileImages = await getImagesFrom("mobile-background")
  const desktopImages = await getImagesFrom("desktop-background")
  const galleryImages = await getImagesFrom("gallery")
  const allImages = [...mobileImages, ...desktopImages, ...galleryImages]
  const images = allImages.map((src) => {
    let category: "mobile" | "desktop" | "gallery"
    if (src.includes("mobile-background")) {
      category = "mobile"
    } else if (src.includes("desktop-background")) {
      category = "desktop"
    } else {
      category = "gallery"
    }
    return { src, category }
  })

  return <GalleryPageClient images={images} />
}


