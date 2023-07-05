const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addTag,
  removeTag,
  addReaction,
  deleteReaction,
  getReactions,
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

// /api/thoughts/:thoughtsId/tags/:tagId
router.route('/:thoughtsId/tags/:tagId').delete(removeTag);

// /api/thoughts/:thoughtsId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').get(getReactions);
