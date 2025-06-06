const mega = require('megajs');

/**
 * MEGA account credentials
 */
const credentials = {
  email: 'darkwebagent096@gmail.com',
  password: 'Nathanielkango$$23455667777777',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
};

/**
 * Uploads a file stream to MEGA.nz
 * 
 * @param {ReadableStream} stream - The file stream to upload.
 * @param {string} filename - The name to save the file as on MEGA.
 * @returns {Promise<string>} - Resolves with the MEGA file link.
 */
function uploadToMega(stream, filename) {
  return new Promise((resolve, reject) => {
    try {
      const storage = new mega.Storage(credentials, () => {
        const file = storage.upload({
          name: filename,
          allowUploadBuffering: true
        });

        stream.pipe(file);

        storage.on('add', (file) => {
          file.link((err, link) => {
            storage.close(); // Always close the session
            if (err) return reject(err);
            resolve(link);
          });
        });
      });

      storage.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  uploadToMega
};
