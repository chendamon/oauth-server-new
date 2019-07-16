#### authorize handler
只接收 oauth-server 定义的 request，response
request应该包含request.body.client_id || request.query.client_id; request.body.redirect_uri || request.query.redirect_uri;
passwordgranttype里边才有getUser的具体实现，需要request里边有
