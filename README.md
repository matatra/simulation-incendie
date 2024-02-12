Simulation de la propagation d'un incendie

Dans le fichier config.js, on peut changer:
  - la taille de la grille (nombre de ligne et de colonnes)
  - la probabilité qu'une cases adjacentes a une cases en feu s'enflamme
  - La/les cases de départs de l'incendie (il esst egalement possible de clicquer sur les cases de la grilles pour initialiser un incendie sur ces cases)

Projet réaliser en HTML/CSS et JavaScript avec NodeJS (20.11.0)
Browserify (17.0.0) est utilisé pour permettres la compilation des modules NodeJS dans le navigateur

Une fois le fichier config.js modifier avec les valeurs voulu, executer:
browserify js/main.js -o ../build/bundle.js
