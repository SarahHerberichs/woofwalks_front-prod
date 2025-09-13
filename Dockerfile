events {
    worker_connections  1024;
}
http {
    server {
        listen 80;
        server_name _;

        root /usr/share/nginx/html;
        index index.html;

        # Gérer les fichiers statiques comme le favicon.
        location = /favicon.ico {
            log_not_found off;
            access_log off;
        }

        # Transférer les requêtes vers l'API back-end Symfony.
        location /api/ {
            proxy_pass http://woofwalks-back-prod.railway.internal:9000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Gérer toutes les autres requêtes et rediriger vers le front-end React.
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
