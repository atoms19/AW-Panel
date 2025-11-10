import { Astal, Gtk, Gdk } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createPoll, interval } from "ags/time"
import { ToggleButton } from "./modules/toggleButton"
import AstalNetwork from "gi://AstalNetwork"
import { createBinding, createState, For, onMount, With } from "ags"


export default function WifiScreen({state,setState}:{state:any,setState:any}) {


  const networkHelper = AstalNetwork.get_default()
  // console.log(networkHelper.wif
  onMount(()=>{
	 networkHelper.wifi.scan()

	  setWifiList(networkHelper.wifi.get_access_points())
  })

  let [wifiList, setWifiList] = createState([] as AstalNetwork.AccessPoint[])
	interval(15000,()=>{
	  setWifiList(networkHelper.wifi.get_access_points())
	})

	let currentWifi = createBinding(networkHelper.wifi,"ssid") 
	 //setCurrentWifi(networkHelper.wifi.get_ssid())


	


	return (
		<box visible={state(v=>v=="wifi")} orientation={Gtk.Orientation.VERTICAL} class="control-center-screen" hexpand vexpand>

			<box class="info-section">
				<button onClicked={()=>setState(v=>"menu")} class="normal-button"><label label={"<-"} /></button>
				<label label={''} hexpand />
				<label label={"wifi settings"} />
			</box>

        <Gtk.ScrolledWindow>
			<box class="wifi-list" orientation={Gtk.Orientation.VERTICAL} hexpand vexpand>
			<For each={wifiList}>{(wifi)=>(
				  	 <box class="wifi-item" hexpand>
						<label label={wifi.ssid} marginEnd={100} />
						<label label={""} hexpand />
						<With value={currentWifi}>{(current)=>(
						<button cssClasses={currentWifi(c=>c!=wifi.ssid?["normal-button","active"]:["normal-button"])} onClicked={()=>{
			 				  if(wifi.ssid!=current){
								wifi.activate(null,()=>{
								//  setCurrentWifi(wifi.ssid)
								  console.log('wifi activated')
								})
							}					
						}}><label label={currentWifi((v)=>v==wifi.ssid ? "connected" : "connect")} /></button>

						)}</With>
					</box>
				)}</For>



		</box>
				 </Gtk.ScrolledWindow>
		</box>
	)
}

