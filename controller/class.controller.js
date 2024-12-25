const { Class, User, Tutor, sequelize, Category, Order } = require('../models');
const { validationResult } = require('express-validator');

const createClass = async (req, res) => {
  const { quota, subject, topic, location, start, end, level } = req.body;
  const user_id = req.userId;

  try {
    const newClass = await Class.create({
      quota,
      subject,
      start,
      end,
      topic,
      location,
      user_id,
      level,
      khs: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: 'Class created successfully',
      data: newClass,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the class' });
  }
};

const getClasses = async (req, res) => {
  try {
    const { user_id, level } = req.query;
    
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

    // Set user_id from query params or from authenticated user
    if (user_id) {
      queryOptions.where.user_id = user_id;
    } else {
      queryOptions.where.user_id = req.userId;
    }

    // Add level filter if provided
    if (level) {
      queryOptions.where.level = level;
    }

    const classes = await Class.findAll(queryOptions);

    res.status(200).json({
      message: 'Classes retrieved successfully',
      data: classes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching classes' });
  }
};


const getClassById = async (req, res) => {
  const classId = req.params.id;

  try {
    const classData = await Class.findByPk(classId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username']
        },
        {
          model: Order,
          as: 'orders',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'email']
            }
          ],
          where: {
            class_id: classId
          }
        }
      ]
    });

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Transform the data to include participants
    const participants = classData.orders.map(order => order.user);

    const responseData = {
      ...classData.toJSON(),
      participants
    };

    res.status(200).json({
      message: 'Class retrieved successfully',
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the class' });
  }
};


const updateClass = async (req, res) => {
  const classId = req.params.id;
  const { quota, subject, topic, location, start, end, level } = req.body;

  try {
    const classData = await Class.findByPk(classId);

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    classData.quota = quota || classData.quota;
    classData.subject = subject || classData.subject;
    classData.topic = topic || classData.topic;
    classData.location = location || classData.location;
    classData.start = start || classData.start;
    classData.end = end || classData.end;
    classData.level = level || classData.level;
    
    if (req.file) {
      classData.khs = req.file.filename;
    }

    await classData.save();

    res.status(200).json({
      message: 'Class updated successfully',
      data: classData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the class' });
  }
};

const deleteClass = async (req, res) => {
  const classId = req.params.id;

  try {
    const classData = await Class.findByPk(classId);

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    await classData.destroy();

    res.status(200).json({
      message: 'Class deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the class' });
  }
};

const getClassesByUser = async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'category_id'],
          include: [
            {
              model: Category,
              as: 'category',
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      attributes: [
        'id',
        'quota', 
        'subject',
        'topic',
        'location',
        'start',
        'end',
        'level',
        'user_id'
      ],
      order: [['user_id', 'ASC']]
    });

    // Transform data to group by user
    const groupedData = classes.reduce((acc, classItem) => {
      const userId = classItem.user.id;
      
      if (!acc[userId]) {
        acc[userId] = {
          user: {
            id: classItem.user.id,
            username: classItem.user.username,
            email: classItem.user.email,
            category: classItem.user.category
          },
          classes: []
        };
      }
      
      acc[userId].classes.push({
        id: classItem.id,
        quota: classItem.quota,
        subject: classItem.subject,
        topic: classItem.topic,
        location: classItem.location,
        start: classItem.start,
        end: classItem.end,
        level: classItem.level
      });

      return acc;
    }, {});

    res.status(200).json({
      message: 'Classes grouped by user retrieved successfully',
      data: Object.values(groupedData)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching grouped classes' });
  }
};


module.exports = {
  getClassesByUser,
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
}; 
