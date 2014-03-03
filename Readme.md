# Discography

JSON webservice can be found:
/api/v1/artists.json

The service supports jsonp by making a request to any endpoint with a callback query string parameter:
/api/v1/artists.json?callback=MyCallback

Artist resources can be updated by putting a json payload to the artist endpoint: PUT: /api/v1/artists/1.json

A successful PUT will result in a 200 response.

## Write a Test-Driven 'Discography' AngularJS Application

1. Use the data published here: http://ahowellem-test.nodejitsu.com/api/v1/artists.json When loaded, the app should render a clickable list of artist names.
2. A user should be able edit the list by adding wikipedia URLs for each artist. (The service will not persist the update immediately, but the app should be capable of making PUT update
requests)
3. When an artist name link is clicked then the list of albums for that artist should be displayed.
4. Please allow a maximum of 2hrs for this test and keep a note of actual time taken.