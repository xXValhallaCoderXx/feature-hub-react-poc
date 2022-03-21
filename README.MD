## Running Locally

- navigate to `featurehub-local` and run `docker-compose up`



admin@admin.com 
1234567

### Note
- On Chrome, there is a false red flag in the network,`Refused to get unsafe header "etag"` (On Polling mode only)
- On Firefox / Safari this is fine

The short answer is that you can't do anything to correct it.

This error is browser implementation dependent and you can safely ignore it. It has to do with CORS configuration. One of the response headers is "ETag" which some browsers/versions mistakenly identify as dangerous. As far as I know there is nothing you can do to make the console error go away via your code - ETag is used to help with cache on Edge server for FeatureHub.

**If you really want to get rid of it - could bypass it through a proxy**

- https://github.com/featurehub-io/featurehub-javascript-sdk