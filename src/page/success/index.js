/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Button } from "antd-mobile"
import { IMAGE } from "@/assets"
import { useTranslation } from "react-i18next"
import { useRequest } from "@/hook"
import "./styles.less"

const IndexPage = ({ history }) => {
  const { t } = useTranslation()
  const { requestNoToken } = useRequest()
  const [data, setData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const resp = await requestNoToken("app/home/app_check_update")
      setData(resp)
    }
    getData()
  }, [])
  
  return (
    <div className="p_success">
      <img src={IMAGE.logo} alt="" className="p_success_logo" />
      <p className="p_success_title">{ t("page.success.t1") }</p>
      <p className="p_success_subtitle">{ t("page.success.t2") }</p>
      <Button className="p_success_button" onClick={() => window.open(data?.download)}>{ t("page.success.t3") }</Button>
      <img src={IMAGE.base} alt="" className="p_success_image" />
    </div>
  )
}
export default withRouter(IndexPage)