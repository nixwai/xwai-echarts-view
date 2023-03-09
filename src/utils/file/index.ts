/** blob转字符串 */
export function blobToString(data: Blob): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const render = new FileReader();
      render.readAsText(data, 'utf-8');
      render.onload = () => {
        if (typeof render.result === 'string') {
          resolve(render.result);
        } else {
          resolve(null);
        }
      };
    } catch {
      resolve(null);
    }
  });
}
