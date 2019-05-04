function getRealNum(num) {
    var ball = {}
    if (num < 10) {
        ball.num = '0' + num
    } else
        ball.num = num
    ball.checked  = false
    return ball
}

/***初始化数组 */
function getBallArray(num) {
    var array = [];
    for(var i = 1; i <= num; i ++ ) {
        array.push(getRealNum(i))
    }
    return array
}

function getBallArrayFrom0() {
    var array = [];
    for (var i = 0; i <= 9; i++) {
        var ball = {
            num: i,
            checked: false
        }
        array.push(ball)
    }
    return array
}

function randomIn(i, arr) {
    var arr1 = arr.random();
    return arr1;
}


module.exports = {
    getBallArray: getBallArray,
    getBallArrayFrom0: getBallArrayFrom0
}