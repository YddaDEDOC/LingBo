
function*checkTime(){
    var d = new Date().getTime();
    var t = d + 3000;
    while (d < t){
        const n = new Date().getTime();
        yield n - d;
    }

}

function timeFrame(round){
    const nTime = checkTime();
    var active = true;
    var count = 0;
    while(active){
        if(nTime == 1000){
            round(count);
            count ++;
            if(count == 3){
                active = false;
            }
        }
    }
}

module.exports = {
    name: 'time',
    description: "this is a time command!",
    execute: timeFrame()
}