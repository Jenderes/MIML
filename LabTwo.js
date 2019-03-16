function RandomNotRepeat(n) {
let pingt = [];
let flag = true;
let flastr = 1;
const num = Math.floor(Math.random() * (n - 1 + 1)) + 1;
pingt[0] = {
    number: 1,
    id: num,
    idmax : num
}
for (let i = 1; i < n; i++) {
    pingt[i] = {};
    pingt[i].number = i + 1;
    flag = true;
    while (flag) {
        let idnum = Math.floor(Math.random() * (n - 1 + 1)) + 1;
        for (let j = 0; j < pingt.length - 1; j++) {
            if (pingt[j].id != idnum) {
                flastr += 1;
            }
        }
        if (flastr == pingt.length) {
            pingt[i].id = idnum;
            pingt[i].idmax = idnum;
            flag = false;
        }
        flastr = 1;
    }
}
return pingt;
}
let arrayobj = RandomNotRepeat(5);
console.log(arrayobj);
let sch = 0;
while(sch != arrayobj.length - 1) {
    sch = 0;
for (let i = -1; i < arrayobj.length; i++) {
    if ( i < 0 ) {
        arrayobj[i+1].idmax = (arrayobj[i+1].idmax < arrayobj[arrayobj.length-1].idmax  ) ? arrayobj[arrayobj.length-1].idmax : arrayobj[i+1].idmax;
    } else if (i == (arrayobj.length - 1)) {
        arrayobj[i].idmax = (arrayobj[i].idmax < arrayobj[0].idmax  ) ? arrayobj[0].idmax : arrayobj[i].idmax;
    } else if (arrayobj[i].idmax < arrayobj[i+1].idmax || arrayobj[i].idmax > arrayobj[i+1].idmax) {
        arrayobj[i].idmax = (arrayobj[i].idmax < arrayobj[i+1].idmax  ) ? arrayobj[i+1].idmax : arrayobj[i].idmax;
    }
}
for (let j = 0; j < arrayobj.length - 1; j++) {
    if (arrayobj[j].idmax == arrayobj[j + 1].idmax) {
        sch += 1;
    }
}
}
console.log('-----------------');
console.log(arrayobj);