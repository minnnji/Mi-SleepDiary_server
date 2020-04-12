const express = require('express');
const createError = require('http-errors');
const users = express.Router();
const Sleep = require('../models/Sleep');
const User = require('../models/User');
const Diary = require('../models/Diary');

users.get('/login', () => {
  console.log('login');
});

users.put('/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const updateInfo = req.body;
    let update = { $set: updateInfo };

    if(updateInfo.hasOwnProperty('my_diaries')) {
      update = { $push: updateInfo };
    }

    await User.updateMany({ _id: user_id }, update);
    res.json(req.body);

  } catch(error) {
    console.log(error);
  }
});

users.post('/:user_id/sleeps', async (req, res, next) => {
  const sleepList = [];

  try {
    for (let i = 0; i < req.body.length; i++) {
      const {
        sleepDuration,
        bedTime,
        wakeUpTime,
        sleepCycle,
        lightSleepSeconds,
        deepSleepSeconds,
        deepSleepPercentage
      } = req.body[i];

      sleep = await new Sleep({
        user: req.params.user_id,
        created_at: wakeUpTime,
        sleep_duration: sleepDuration,
        bedTime: bedTime,
        wakeUp_time: wakeUpTime,
        sleep_cycle: sleepCycle,
        deep_sleep_seconds: deepSleepSeconds,
        light_sleep_seconds: lightSleepSeconds,
        deep_sleep_percentage: deepSleepPercentage,
        light_sleep_percentage: 100 - deepSleepPercentage
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

users.get('/:user_id/sleeps', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    if(!Object.keys(req.query).length) {
      const sleepList = await Sleep
        .find({ user: user_id })
        .sort({ created_at: -1 })
        .populate('diary')
        .lean();
      return res.json(sleepList);
    }

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
      return res.json([sleeps[sleeps.length - 1]]);
    }

    res.json(sleeps);
  } catch(error) {
    console.log(error);
  }
});

users.put('/:user_id/sleeps/:sleep_id', async (req, res, next) => {
  try {
    const { sleep_id } = req.params;
    const updateInfo = req.body;
    let update = { $set: updateInfo };

    const response = await Sleep.updateOne({ _id: sleep_id }, update);
    res.json(response);

  } catch(error) {
    console.log(error);
  }
});

users.post('/:user_id/diaries', async (req, res, next) => {
  try {
    const {
      date,
      sleepHours,
      behaviorScore,
      behaviorScoreReason,
      feelingColor,
      memo,
      sleep
    } = req.body;

    diary = await new Diary({
      author: req.params.user_id,
      date,
      sleep_hours: sleepHours,
      behavior_score: behaviorScore,
      behavior_score_reason: behaviorScoreReason,
      feeling_color: feelingColor,
      memo,
      sleep
    }).save();

    res.json(diary);
  } catch(error) {
    console.log(error);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
});

module.exports = users;
