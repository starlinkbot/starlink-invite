import React from "react"
import { useConstant, useRoute, useClass } from "@/hook"
import { IMAGE } from "@/assets"
import "./styles.less"

const IndexComponent = React.memo((props) => {
  const { title, type, bgColor, noBack } = props
  const { classNames } = useClass()
  const { back } = useRoute()
  const { NAVBARTYPE } = useConstant()

  return (
    <div className={classNames([
      "m_navbar",
      type === NAVBARTYPE.light && "m_navbar_light",
      type === NAVBARTYPE.dark && "m_navbar_dark"
    ])} style={{ backgroundColor: bgColor }}>
      {
        !noBack && <img src={type === NAVBARTYPE.light ? IMAGE.arrow_left_black : IMAGE.arrow_left_white} alt="" className="m_navbar_back" onClick={() => back()} />
      }
      <p className={classNames([
        "m_navbar_title",
        type === NAVBARTYPE.light && "m_navbar_title_dark",
        type === NAVBARTYPE.dark && "m_navbar_title_light"
      ])}>{ title || "" }</p>
    </div>
  )
})

export default IndexComponent