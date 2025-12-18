import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      common: {
        welcome: "Bienvenue",
        loading: "Chargement...",
        error: "Erreur",
        success: "Succès",
        cancel: "Annuler",
        confirm: "Confirmer",
        save: "Enregistrer",
        delete: "Supprimer",
        edit: "Modifier",
        back: "Retour",
        close: "Fermer",
        create: "Créer"
      },
      auth: {
        login: "Connexion",
        register: "Inscription",
        logout: "Déconnexion",
        email: "Email",
        password: "Mot de passe",
        name: "Nom",
        loginButton: "Se connecter",
        registerButton: "S'inscrire",
        welcomeBack: "Bon retour !",
        signInToContinue: "Connectez-vous pour continuer",
        noAccount: "Pas de compte ?",
        hasAccount: "Déjà un compte ?",
        createAccount: "Créer un compte",
        confirmPassword: "Confirmer le mot de passe",
        errors: {
          invalidEmail: "Email invalide",
          passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
          passwordMismatch: "Les mots de passe ne correspondent pas",
          loginFailed: "Échec de la connexion",
          registerFailed: "Échec de l'inscription"
        }
      },
      home: {
        title: "Accueil",
        hello: "Bonjour",
        welcome: "Bienvenue",
        traveler: "Voyageur",
        myTrips: "Mes Voyages",
        stats: "Statistiques",
        upcomingTrips: "Prochains Voyages",
        quickActions: "Actions Rapides",
        createTrip: "Créer un voyage",
        viewAllTrips: "Voir tous les voyages",
        seeAll: "Voir tout",
        noUpcomingTrips: "Aucun voyage à venir",
        planYourNext: "Planifiez votre prochain voyage !",
        trips: "Voyages",
        photos: "Photos",
        countries: "Pays",
        daysUntil: "jours avant",
        in: "Dans",
        days: "jours",
        newTrip: "Nouveau Voyage",
        addPhoto: "Ajouter Photo",
        explore: "Explorer",
        recentActivity: "Activité Récente",
        activity1: "Promenade dans le parc",
        activity1Time: "Il y a 2 heures",
        activity2: "Ajout de 5 photos à 'Voyage d'été'",
        activity2Time: "Il y a 1 jour",
        activity3: "Réservation d'un vol pour New York",
        activity3Time: "Il y a 3 jours"
      },
      trips: {
        title: "Mes Voyages",
        addTrip: "Ajouter un voyage",
        search: "Rechercher des voyages",
        searchPlaceholder: "Rechercher...",
        tabs: {
          all: "Tous",
          upcoming: "À venir",
          past: "Passés",
          favorites: "Favoris"
        },
        empty: {
          noTrips: "Aucun voyage trouvé",
          noFavorites: "Aucun voyage favori",
          noCategory: "Aucun voyage dans cette catégorie",
          createTrip: "Créer un voyage"
        },
        details: {
          title: "Détails du voyage",
          destination: "Destination",
          startDate: "Date de départ",
          endDate: "Date de retour",
          description: "Description",
          photos: "Photos",
          days: "Jours",
          month: "Mois",
          dates: "Dates du voyage",
          departure: "Départ",
          return: "Retour",
          viewOnMap: "Voir sur la carte",
          share: "Partager",
          notFound: "Voyage introuvable"
        }
      },
      addTrip: {
        title: "Nouveau Voyage",
        editTitle: "Modifier le voyage",
        form: {
          title: "Titre",
          titlePlaceholder: "Ex: Voyage à Paris",
          destination: "Destination",
          destinationPlaceholder: "Ex: Paris, France",
          startDate: "Date de début",
          startDatePlaceholder: "2024-12-20",
          endDate: "Date de fin",
          endDatePlaceholder: "2024-12-30",
          description: "Description",
          descriptionPlaceholder: "Décrivez votre voyage...",
          coverPhoto: "Photo de couverture",
          addPhoto: "Ajouter une photo",
          changePhoto: "Changer la photo",
          required: "obligatoire"
        },
        actions: {
          create: "Créer le voyage",
          save: "Enregistrer"
        },
        validation: {
          fillAllFields: "Veuillez remplir tous les champs obligatoires",
          invalidDateFormat: "Format de date invalide. Utilisez YYYY-MM-DD (ex: 2026-01-22)"
        },
        success: "Voyage créé avec succès!",
        error: "Impossible de créer le voyage"
      },
      profile: {
        title: "Profil",
        stats: {
          trips: "Voyages",
          photos: "Photos",
          favorites: "Favoris"
        },
        language: "Langue / Language",
        logout: "Déconnexion",
        logoutDescription: "Se déconnecter de votre compte",
        logoutConfirm: "Êtes-vous sûr de vouloir vous déconnecter ?",
        settings: "Paramètres"
      },
      notifications: {
        title: "Notifications de Test",
        device: "Appareil",
        permissions: "Permissions",
        granted: "Accordées",
        denied: "Non accordées",
        badgeCount: "Badge count",
        actions: "Actions",
        initialize: "Initialiser les notifications",
        sendImmediate: "Notification immédiate",
        schedule5sec: "Programmer (5 secondes)",
        schedule30sec: "Programmer (30 secondes)",
        setBadge: "Badge: 5",
        clearBadge: "Effacer badge",
        testResults: "Résultats des tests",
        clear: "Effacer",
        webWarning: "Les notifications ne sont disponibles que sur mobile (iOS/Android)",
        deviceType: "Type d'appareil",
        physical: "Physique",
        simulator: "Simulateur",
        status: "Statut",
        received: "Notification reçue",
        tapped: "Notification touchée",
        initialized: "Notifications initialisées",
        initFailed: "Échec d'initialisation",
        testMessage: "Ceci est une notification de test immédiate !",
        immediateSent: "Notification immédiate envoyée",
        scheduledTitle: "Notification Programmée",
        scheduledBody5: "Notification programmée pour dans 5 secondes",
        scheduledBody30: "Notification programmée pour dans 30 secondes",
        scheduled5: "Notification programmée pour 5 sec",
        scheduled30: "Notification programmée pour 30 sec",
        badgeSet: "Badge défini à",
        badgeCleared: "Badge effacé",
        noLogs: "Aucun log pour le moment..."
      }
    }
  },
  en: {
    translation: {
      common: {
        welcome: "Welcome",
        loading: "Loading...",
        error: "Error",
        success: "Success",
        cancel: "Cancel",
        confirm: "Confirm",
        save: "Save",
        delete: "Delete",
        edit: "Edit",
        back: "Back",
        close: "Close",
        create: "Create"
      },
      auth: {
        login: "Login",
        register: "Register",
        logout: "Logout",
        email: "Email",
        password: "Password",
        name: "Name",
        loginButton: "Sign In",
        registerButton: "Sign Up",
        welcomeBack: "Welcome Back!",
        signInToContinue: "Sign in to continue",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        createAccount: "Create Account",
        confirmPassword: "Confirm Password",
        errors: {
          invalidEmail: "Invalid email",
          passwordTooShort: "Password must be at least 6 characters",
          passwordMismatch: "Passwords do not match",
          loginFailed: "Login failed",
          registerFailed: "Registration failed"
        }
      },
      home: {
        title: "Home",
        hello: "Hello",
        welcome: "Welcome",
        traveler: "Traveler",
        myTrips: "My Trips",
        stats: "Statistics",
        upcomingTrips: "Upcoming Trips",
        quickActions: "Quick Actions",
        createTrip: "Create Trip",
        viewAllTrips: "View All Trips",
        seeAll: "See All",
        noUpcomingTrips: "No upcoming trips",
        planYourNext: "Plan your next adventure!",
        trips: "Trips",
        photos: "Photos",
        countries: "Countries",
        daysUntil: "days until",
        in: "In",
        days: "days",
        newTrip: "New Trip",
        addPhoto: "Add Photo",
        explore: "Explore",
        recentActivity: "Recent Activity",
        activity1: "Went for a walk in the park",
        activity1Time: "2 hours ago",
        activity2: "Added 5 new photos to 'Summer Trip'",
        activity2Time: "1 day ago",
        activity3: "Booked a flight to New York",
        activity3Time: "3 days ago"
      },
      trips: {
        title: "My Trips",
        addTrip: "Add Trip",
        search: "Search trips",
        searchPlaceholder: "Search...",
        tabs: {
          all: "All",
          upcoming: "Upcoming",
          past: "Past",
          favorites: "Favorites"
        },
        empty: {
          noTrips: "No trips found",
          noFavorites: "No favorite trips",
          noCategory: "No trips in this category",
          createTrip: "Create a trip"
        },
        details: {
          title: "Trip Details",
          destination: "Destination",
          startDate: "Start Date",
          endDate: "End Date",
          description: "Description",
          photos: "Photos",
          days: "Days",
          month: "Month",
          dates: "Trip Dates",
          departure: "Departure",
          return: "Return",
          viewOnMap: "View on Map",
          share: "Share",
          notFound: "Trip not found"
        }
      },
      addTrip: {
        title: "New Trip",
        editTitle: "Edit Trip",
        form: {
          title: "Title",
          titlePlaceholder: "Ex: Trip to Paris",
          destination: "Destination",
          destinationPlaceholder: "Ex: Paris, France",
          startDate: "Start Date",
          startDatePlaceholder: "2024-12-20",
          endDate: "End Date",
          endDatePlaceholder: "2024-12-30",
          description: "Description",
          descriptionPlaceholder: "Describe your trip...",
          coverPhoto: "Cover Photo",
          addPhoto: "Add photo",
          changePhoto: "Change photo",
          required: "required"
        },
        actions: {
          create: "Create Trip",
          save: "Save"
        },
        validation: {
          fillAllFields: "Please fill in all required fields",
          invalidDateFormat: "Invalid date format. Use YYYY-MM-DD (ex: 2026-01-22)"
        },
        success: "Trip created successfully!",
        error: "Unable to create trip"
      },
      profile: {
        title: "Profile",
        stats: {
          trips: "Trips",
          photos: "Photos",
          favorites: "Favorites"
        },
        language: "Language / Langue",
        logout: "Logout",
        logoutDescription: "Sign out of your account",
        logoutConfirm: "Are you sure you want to logout?",
        settings: "Settings"
      },
      notifications: {
        title: "Test Notifications",
        device: "Device",
        permissions: "Permissions",
        granted: "Granted",
        denied: "Denied",
        badgeCount: "Badge count",
        actions: "Actions",
        initialize: "Initialize Notifications",
        sendImmediate: "Immediate Notification",
        schedule5sec: "Schedule (5 seconds)",
        schedule30sec: "Schedule (30 seconds)",
        setBadge: "Badge: 5",
        clearBadge: "Clear Badge",
        testResults: "Test Results",
        clear: "Clear",
        webWarning: "Notifications are only available on mobile (iOS/Android)",
        deviceType: "Device Type",
        physical: "Physical",
        simulator: "Simulator",
        status: "Status",
        received: "Notification received",
        tapped: "Notification tapped",
        initialized: "Notifications initialized",
        initFailed: "Initialization failed",
        testMessage: "This is an immediate test notification!",
        immediateSent: "Immediate notification sent",
        scheduledTitle: "Scheduled Notification",
        scheduledBody5: "Notification scheduled for 5 seconds",
        scheduledBody30: "Notification scheduled for 30 seconds",
        scheduled5: "Notification scheduled for 5 sec",
        scheduled30: "Notification scheduled for 30 sec",
        badgeSet: "Badge set to",
        badgeCleared: "Badge cleared",
        noLogs: "No logs yet..."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;