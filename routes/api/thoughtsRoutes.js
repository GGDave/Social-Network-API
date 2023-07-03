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

// /api/apps/:applicationId
router
  .route('/:thoughtsId')
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/apps/:applicationId/tags
router.route('/:thoughtsId/tags').post(addTag);

// /api/apps/:applicationId/tags/:tagId
router.route('/:thoughtsId/tags/:tagId').delete(removeTag);

module.exports = router;
