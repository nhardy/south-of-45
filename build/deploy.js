// @flow

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { last } from 'lodash-es';
import Archiver from 'archiver';
import Application from 'azur';


export function zip() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(path.join(__dirname, '..', '.tmp', 'app.zip'));
    const archive = new Archiver('zip', {
      zlib: { level: 9 },
    });
    output.on('close', () => resolve());
    archive.on('error', (error: Error) => {
      throw error;
    });
    archive.pipe(output);
    [
      'iisnode.yml',
      'LICENSE',
      'npm-shrinkwrap.json',
      'package.json',
      'README.md',
      'server.js',
    ].forEach((file) => {
      archive.file(path.join(__dirname, '..', file), { name: file });
    });
    glob(path.join(__dirname, '..', 'dist', '**', '*'), (err: ?Error, files: string[]) => {
      if (err) {
        reject(err);
        return;
      }

      files.forEach((file) => {
        archive.file(file, { name: path.join('dist', last(file.split('dist'))) });
      });

      archive.finalize();
    });
  });
}

export function deploy() {
  const app = new Application({
    appName: process.env.AZURE_APP_NAME,
    username: process.env.AZURE_GIT_USERNAME,
    password: process.env.AZURE_GIT_PASSWORD,
    gitName: 'Automated Deployments',
    gitEmail: 'noreply@nhardy.id.au',
  });

  return app.deploy({
    archiveFilePath: path.resolve(__dirname, '..', '.tmp', 'app.zip'),
  });
}
