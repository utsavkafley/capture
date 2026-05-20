/**
 * Inserts Cloudinary transformation parameters into an upload URL.
 * Works with both versioned (/upload/v123/file.jpg)
 * and unversioned (/upload/file.jpg) URLs.
 */
export function withTransform(url: string, transform: string): string {
  return url.replace("/upload/", `/upload/${transform}/`);
}

/**
 * Fetches a tiny blurred version of an image from Cloudinary and returns
 * it as a base64 data URL for use as a Next.js blur placeholder.
 *
 * Called server-side at build time (generateStaticParams / async page
 * components), so the result is baked into the static HTML — zero
 * runtime cost, instant perceived load.
 */
export async function getBlurDataURL(url: string): Promise<string> {
  const tinyUrl = withTransform(url, "w_20,q_1,e_blur:200,f_jpg");
  const res = await fetch(tinyUrl);
  const buffer = await res.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;
}
