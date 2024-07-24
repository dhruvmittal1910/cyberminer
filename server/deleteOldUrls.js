
const cron = require('node-cron');
const Url = require('./schema.js');

const deleteOldUrls = async () => {
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  try {
    const result = await Url.deleteMany({ date: { $lt: ninetyDaysAgo } });
    console.log(`Deleted ${result.deletedCount} old URLs`);
  } catch (error) {
    console.error('Error deleting old URLs:', error);
  }
};

// Run the task every day at midnight
const scheduleTask = () => {
  cron.schedule('0 0 * * *', () => {
    console.log('Running delete old URLs task');
    deleteOldUrls();
  });
};

module.exports = { scheduleTask };