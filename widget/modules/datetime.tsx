import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"



export default function DateTime(){
  return (
		<button>
        <label label="date and time"/>
		</button>
  )

}
