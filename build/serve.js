import path from 'path';
import nodemon from 'nodemon';


export default function serve() {
  return new Promise((resolve) => {
    let running = false;

    const monitor = nodemon({
      script: path.join(__dirname, '..', 'server.js'),
    })
      .on('start', () => {
        if (!running) {
          running = true;
          resolve();
        }
      });

    process.once('SIGINT', () => {
      monitor.once('exit', () => {
        process.exit();
      });
    });
  });
}
