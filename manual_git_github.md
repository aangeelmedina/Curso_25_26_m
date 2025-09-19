# Manual Configurar github por ssh

## Inicialización del repositorio
con el comando:
```bash 
git init
```
inicializamos un repositorio

## Comprobacion de Clave ssh
Comporbamos si tenemos la clave 
```bash
ls -la ~/.ssh/
```
 y comprobamos que no haya una clave ya generada

(en caso de que no) generamos una clave ssh con el siguiente comando:
```bash
ssh-kygen -t ed25519 -C "correo@gmail.com"
```
## Intalacion de la clave en gitHub
En el perfil de gitHub en settings en el apartado SSH KEY tendremos que añadir la clave publica que es el id acabadao en .pub
![imagen añadir clave ssh](/img/githubsshkey.png)

## Añadir la clave agent
Para win11 debemos iniciar una powershell como administrador para lanzar estos comandos
```bash
Get-Service ssh-agent | Set-Service -StartupType Automatic 
Start-Service ssh-agent 
```
![imagen añadir clave ssh](/img/capturaAddAgentWin11.png)


## Verificar la clave
para verificar que esta todo bien deberemos lanzar el sigiente comando
```bash
ssh -T git@github.com
```
y nos deberia salir una salida asi
![imagen verificacion ssh](/img/capturaVerificacion.png)



Made by: Angel Ortega Medina