const { Category } = require('../models');
const { validationResult } = require('express-validator');

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await Category.create({
      name
    });

    res.status(201).json({
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the category' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({
      message: 'Categories retrieved successfully',
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching categories' });
  }
};

const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category retrieved successfully',
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the category' });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    await category.save();

    res.status(200).json({
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the category' });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();

    res.status(200).json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the category' });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}; 