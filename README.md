# ERN 2026 – EFFUSION
### Invitation Électronique · Assemblée des Nations (ADN)

---

## Structure du projet

```
ADN-E_INVITATION/
│
├── index.html          ← Page principale (One Page)
├── style.css           ← Styles personnalisés + animations
├── script.js           ← JavaScript vanilla complet
│
└── assets/
    ├── logo/
    │   └── logo.png           ← Logo ADN
    ├── hero/
    │   └── hero.jpg           ← Image principale hero
    ├── speakers/
    │   ├── raymond.jpg        ← Photo Prophète Raymond Palenfo
    │   └── marie-noelle.jpg   ← Photo Prophétesse Marie Noëlle Palenfo
    ├── sliders/
    │   ├── tribus/            ← Images tenues des tribus
    │   ├── opening/           ← Images tenues d'ouverture
    │   └── beach/             ← Images pack EREN Beach
    └── beach/
        └── assinie.jpg        ← Image plage d'Assinie
```

---

## Lancer le site

Ouvrez simplement `index.html` dans votre navigateur.

> Aucun serveur, aucune installation requise.

Pour un meilleur résultat en local (éviter les restrictions CORS sur les images),
utilisez VS Code avec l'extension **Live Server**, ou lancez :

```bash
# Python (si installé)
python -m http.server 8080
# Puis ouvrez http://localhost:8080
```

---

## Ajouter vos images

Placez simplement les fichiers dans les dossiers correspondants :

| Fichier | Emplacement |
|--------|-------------|
| Logo ADN | `assets/logo/logo.png` |
| Image Hero | `assets/hero/hero.jpg` |
| Photo Raymond Palenfo | `assets/speakers/raymond.jpg` |
| Photo Marie Noëlle Palenfo | `assets/speakers/marie-noelle.jpg` |
| Tenues des tribus | `assets/sliders/tribus/tribu-1.jpg` … |
| Tenues ouverture | `assets/sliders/opening/opening-1.jpg` … |
| Pack EREN Beach | `assets/sliders/beach/beach-1.jpg` … |
| Photo Assinie | `assets/beach/assinie.jpg` |

> Les images s'affichent automatiquement dès qu'elles sont présentes dans les bons dossiers.

---

## Personnalisation

### Liens Google Form
Dans `index.html`, remplacez `https://forms.google.com/xxxxx` par vos vrais liens.

### Liens Google Maps
Remplacez `https://maps.google.com/xxxxx` par le lien de localisation de la Cité de l'Abondance.

### Réseaux sociaux
Dans le footer et les cartes orateurs, remplacez `href="#"` par vos vrais liens.

### Contact
Le numéro `07 11 32 50 86` est déjà en place. Modifiez si nécessaire dans `index.html`.

---

## Fonctionnalités incluses

- Loader animé au démarrage
- Particules lumineuses en background
- Curseur personnalisé (desktop)
- Navbar fixe avec glassmorphism (disparaît/réapparaît au scroll)
- Menu mobile responsive
- Smooth scroll
- Animations d'apparition au scroll (reveal)
- Compte à rebours vers le 20 Mai 2026
- Parallaxe légère sur le hero
- 3 Sliders/carousels avec autoplay, swipe tactile, dots, flèches
- Section programme avec timeline
- Section EREN Beach immersive
- Bouton retour en haut
- Glow effects sur les cartes au survol
- Placeholders propres pour toutes les images

---

## Stack technique

- **HTML5** sémantique
- **Tailwind CSS** (Play CDN) avec config custom
- **JavaScript Vanilla** (aucune dépendance)
- **Font Awesome 6** (icônes)
- **Google Fonts** · Inter + Playfair Display

---

## Hébergement

Ce site statique peut être hébergé gratuitement sur :
- **Netlify** (glisser-déposer le dossier)
- **Vercel** (import GitHub)
- **GitHub Pages**
- Tout hébergeur web classique (cPanel, FTP…)

---

*ERN 2026 – EFFUSION · L'Esprit Pour le Réveil des Nations · 2ème Édition*
*20 – 25 Mai 2026 · Cité de l'Abondance · Abidjan, Côte d'Ivoire*
