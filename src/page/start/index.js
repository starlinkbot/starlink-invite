/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { withRouter, useParams } from "react-router-dom"
import { Button } from "antd-mobile"
import { IMAGE } from "@/assets"
import { useRoute } from "@/hook"
import { useTranslation } from "react-i18next"
import { useLocalStore } from "@/store"
import "./styles.less"

const IndexPage = ({ history }) => {
  const { t } = useTranslation()
  const { push } = useRoute()
  const { code } = useParams()
  const { lState, lDispatch } = useLocalStore()
  const { lCode } = lState

  useEffect(() => {
    if (!!code) {
      lDispatch({key: "lCode", value: code})
    }
  }, [code])
  
  return (
    <div className="p_start">
      <img src={IMAGE.logo} alt="" className="p_start_logo" />
      <p className="p_start_desc">{ t("page.start.t1", { code: lCode || "-" }) }</p>
      <p className="p_start_title">{ t("page.start.t2") }</p>
      <p className="p_start_subtitle">{ t("page.start.t3") }</p>
      <Button className="p_start_button" onClick={() => push("/signup")}>{ t("page.start.t4") }</Button>
      <img src={IMAGE.base} alt="" className="p_start_image" />
    </div>
  )
}
export default withRouter(IndexPage)