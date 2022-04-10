// eslint-disable-next-line import/prefer-default-export
export function captureScreen() {
  const captureService = new ReactCaptureService();
  captureService.getImage(this.ranking.nativeElement, true)
    .pipe(
      tap(async (img) => {
        const image = new Image();
        image.src = img;
        const url = image.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'RunningOrder.png';
        for (let i = 0; i < collapsables.length; i++) {
          collapsables.item(i).removeAttribute('hidden');
        }
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        watermark.setAttribute('hidden', 'true');
      }),
    ).subscribe(() => { }, () => {
      for (let i = 0; i < collapsables.length; i++) {
        collapsables.item(i).removeAttribute('hidden');
        watermark.setAttribute('hidden', 'true');
      }
    });
}
