import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createPoll, interval } from "ags/time"
import { ToggleButton } from "./modules/toggleButton"
import AstalNetwork from "gi://AstalNetwork"
import AstalTray from "gi://AstalTray"
import AstalMpris from "gi://AstalMpris"
import Battery from "gi://AstalBattery"
import Bluetooth from "gi://AstalBluetooth"

import { createState } from "ags"
import WifiScreen from "./control-center/wifiScreen"
import { ArrowToggleButton } from "./modules/arrowedButton"
import BluetoothScreen from "./control-center/bluetoothScreen"

export default function Bar(gdkmonitor: Gdk.Monitor) {
	const time = createPoll("", 1000, "date")
	const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor


	let [applicationState, setApplicationState] = createState("menu")


	let [percentage, setPercentage] = createState('');



	let [wifiName, setWifiName] = createState('');
	let [wifiEnabled, setWifiEnabled] = createState(false);
	let [bluetoothEnabled, setBluetoothEnabled] = createState(false);



	let battery = Battery.Device.get_default()
	let network = AstalNetwork.Network.get_default()
	let bluetooth = Bluetooth.Bluetooth.get_default()

	let wifi = network.get_wifi()




	console.log(network.wifi.ssid)
	interval(3000, () => {
 	setPercentage(battery.get_percentage())
		setWifiName(network ? network.wifi.get_ssid() : 'not connected')
	setBluetoothEnabled(bluetooth.get_is_powered())
		setWifiEnabled(network ? network.wifi.enabled : false)
	})

	let toggleWifi = () => {
	  setWifiEnabled(!wifiEnabled)
		wifi.set_enabled(!wifi.get_enabled())
		setWifiEnabled(network ? network.wifi.enabled : false)
	}

	let toggleBluetooth=()=>{
	  setBluetoothEnabled(!bluetoothEnabled)
	  bluetooth.toggle()
	  setBluetoothEnabled(bluetooth.get_is_powered())
	 }

	let volumeUpdate = (v) => {
		exec("pactl set-sink-volume @DEFAULT_SINK@ " + v.value + "%")
	}

	let getVolume = () => {
		let out = exec("pactl get-sink-volume @DEFAULT_SINK@").split('/')[1].trim().replace('%', '')
		return parseInt(out)
	}

	let brightnessUpdate = (v) => {
		exec("brightnessctl set " + v.value + "%")
	}

	let getBrightness = () => {
		let out = exec("brightnessctl get").trim()
		let max = exec("brightnessctl max").trim()
		return (parseInt(out) / parseInt(max)) * 100
	}

  let [keyboard,setKeyboard]=createState(exec('keyb-switch.sh info').includes('disabled'))
	let disableKeyboard =()=>{
	  let out=exec('keyb-switch.sh')
	  console.log(out)
	  setKeyboard(out.includes('disabled'))
  }
  let [staleState,setStateState]=createState(false)


	return (
		<window
			visible
			name="wifi-module"
			class="module"
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={BOTTOM | RIGHT}
			application={app}
			
        >

			<box class="main-container" spacing={5}>

				<box spacing={4} visible={applicationState(v => v == "menu")} orientation={Gtk.Orientation.VERTICAL}>
					<box marginBottom={10} spacing={10}>
					   <ArrowToggleButton label={wifiName(v=>v)} icon="" activeState={wifiEnabled} state="wifi" stateChanger={setApplicationState} onClicked={toggleWifi}/>
						<ArrowToggleButton label={(bluetooth.get_is_connected())?'device name':'bluetooth'} icon="" activeState={bluetoothEnabled} state="bluetooth" stateChanger={setApplicationState} onClicked={toggleBluetooth}/>
						<ToggleButton label="auto tiling" activeState={staleState} icon="" />
					</box>
					<box marginBottom={20} spacing={10}>
						<ToggleButton label="disable keyboard" activeState={keyboard} onClicked={disableKeyboard} icon="󰹋" />
						<ToggleButton label="battery saver" activeState={staleState} icon="󰂏" />
						<ToggleButton label="lock" onClicked={()=>{}} icon="" activeState={staleState} />
					</box>
					<box class={"slider-container"}>
						<label class="slider-label" label={"󰖨"} />
						<slider hexpand onChangeValue={(v) => brightnessUpdate(v)} min={1} max={100} value={getBrightness()} />
					</box>
					<box class={"slider-container"}>
						<label class="slider-label" label={""} />
						<slider min={0} max={100} value={getVolume()} hexpand onChangeValue={(v) => volumeUpdate(v)} />
					</box>

					<box class="info-section">
						<label label={percentage((v) => '  ' + (v * 100).toString() + '%')} />
						<label label={''} hexpand />
						<label label={"settings"} />
					</box>
 			</box>

				<WifiScreen setState={setApplicationState} state={applicationState} />
			 <BluetoothScreen setState={setApplicationState} state={applicationState} />


			</box>




		</window>
	)
}
