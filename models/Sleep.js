const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  created_at: { type: Date, required: true },
  sleep_duration: { type: String, required: true },
  bedTime: { type: Date, required: true, default: 0, min: 0 },
  wakeUp_time: { type: Date, required: true, default: 0, min: 0 },
  sleep_cycle: { type: Array, required: true, default: [] },
  deep_sleep_seconds: { type: Number, required: true, default: 0, min: 0 },
  light_sleep_seconds: { type: Number, required: true, default: 0, min: 0 },
  deep_sleep_percentage: { type: Number, required: true, default: 0, min: 0 },
  light_sleep_percentage: { type: Number, required: true, default: 0, min: 0 },
  diary: {
    type: mongoose.Types.ObjectId,
    ref: "Diary",
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Sleep', SleepSchema);
