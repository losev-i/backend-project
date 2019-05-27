"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _App = __importStar(require("./app"));
const _Home = __importStar(require("./api/home"));
const _Auth = __importStar(require("./api/auth"));
const _User = __importStar(require("./api/users/user"));
exports.App = _App;
exports.Home = _Home;
exports.Auth = _Auth;
exports.User = _User;
exports.default = _App.app;
