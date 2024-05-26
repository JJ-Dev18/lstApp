#!/usr/bin/expect -f

# Cargar la clave privada en ssh-agent
spawn ssh-add ~/.ssh/id_rsa
expect "Enter passphrase for ~/.ssh/id_rsa:"
send "$env(SSH_PASSPHRASE)\r"
interact
