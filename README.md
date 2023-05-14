<img src="public/images/logo-1-transparent.png" align="right" width="125px"/>

Learn Flow API [![Licence](https://img.shields.io/badge/licence-MIT-a51931.svg?style=flat-square)](https://github.com/ousmane-diallo-sio/learnflow-api/blob/main/LICENSE)
==============

Learn Flow API – par [@Aaldn](https://github.com/Aaldn) [@ousmane-diallo-sio](https://github.com/ousmane-diallo-sio) [@theo-sio](https://github.com/theo-sio)

[![Node.js 20](https://img.shields.io/badge/Node.js-20.1-349934.svg?style=flat-square&logo=node.js)](https://symfony.com/5)
[![Express.js 4](https://img.shields.io/badge/Express.js-4.18-e5e8e4.svg?style=flat-square&logo=express)](https://getcomposer.org/)
[![MongoDB 10](https://img.shields.io/badge/MongoDB-6.0-48a248.svg?style=flat-square&logo=mongodb)](https://mariadb.org/)

API REST du projet [Learn Flow](https://github.com/Aaldn/learnflow-documentation).

### Documentation

  * [Documentation du projet](https://github.com/Aaldn/learnflow-documentation)

### Prérequis

  * [Docker](https://docs.docker.com/get-docker)
  * [Docker compose](https://docs.docker.com/compose/install)

> En cas de difficulté, reportez-vous à la documentation officielle de [Docker](https://docs.docker.com/).

## Installation

Tout d'abord, clonez ce dépôt puis placez-vous au sein du projet :

```bash
$ git clone https://github.com/ousmane-diallo-sio/learnflow-api
$ cd learnflow-api
```

Ensuite, créez un fichier `.env` à la racine du projet et ajoutez-y les informations nécessaires :

```
# Running on prod or dev
NODE_ENV=dev

# Mongo service variables
MONGO_INITDB_ROOT_USERNAME=<MONGO_USER>
MONGO_INITDB_ROOT_PASSWORD=<MONGO_PASSWORD>

# Express service variables
HOST=127.0.0.1
PORT=3000
MONGO_USER=learnflowuser
MONGO_PASSWORD=learnflowpwd
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_DB=learnflowdb
```

Enfin, construisez et lancez les conteneurs Docker :

```bash
$ docker-compose up --build
```

Vous pouvez maintenant accéder à l'application : [`http://localhost:3000`](http://localhost:3000)

## Fonctionnement

Voici les services déclarés dans le fichier `docker-compose.yml` :

* `mongo` : Le conteneur de la base de données MongoDB,
* `express` : Le conteneur Node.js incluant Express.js.

Les conteneurs en cours d'exécution sont donc les suivants :

```bash
$ docker-compose ps
SERVICE     NAME              PORTS                        COMMAND                    STATUS
mongo       learnflow_db      0.0.0.0:3000->3000/tcp       "docker-entrypoint.s…"     Up    
express     learnflow_api     0.0.0.0:27017->27017/tcp     "docker-entrypoint.s…"     Up    
```

La commande suivante vous permet d'entrer dans le shell d'un des conteneurs : 

```bash
$ docker exec -it <nom_du_conteneur> sh
```

## Licence

Voir le fichier [LICENSE](https://github.com/ousmane-diallo-sio/learnflow-api/blob/main/LICENSE) fourni.