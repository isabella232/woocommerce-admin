# WooCommerce Docker Setup

This is a opinionated Docker setup for local WordPress, WooCommerce, and WooCommerce Admin development. 

## Getting Started

1. Clone this repository.
2. Make `config.sh` executable by running `chmod +x config.sh`
3. Run `./config.sh`

You're now ready to run the Docker.

## Starting WordPress Development
## Starting WooCommerce Development
## Starting WooCommerce Admin Development

1. Run `./recipes/wc-4.7.1-dev.sh`
2. Run `Make docker-up`
3. Run `Make wc-admin-setup`
4. Run `Make admin-npm-start` to start watching the files
5. That's it! Access http://localhost:888




## Accessing Mysql

1. Open your choice of Mysql tool.
2. Use the following values to access the Mysql container 

Host: 127.0.0.1
Username: woocommerce_dev
Password: woocommerce_dev
Port: 3309

If you have changed the port number from .env, please refer to the .env and use the value from the DEV_MYSQL_PORT.