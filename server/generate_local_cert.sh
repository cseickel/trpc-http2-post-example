#!/bin/bash

# Generate a self-signed certificate for localhost

openssl req -x509 -newkey rsa:4096 \
  -keyout localhost.key \
  -out localhost.crt \
  -days 365 -nodes \
  -subj '/CN=localhost' \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
