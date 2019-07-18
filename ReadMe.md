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

for authorize, oauth2-server module use `authorize-handler`,basic flow
