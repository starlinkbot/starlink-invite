/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Toast } from "antd-mobile"
import { useRoute, useClear } from "@/hook"
import { post, upload } from "@/service"
import { useTranslation } from "react-i18next"
import { useLocalStore } from "@/store"

const UNLOGINPAGE = ["/start", "/login", "/signup", "/forget", "/verification"]

const useRequest = (url, params={}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const { replace } = useRoute()
  const { lState } = useLocalStore()
  const { cleanUserInfo } = useClear()
  const { pathname } = location
  const { lToken } = lState
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const request = async (_url, _params={}, _load=true, _error=true, _toast=false, _noToken=false) => {
    if (!lToken && !_noToken && !UNLOGINPAGE.some(prefix => pathname.startsWith(prefix))) {
      replace("/start")
      return
    }
    try {
      _toast && Toast.show({
        icon: "loading",
        content: t("hook.useRequest.t1"),
        duration: 0
      })
      _load && setLoading(true)
      const resp = await post(_url, _params)
      _load && setLoading(false)
      _toast && Toast.clear()
      setData(resp)
      return resp
    } catch (error) {
      if (error.code === 90004 && !UNLOGINPAGE.some(prefix => pathname.startsWith(prefix))) {
        cleanUserInfo()
        replace("/start")
      } else {
        setError(error)
        _load && setLoading(false)
        const errorMessage = 
          error.message.includes("timeout") ?
            t("hook.useRequest.t2")
          : error.message.includes("Network Error") ?
            t("hook.useRequest.t3")
          : !!error.message && error.message.length > 0 ?
            error.message
          : 
            t("hook.useRequest.t4")
        _error && Toast.show({
          icon: "fail",
          content: errorMessage
        })
      }
      return {
        error: true,
        code: error.code,
        desc: error.message
      }
    }
  }

  const requestNotLoading = async (_url, _params={}) => {
    return request(_url, _params, false, true, false)
  }

  const requestNotError = async (_url, _params={}) => {
    return request(_url, _params, true, false, false)
  }

  const requestWithToast = async (_url, _params={}) => {
    return request(_url, _params, true, true, true)
  }
  
  const requestNotLoadingAndError = async (_url, _params={}) => {
    return request(_url, _params, false, false, false)
  }

  const requestWithToastNotError = async (_url, _params={}) => {
    return request(_url, _params, true, false, true)
  }

  const requestNoToken = async (_url, _params={}) => {
    return request(_url, _params, false, true, false, true)
  }


  useEffect(() => {
    !!url && request(url, params, true, true, false, true)
  }, [url])

  return {
    data, loading, error, 
    request,
    requestNotLoading,
    requestNotError,
    requestWithToast,
    requestNotLoadingAndError,
    requestWithToastNotError,
    requestNoToken,
    upload
  }
}

export default useRequest