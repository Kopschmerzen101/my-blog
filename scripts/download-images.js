import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
    filename: 'tech-journey.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&q=80',
    filename: 'creative-coding.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    filename: 'profile.jpg'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(path.join(__dirname, '../public/images', filename)))
          .on('error', reject)
          .once('close', () => resolve(filename));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
};

const downloadAllImages = async () => {
  try {
    const downloadPromises = images.map(img => downloadImage(img.url, img.filename));
    const results = await Promise.all(downloadPromises);
    console.log('All images downloaded successfully:', results);
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadAllImages(); 