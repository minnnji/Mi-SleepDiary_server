const express = require('express');
const users = express.Router();
const Sleep = require('../models/Sleep');
const { getCurrentDate } = require('../utils/helper');

users.get('/login', () => {
  console.log('login');
});

users.post('/:user_id/sleep', async (req, res, next) => {
  const {
    sleepDuration,
    bedTime,
    wakeUpTime,
    sleepCycle,
    lightSleepPercentage
  } = req.body;

  try {
    sleep = await new Sleep({
      user: req.params.user_id,
      created_at: getCurrentDate(wakeUpTime),
      sleep_duration: sleepDuration,
      bedTime: getCurrentDate(bedTime),
      wakeUp_time: getCurrentDate(wakeUpTime),
      sleep_cycle: sleepCycle,
      light_sleep_percentage: lightSleepPercentage,
      deep_sleep_percentage: 100 - lightSleepPercentage
    }).save();
    res.json(sleep);
  } catch(error) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
});

module.exports = users;
