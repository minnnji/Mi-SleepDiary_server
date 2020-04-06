const express = require('express');
const createError = require('http-errors');
const users = express.Router();
const Sleep = require('../models/Sleep');
const User = require('../models/User');
const { getCurrentDate } = require('../utils/helper');

users.get('/login', () => {
  console.log('login');
});

users.put('/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const updateInfo = req.body;
    await User.updateMany({ _id: user_id }, { $set: updateInfo });
    res.json(req.body);
  } catch(error) {
    console.log(error);
  }
});

users.post('/:user_id/sleep', async (req, res, next) => {
  const sleepList = [];

  try {
    for (let i = 0; i < req.body.length; i++) {
      const {
        sleepDuration,
        bedTime,
        wakeUpTime,
        sleepCycle,
        lightSleepPercentage
      } = req.body[i];

      sleep = await new Sleep({
        user: req.params.user_id,
        created_at: getCurrentDate(wakeUpTime),
        sleep_duration: sleepDuration,
        bedTime: getCurrentDate(bedTime),
        wakeUp_time: getCurrentDate(wakeUpTime),
        sleep_cycle: sleepCycle,
        light_sleep_percentage: lightSleepPercentage,
        deep_sleep_percentage: 100 - lightSleepPercentage
      });
      sleepList.push(sleep);
    }
    await Sleep.insertMany(sleepList);
    res.json('ok');
  } catch(error) {
    console.log(error);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
});

users.get('/:user_id/sleep', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const { startDate, endDate } = req.query;
    const setEndDate = new Date(new Date(endDate).setHours(23, 59, 59, 59));
    const allowEmptyValue = (req.query.allowEmptyValue === 'true');

    let sleeps = await Sleep
      .find({ user: user_id})
      .find({ created_at: { $gte: startDate, $lte: setEndDate } })
      .sort({ created_at: 1 });

    if(!sleeps.length && !allowEmptyValue) {
      sleeps = await Sleep
      .find({ user: user_id})
      .sort({ created_at: 1 });
      return res.json(sleeps[sleeps.length - 1]);
    }

    res.json(sleeps);
  } catch(error) {
    console.log(error);
  }
});

module.exports = users;
