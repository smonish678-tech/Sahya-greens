import { readFile } from "node:fs/promises";
import { join } from "node:path";

export function GET() {
  const filename = "Sahya Greens-Brouchure (draft-10).pdf";
  const filePath = join(process.cwd(), "public", filename);

  return readFile(filePath).then((file) => new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  }));
}
