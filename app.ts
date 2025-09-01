import app from "ags/gtk4/app"
import style from "./style.css"
import Bar from "./widget/Bar"
import Wifi from "./widget/Wifi"
app.start({
  css: style,
  main() {
   // app.get_monitors().map(Bar),
	 Wifi(app.get_monitors()[0])
  },
})
