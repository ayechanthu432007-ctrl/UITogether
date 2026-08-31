'use strict';

const { body, query } = require('express-validator');
const { LOST_FOUND_TYPE, LOST_FOUND_STATUS } = require('../config/constants');
const { paginationRules, optionalSearch } = require('./common.validator');

const TYPES = Object.values(LOST_FOUND_TYPE);
const STATUSES = Object.values(LOST_FOUND_STATUS);

const urlRule = (field) =>
  body(field)
    .optional({ nullable: true, values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Image URL is too long')
    .bail()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Image URL must start with http:// or https://');

const createRules = [
  body('type').isIn(TYPES).withMessage(`type must be one of: ${TYPES.join(', ')}`),
  body('title').trim().isLength({ min: 3, max: 150 }).withMessage('Title must be 3-150 characters'),
  body('description').optional({ nullable: true }).trim().isLength({ max: 5000 })
    .withMessage('Description is too long'),
  body('location').optional({ nullable: true }).trim().isLength({ max: 150 })
    .withMessage('Location must be at most 150 characters'),
  body('item_date').optional({ nullable: true, values: 'falsy' }).isDate()
    .withMessage('item_date must be a date (YYYY-MM-DD)'),
  urlRule('image_url'),
  body('contact_info').optional({ nullable: true }).trim().isLength({ max: 150 })
    .withMessage('Contact info must be at most 150 characters'),
  body('status').optional().isIn(STATUSES)
    .withMessage(`status must be one of: ${STATUSES.join(', ')}`),
];

const updateRules = [
  body('type').optional().isIn(TYPES).withMessage(`type must be one of: ${TYPES.join(', ')}`),
  body('title').optional().trim().isLength({ min: 3, max: 150 })
    .withMessage('Title must be 3-150 characters'),
  body('description').optional({ nullable: true }).trim().isLength({ max: 5000 })
    .withMessage('Description is too long'),
  body('location').optional({ nullable: true }).trim().isLength({ max: 150 })
    .withMessage('Location must be at most 150 characters'),
  body('item_date').optional({ nullable: true, values: 'falsy' }).isDate()
    .withMessage('item_date must be a date (YYYY-MM-DD)'),
  urlRule('image_url'),
  body('contact_info').optional({ nullable: true }).trim().isLength({ max: 150 })
    .withMessage('Contact info must be at most 150 characters'),
  body('status').optional().isIn(STATUSES)
    .withMessage(`status must be one of: ${STATUSES.join(', ')}`),
];

const statusRules = [
  body('status').isIn(STATUSES).withMessage(`status must be one of: ${STATUSES.join(', ')}`),
];

const listRules = [
  ...paginationRules,
  optionalSearch,
  query('type').optional().isIn(TYPES).withMessage(`type must be one of: ${TYPES.join(', ')}`),
  query('status').optional().isIn(STATUSES)
    .withMessage(`status must be one of: ${STATUSES.join(', ')}`),
  query('mine').optional().isBoolean().withMessage('mine must be true or false').toBoolean(),
  query('sort').optional().isIn(['newest', 'item_date'])
    .withMessage('sort must be newest or item_date'),
];

module.exports = { createRules, updateRules, statusRules, listRules };
