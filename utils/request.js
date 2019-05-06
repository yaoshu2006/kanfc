const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

class Request {
    _header = {
        token: "",
        uid: ""
    }
    _baseUrl = null

    interceptors = []

    constructor() {
        const token = wx.getStorageSync('token')
        const uid = wx.getStorageSync('uid')
        if (token) {
            this._header.token =  token
        }
        if (uid) {
            this._header.uid = uid
        }

    }

    intercept(res) {
        return this.interceptors
            .filter(f => typeof f === 'function')
            .every(f => f(res))
    }

    request({url, method, header = {}, data}) {
        let that = this
        let time = Date.now()
        // console.log(`开始:${time}`)
        return new Promise((resolve, reject) => {
            wx.request({
                url: url.startsWith('http') ? url : (this._baseUrl || '') + url,
                method: method || METHOD.GET,
                data: data,
                header: {
                    ...this._header,
                    ...header
                },
                success: res => this.intercept(res) && resolve(res),
                complete: (res) => {
                    wx.hideLoading()
                    console.log('request:'+ url, `耗时:${Date.now() - time}ms`)
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(res)
                    } else if (res.statusCode === 401) {
                        // 401 为鉴权失败 很大可能是token过期
                        // 重新登录 并且重复请求
                        // wx.login({
                        //     success: (res) => {
                        //         let code = res.code
                        //         if (code) {
                        //             that.post('/wx/login.htm', {}, {
                        //                 code: code
                        //             }).then((res) => {
                        //                 that.token(res.data.token.token, res.data.token.uid)
                        //                 wx.hideLoading()
                        //                 that.request({ url, method, header, data}).then(res => {
                        //                     resolve(res)
                        //                 })
                        //             }, () => {
                        //                 wx.showModal({
                        //                     title: '服务器连接失败',
                        //                     content: '服务器连接失败，请检查服务器端口',
                        //                 })
                        //             })
                        //         }
                        //     }
                        // })
                    } else {
                        reject(res)
                    }
                },
                fail: reject
            })
        })
    }

    get(url, data, header) {
        return this.request({url, method: METHOD.GET, header, data})
    }

    post(url, data, header) {
        return this.request({url, method: METHOD.POST, header, data})
    }

    put(url, data, header) {
        return this.request({url, method: METHOD.PUT, header, data})
    }

    delete(url, data, header) {
        return this.request({url, method: METHOD.DELETE, header, data})
    }

    token(token, uid) {
        wx.setStorageSync("token", token)
        wx.setStorageSync("uid", uid)
        this._header.token = token
        this._header.uid = uid
        return this
    }

    header(header) {
        this._header = header
        return this
    }

    baseUrl(baseUrl) {
        this._baseUrl = baseUrl
        return this
    }

    interceptor(f) {
        if (typeof f === 'function') {
            this.interceptors.push(f)
        }
        return this
    }
}

export default new Request
export {METHOD}