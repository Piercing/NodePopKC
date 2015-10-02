
# Nodepop 
**API que dará servicio a una app de venta de artículos de segunda mano**


##Scripts desde consola de comandos

<h4>Arrancar node en modo producción:</h4>

  * npm start (arranca por el puerto configurado para *'producción'*,  o en su defecto por el puerto 3000).

<h4>Arrancar node en modo desarrollo (dev):</h4>

* npm run dev 

**Nota:** arranca en modo *'desarrollo'*  y por el *'puerto 3000'* automáticamente.


<h4>Arrancar BBDD borrando tablas y cargando anuncios:</h4>

*  npm run installBD (arranca por el puerto configurado para *'producción'*,  o en su defecto por el puerto 3000).

##Arrancar mongodb por línea de comando

*	Situarse en la ruta donde se encuentre instalado nuestro mongodb y ejecutar 	por consola **/bin/mongo**, nos aparece el shell del **'cliente mongo'** .

	**Nota1:** para utilizar mongo desde nuestro código no hace falta tener arrancado el **'cliente mongo'**  por consola.
	
	**Nota2:** como alternativa a la consola podemos utilizar el cliente gráfico **'Robomongo'**


* Podemos ejecutar el archivo creado que contiene la ruta para iniciar el **'cliente de mongo'** , situándonos en la ruta de nuestra carpeta de mongodb y ejecutando el fichrero **./startMongo.sh** que contiene la ruta *'bin/mongo --dpath ./data/db --directoryperdb'* de nuestro **'cliente mongo'**

  	
##Instalar mongoose por línea de comando

* npm install mongoose --save