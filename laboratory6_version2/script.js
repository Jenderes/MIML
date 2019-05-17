

let ArrayDock = []; 
let ArrayBoat = [];
let ArrayLeaveBoat = [];
let interval = 500;
let checker = 0;
let checks = 0;
let ArrayBoatInDock = [];
let ArrayColor = ['#0f7c469f', '#320f7c9f', '#f1250a9f','#1f9c469f', '#540c7c9f', '#a2540a9f','#0c7c469f', '#350f7c9f', '#a1402a9f'];
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}
function RenderBoatAndDock() {
    // Paiting boat
    let HtmlBoat = ``;
    ArrayBoat.forEach(Boat => {
        HtmlBoat += `<div class="BoatPosition" id="BoatPosition"> <div class="img"><img src="img/cargo-ship.svg" alt=""></div> <div class="id">${Boat.IDBoat}</div> </div>`;
    });
    // Render in html Boat
    $('#ContainerBoat').html(HtmlBoat);
    let LeftPosition = 50;
    $(".BoatPosition").each(function coord(index) {
        $(this).css({
            left: LeftPosition + 'px',
            background: ArrayBoat[index].ColorBoat
        });
        LeftPosition += 170;
    });
    // Paiting Dock
    let HtmlDock = ``;
    ArrayDock.forEach(Dock => {
        HtmlDock += `<div class="PortPostion" id="PortPosition"><img src="img/dock.svg" alt="Port"></div>`;
    });
    // Render in html Dock
    $('#ContainerPort').html(HtmlDock);
    LeftPosition = 50;
    $(".PortPostion").each(function coord(index) {
        $(this).css({
            left: LeftPosition + 'px',
            background: ArrayDock[index].ColorDock
        });
        LeftPosition += 170;
    });
};

function RenderSecondPositionBoat() {
    // Paiting  second position boat
    let HtmlBoat = ``;
    ArrayBoatInDock.forEach(Boat => {
        HtmlBoat += `<div class="BoatSecondPosition" id="BoatSecondPosition"> <div class="img"><img src="img/cargo-ship.svg" alt=""></div> <div class="id">${Boat.IDBoat}</div> </div>`;
    });
    // Render in html Boat
    $('#ContainerPortBoat').html(HtmlBoat);

    for (let i = 0; i < ArrayBoatInDock.length; i++) {
        $(`#BoatSecondPosition:nth-child(${i + 1})`).css({
            left: 170*ArrayBoatInDock[i].IDIn + 50 +'px',
            background: ArrayBoatInDock[i].ColorBoat
        });
    }
};
function MoveFirstToSecond() {
    checker = 0;
    if (ArrayBoatInDock.length < ArrayBoat.length) {
        if(ArrayBoatInDock.length == 0 ) {
            ArrayBoatInDock.push(ArrayBoat[ArrayBoat.length-1]);
            ArrayBoat.splice(-1,1);
        } else {
            for (let j = 0; j < ArrayBoatInDock.length; j++) {
                if (ArrayBoat[ArrayBoat.length-1].IDIn !== ArrayBoatInDock[j].IDIn) {
                    checker+=1;
                }
            }
            if (checker == ArrayBoatInDock.length) {
                ArrayBoatInDock.push(ArrayBoat[ArrayBoat.length-1]);
                ArrayBoat.splice(-1,1);
            }
            checker = 0;
        }

}
}
function MoveLeave () {
    let getBoat = randomInteger(0, ArrayBoatInDock.length -1);
    ArrayLeaveBoat.push(ArrayBoatInDock[getBoat]);
    ArrayBoatInDock.splice(getBoat,1);
}; 
function LeaveToBoat() {
    ArrayBoat.unshift(ArrayLeaveBoat[0]);
    ArrayLeaveBoat = [];
};
document.getElementById('ButtonClickStart').addEventListener('click', function () {
    // Create Object for Dock and Boat
    let ObjectDock = {
        IdDock: 0,
        ColorDock: '#186663'
    }
    let Boat = {
        IDBoat: 0,
        IDIn: 0,
        ColorBoat: '#186663'
    }
    // Filling array for docks
    for (let i = 0; i < $('#SelectCountPort').val(); i++) {
        let numb = randomInteger(0, 2);
        ArrayDock[i] = Object.assign({}, ObjectDock);
        ArrayDock[i].IdDock = i;
        ArrayDock[i].ColorDock = ArrayColor[i];
    }
    // Filing array for boat
    let CountType = 1;
    for (let i = 0; i <  $('#SelectCountShip').val(); i++) {
        let random = randomInteger(0,($('#SelectCountPort').val()-1))
        ArrayBoat[i] = Object.assign({}, Boat);
        ArrayBoat[i].IDBoat = i;
        ArrayBoat[i].IDIn = random;
        ArrayBoat[i].ColorBoat = ArrayColor[random];
    }
    console.log(ArrayBoat);
    console.log(ArrayDock);
    RenderBoatAndDock();
    let sttr = 0; 
        function runInterval() {
            setTimeout(function () {
                if (checks == 0) {
                    if(sttr < ArrayDock.length) {
                        MoveFirstToSecond();
                        RenderBoatAndDock();
                        RenderSecondPositionBoat();
                        sttr+=1;
                    } else {
                        MoveFirstToSecond();
                        RenderBoatAndDock();
                        RenderSecondPositionBoat();
                        checks+=1;
                    }
                    console.log(checks);
                } else if (checks == 1) {
                    RenderBoatAndDock();
                    MoveLeave();
                    RenderSecondPositionBoat();
                    checks+=1;
                    console.log(checks);
                } else if (checks == 2) {
                    MoveFirstToSecond();
                    LeaveToBoat()
                    RenderBoatAndDock();
                    RenderSecondPositionBoat();
                    checks += 1;
                    console.log(checks);
                } else if (checks == 3) {
                    MoveFirstToSecond();
                    RenderBoatAndDock();
                    RenderSecondPositionBoat();
                    checks = 0;
                    console.log(checks);
                }
                runInterval()
            }, interval);
        }
        runInterval();
});