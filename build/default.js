"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/', function (req, res) {
    res.send("\n      <html>\n         <body style=\"padding: 15% 35% 35% 35%\">\n            <h1 style=\"color:blue\">Hi Aman!</h1>\n         </body>\n      </html>\n    ");
});
