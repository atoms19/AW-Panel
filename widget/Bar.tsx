import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import DateTime from "./modules/datetime"
import { ToggleButton } from "./modules/toggleButton"
export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = createPoll("", 1000, "date")
  const { TOP, LEFT, RIGHT ,BOTTOM} = Astal.WindowAnchor
  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={BOTTOM | LEFT | RIGHT}
      application={app}
    >
      <centerbox>
           <DateTime $type="start"/> 
		   <ToggleButton $type="start" label="Test Toggle"/>
              <label $type="center" class="time" hexpand label={'time as you know it'}></label>
        <menubutton $type="end"  halign={Gtk.Align.CENTER}>
          <label label={time} />
          <popover>
            <Gtk.Calendar />
          </popover>
        </menubutton>
      </centerbox>
    </window>
  )
}
