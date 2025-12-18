# 🌍 TravelMate - Application de Gestion de Voyages

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Application mobile multiplateforme (iOS/Android/Web) de gestion de voyages développée avec React Native, Expo et TypeScript.

**🔗 Repository GitHub** : [https://github.com/Boudabous2001/ReactNativeAppTrips](https://github.com/Boudabous2001/ReactNativeAppTrips)  
**🌐 Backend API** : [https://reactnativeapptrips.onrender.com](https://reactnativeapptrips.onrender.com)

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription et connexion avec validation complète
- Validation email (regex : `^[^\s@]+@[^\s@]+\.[^\s@]+$`)
- Validation mot de passe (minimum 6 caractères)
- Confirmation de mot de passe avec vérification
- Gestion de session sécurisée avec AsyncStorage

### 🗺️ Gestion de Voyages
- **Création de voyages** avec DatePicker natif iOS/Android
- **Liste intelligente** avec 4 onglets : Tous, À venir, Passés, Favoris
- **Recherche en temps réel** par titre ou destination
- **Système de favoris** avec toggle interactif et animation
- **Détails complets** pour chaque voyage (dates, destination, photos)
- **Upload de photos** compatible mobile & web

### 🌐 Internationalisation (i18n)
- 🇫🇷 Français (langue par défaut)
- 🇬🇧 English
- Changement de langue en temps réel depuis le profil
- **100% de l'interface traduite** (auth, trips, home, profile, notifications)
- 200+ clés de traduction

### 📱 Interface Utilisateur
- Design moderne avec **gradients Linear Gradient**
- Navigation fluide avec **Expo Router** (file-based routing)
- **Safe Area Context** pour gérer les zones sûres iOS/Android
- Composants réactifs et optimisés
- Support **iOS, Android et Web**
- Animations et transitions fluides

### 🔔 Notifications Push
- Notifications push locales (iOS/Android uniquement)
- Notifications immédiates et programmées
- Gestion des badges applicatifs
- Interface de test complète avec logs en temps réel
- **Note** : Notifications non supportées sur Expo Go (nécessite Development Build)

### 📊 Statistiques
- **Dashboard dynamique** avec 3 statistiques en temps réel :
  - Nombre total de voyages
  - Nombre total de photos
  - Nombre de pays visités
- **Voyages à venir** avec compte à rebours en jours
- **Activité récente** (dernières actions)

## 🛠️ Stack Technique

### Frontend
- **React Native** - Framework mobile cross-platform
- **Expo SDK 52** - Plateforme de développement
- **TypeScript** - Typage statique pour robustesse
- **Expo Router** - Navigation file-based moderne
- **i18next + react-i18next** - Internationalisation
- **React Native Safe Area Context** - Gestion des zones sûres
- **Expo Linear Gradient** - Gradients pour design moderne
- **Expo Image** - Optimisation et cache d'images
- **Expo Image Picker** - Sélection de photos (mobile & web)
- **@react-native-community/datetimepicker** - Sélecteur de dates natif

### Backend
- **Node.js** + **Express.js** - API REST
- **JSON File Storage** - Persistance des données
- **Déployé sur Render.com** - Backend hébergé en cloud
- **CORS activé** - Accessible depuis mobile/web

### Validation & Utilitaires
- **Custom validation utilities** (`utils/validation.ts`)
- Validation email, password, dates, destinations
- Messages d'erreur localisés

## 📋 Prérequis

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **Expo CLI** (installation automatique via npx)
- **Expo Go** app (pour tester sur mobile) - [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🚀 Installation et Lancement

### 1. Cloner le projet
```bash
git clone https://github.com/Boudabous2001/ReactNativeAppTrips.git
cd ReactNativeAppTrips
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Démarrer l'application
```bash
npx expo start
```

**Options de lancement :**
- Appuyez sur **`i`** → iOS Simulator (nécessite Xcode sur macOS)
- Appuyez sur **`a`** → Android Emulator (nécessite Android Studio)
- **Scannez le QR code** avec Expo Go sur votre téléphone
- Appuyez sur **`w`** → Ouvrir dans le navigateur web

### 4. Backend

**Aucune installation nécessaire !** 🎉  
Le backend est déjà déployé sur Render : **https://reactnativeapptrips.onrender.com**

**Endpoints disponibles :**
- `GET /health` - Health check
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/trips` - Liste des voyages
- `POST /api/trips` - Créer un voyage
- `PATCH /api/trips/:id/favorite` - Toggle favori

## 📂 Structure du Projet
```
ReactNativeAppTrips/
├── app/                          # Screens (Expo Router)
│   ├── (tabs)/                   # Navigation à onglets principale
│   │   ├── index.tsx            # 🏠 Accueil (dashboard + stats)
│   │   ├── trips.tsx            # 🗺️ Liste des voyages
│   │   ├── profile.tsx          # 👤 Profil utilisateur
│   │   └── notification.tsx     # 🔔 Tests notifications
│   ├── modal/
│   │   └── add-trip.tsx         # ➕ Modal création voyage
│   ├── trip/
│   │   └── [id].tsx             # 📋 Détails d'un voyage
│   ├── login.tsx                # 🔐 Connexion
│   ├── register.tsx             # 📝 Inscription
│   └── _layout.tsx              # Layout racine avec i18n
├── components/                   # Composants réutilisables
│   └── language-selector.tsx    # 🌐 Sélecteur de langue FR/EN
├── contexts/                     # Contexts React
│   └── auth-context.tsx         # Authentification globale
├── hooks/                        # Hooks personnalisés
│   ├── use-trips.ts             # Gestion des voyages (CRUD + favoris)
│   ├── use-notifications.ts     # Gestion des notifications
│   └── use-offline.ts           # Détection mode offline
├── services/                     # Services API
│   ├── api.ts                   # Client API centralisé
│   ├── auth.ts                  # Service authentification
│   ├── notification.ts          # Service notifications
│   └── offline.ts               # Service offline
├── i18n/                         # Internationalisation
│   └── config.ts                # Configuration i18next (FR/EN)
├── utils/                        # Utilitaires
│   ├── validation.ts            # Validations formulaires (email, password, dates)
│   └── env.ts                   # Variables d'environnement
├── assets/                       # Assets (images, fonts)
│   └── images/                  # Images par défaut (Paris, Tokyo, Bali)
├── data/                         # Données backend (si local)
│   └── trips.json               # Base de données voyages
├── server-simple.js             # Backend Node.js (déployé sur Render)
├── package.json                 # Dépendances npm
├── tsconfig.json                # Configuration TypeScript
├── app.json                     # Configuration Expo
└── README.md                    # 📖 Ce fichier
```

## 🎨 Captures d'Écran & Fonctionnalités Détaillées

### 🏠 Écran d'Accueil (Dashboard)
- **Salutation personnalisée** avec nom de l'utilisateur
![Image](https://github.com/user-attachments/assets/f147c8b7-8e27-41e8-8753-1d2e9eddc19c)
- **3 statistiques en temps réel** :
  - Nombre de voyages / Nombre de photos / Pays visités
    ![Image](https://github.com/user-attachments/assets/61397aab-9396-4f70-92c5-ef7d8aee9c14)
- **Liste des prochains voyages** (3 maximum) avec compte à rebours
  ![Image](https://github.com/user-attachments/assets/d4318423-f882-41e5-bc6e-686bbf940160)

- **Quick Actions** : Nouveau voyage, Ajouter photo, Explorer
  ![Image (1)](https://github.com/user-attachments/assets/f2c70351-796e-4a68-a636-b21179e66d7b)

- **Activité récente** : Dernières actions utilisateur
![Image (1)](https://github.com/user-attachments/assets/888d6089-38f3-4f50-ac02-3899410f5aef)

### 🗺️ Liste des Voyages
- **4 onglets dynamiques** :
  - **Tous** : Tous les voyages
    ![Image (2)](https://github.com/user-attachments/assets/1efa2217-0a3e-4821-b3a4-56ea0176d3bb)

  - **À venir** : Voyages futurs
    ![Image (4)](https://github.com/user-attachments/assets/97852f5f-3c87-4638-be8d-3f045306647c)
    
  - **Favoris** : Voyages marqués comme favoris
    ![Image (3)](https://github.com/user-attachments/assets/6ddbc098-dd5d-43c8-a94c-77d5f6a28fc4)

- **Barre de recherche** en temps réel (titre + destination)
  ![Image (5)](https://github.com/user-attachments/assets/78023945-7bdb-438c-b88f-fdb53228ee53)

- **Bouton filtre** (UI préparé)
  ![Image (5)](https://github.com/user-attachments/assets/e9aadbb3-9309-460c-ae0b-087ed777d6fc)

### ➕ Création de Voyage
- **DatePicker natif** iOS/Android (plus d'erreur de saisie manuelle !)
- Validation automatique : date de fin > date de début
- Upload de photo avec prévisualisation
- Formatage de date localisé
- Messages d'erreur contextuels
  ![Image (6)](https://github.com/user-attachments/assets/989fbdfb-f2bb-4329-878a-ce90ea6382d5)

![Image (7)](https://github.com/user-attachments/assets/88200487-eb7e-4ea8-ad44-ee59fb13cf0c)
![Image (8)](https://github.com/user-attachments/assets/d6f3614d-051a-4149-b78e-df8551de46aa)

### 🔐 Authentification
- **Login** :
  - Validation email (regex complète)
  - Validation password (min 6 caractères)
  - Affichage/masquage du mot de passe (icône œil)
  - Messages d'erreur en rouge sous chaque champ
    ![Image (15)](https://github.com/user-attachments/assets/c2acd5aa-95b4-449e-a40f-5f97e0278289)


- **Register** :
  - Validation nom (min 2 caractères)
  - Confirmation de mot de passe
  - Vérification de correspondance
  - Création de compte avec feedback
![Image (16)](https://github.com/user-attachments/assets/838b1a0e-fd33-424c-ae80-a3fbf6e32bfb)

### 👤 Profil
- **Carte utilisateur** avec avatar emoji
- **3 statistiques** : Voyages, Photos, Favoris
- **Sélecteur de langue** : FR 🇫🇷 / EN 🇬🇧
- **Déconnexion** avec confirmation
![Image (10)](https://github.com/user-attachments/assets/15bb6ba2-b9bc-4811-85ae-d5b89894c28b)
![Image (12)](https://github.com/user-attachments/assets/7f120028-dde3-4f29-b042-a2139c6a989a)

### 🌐 Internationalisation
**Toutes les pages sont traduites :**
- Authentification (login, register, erreurs)
- Accueil (salutations, statistiques, actions)
- Voyages (onglets, recherche, messages vides)
- Création de voyage (formulaire, validations)
- Profil (statistiques, déconnexion)
- Notifications (tous les boutons et messages)
![Image (9)](https://github.com/user-attachments/assets/9e99b2d5-b2eb-41a9-ab3d-e0a777da741a)
![Image (11)](https://github.com/user-attachments/assets/966ec45b-5726-4bef-9a80-9b9e3cec385c)


## 🧪 Comment Tester

### Sur Mobile (Recommandé)
1. Installer **Expo Go** :
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Lancer l'app : `npx expo start`

3. Scanner le **QR code** affiché dans le terminal avec :
   - **iOS** : App Appareil Photo native
   - **Android** : Expo Go directement

4. L'app se charge automatiquement sur votre téléphone ! 📱

### Sur Navigateur (Tester rapidement)
1. Lancer : `npx expo start`
2. Appuyer sur **`w`**
3. L'app s'ouvre dans Chrome/Firefox

### Sur Simulateur/Émulateur
- **iOS Simulator** : Appuyer sur **`i`** (nécessite macOS + Xcode)
- **Android Emulator** : Appuyer sur **`a`** (nécessite Android Studio)

## 🔑 Comptes de Test

Pour tester rapidement, vous pouvez utiliser :

**Email** : `test@example.com`  
**Password** : `password123`

Ou créer un nouveau compte via l'écran d'inscription ! ✨

## 🌍 Architecture Backend

### API REST Déployée
**Base URL** : `https://reactnativeapptrips.onrender.com`

### Endpoints Disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Health check API |
| POST | `/api/auth/login` | Connexion utilisateur |
| POST | `/api/auth/register` | Inscription utilisateur |
| GET | `/api/trips` | Liste des voyages |
| POST | `/api/trips` | Créer un nouveau voyage |
| GET | `/api/trips/:id` | Détails d'un voyage |
| PATCH | `/api/trips/:id/favorite` | Toggle favori |

### Données Persistées
Les données sont stockées dans `data/trips.json` sur le serveur Render.

**⚠️ Note** : Les données peuvent être réinitialisées lors du redémarrage du serveur (limitation de l'offre gratuite Render).

## 🎯 Validations Implémentées

### Email
```typescript
Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
Exemples valides: user@example.com, test.user@mail.co
Exemples invalides: user@, @example.com, user@.com
```

### Mot de passe
```typescript
Minimum: 6 caractères
Confirmation: Doit correspondre au mot de passe
Affichage/masquage: Icône œil cliquable
```

### Dates
```typescript
Format: YYYY-MM-DD (via DatePicker natif)
Validation: date_fin > date_début
Affichage: Format localisé (ex: "20 déc. 2024")
```

### Destination
```typescript
Format recommandé: "Ville, Pays"
Exemples: "Paris, France" | "Tokyo, Japon"
```

## 🐛 Problèmes Connus & Solutions

### ❌ Problème : "Network request failed"
**Cause** : Backend Render en veille (offre gratuite)  
**Solution** : Attendre 30-60 secondes, le backend se réveille automatiquement

### ❌ Problème : Notifications ne fonctionnent pas
**Cause** : Expo Go ne supporte pas les notifications push complètes  
**Solution** : Utiliser un **Development Build** ou tester l'interface de test fournie

### ❌ Problème : Images ne s'affichent pas
**Cause** : Cache Expo ou URL d'image invalide  
**Solution** : 
```bash
npx expo start --clear
```

### ❌ Problème : Changement de langue ne fonctionne pas
**Cause** : i18n non initialisé  
**Solution** : Vérifier que `import '../i18n/config'` est présent dans `app/_layout.tsx`


## 👨‍💻 Equipe

**Elyes Boudabous **  
**Yasmine Aoudjit **  
**Mohamed Amine Dhaoui **  

- 🌐 [GitHub](https://github.com/Boudabous2001)

- **Cours** : Développement Mobile avec React Native


## 📝 Licence

Projet académique - ESTIAM 2025-2026
**Tous droits réservés**

---

<div align="center">

**Made with ❤️ by Lass **

⭐ N'oublie pas de star le repo si tu l'as trouvé utile ! ⭐

[🔗 Voir le projet sur GitHub](https://github.com/Boudabous2001/ReactNativeAppTrips)

</div>
