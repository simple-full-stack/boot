var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');
var success = {
    code: 0,
    result: {}
};
function end(res, data) {
    setTimeout(function () {
        res.end(JSON.stringify(Object.assign({}, success, data)));
    }, 800);
}
var Mockup = /** @class */ (function () {
    function Mockup(baseURL) {
        this.baseURL = baseURL;
    }
    /**
     * 返回 list 数据
     *
     * @public
     * @param {express.Request} req 请求对象
     * @param {express.Response} res 响应对象
     * @param {Object} obj 要返回的对象
     */
    Mockup.prototype.list = function (req, res, obj) {
        var requestParams = Object.assign({}, req.query, req.body);
        var pageParams = {
            pageNo: requestParams.pageNo ? parseInt(requestParams.pageNo, 10) : 1,
            pageSize: requestParams.pageSize ? parseInt(requestParams.pageSize, 10) : 30,
            totalCount: (obj.result || obj.page || []).length ? 100 : 0,
            order: requestParams.order,
            orderBy: requestParams.orderBy
        };
        var result = Object.assign(pageParams, obj);
        end(res, { result: result });
    };
    /**
     * 返回成功
     *
     * @public
     * @param {express.Request} req 请求对象
     * @param {express.Response} res 响应对象
     * @param {Object} obj 要返回的对象
     */
    Mockup.prototype.ok = function (req, res, obj) {
        obj = obj || {};
        end(res, { result: obj });
    };
    /**
     * 上传文件
     *
     * @public
     * @param {express.Request} req 请求对象
     * @param {express.Response} res 响应对象
     * @param {Object} obj 要返回的对象
     */
    Mockup.prototype.upload = function (req, res, obj) {
        var _this = this;
        if (obj === void 0) { obj = {}; }
        var form = new multiparty.Form();
        return new Promise(function (resolve) {
            form.parse(req, function (err, fields, files) {
                if (err) {
                    return res.status(500).end();
                }
                var fileInfo = files.filedata[0];
                var tmpDir = 'static/.tmp/';
                var absoluteTmpDir = path.resolve(__dirname, '..', tmpDir);
                if (!fs.existsSync(tmpDir)) {
                    fs.mkdirSync(tmpDir);
                }
                var fsOutputPath = path.resolve(absoluteTmpDir, fileInfo.originalFilename);
                fs.writeFileSync(fsOutputPath, fs.readFileSync(fileInfo.path));
                fs.unlinkSync(fileInfo.path);
                var data = {
                    url: 'http://' + req.headers.host + '/' + tmpDir + fileInfo.originalFilename,
                    previewUrl: 'http://' + req.headers.host + '/' + tmpDir + fileInfo.originalFilename,
                    fileName: fileInfo.originalFilename,
                    type: fileInfo.originalFilename.split('.').pop()
                };
                resolve(Object.assign(data, obj));
            });
        }).then(function (result) {
            var resultScript = req.query.callback + "(" + JSON.stringify(Object.assign({}, success, { result: result })) + ")";
            res.end(_this.iframeCallback(resultScript));
        });
    };
    /**
     * 构造 HTML 响应结果
     *
     * @private
     * @param {string} script 要返回的脚本
     * @return {string} HTML 字符串
     */
    Mockup.prototype.iframeCallback = function (script) {
        return "\n            <!DOCTYPE html>\n            <html>\n                <head>\n                    <meta charset=\"utf-8\" />\n                </head>\n                <body>\n                    <script>\n                        " + script + "\n                    </script>\n                </body>\n            </html>\n        ";
    };
    return Mockup;
}());
export default Mockup;
