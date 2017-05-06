import { noop } from 'lodash-es';
import yargs from 'yargs';

import clean from './clean';
import serve from './serve';
import { webpackProd, webpackClientDev, webpackServerDev } from './webpack';
import { zip, deploy } from './deploy';


function runTask(name, runner: () => Promise<any>) {
  return () => {
    console.log(`[${name}] Starting...`);
    return runner()
      .then(() => {
        console.log(`[${name}] Completed successfully.`);
      })
      .catch((error) => {
        console.error(`[${name}] Failed to complete. Reason:`);
        console.error(error);
        throw error;
      });
  };
}

// `yargs` uses a getter function to execute
// eslint-disable-next-line no-unused-expressions
yargs.command('*', 'Informational message', () => {}, () => {
  console.log('Run `npm run dev` for the dev task'); // eslint-disable-line no-console
})
  .command('dev', 'Builds the application in development mode, starts the dev server and watches for changes', () => {}, () => {
    Promise.resolve()
      .then(runTask('clean', clean))
      .then(runTask('webpack-client-dev', webpackClientDev))
      .then(runTask('wepack-server-dev', webpackServerDev))
      .then(runTask('serve', serve))
      .catch(noop);
  })
  .command('prod', 'Builds the application in production mode and starts the server', () => {}, () => {
    Promise.resolve()
      .then(runTask('clean', clean))
      .then(runTask('webpack-prod', webpackProd))
      .then(runTask('serve', serve))
      .catch(noop);
  })
  .command('deploy', 'Builds and deploys the application to Azure App Service', () => {}, () => {
    Promise.resolve()
      .then(runTask('clean', clean))
      .then(runTask('webpack-prod', webpackProd))
      .then(runTask('zip', zip))
      .then(runTask('deploy', deploy))
      .catch(noop);
  })
  // .demandCommand()
  .help()
  .argv;
