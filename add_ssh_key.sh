#!/usr/bin/expect -f

# Iniciar el agente SSH
spawn ssh-agent -s
expect "Agent pid"

# Agregar la clave privada al agente SSH
spawn ssh-add ~/.ssh/id_rsa
expect "Enter passphrase for ~/.ssh/id_rsa:"
send "$env(SSH_PASSPHRASE)\r"
interact