#!/bin/bash

# Iniciar el agente SSH
eval "$(ssh-agent -s)"


# Agregar la clave privada al agente SSH
ssh-add <(echo "$SSH_PRIVATE_KEY") <<< "$SSH_PASSPHRASE"
