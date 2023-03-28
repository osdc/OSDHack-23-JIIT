const vehicles = [{"id": "Ambulance", "p_id": "health-tech", "l_id": "health-label", "t_id":"health"}, {"id": "Bus", "p_id": "education", "l_id": "education-label", "t_id":"education"}, {"id": "Wifi", "p_id": "communication-connectivity", "l_id": "communication-label", "t_id":"communication"}, {"id": "Construction", "p_id": "urban-innovation", "l_id": "urban-label", "t_id":"urban"}]

const beg_filepath = "./assets/img/"
const nolights_end = ".svg"
const lights_end = "_lights.svg"

let vehicle_states = {}
let vehicle_hovered = {}
let vehicle_intervals = {}

let label_states = {}

vehicles.forEach(vehicle => {
	vehicle_states[vehicle.id] = 0
	label_states[vehicle.l_id] = 0	

	vehicle_hovered[vehicle.id] = false
	vehicle_intervals[vehicle.id] = null

	let vehicle_p = document.getElementById(vehicle.l_id)
	let vehicle_img = document.getElementById(vehicle.id)
	let vehicle_building = document.getElementById(vehicle.id + "-bb")

	let clickable = [vehicle_p, vehicle_img, vehicle_building];

	clickable.forEach(obj => {
		obj.addEventListener("mouseover", () => vehicle_hover(vehicle.id))
		obj.addEventListener("mouseout", () => vehicle_unhover(vehicle.id))

		obj.addEventListener("mouseover", () => label_hover(vehicle.l_id, vehicle.t_id))
		obj.addEventListener("mouseout", () => label_unhover(vehicle.l_id, vehicle.t_id))

		obj.addEventListener("click", () => show_overlay(vehicle.t_id, vehicle.id))
	})
})

let overlays = document.getElementsByClassName("overlay")
for (let i = 0; i < overlays.length; i++) {
	let close_button = overlays[i].getElementsByClassName("close-button")[0];
	let box = overlays[i].getElementsByClassName("overlay-box")[0];
	close_button.addEventListener("click", () => hide_overlay(overlays[i]))
	overlays[i].addEventListener("click", () => hide_overlay(overlays[i]))
	box.addEventListener("click", (e) => e.stopPropagation())
}

function vehicle_hover(vehicle_id) {
	if (vehicle_intervals[vehicle_id] === null) {
		vehicle_intervals[vehicle_id] = setInterval(() => blink_lights(vehicle_id), 500)
	}

	vehicle_hovered[vehicle_id] = true
}

function vehicle_unhover(vehicle_id) {
	vehicle_hovered[vehicle_id] = false
}

function label_hover(label_id, track_name) {
	label_lights(label_id, track_name)
}

function label_unhover(label_id, track_name) {
	label_lights(label_id, track_name)
}

function show_overlay(track_id, vehicle_id) {
	let overlay = document.getElementById(`${track_id}-overlay`)
	overlay.style.display = "block"

	let vehicle_img = document.getElementById(vehicle_id + "-popup")
	vehicle_img.src = beg_filepath + vehicle_id + lights_end

	setTimeout(() => overlay_lights_off(vehicle_id), 1000) // time should be same as css animation!
}

function hide_overlay(elem) {
	elem.style.display = "none"
}


function overlay_lights_off(vehicle_id) {
	let vehicle_img = document.getElementById(vehicle_id + "-popup")
	vehicle_img.src = beg_filepath + vehicle_id + nolights_end
}

function blink_lights(vehicle_id) {
	if (vehicle_states[vehicle_id] === 0) {
		let vehicle_img = document.getElementById(vehicle_id)
		vehicle_img.src = beg_filepath + vehicle_id + lights_end
		vehicle_states[vehicle_id] = 1
	} else {
		let vehicle_img = document.getElementById(vehicle_id)
		vehicle_img.src = beg_filepath + vehicle_id + nolights_end
		vehicle_states[vehicle_id] = 0
	}

	if (!vehicle_hovered[vehicle_id] && vehicle_states[vehicle_id] == 0) {
		clearInterval(vehicle_intervals[vehicle_id])
		vehicle_intervals[vehicle_id] = null
	}
}
function label_lights(label_id, track_name) {
	if (label_states[label_id] === 0) {
		let label_img = document.getElementById(label_id)
		label_img.src = beg_filepath + track_name + lights_end
		label_states[label_id] = 1
	} else {
		let label_img = document.getElementById(label_id)
		label_img.src = beg_filepath + track_name + nolights_end
		label_states[label_id] = 0
	}

}
