import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// da

import da_one_on_one_curriculum from "./translations/da/1_on_1_curriculum.json";
import da_one_on_one_intro from "./translations/da/1_on_1_intro.json";
import da_one_on_one_order from "./translations/da/1_on_1_order.json";
import da_one_on_one_pricing from "./translations/da/1_on_1_pricing.json";
import da_about from "./translations/da/about.json";
import da_apps from "./translations/da/apps.json";
import da_cart from "./translations/da/cart.json";
import da_certificates from "./translations/da/certificates.json";
import da_contact from "./translations/da/contact.json";
import da_course from "./translations/da/course.json";
import da_courses from "./translations/da/courses.json";
import da_education from "./translations/da/education.json";
import da_fitness_bmi from "./translations/da/fitness_bmi.json";
import da_fitness_body_fat from "./translations/da/fitness_body_fat.json";
import da_fitness_find_program from "./translations/da/fitness_find_program.json";
import da_fitness_tdee from "./translations/da/fitness_tdee.json";
import da_hobbies from "./translations/da/hobbies.json";
import da_home from "./translations/da/home.json";
import da_job from "./translations/da/job.json";
import da_navbar from "./translations/da/navbar.json";
import da_product from "./translations/da/product.json";
import da_products_component from "./translations/da/products_component.json";
import da_shop_category from "./translations/da/shop_category.json";
import da_skills from "./translations/da/skills.json";

// en

import en_one_on_one_curriculum from "./translations/en/1_on_1_curriculum.json";
import en_one_on_one_intro from "./translations/en/1_on_1_intro.json";
import en_one_on_one_order from "./translations/en/1_on_1_order.json";
import en_one_on_one_pricing from "./translations/en/1_on_1_pricing.json";
import en_about from "./translations/en/about.json";
import en_apps from "./translations/en/apps.json";
import en_cart from "./translations/en/cart.json";
import en_certificates from "./translations/en/certificates.json";
import en_contact from "./translations/en/contact.json";
import en_course from "./translations/en/course.json";
import en_courses from "./translations/en/courses.json";
import en_education from "./translations/en/education.json";
import en_fitness_bmi from "./translations/en/fitness_bmi.json";
import en_fitness_body_fat from "./translations/en/fitness_body_fat.json";
import en_fitness_find_program from "./translations/en/fitness_find_program.json";
import en_fitness_tdee from "./translations/en/fitness_tdee.json";
import en_hobbies from "./translations/en/hobbies.json";
import en_home from "./translations/en/home.json";
import en_job from "./translations/en/job.json";
import en_navbar from "./translations/en/navbar.json";
import en_product from "./translations/en/product.json";
import en_products_component from "./translations/en/products_component.json";
import en_shop_category from "./translations/en/shop_category.json";
import en_skills from "./translations/en/skills.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    da: {
      one_on_one_curriculum: da_one_on_one_curriculum,
      one_on_one_intro: da_one_on_one_intro,
      one_on_one_order: da_one_on_one_order,
      one_on_one_pricing: da_one_on_one_pricing,
      about: da_about,
      apps: da_apps,
      cart: da_cart,
      certificates: da_certificates,
      contact: da_contact,
      course: da_course,
      courses: da_courses,
      education: da_education,
      fitness_bmi: da_fitness_bmi,
      fitness_body_fat: da_fitness_body_fat,
      fitness_find_program: da_fitness_find_program,
      fitness_tdee: da_fitness_tdee,
      hobbies: da_hobbies,
      home: da_home,
      job: da_job,
      navbar: da_navbar,
      product: da_product,
      products_component: da_products_component,
      shop_category: da_shop_category,
      skills: da_skills,
    },
    en: {
      one_on_one_curriculum: en_one_on_one_curriculum,
      one_on_one_intro: en_one_on_one_intro,
      one_on_one_order: en_one_on_one_order,
      one_on_one_pricing: en_one_on_one_pricing,
      about: en_about,
      apps: en_apps,
      cart: en_cart,
      certificates: en_certificates,
      contact: en_contact,
      course: en_course,
      courses: en_courses,
      education: en_education,
      fitness_bmi: en_fitness_bmi,
      fitness_body_fat: en_fitness_body_fat,
      fitness_find_program: en_fitness_find_program,
      fitness_tdee: en_fitness_tdee,
      hobbies: en_hobbies,
      home: en_home,
      job: en_job,
      navbar: en_navbar,
      product: en_product,
      products_component: en_products_component,
      shop_category: en_shop_category,
      skills: en_skills,
    },
  },
});
