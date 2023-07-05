const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addTag,
  removeTag,
} = require('../../controllers/thoughtsController');

// /api/apps
router.route('/').get(getThoughts).post(createThoughts);

// /api/apps/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/apps/:thoughtsId/tags
router.route('/:thoughtsId/tags').post(addTag);

// /api/apps/:thoughtsId/tags/:tagId
router.route('/:thoughtsId/tags/:tagId').delete(removeTag);

module.exports = router;
