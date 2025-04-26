# Pokecard App

Pokecard app est une application regroupant toutes les cartes du TCG Pokémon et permet aux fans de voir les cartes existantes, mais également de les ajouter à leurs favoris ou aux cartes qu'ils possèdent déjà afin de pouvoir faire un suivi de leur collection.

## Technologies utilisées
React JS avec axios pour la gestion de l'API, react-navigation pour la navigation de l'application et la navbar, react bootsplash pour l'affichage d'une animation au démarrage de l'application.

## Fonctionnalités principales
- Mise en place d'une navbar reprenant les onglets importants sur une application de gestion de cartes
- Mise en place d'un onglet `favoris` permettant de gérer et d'avoir une vue sur les cartes que l'on souhaiterait avoir.
- Egalement dans la partie profil, possibilité de voir les cartes que l'on possède déjà
- Le tout, si j'ai le temps, avec des filtres pour permettre une recherche plus avancée pour pouvoir aller plus vite si l'on souhaite compléter un set en particulier, entre autre.

## API utilisée
https://tcgdex.dev/ en format API REST JSON qui elle est publique par rapport à la première que je souhaitais utiliser qui est https://docs.pokemontcg.io/

## Instruction 

On vient ouvrir un simulateur sur android studio et on le lance, depuis notre IDE on se place sur le projet ou on l'ouvre directement. Quand le chemin est le bon dans le terminal, il suffit de lancer la commande `npx react-native run-android` afin d'installer l'application sur notre simulateur. Une fois qu'elle est installée, si on souhaite la relancer, il suffira de faire un `npx react-native start` toujours depuis le terminal de l'IDE.


## Screeenshots 
npm run android
