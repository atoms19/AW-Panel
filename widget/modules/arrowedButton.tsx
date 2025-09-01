import { Accessor, createState, With } from "ags"
import { Astal, Gtk, Gdk } from "ags/gtk4"


export function ArrowToggleButton({label = "",icon="",activeState,state="",onClicked=()=>{},stateChanger=()=>{}}:{label?:string,initial?:boolean,activeState:Accessor<Boolean>,icon?:string,onClicked?:()=>void,stateChanger?: any,state:string}) {

	return (
	  <box orientation={Gtk.Orientation.VERTICAL} spacing={2} halign={Gtk.Align.CENTER} >
	 <box>
		  <With value={activeState}>{(active)=>(
		  <box>
		  <button class={"button button-w-ra "+(active?"active":'')} onClicked={onClicked} >
			 <label label={icon}/>
		  </button>		
		  <button class={"right-arrow "+(active?"active":'')} onClicked={() => stateChanger(state)}>
		  <label label=">"/>
		  </button>
		 		  </box>
		  )}</With>
	 </box>
		  <label label={label} class="button-label"/>
	 </box>

  
	)
}
