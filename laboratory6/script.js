    // Create All Array
    let ArrayBoat = [];
    let ArrayDock = [];
    let ArrayBoatInDock = [];
    let ArrayLeaveBoat = [];
    let ArrayColor = ['#0f7c469f', '#540f7c9f', '#a1420a9f'];
    let PositionBoat = [50, 220, 390];
    let Case = [];
    let CaseIdDelete = [];
    let interval = 500;
    var checker = 0;
    let first = false;
    let prover = true;
    function randomInteger(min, max) { var rand = min - 0.5 + Math.random() * (max - min + 1); rand = Math.round(rand); return rand;}
    function ischeck(value) {
        console.log(value)
        if (ArrayBoatInDock.length === 3) {
            if ((ArrayBoatInDock[0].IDBoat !== value.IDBoat) && (ArrayBoatInDock[1].IDBoat !== value.IDBoat) && (ArrayBoatInDock[2].IDBoat !== value.IDBoat)) {
                return value;
            }
        } else if (ArrayBoatInDock.length === 2) {
            if ((ArrayBoatInDock[0].IDBoat !== value.IDBoat) && (ArrayBoatInDock[1].IDBoat !== value.IDBoat)) {
                return value;
            }

        } else if (ArrayBoatInDock.length === 1) {
            if ((ArrayBoatInDock[0].IDBoat !== value.IDBoat)) {
                return value;
            }
        }
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
                left: PositionBoat[ArrayBoatInDock[i].IDPort] + 'px',
                background: ArrayBoatInDock[i].ColorBoat
            });
        }
    };

    function MoveFirstToSecond() {
        // fill Array boat in dock
        prover = true
        let checker = 0;
        if (ArrayBoatInDock.length < 3) {
           if(ArrayBoatInDock.length == 0 ) {
         if (ArrayBoat[ArrayBoat.length-1].IDIn <= 0) {
            ArrayBoat[ArrayBoat.length-1].IDPort = 0;
            ArrayBoatInDock.push(ArrayBoat[ArrayBoat.length-1]);
            ArrayBoat.splice(-1,1);
         } else if (ArrayBoat[ArrayBoat.length-1].IDIn <= 1) {
            ArrayBoat[ArrayBoat.length-1].IDPort = 1;
            ArrayBoatInDock.push(ArrayBoat[ArrayBoat.length-1]);
            ArrayBoat.splice(-1,1);
         } else {
            ArrayBoat[ArrayBoat.length-1].IDPort = 2;
            ArrayBoatInDock.push(ArrayBoat[ArrayBoat.length-1]);
            ArrayBoat.splice(-1,1);
         }
        } else {
            if (ArrayBoat[ArrayBoat.length-1].IDIn <= 0 && prover) {
                ArrayBoat[ArrayBoat.length-1].IDPort = 0;
                for (let j = 0; j < ArrayBoatInDock.length; j++) {
                    if (ArrayBoat[ArrayBoat.length-1].IDPort !== ArrayBoatInDock[j].IDPort) {
                        checker+=1;
                    }
                }
                if (checker == ArrayBoatInDock.length) {
                    ArrayBoatInDock.push(ArrayBoat[ArrayBoat.length-1]);
                    ArrayBoat.splice(-1,1);
                }
                checker = 0;
                prover = false;
             } 
             if (ArrayBoat[ArrayBoat.length-1].IDIn <= 1) {
                ArrayBoat[ArrayBoat.length-1].IDPort = 1;
                for (let j = 0; j < ArrayBoatInDock.length; j++) {
                    if (ArrayBoat[ArrayBoat.length-1].IDPort !== ArrayBoatInDock[j].IDPort) {
                        checker+=1;
                    }
                }
                if (checker == ArrayBoatInDock.length) {
                    ArrayBoatInDock.push(ArrayBoat[ArrayBoat.length-1]);
                    ArrayBoat.splice(-1,1);
                }
                checker = 0;
                prover = false;
             } 
             if (ArrayBoat[ArrayBoat.length-1].IDIn <= 2) {
                ArrayBoat[ArrayBoat.length-1].IDPort = 2;
                for (let j = 0; j < ArrayBoatInDock.length; j++) {
                    if (ArrayBoat[ArrayBoat.length-1].IDPort !== ArrayBoatInDock[j].IDPort) {
                        checker+=1;
                    }
                }
                if (checker == ArrayBoatInDock.length) {
                    ArrayBoatInDock.push(ArrayBoat[ArrayBoat.length-1]);
                    ArrayBoat.splice(-1,1);
                }
                checker = 0;
                prover = false;
             }
            }
        }
        ArrayBoat = ArrayBoat.filter(ischeck);
        console.log(ArrayBoat);
    };
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
            IDPort: 0,
            ColorBoat: '#186663'
        }
        // Filling array for docks
        for (let i = 0; i < 3; i++) {
            let numb = randomInteger(0,2);
            ArrayDock[i] = Object.assign({}, ObjectDock);
            ArrayDock[i].IdDock = i;
            ArrayDock[i].ColorDock = ArrayColor[i];
        }
        // Filing array for boat
        let CountType = 1;
        for (let i = 0; i < 6; i++) {
            ArrayBoat[i] = Object.assign({}, Boat);
            ArrayBoat[i].IDBoat = i;
            ArrayBoat[i].IDIn = CountType - 1;
            ArrayBoat[i].ColorBoat = ArrayColor[CountType - 1];
            if (CountType === 3) {
                CountType = 0;
            }
            CountType++;
        }
        console.log(ArrayBoat);
        RenderBoatAndDock();
        let sttr = 0; 
        function runInterval() {
            setTimeout(function () {
                if (checker == 0) {
                    if(sttr <= 2) {
                        MoveFirstToSecond();
                        RenderBoatAndDock();
                        RenderSecondPositionBoat();
                        sttr+=1;
                    } else {
                        MoveFirstToSecond();
                        RenderBoatAndDock();
                        RenderSecondPositionBoat();
                        checker+=1;
                    }
                    console.log(checker);
                } else if (checker == 1) {
                    RenderBoatAndDock();
                    MoveLeave();
                    RenderSecondPositionBoat();
                    checker+=1;
                    console.log(checker);
                } else if (checker == 2) {
                    LeaveToBoat()
                    RenderBoatAndDock();
                    RenderSecondPositionBoat();
                    checker += 1;
                    console.log(checker);
                } else if (checker == 3) {
                    MoveFirstToSecond();
                    RenderBoatAndDock();
                    RenderSecondPositionBoat();
                    checker = 0;
                    console.log(checker);
                }
                runInterval()
            }, interval);
        }
        runInterval();
    });

    // fill Array Dock test
    // for (let i = ArrayBoat.length-1 ; i > 0; i--) {
    //     if (ArrayBoatInDock.length <= ArrayDock.length) {
    //         if(ArrayBoatInDock.length != 0){
    //         for (let j = 0; j < ArrayBoatInDock.length; j++) {
    //             if(ArrayBoatInDock[j].IDIn <= ArrayBoat[i].IDIn) {
                    
    //             }
    //         }
    //         if (check == ArrayBoatInDock.length) {
    //             ArrayBoatInDock.push(ArrayBoat[i]);
    //             CaseIdDelete.push(ArrayBoat[i].IDBoat);
    //         } 
    //         check = 0;
    //     } else {
    //         ArrayBoatInDock.push(ArrayBoat[i]);
    //     }
    //     } else {
    //         break;
    //     }
    // }