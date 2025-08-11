"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_BASE_URL = "http://localhost:8080/";
var button = document.getElementById("submitButton");
var customSlugCheckBox = document.getElementById("customSlug");
var expiresAfterCheckBox = document.getElementById("expiresAfter");
var slugInputLabel = document.getElementById("customSlugLabel");
var expiresAfterLabel = document.getElementById("expiresAfterLabel");
var linkInput = document.getElementById("linkInput");
var expiresAfterInput = document.getElementById("expiresAfterInput");
var slugInput = document.getElementById("customSlugInput");
customSlugCheckBox.addEventListener("change", function () {
    if (customSlugCheckBox.checked) {
        slugInputLabel.classList.remove("hidden");
        slugInput.classList.remove("hidden");
    }
    else {
        slugInputLabel.classList.add("hidden");
        slugInput.classList.add("hidden");
    }
});
expiresAfterCheckBox.addEventListener("change", function () {
    if (expiresAfterCheckBox.checked) {
        expiresAfterLabel.classList.remove("hidden");
        expiresAfterInput.classList.remove("hidden");
    }
    else {
        expiresAfterLabel.classList.add("hidden");
        expiresAfterInput.classList.add("hidden");
    }
});
button.addEventListener("click", function () {
    var link = linkInput.value;
    if (link == null) {
        alert("Please enter a link to short");
        return;
    }
    if (!isValidUrl(link)) {
        alert("Invalid link!");
        return;
    }
    if (expiresAfterInput.value.length <= 0 && expiresAfterCheckBox.checked) {
        alert("Please fill expires after field");
        return;
    }
    if (slugInput.value.length <= 0 && customSlugCheckBox.checked) {
        alert("Please fill custom slug field");
        return;
    }
    var customSlug = customSlugCheckBox.checked ? slugInput.value : null;
    var expiresAfter = expiresAfterCheckBox.checked ? Number.parseInt(expiresAfterInput.value) : null;
    var generateQrCode = null;
    var linkRequest = {
        url: link,
        slug: customSlug,
        expiresAfter: expiresAfter,
        generateQrCode: generateQrCode
    };
    shortRequest(linkRequest);
    linkInput.value = "";
    slugInput.value = "";
    expiresAfterInput.value = "";
});
function isValidUrl(link) {
    try {
        new URL(link);
        return true;
    }
    catch (error) {
        return false;
    }
}
function shortRequest(linkToShort) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fetch(API_BASE_URL + "short", {
                method: "POST",
                body: JSON.stringify(linkToShort),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (response.status === 200)
                                return [2 /*return*/, response.json()];
                            _a = showError;
                            return [4 /*yield*/, response.json()];
                        case 1:
                            _a.apply(void 0, [_b.sent()]);
                            return [2 /*return*/];
                    }
                });
            }); })
                .then(function (json) {
                alert("Link encurtado com sucesso: " + json.data.shortenedUrl);
            });
            return [2 /*return*/];
        });
    });
}
function showError(responseJson) {
    alert("Occurred an error shorting your link: " + responseJson.message);
    throw new Error();
}
