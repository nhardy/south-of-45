import fs from 'fs';
import path from 'path';
import del from 'del';
import selfsigned from 'selfsigned';


export default async function ensureCertificate() {
  const certPath = path.resolve(__dirname, '..', 'src', 'server', 'server.pem');

  let certExists = fs.existsSync(certPath);

  if (certExists) {
    const certStat = fs.statSync(certPath);
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const now = new Date();

    // If the certificate is more than 30 days old, remove it
    if ((now - certStat.ctime) / ONE_DAY > 30) {
      // eslint-disable-next-line no-console
      console.log('SSL Certificate is more than 30 days old. Removing.');
      del.sync([certPath], { force: true });
      certExists = false;
    }
  }

  if (!certExists) {
    // eslint-disable-next-line no-console
    console.log('Generating SSL Certificate');
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    const pems = selfsigned.generate(attrs, {
      algorithm: 'sha256',
      days: 30,
      keySize: 2048,
    });

    fs.writeFileSync(certPath, pems.private + pems.cert, { encoding: 'utf-8' });
  }
}
