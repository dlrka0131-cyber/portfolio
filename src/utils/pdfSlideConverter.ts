import * as pdfjsLib from 'pdfjs-dist';

// Configure worker URL for browser compatibility
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export interface PdfSlideItem {
  id: string;
  url: string;
  title: string;
  pdfName?: string;
  pdfId?: string;
  pageNum?: number;
  totalPages?: number;
}

export interface PdfSlideResult {
  fileName: string;
  totalPages: number;
  slides: PdfSlideItem[];
}

/**
 * Converts an uploaded PDF file into slide images (Data URLs) for PPT presentation mode
 */
export async function convertPdfToImageSlides(
  file: File,
  baseTitle: string = 'PPT 슬라이드'
): Promise<PdfSlideResult> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Load PDF document
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;

  const slides: PdfSlideItem[] = [];
  const pdfId = `pdf-${Date.now()}`;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    
    // Scale 2.0 for crisp presentation quality
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (context) {
      await page.render({
        canvasContext: context,
        viewport: viewport,
        canvas: canvas,
      }).promise;

      // Convert page canvas to compressed JPEG Data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      slides.push({
        id: `pdf-slide-${Date.now()}-${pageNum}`,
        url: dataUrl,
        title: `${baseTitle} (${pageNum}/${totalPages}p)`,
        pdfName: file.name,
        pdfId: pdfId,
        pageNum: pageNum,
        totalPages: totalPages,
      });
    }
  }

  return {
    fileName: file.name,
    totalPages,
    slides,
  };
}
