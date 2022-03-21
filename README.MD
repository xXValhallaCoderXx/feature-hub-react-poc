## Running Locally

- navigate to `featurehub-local` and run `docker-compose up`
- Go to `localhost:8085`
- First time must enter a user name and password any of your choice to create a user
- On top right once logged in there is a `Rocket Icon` click that and follow the steps to setup
- Create some features
- Start the react app

## Note 
- User the server evaluate key - the client one will expose all feature names available via an API which you may not want
### Note
- On Chrome, there is a false red flag in the network,`Refused to get unsafe header "etag"` (On Polling mode only)
- On Firefox / Safari this is fine

The short answer is that you can't do anything to correct it.

This error is browser implementation dependent and you can safely ignore it. It has to do with CORS configuration. One of the response headers is "ETag" which some browsers/versions mistakenly identify as dangerous. As far as I know there is nothing you can do to make the console error go away via your code - ETag is used to help with cache on Edge server for FeatureHub.

**If you really want to get rid of it - could bypass it through a proxy**

- https://github.com/featurehub-io/featurehub-javascript-sdk