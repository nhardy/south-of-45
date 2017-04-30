# Web Scaffold

The code behind [nhardy.id.au](https://nhardy.id.au/) is available here under the MIT license.

Please note that some of the images contained here are copyrighted, so if you do intend to fork this repo, keep this in mind. Content is also subject to copyright where appropriate.

## Key Facts

This project is a universal JavaScript React application. [Node.js](https://nodejs.org/) is used to render pages server-side.

## Development

Make sure you're using Mac/Linux. Many of the npm dependencies for this project don't play nicely with Windows. I will be looking into whether Windows compatibility is an option in the near future.

Make sure you have [Node Version Manager](https://github.com/creationix/nvm) (nvm) installed.
Run `nvm install 6` to install the latest version of Nodejs.

Make sure you `npm install` or `yarn install` to download and install this project's dependencies.

### Running

To start the server in development mode, use `npm run dev`. The server will start on port `8000` by default, but you can set the `PORT` environment variable to change this. You shouldn't need to restart the server in this mode even if you make changes, as the server will update after you save. Some functionality will even update without you having to refresh your browser. If you run into any issues though, it might be a good idea to refresh the page.

## "Production" mode

You may notice that styles appear to _jump_ when you load the page in development mode. This is because styles are injected into the page by the JavaScript bundle to make hot reloading of styles possible. Production mode, on the other hand, does not do this.

`npm run prod` will start the server in production mode. This slower and won't automatically reload, but makes some optimisations, such as separating out the CSS into a separate file, and minifying the JavaScript bundle.

## Deployment

This project is currently set up for easy deployment with [Azur](https://www.npmjs.com/package/azur) to the [Azure App Service](https://azure.microsoft.com/services/app-service/), but could easily be deployed to other cloud infrastucture such as [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) through [Beanstalkify](https://github.com/liamqma/beanstalkify).

Deployment with Docker is on the roadmap.

## Problems?

If you're experiencing an unexplained Node crash when running `npm run dev` or `npm run prod` on Linux, try

`echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

See [Nodemon#214](https://github.com/remy/nodemon/issues/214) for more information.
