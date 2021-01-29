#!/bin/bash -e
cd wordpress/wp-content/plugins
wget https://github.com/woocommerce/woocommerce/releases/download/4.7.1/woocommerce.zip
unzip woocommerce.zip
rm woocommerce.zip