import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const maleIcon =
	'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M44.555,74.093c0,1.481,0.721,2.223,2.164,2.223c1.447,0,2.17-0.742,2.17-2.223V54.077h2.223v20.017  c0,1.481,0.725,2.223,2.17,2.223s2.17-0.742,2.17-2.223v-34.1h1.057v12.283c0,0.777,0.266,1.342,0.795,1.694  c0.527,0.353,1.072,0.353,1.641,0c0.563-0.352,0.844-0.917,0.844-1.694V39.04c0-1.412-0.479-2.505-1.428-3.282  c-0.951-0.777-2.273-1.167-3.967-1.167h-8.678c-1.623,0-2.943,0.354-3.965,1.06c-1.023,0.706-1.537,1.8-1.537,3.284v14.084  c0,0.634,0.283,1.093,0.848,1.375c0.564,0.283,1.111,0.283,1.639,0c0.527-0.282,0.795-0.741,0.795-1.375V39.994h1.061V74.093z"/><path d="M45.398,28.185c0,1.237,0.439,2.295,1.32,3.177c0.885,0.882,1.941,1.325,3.174,1.325c1.238,0,2.293-0.443,3.18-1.325  c0.879-0.881,1.32-1.959,1.32-3.231c0-1.198-0.441-2.241-1.32-3.122c-0.887-0.882-1.941-1.325-3.18-1.325  c-1.232,0-2.289,0.443-3.174,1.325C45.838,25.89,45.398,26.95,45.398,28.185z"/></svg>';

const config = {
	floors: 6,
	elevators: 1,
	minPeople: 1,
	maxPeople: 6,
	minInterval: 800,
	maxInterval:  2000
};

let data = {
	floors: [],
	elevators: []
};
let personId = 0;
let arrobj = [];
let inf = 0;
let flag = false;
let dlm = 0;
let containerEl = document.querySelector(".container");
let t = 0;
let ito = 0;
let flager = true;
let flags = true;
function timer () {
	setTimeout(function () { 
		if (flager) {
			document.getElementById('timers').textContent = "Second: "+ito;
			ito+=1;
			timer ();
		}
	},1000);
 }
  ReactDOM.render(
	<div className='timer'>
		  <h1 id='timers'></h1>
		  <div>
		  </div>
			{/* <div className = 'datacheck'>
		 		<div>
				 <input type="text" placeholder = "Количесвто этажей" id = "floor" />
				 <input type="text" placeholder = "мин кол людей"  id = "min"/>
				 <input type="text" placeholder = "макс кол людей"id = "max" />
				 <button onClick = {timer()}>Start</button>
		 		</div>
			</div> */}
		</div>,
	document.getElementById('app')
  )
  
function randomExcept(min, max, except) {
	let r = Math.floor(Math.random() * (max - min + 1) + min);
	return r !== except ? r : randomExcept(min, max, except);
}

function getRandomPeople(min, max, currentFloorIndex, data) {
	let lastArrival = 0;
	return Array(Math.floor(Math.random() * (max - min + 1) + min))
		.fill()
		.map((item, index) => ({
			index: personId++,
			originalFloor: currentFloorIndex,
			targetFloorIndex: randomExcept(0, config.floors, currentFloorIndex),
			arrivesAt: (lastArrival +=
				(Math.random() * config.maxInterval -
					config.minInterval +
					1 +
					config.minInterval) |
				0)
        }));
}
function getPeople(data) {
	return Array(2)
		.fill()
		.map((item, index) => ({
			index: personId++,
			originalFloor: 4,
			targetFloorIndex: 4,
			arrivesAt: 1000
        }));
}
for (let floorIndex = 0; floorIndex < config.floors; floorIndex++) {
    let arr = [];
    if (floorIndex === (config.floors - 1)) {
        data.floors.push({
            number: config.floors - floorIndex,
            index: floorIndex,
            callUp: false,
            callDown: false,
            people: arr
        });
    } else {
      	data.floors.push({
		number: config.floors - floorIndex,
		index: floorIndex,
		callUp: false,
		callDown: false,
        people: getRandomPeople(config.minPeople, config.maxPeople, floorIndex, data)  
    });
    }
    dlm += data.floors[floorIndex].people.length;
}
for (let elevatorIndex = 0; elevatorIndex < config.elevators; elevatorIndex++) {
	data.elevators.push({
		index: elevatorIndex,
		atFloor: (Math.random() * config.floors) | 0,
		status: "open"
	});
}

