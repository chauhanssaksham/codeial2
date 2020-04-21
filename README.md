# Production NOTES

- create a file production.env in ./environment folder, with all the keys
- Add NGINX configs at /etc/nginx/sites-available/default and run<br>
    > sudo systemctl start nginx

<hr>

# Everytime we have to make changes on the AWS server
- make changes locally and push
- rm -rf node_modules/ public/ on the server
- gulp build on the server
- pm2 start pm2.config.json on the server
