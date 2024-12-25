const { Op } = require('sequelize');
const { Item, User } = require('../models');
const { validationResult } = require('express-validator');

// Create item
const createItem = async (req, res) => {
  const { description } = req.body;
  const user_id = req.userId;

  try {
    // Check if item exists with same user_id and description
    const existingItem = await Item.findOne({
      where: {
        user_id,
        image: {
          [Op.not]: null
      },
      }
    });

    if (existingItem) {
      // Update existing item
      existingItem.image = req.file ? req.file.filename : existingItem.image;
      existingItem.description = description || existingItem.description;
      await existingItem.save();

      return res.status(200).json({
        message: 'Item updated successfully',
        data: existingItem,
      });
    }

    // Create new item if doesn't exist
    const newItem = await Item.create({
      description,
      user_id,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: 'Item created successfully',
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the item' });
  }
};


// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'image']
      }]
    });

    res.status(200).json({
      message: 'Items retrieved successfully',
      data: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching items' });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findOne({
      where: { id: itemId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'image']
      }]
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      message: 'Item retrieved successfully',
      data: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the item' });
  }
};


// Update item
const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const { description } = req.body;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.description = description || item.description;
    if (req.file) {
      item.image = req.file.filename;
    }

    await item.save();

    res.status(200).json({
      message: 'Item updated successfully',
      data: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the item' });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();

    res.status(200).json({
      message: 'Item deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the item' });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
}; 