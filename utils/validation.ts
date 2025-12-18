export const validation = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password: string): { valid: boolean; message?: string } => {
    if (password.length < 6) {
      return { valid: false, message: 'Le mot de passe doit contenir au moins 6 caractères' };
    }
    return { valid: true };
  },

  isValidDestination: (destination: string): boolean => {
    const destinationRegex = /^[A-Za-zÀ-ÿ\s-]+,\s*[A-Za-zÀ-ÿ\s-]+$/;
    return destinationRegex.test(destination.trim());
  },

  isValidDate: (date: string): boolean => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
  },

  areDatesValid: (startDate: string, endDate: string): { valid: boolean; message?: string } => {
    if (!validation.isValidDate(startDate) || !validation.isValidDate(endDate)) {
      return { valid: false, message: 'Format de date invalide (utilisez YYYY-MM-DD)' };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return { valid: false, message: 'La date de fin doit être après la date de début' };
    }

    return { valid: true };
  },

  isValidName: (name: string): boolean => {
    return name.trim().length >= 2;
  },
};

export const validationMessages = {
  fr: {
    invalidEmail: 'Email invalide',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
    invalidDestination: 'Format invalide. Utilisez: Ville, Pays',
    invalidDate: 'Format de date invalide (YYYY-MM-DD)',
    endBeforeStart: 'La date de fin doit être après la date de début',
    nameTooShort: 'Le nom doit contenir au moins 2 caractères',
    fillAllFields: 'Veuillez remplir tous les champs',
  },
  en: {
    invalidEmail: 'Invalid email',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordMismatch: 'Passwords do not match',
    invalidDestination: 'Invalid format. Use: City, Country',
    invalidDate: 'Invalid date format (YYYY-MM-DD)',
    endBeforeStart: 'End date must be after start date',
    nameTooShort: 'Name must be at least 2 characters',
    fillAllFields: 'Please fill in all fields',
  },
};