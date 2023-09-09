import * as Yup from "yup";
const moment = require("moment");
export const categorySchema = Yup.object({

  category_name: Yup.string()
    .min(2)
    .max(225)
    .required("Please Enter the Category Name"),

  category_logo: Yup.mixed().test('categoryLogo', 'Please Choose a Category Logo', function (value) {
    const categoryLogoPath = this.resolve(Yup.ref('category_logo_path')); // Replace with actual path field name
    if (!categoryLogoPath && !value) {
      return this.createError({
        message: 'Category Logo is required',
        path: 'category_logo',
      });
    }
    return true;
  }),

  category_banner: Yup.mixed().test('categoryBanner', 'Please Choose a Category Banner', function (value) {
    const categoryBannerPath = this.resolve(Yup.ref('category_banner_path')); // Replace with actual path field name
    if (!categoryBannerPath && !value) {
      return this.createError({
        message: 'Category Banner is required',
        path: 'category_banner',
      });
    }
    return true;
  }),
  // category_logo_path: Yup.string(),
  // category_logo: Yup.mixed().when('category_logo_path', {
  //   is: (val) => !!val, // Check if category_logo_path has a value
  //   then: Yup.mixed().test('custom-validation', 'Custom validation failed', function (value) {
  //     console.log('category_logo =>', value); // Log the value of category_logo
  //     // Add your custom validation logic here
  //     return true; // Return true to indicate successful validation
  //   }),
  //   otherwise: Yup.mixed().notRequired(), // No validation if category_logo_path is not chosen
  // }),

  // category_banner_path: Yup.string(),
  // category_banner: Yup.mixed().when('category_banner_path', {
  //   is: (val) => !!val, // Check if category_banner_path has a value
  //   then: Yup.mixed().test('custom-validation', 'Custom validation failed', function (value) {
  //     console.log('category_banner =>', value); // Log the value of category_banner
  //     // Add your custom validation logic here
  //     return true; // Return true to indicate successful validation
  //   }),
  //   otherwise: Yup.mixed().notRequired(), // No validation if category_banner_path is not chosen
  // }),

});

export const gameSchema = Yup.object({
  fk_cat_id: Yup.string()
    .min(2)
    .max(225)
    .required("Please Enter the Category"),
  game_name: Yup.string()
    .min(2)
    .max(225)
    .required("Please Enter the Game Name"),
  game_logo: Yup.mixed().test('categoryLogo', 'Please Choose a Game Logo', function (value) {
    const categoryLogoPath = this.resolve(Yup.ref('game_logo_path')); // Replace with actual path field name
    if (!categoryLogoPath && !value) {
      return this.createError({
        message: 'Game Logo is required',
        path: 'game_logo',
      });
    }
    return true;
  }),

  game_banner: Yup.mixed().test('categoryBanner', 'Please Choose a Game Banner', function (value) {
    const categoryBannerPath = this.resolve(Yup.ref('game_banner_path')); // Replace with actual path field name
    if (!categoryBannerPath && !value) {
      return this.createError({
        message: 'Game Banner is required',
        path: 'game_banner',
      });
    }
    return true;
  }),

  // game_logo_path: Yup.string(),
  // game_logo: Yup.mixed().when('game_logo_path', {
  //   is: (val) => !!val, // Check if game_logo_path has a value
  //   then: Yup.mixed().test('custom-validation', 'Custom validation failed', function (value) {
  //     console.log('game_logo =>', value); // Log the value of game_logo
  //     // Add your custom validation logic here
  //     return true; // Return true to indicate successful validation
  //   }),
  //   otherwise: Yup.mixed().notRequired(), // No validation if game_logo_path is not chosen
  // }),

  // game_banner_path: Yup.string(),
  // game_banner: Yup.mixed().when('game_banner_path', {
  //   is: (val) => !!val, // Check if game_banner_path has a value
  //   then: Yup.mixed().test('custom-validation', 'Custom validation failed', function (value) {
  //     console.log('game_banner =>', value); // Log the value of game_banner
  //     // Add your custom validation logic here
  //     return true; // Return true to indicate successful validation
  //   }),
  //   otherwise: Yup.mixed().notRequired(), // No validation if game_banner_path is not chosen
  // }),

});