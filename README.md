# OSC — Jeu du tableau périodique

Jeu de déduction chimique : trouvez l'élément mystère en un minimum de coups.

## Concept

Vous êtes face à un tableau périodique interactif. Un élément est tiré au hasard — c'est **l'élément mystère**. Votre objectif : le deviner en cliquant sur les cases du tableau.

### Déroulement d'une partie

1. **Avant le premier choix** — Aucun indice. Vous partez de zéro.
2. **Après chaque choix** — La **carte d'identité** de l'élément sélectionné s'affiche. Elle liste ses caractéristiques (origine du nom, stabilité, découverte, etc.).
3. **Indices par couleur** — Pour chaque caractéristique, le jeu indique si elle est **similaire** ou **différente** par rapport à l'élément mystère (code couleur).
4. **Affiner ses hypothèses** — En croisant ces indices, vous faites un nouveau choix. Répétez jusqu'à trouver l'élément mystère.

**But :** identifier l'élément mystère en **le moins de coups possible**.

## Carte d'identité — Caractéristiques

Chaque élément possède une carte d'identité composée des catégories suivantes. Ce sont les critères utilisés pour les comparaisons et les indices.

### Origine du nom

| Catégorie | Description |
|-----------|-------------|
| Personne | Nommé d'après une personne réelle |
| Personnage | Nommé d'après un personnage (mythologie, fiction…) |
| Organisation | Nommé d'après une institution ou un groupe |
| Localité | Nommé d'après un lieu géographique |
| Autre | Autre origine |

Référence : [List of chemical element name etymologies](https://en.wikipedia.org/wiki/List_of_chemical_element_name_etymologies)

### Stabilité

| Catégorie | Indication visuelle |
|-----------|---------------------|
| Stable | Cyan |
| Radioactif modéré | Vert + jaune |
| Radioactif majeur | Orange |
| Radioactif extrême | Rouge + violet |

Référence : [List of elements by stability of isotopes](https://en.wikipedia.org/wiki/List_of_elements_by_stability_of_isotopes#/media/File:Periodic_Table_Radioactivity.svg)

### État (pression et température ambiantes)

Liquide · Solide · Gaz · Non défini

Source : [PubChem](https://pubchem.ncbi.nlm.nih.gov/)

### Découverte

Avant le XVIIIᵉ siècle · XVIIIᵉ · XIXᵉ · XXᵉ · XXIᵉ

Source : [PubChem](https://pubchem.ncbi.nlm.nih.gov/)

### Importance biologique humaine

| Catégorie | Description |
|-----------|-------------|
| CHNOPS | Carbone, hydrogène, azote, oxygène, phosphore, soufre |
| Macroélément | Éléments en quantité (quantity elements) |
| Microélément | Éléments traces essentiels (essential trace elements) |
| Rôle incertain | Rôle biologique peu ou pas établi |
| Non essentiel | Pas essentiel à la vie humaine |

Référence : [Mineral (nutrient)](https://en.wikipedia.org/wiki/Mineral_(nutrient))

### Synthèse

Big Bang · Étoile mourante · Supernova · Collision de rayons cosmiques · Fusion d'étoiles à neutrons · Désintégration radioactive · Artificiel · Multiple

Référence : [NASA SVS — Origins of the Elements](https://svs.gsfc.nasa.gov/13873/)

## Développement

Stack : React, TypeScript, Vite, Tailwind CSS.

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
npm run preview  # prévisualiser le build
```

## Déploiement

Le site est publié sur **GitHub Pages** :

- **Site en ligne :** [https://shinshin59.github.io/osc/](https://shinshin59.github.io/osc/)
- **Dépôt :** [github.com/ShinShin59/osc](https://github.com/ShinShin59/osc)

Chaque push sur `main` déclenche le workflow [Deploy to GitHub Pages](.github/workflows/deploy.yml) : build Vite (`npm ci` + `npm run build`), puis publication du dossier `dist/`.

Pour lancer un déploiement manuel : onglet **Actions** du dépôt → **Deploy to GitHub Pages** → **Run workflow**.

Le chemin de base Vite est `/osc/` (`vite.config.ts`), aligné sur le nom du dépôt GitHub Pages.

### État actuel

- Tableau périodique interactif (118 éléments)
- Logique de jeu et cartes d'identité : en cours d'implémentation
