import { useState, useEffect } from 'react';

const Clock = () => {

  var moment = require('moment');
  const init = new Date();
  const dateStringWithTimeRaw = moment(init).format('HH:mm:ss');
  const [date, setDate] = useState(init)

  const tick = () => {
    setDate(new Date())
  }

  useEffect(() => {
    const timerID = setTimeout(() => tick(), 1000)
    return () => {
      clearTimeout(timerID)
    }
  }, [date]);

  return dateStringWithTimeRaw;
}

export default Clock;