const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const HomePage = require("../../models/HomepageModel");

exports.createHomePageCategorie = catchAsyncErrors(async (req, res, next) => {
  const { categorie } = req.body; // Assuming the string is sent in the request body as 'categorie'

  // Check if the categorie is provided in the request body
  if (!categorie) {
    return res.status(400).json({ error: "categorie is required" });
  }

  try {
    // Find the document to update or create a new one if it doesn't exist
    let homePage = await HomePage.findOne();

    // If the document doesn't exist, create a new one
    if (!homePage) {
      homePage = new HomePage();
    }

    // Check if the category already exists in the categories array
    if (homePage.categories.includes(categorie)) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Push the new categorie to the categories array
    homePage.categories.push(categorie);

    // Save the updated document
    await homePage.save();

    res.status(201).json({ success: true, data: homePage });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.getHomePageCategories = catchAsyncErrors(async (req, res, next) => {
  try {
    // Find the home page document
    const homePage = await HomePage.findOne();

    // If home page document does not exist, return empty array
    if (!homePage) {
      return res.status(200).json({ categories: [] });
    }

    // Extract categories array from the home page document
    const categories = homePage.categories;

    res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.deleteHomePageCategorie = catchAsyncErrors(async (req, res, next) => {
  try {
    const categorie = req.params.name; // Assuming categorie to delete is sent in the request body

    // Check if the categorie to delete is provided in the request body
    if (!categorie) {
      return res.status(400).json({ error: "categorie to delete is required" });
    }

    // Find the home page document
    let homePage = await HomePage.findOne();

    // If home page document does not exist, return error
    if (!homePage) {
      return res.status(404).json({ error: "Home page not found" });
    }

    // Remove the categorie from the categories array
    homePage.categories = homePage.categories.filter(
      (cat) => cat !== categorie
    );

    // Save the updated home page document
    await homePage.save();

    res.status(200).json({ success: true, data: homePage });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
