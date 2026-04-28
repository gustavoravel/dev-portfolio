const supportedLanguages = ['en', 'pt'];

const getLanguageFolder = (language) => (supportedLanguages.includes(language) ? language : 'en');

const endpoints = {
  navbar: (language) => `profile/${getLanguageFolder(language)}/navbar.json`,
  routes: (language) => `profile/${getLanguageFolder(language)}/routes.json`,
  home: (language) => `profile/${getLanguageFolder(language)}/home.json`,
  social: (language) => `profile/${getLanguageFolder(language)}/social.json`,
  about: (language) => `profile/${getLanguageFolder(language)}/about.json`,
  skills: (language) => `profile/${getLanguageFolder(language)}/skills.json`,
  education: (language) => `profile/${getLanguageFolder(language)}/education.json`,
  experiences: (language) => `profile/${getLanguageFolder(language)}/experiences.json`,
  projects: (language) => `profile/${getLanguageFolder(language)}/projects.json`,
};

export default endpoints;
