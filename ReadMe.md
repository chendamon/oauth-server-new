## Oauth-Server-New
Simple Express Authorization Code Grant Example for **[Nextcloud](https://nextcloud.com/)**'s Custom App **[Social Login](https://github.com/zorn-v/nextcloud-social-login)** Based on module **[oauth2-server](https://npmjs.org/package/oauth2-server
)**.
#### Installation and Setup
1. `git clone` this Repo;
2. make sure that mongodb service running in your `env`;
3. `cd` into project root folder and run `nodemon start`;

#### Nextcloud's Social Login App
**[Social Login](https://github.com/zorn-v/nextcloud-social-login)** app *Makes possible create users and login via Telegram, OAuth or OpenID*, after install this app on Nextcloud, we can config a *Custom Oauth2* plugin this:

![Image text](https://github.com/chendamon/oauth-server-new/blob/master/md-img/custom_oauth2_plugin.png)

#### Authorization FLow
For authorization code grant mode,there are actually 3 kernel steps:
1. **`Authorize`**: *get authorizationCode;*
2. **`Token`**: *use authorizationCode to exchange accessToken;*
3. **`Authenticate`**: *use accessToken to get 'classified' information.*

I used **[oauth2-server](https://npmjs.org/package/oauth2-server
)** module to build my authorization flow.

**Authorize**

For authorize process, oauth2-server module uses so called `authorize-handler`（*`node-oauth-server/lib/handlers/authorize-handler.js`*）, in this part **Social Login** will `POST` a query to get authorization code, just like `http://server_addresss/oauth/authorize?response_type=code&client_id=_nextcloud&redirect_uri=redirect_uri&scope=&state=HA-GOVXLJMQZB7NW3FH8UYCA50RS9IDK26T14PE`, basic flow is:
1. **`getClient()`**: from `request.body` get `client_id` and `client_secret`,then get a client object, you need to implement this function in your own models;
2. **`getUser()`**: from `request.body` or `requset.session` get `user_id`,then get a user object, you need to implement this function in your own models;
3. **`generateAuthorizationCode()`**:use client object & user object generate one authorizationcode, module has done this for you;
4. **`saveAuthorizationCode`**: save authorization code, you need to implement this function in your own models;
5. oauth server return a response with code `http://redirect_uri&code=your_code&state=some_state`;
