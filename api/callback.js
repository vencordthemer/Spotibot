const SpotifyWebApi = require('spotify-web-api-node');

// Initialize the Spotify API with your credentials
const spotifyApi = new SpotifyWebApi({
  clientId: 34be1f4fbc76473682997729c620e7ad,
  clientSecret: fa727c2034464b63bc5af259a9669a63,
  redirectUri: spotibot-plum.vercel.app/callback
});

export default async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange the authorization code for an access token and refresh token
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body['access_token'];
    const refreshToken = data.body['refresh_token'];

    // Set the access and refresh tokens on the Spotify API object
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    // Respond to the user
    res.send('Successfully logged in to Spotify. You can now use the volume command.');
  } catch (err) {
    res.send('Failed to log in to Spotify.');
    console.error('Something went wrong!', err);
  }
};
