const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: { type: Date, required: true },
  sleep_hours: { type: String, required: true },
  behavior_score: { type: Number, required: true },
  behavior_score_reason: { type: String },
  feeling_color: { type: Array },
  memo: { type: String },
  sleep: {
    type: mongoose.Types.ObjectId,
    ref: "Sleep",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Diary', DiarySchema);
