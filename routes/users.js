const express = require('express');
const createError = require('http-errors');
const users = express.Router();
const Sleep = require('../models/Sleep');
const { getCurrentDate } = require('../utils/helper');

users.get('/login', () => {
  console.log('login');
});

users.put('/:user_id', async (req, res, next) => {
  try {
    const { sleep_last_updated_at } = req.body;
    console.log(getCurrentDate(sleep_last_updated_at));
  } catch(error) {
    console.log(error);
  }
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
    console.log(error);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
});

module.exports = users;
