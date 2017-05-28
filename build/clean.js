import path from 'path';
import del from 'del';


export default function clean() {
  return del([
    path.join('dist', '**', '*'),
    path.join('.tmp', '*'),
    `!${path.join('.tmp', '.gitignore')}`,
  ]);
}
