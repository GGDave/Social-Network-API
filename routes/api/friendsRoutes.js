const router = require('express').Router();
const {
  getFriends,
  getSingleFriend,
  createFriends,
  updateFriends,
  deleteFriends,
  addTag,
  removeTag,
} = require('../../controllers/friendsController');

// /api/apps
router.route('/').get(getFriends).post(createFriends);

// /api/apps/:applicationId
router
  .route('/:friendsId')
  .get(getSingleFriend)
  .put(updateFriends)
  .delete(deleteFriends);

// /api/apps/:applicationId/tags
router.route('/:friendsId/tags').post(addTag);

// /api/apps/:applicationId/tags/:tagId
router.route('/:friendsId/tags/:tagId').delete(removeTag);

module.exports = router;