const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email : { type: String , required: true, unique: true },
  name: { type: String, required: true },
  best_sleep_hours: { type: Number, required: true, default: 0, min: 0  },
  best_bedtime: { type: Number, required: true, default: 0, min: 0 },
  best_wakeUp_time: { type: Number, required: true, default: 0, min: 0 },
  my_diaries: { type: Object, required: true, default: {} },
  sleep_last_updated_at: { type: Date }
}, {
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
