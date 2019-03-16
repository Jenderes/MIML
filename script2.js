$("#start").on("click", () => {
  function RandomArrayNotRepeat(n) {
    let pingt = [];
    let flag = true;
    let flastr = 1;
    const num = Math.floor(Math.random() * (n - 1 + 1)) + 1;
    pingt[0] = {
      number: 1,
      id: num,
      idmax: num,
      prew: 0,
      lsr: 0,
      idnex: num
    };
    for (let i = 1; i < n; i++) {
      pingt[i] = {};
      pingt[i].number = i + 1;
      pingt[i].prew = 0;
      pingt[i].lsr = 0;
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
          pingt[i].idnex = idnum;
          flag = false;
        }
        flastr = 1;
      }
    }
    return pingt;
  }
  let set;
  const time = 2000;
  if (typeof parseInt($("#inp").val()) === "number") {
    set = $("#inp").val();
  } else {
    set = 6;
  }
  console.log(set);
  const radius = 200;
  const width = $("#container").width();
  const height = $("#container").height();
  let angle = 300;
  let schtk = 0;
  let arrayobj = RandomArrayNotRepeat(set);
  let zapr = `<div class='radius'></div><div id='center'><p>0</p></div>`;
  for (let i = 0; i < arrayobj.length; i++) {
    zapr += `<div class='field'><p>number:${arrayobj[i].number}</p><p>id:${
      arrayobj[i].id
    },idmax:${arrayobj[i].idnex}</p></div>`;
  }
  $("#container").html(zapr);
  let step = (2 * Math.PI) / $(".field").length;
  $(".field").each(function() {
    let x = Math.round(
      width / 2 + radius * Math.cos(angle) - $(this).width() / 2
    );
    let y = Math.round(
      height / 2 + radius * Math.sin(angle) - $(this).height() / 2
    );
    $(this).css({
      left: x + 365 + "px",
      top: y + "px"
    });
    angle += step;
  });
  let timerId = setInterval(function() {
    for (let i = 0; i < arrayobj.length; i++) {
      if (i === 0) {
        if (arrayobj[arrayobj.length - 1].idnex <= arrayobj[i + 1].idnex) {
          if (arrayobj[i].idnex < arrayobj[i + 1].idnex) {
            arrayobj[i].idmax = arrayobj[i + 1].idmax;
          }
        } else {
          if (arrayobj[i].idnex < arrayobj[arrayobj.length - 1].idnex) {
            arrayobj[i].idmax = arrayobj[arrayobj.length - 1].idmax;
          }
        }
      } else if (i === arrayobj.length - 1) {
        if (arrayobj[arrayobj.length - 2].idnex <= arrayobj[0].idnex) {
          if (arrayobj[arrayobj.length - 1].idnex < arrayobj[0].idnex) {
            arrayobj[arrayobj.length - 1].idmax = arrayobj[0].idmax;
          }
        } else {
          if (
            arrayobj[arrayobj.length - 1].idnex <
            arrayobj[arrayobj.length - 2].idnex
          ) {
            arrayobj[arrayobj.length - 1].idmax =
              arrayobj[arrayobj.length - 2].idmax;
          }
        }
      } else {
        if (arrayobj[i - 1].idnex <= arrayobj[i + 1].idnex) {
          if (arrayobj[i + 1].idnex > arrayobj[i].idnex) {
            arrayobj[i].idmax = arrayobj[i + 1].idmax;
          }
        } else {
          if (arrayobj[i - 1].idnex > arrayobj[i].idnex) {
            arrayobj[i].idmax = arrayobj[i - 1].idmax;
          }
        }
      }
    }
    for (let i = 0; i < arrayobj.length; i++) {
      arrayobj[i].idnex = arrayobj[i].idmax;
    }
    schtk += 1;
    let zapr = `<div class='radius'></div><div id='center'><p>0</p></div>`;
    for (let i = 0; i < arrayobj.length; i++) {
      zapr += `<div class='field'><p>number:${arrayobj[i].number}</p><p>id:${
        arrayobj[i].id
      },idmax:${arrayobj[i].idnex}</p></div>`;
    }
    $("#container").html(zapr);
    $("#center p").html(schtk);
    let step = (2 * Math.PI) / $(".field").length;
    $(".field").each(function() {
      let x = Math.round(
        width / 2 + radius * Math.cos(angle) - $(this).width() / 2
      );
      let y = Math.round(
        height / 2 + radius * Math.sin(angle) - $(this).height() / 2
      );
      $(this).css({
        left: x + 365 + "px",
        top: y + "px"
      });
      angle += step;
    });
  }, time);
  const timeset = (arrayobj.length * time) / 2;
  setTimeout(function() {
    clearInterval(timerId);
  }, timeset);
});
