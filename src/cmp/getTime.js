export default function getTime() {
    var moment = require('moment');
    let now = new Date();
    let dateStringWithTimeRaw = moment(now).format('YYYY-MM-DD_HH:mm:ss');

    return (
        dateStringWithTimeRaw.valueOf(function(){
            return dateStringWithTimeRaw
        })
    );
};