import { Astal, Gtk, Gdk } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createPoll, interval } from "ags/time"
import { ToggleButton } from "./modules/toggleButton"
import Bluetooth from "gi://AstalBluetooth"
import { createState, For, onMount, With } from "ags"


export default function BluetoothScreen({state,setState}:{state:any,setState:any}) {


  // console.log(networkHelper.wif
  onMount(()=>{
	  setDeviceList(bluetooth.get_devices().filter(v=>v))
  })

  let bluetooth=Bluetooth.Bluetooth.get_default()

  let [deviceList, setDeviceList] = createState([] as Bluetooth.Device[])
	interval(15000,()=>{
	  setDeviceList(bluetooth.get_devices().filter(v=>v))
	})

	let [currentDevice, setCurrentDevice] = createState('')
	 setCurrentDevice('')


	


	return (
		<box visible={state(v=>v=="bluetooth")} orientation={Gtk.Orientation.VERTICAL} class="control-center-screen" hexpand vexpand>

			<box class="info-section">
				<button onClicked={()=>setState(v=>"menu")} class="normal-button"><label label={"<-"} /></button>
				<label label={''} hexpand />
				<label label={"BT settings"} />
			</box>

			<box class="wifi-list" orientation={Gtk.Orientation.VERTICAL} hexpand vexpand>

			<For each={deviceList}>{(device)=>(
				  	 <box class="wifi-item" hexpand>
						<label label={device.name} marginEnd={100} />
						<label label={""} hexpand />
						<With value={currentDevice}>{(current)=>(
						  <box>
						  <label label={ '  ' +device.get_battery_percentage()*100+'%'} />
						<button class={"normal-button "+((device.name!=current)?'active':'')} onClicked={()=>{
			 				  if(device.name!=current){
								device.connect_device(()=>{
								  setCurrentDevice(device.name)
								  console.log('bt activated')
								})
							}					
						}}><label label={(device.name!=current)?"connect":'connected'} /></button>
						</box>
						)}
						</With>
					</box>
				)}</For>



		</box>
		</box>
	)
}