function callUp(floorIndex, data) {
    return call(floorIndex, "up", data);
}

function callDown(floorIndex, data) {
    return call(floorIndex, "down", data);
}

function call(floorIndex, direction, data) {
	console.log("call", floorIndex, direction);
	let newData = {
        ...data,
		elevators: [
			{
				...data.elevators[0],
				atFloor: floorIndex
			},
			...data.elevators.slice(1)
		]
	};
    console.log("arrobj",arrobj);
	return tick(newData);
}

function renderFloor(floor, data) {
	let doors = data.elevators.map((elevator, index) => (
		<div
			className={
				"door door-" + index + (elevator.atFloor === floor.index ? " open" : "")
			}
			key={"door-" + index}
		/>
	));

	let cls = ["floor", "floor-" + floor.index];
	floor.callUp && cls.push("callUp");
	floor.callDown && cls.push("callDown");

	return (
		<div className={cls.join(" ")} key={"floor-" + floor.index}>
			{doors}
			<div className="corridor" key="corridor">
				<div className="number" key="numbers">
					{floor.number}
				</div>
				<div className="buttons" key="buttons">
					<button
						className="button-up"
						key="button-up"
						onClick={() => callUp(floor.index, data)}
					/>
					<button
						className="button-down"
						key="button-down"
						onClick={() => callDown(floor.index, data)}
					/>
				</div>
				<div className="people" key="people">
					{floor.people.map((person, index) => (
						<div
							className={"person" + (person.arrived ? " arrived" : "")}
							data-target={person.targetFloorIndex}
							key={"person-" + person.index}
						>
							<span dangerouslySetInnerHTML={{ __html: maleIcon }} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function renderShafts(data) {
	return (
		<div className="shafts">
			{data.elevators.map((elevator, index) => (
				<div className="shaft" key={"shaft-" + index}>
					<div
						className={[
							"elevator",
							"elevator-" + index,
							"atFloor-" + elevator.atFloor
						].join(" ")}
						key={"elevator-" + elevator.index}
					>
						<div className={"door" + (elevator.status === "open" ? " open" : "")} />
					</div>
				</div>
			))}
		</div>
	);
}

function tick(newData) {
	data = newData;

	ReactDOM.render(
		<div className="building">
			<div className="floors">
				{data.floors.map((floor, index) => renderFloor(floor, data))}
			</div>
			{renderShafts(data)}
		</div>,
		document.querySelector(".container")
	);
}

function init(data) {
	data.floors.forEach((floor, index) => {
		floor.people.forEach((person, index) => {
			setTimeout(function() {
                console.log("arrived", person);
                arrobj[inf] = {floor:person.originalFloor,index:person.index };
                inf+= 1;
				person.arrived = true;
				tick(data);	
				inited(data);
			}, person.arrivesAt);
		});
	});
    tick(data);
}
function inited(data) {
	if (inf === dlm) {
		if (flags) {
			timer();
			flags = false;
		}
	setTimeout(function () {
		if (arrobj.length !== 0) {
			console.log(data.floors[arrobj[0].floor].people);
			if(flag) {
				if(arrobj.length === 1) {
					data.floors[arrobj[0].floor].people.shift();
					arrobj.splice(0,1);
					callDown(config.floors -1,data);
					flag = false;
				}
				for (let i = 1; i < arrobj.length; i++) {
				if (arrobj[0].floor === arrobj[i].floor) {
						data.floors[arrobj[0].floor].people.shift();
						data.floors[arrobj[0].floor].people.shift();
						arrobj.splice(i,1);
						arrobj.splice(0,1);
						callDown(config.floors -1,data);
						flag = false;
					break;
				} else if (i === arrobj.length - 1) {
					data.floors[arrobj[0].floor].people.shift();
					arrobj.splice(0,1);
					callDown(config.floors -1,data);
					flag = false;
				}
			}
			}  else {
				data.floors[config.floors -1].people = getPeople();
				callDown(arrobj[0].floor,data);
				flag = true;
				console.log(data.floors[3]);
			}
		console.log(t);
		console.log(0);
		console.log(config.floors -1);
		t+=1;
		inited(data);
	} else {
		callDown(config.floors -1,data);
		flager = false;
	}
}, 3000);	
}
}
init(data);
inited(data);
console.log("arrobj",arrobj);
serviceWorker.unregister();
