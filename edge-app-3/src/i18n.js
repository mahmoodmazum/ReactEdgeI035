import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to React Class 03 & 04',
      welcomeSub: 'Interactive lessons — click a topic in the sidebar to start learning.',
      greeting: 'Hello, {{name}}!',
      logout: 'Log out',
      login: 'Log In',
      email: 'Email',
      password: 'Password',
      dashboard: 'Dashboard',
      protectedMsg: 'You are viewing a protected page!',
      language: 'Language',
      switchLang: 'Switch to Bengali',
      topicsVisited: 'Topics visited',
    },
  },
  bn: {
    translation: {
      welcome: 'রিঅ্যাক্ট ক্লাস ০৩ ও ০৪-এ স্বাগতম',
      welcomeSub: 'ইন্টারেক্টিভ পাঠ — শিখতে শুরু করতে সাইডবারে একটি বিষয় ক্লিক করুন।',
      greeting: 'হ্যালো, {{name}}!',
      logout: 'লগ আউট',
      login: 'লগ ইন',
      email: 'ইমেইল',
      password: 'পাসওয়ার্ড',
      dashboard: 'ড্যাশবোর্ড',
      protectedMsg: 'আপনি একটি সুরক্ষিত পৃষ্ঠা দেখছেন!',
      language: 'ভাষা',
      switchLang: 'ইংরেজিতে পরিবর্তন করুন',
      topicsVisited: 'পরিদর্শন করা বিষয়',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
