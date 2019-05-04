const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

class Request {
    _header = {
        token: null,
        uid: null
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
                // success: res => this.intercept(res) && resolve(res),
                complete: (res) => {
                    wx.hideLoading()
                    console.log('request:'+ url, `耗时:${Date.now() - time}ms`)
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(res)
                    } else if (res.statusCode === 401) {
                        // 401 为鉴权失败 很大可能是token过期
                        // 重新登录 并且重复请求
                        wx.login({
                            success: (res) => {
                                let code = res.code
                                if (code) {
                                    that.post('/oauth/wx/login', {}, {
                                        code: code
                                    }).then((res) => {
                                        that.token(res.data.token)
                                        wx.hideLoading()
                                        //如果已经授权
                                        wx.setStorageSync('uid', res.data.uid)
                                        //TODO 这里的header是空的
                                        that.request({ url, method, header, data}).then(res => {
                                            resolve(res)
                                        })
                                    }, () => {
                                        wx.showModal({
                                            title: '服务器连接失败',
                                            content: '服务器连接失败，请检查服务器端口',
                                        })
                                    })
                                }
                            }
                        })
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

    token(token) {
        wx.setStorageSync("token", token)
        this._header.Authorization = "Bearer" + " " +token
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