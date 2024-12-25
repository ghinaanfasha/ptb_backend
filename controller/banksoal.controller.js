const { BankSoal, User } = require('../models');

const createBankSoal = async (req, res) => {
  const { category_id, level } = req.body;
  const user_id = req.userId;

  try {
    const newBankSoal = await BankSoal.create({
      category_id,
      level,
      user_id,
      file: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: 'Bank Soal created successfully',
      data: newBankSoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating bank soal' });
  }
};

const getBankSoal = async (req, res) => {
  try {
    const { user_id, level, category_id } = req.query;
    
    const queryOptions = {
      where: {},
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username']
        },
      ]
    };

    if (user_id) {
      queryOptions.where.user_id = user_id;
    } else {
      queryOptions.where.user_id = req.userId;
    }

    if (level) {
      queryOptions.where.level = level;
    }

    if (category_id) {
      queryOptions.where.category_id = category_id;
    }

    const bankSoal = await BankSoal.findAll(queryOptions);

    res.status(200).json({
      message: 'Bank Soal retrieved successfully',
      data: bankSoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching bank soal' });
  }
};

const getBankSoalById = async (req, res) => {
  const bankSoalId = req.params.id;

  try {
    const bankSoal = await BankSoal.findByPk(bankSoalId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username']
        },
      ]
    });

    if (!bankSoal) {
      return res.status(404).json({ message: 'Bank Soal not found' });
    }

    res.status(200).json({
      message: 'Bank Soal retrieved successfully',
      data: bankSoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching bank soal' });
  }
};

const updateBankSoal = async (req, res) => {
  const bankSoalId = req.params.id;
  const { category_id, level } = req.body;

  try {
    const bankSoal = await BankSoal.findByPk(bankSoalId);

    if (!bankSoal) {
      return res.status(404).json({ message: 'Bank Soal not found' });
    }

    if (category_id) bankSoal.category_id = category_id;
    if (level) bankSoal.level = level;
    if (req.file) bankSoal.file = req.file.filename;

    await bankSoal.save();

    res.status(200).json({
      message: 'Bank Soal updated successfully',
      data: bankSoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating bank soal' });
  }
};

const deleteBankSoal = async (req, res) => {
  const bankSoalId = req.params.id;

  try {
    const bankSoal = await BankSoal.findByPk(bankSoalId);

    if (!bankSoal) {
      return res.status(404).json({ message: 'Bank Soal not found' });
    }

    await bankSoal.destroy();

    res.status(200).json({
      message: 'Bank Soal deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting bank soal' });
  }
};

module.exports = {
  createBankSoal,
  getBankSoal,
  getBankSoalById,
  updateBankSoal,
  deleteBankSoal,
};
