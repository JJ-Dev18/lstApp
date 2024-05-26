#!/bin/bash

# Iniciar el agente SSH
eval "$(ssh-agent -s)"

# Agregar la clave privada al agente SSH
echo "$SSH_PRIVATE_KEY" | ssh-add -
