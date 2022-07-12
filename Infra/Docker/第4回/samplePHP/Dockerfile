FROM debian
EXPOSE 80

# 1.    package install 
# 2.    Apache and php install
# 3,4.  delete package to minimize container-size
# 5.    to show index.php not index.html
RUN apt update \    
    && apt install -y apache2 php libapache2-mod-php \
    && apt clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm /var/www/html/index.html 
    
COPY index.php /var/www/html/
CMD /usr/sbin/apachectl -DEFOREGROUND