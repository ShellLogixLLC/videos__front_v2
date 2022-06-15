enum Route {
  Home = '/',
  New = '/new',
  Error = '/404',
  Terms = '/terms-of-service',
  Privacy = '/privacy-policy',
  Favorites = '/favorites',
  MostLiked = '/most-liked',
  Categories = '/categories',
  MyFavorite = '/my-favorites',
  Search = '/search-result',

  // Contract manager routes
  Vault = '/vault',
  Claims = '/claims',
  Finance = '/finance',
  Overview = '/overview',
  Analytics = '/analytics',
  Negotiation = '/negotiation',
  Performance = '/performance',

  //User routes
  SignIn = '/sign-in',
  Profile = '/profile',
  Settings = '/settings',
  HelpSupport = '/help-support',
  ForgotPassword = '/forgot-password',

  // Registration steps
  RegistrationSetupPassword = '/registration/2',
  RegistrationContactInformation = '/registration/3',
  RegistrationNumberVerification = '/registration/4',
  RegistrationPersonalInformation = '/registration/1',
}

export default Route;
