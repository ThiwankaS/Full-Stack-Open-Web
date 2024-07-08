const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })
    
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)    
}

async function incrementTodoCount () {
  try {
    const countStr = await getAsync('todo_count') || '0';
    const count = parseInt(countStr,10);
    await setAsync('todo_count', count + 1);
  } catch (error) {
    console.log('Error : Incrementing todo_count ');
  }
}

async function getStatistics () {
  try {
    const countStr = await getAsync('todo_count') || '0';
    const count = parseInt(countStr,10);
    return count;
  } catch (error) {
    console.log('Error : Getting statistics');
  }
}

module.exports = {
  getAsync,
  setAsync,
  incrementTodoCount,
  getStatistics
}