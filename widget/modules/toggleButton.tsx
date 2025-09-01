
import { Accessor, createState, With } from "ags"
import { Astal, Gtk, Gdk } from "ags/gtk4"


export function ToggleButton({label = "",activeState,icon="",onClicked=()=>{}}:{activeState?:any,label?:string,initial?:boolean,icon?:string,onClicked?:()=>void}) {

	return (
	  <box orientation={Gtk.Orientation.VERTICAL} spacing={2} halign={Gtk.Align.CENTER} >
		  <box>
		  <With value={activeState}>{(v)=>(
		  <button class={"button "+((v)?'active':'')} onClicked={onClicked} >
			 <label label={icon}/>
		  </button>
		  )}
		  </With>
		 		  </box>
		  <label label={label} class="button-label"/>
	 </box>
  
	)
}
