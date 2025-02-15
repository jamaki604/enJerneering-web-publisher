/**
 * Fetches an image from a URL or processes a file Blob and converts it to a Base64-encoded string.
 * @param {string | Blob} input - Either a file Blob or a URL string pointing to an image.
 * @returns {Promise<string>} - A Base64-encoded string of the image.
 */
export const convertImageToBase64 = async (input: string | Blob): Promise<string> => {
    if (typeof input === "string") {
      try {
        const response = await fetch(input);
        const blob = await response.blob();
        return toBase64(blob);
      } catch (error) {
        console.error("Error fetching image from URL:", error);
        throw error;
      }
    }
  
    if (input instanceof Blob) {
      try {
        return toBase64(input);
      } catch (error) {
        console.error("Error converting Blob to Base64:", error);
        throw error;
      }
    }
  
    throw new Error("Invalid input: Must be a URL string or Blob.");
  };
  
  /**
   * Converts a Blob object to a Base64-encoded string.
   * @param {Blob} blob - A Blob object to be converted.
   * @returns {Promise<string>} - A Base64-encoded string of the Blob.
   */
  const toBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  };
  

