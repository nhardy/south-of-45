import del from 'del';


export default function clean() {
  return del(['dist/**/*', '.tmp/*', '!.tmp/.gitignore']);
}
