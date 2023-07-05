const { Schema, model, Types } = require('mongoose');
const Tag = require('./Tags');

// Create a new schema for the reaction
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    toJSON: {
      getters: true
    },
    id: false,
  }
);

// Schema to create Post model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Thought is Required",
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tags: [Tag],
    reactions: [reactionSchema] // new reactions field
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getResponses` that gets the amount of reactions
thoughtsSchema
  .virtual('ReactionsCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize thoughts model
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
