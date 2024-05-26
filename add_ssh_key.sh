#!/bin/bash

# Iniciar el agente SSH
eval "$(ssh-agent -s)"

# Agregar la clave privada al agente SSH
ssh-add - <<< "${SSH_PASSPHRASE}"
