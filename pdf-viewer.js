import * as pdfjs from './assets/pdfjs/pdf.min.mjs';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('./assets/pdfjs/pdf.worker.min.mjs', import.meta.url).href;

for (const viewer of document.querySelectorAll('.pdf-viewer')) {
  const container = viewer.querySelector('.pdf-pages');
  const status = viewer.querySelector('.pdf-status');
  const toolbar = viewer.previousElementSibling?.classList.contains('document-toolbar') ? viewer.previousElementSibling : null;
  const zoomValue = toolbar?.querySelector('.pdf-zoom-value');
  const zoomOut = toolbar?.querySelector('.pdf-zoom-out');
  const zoomIn = toolbar?.querySelector('.pdf-zoom-in');
  let zoom = 1;

  const updateZoom = () => {
    const inset = window.innerWidth <= 700 ? 24 : 48;
    const baseWidth = Math.min(900, viewer.clientWidth - inset);
    container.style.width = `${Math.round(baseWidth * zoom)}px`;
    if (zoomValue) zoomValue.value = `${Math.round(zoom * 100)}%`;
    if (zoomOut) zoomOut.disabled = zoom <= 1;
    if (zoomIn) zoomIn.disabled = zoom >= 2;
  };

  zoomOut?.addEventListener('click', () => { zoom = Math.max(1, zoom - 0.25); updateZoom(); });
  zoomIn?.addEventListener('click', () => { zoom = Math.min(2, zoom + 0.25); updateZoom(); });
  window.addEventListener('resize', updateZoom);
  updateZoom();

  try {
    const pdf = await pdfjs.getDocument(viewer.dataset.pdfSource).promise;
    for (let number = 1; number <= pdf.numPages; number += 1) {
      const page = await pdf.getPage(number);
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.max(2.5, Math.min((container.clientWidth / viewport.width) * Math.min(window.devicePixelRatio || 1, 2), 3));
      const output = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(output.width);
      canvas.height = Math.round(output.height);
      canvas.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', `PDF page ${number} of ${pdf.numPages}`);
      container.append(canvas);
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: output }).promise;
    }
    status.remove();
  } catch (error) {
    status.textContent = 'The embedded viewer could not load. Download the original PDF below.';
    console.error('PDF viewer failed:', error);
  }
}
