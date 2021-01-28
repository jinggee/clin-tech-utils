
export function download(blobParts: BlobPart, fileName = `${Date.now()}.xlsx`) {
  const blob = new Blob([blobParts], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const elink = document.createElement('a');
  elink.download = fileName;
  elink.style.display = 'none';
  elink.href = window.URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  window.URL.revokeObjectURL(elink.href);
  document.body.removeChild(elink);
}