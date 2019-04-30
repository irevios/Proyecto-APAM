if (typeof(JKL) == 'undefined') JKL = function() {};
JKL.ParseXML = function(url, query, method) {
    this.http = new JKL.ParseXML.HTTP(url, query, method, false);
    return this;
};
JKL.ParseXML.VERSION = "0.22";
JKL.ParseXML.MIME_TYPE_XML = "text/xml";
JKL.ParseXML.MAP_NODETYPE = ["", "ELEMENT_NODE", "ATTRIBUTE_NODE", "TEXT_NODE", "CDATA_SECTION_NODE", "ENTITY_REFERENCE_NODE", "ENTITY_NODE", "PROCESSING_INSTRUCTION_NODE", "COMMENT_NODE", "DOCUMENT_NODE", "DOCUMENT_TYPE_NODE", "DOCUMENT_FRAGMENT_NODE", "NOTATION_NODE"];
JKL.ParseXML.prototype.async = function(func, args) {
    this.callback_func = func;
    this.callback_arg = args;
};
JKL.ParseXML.prototype.onerror = function(func, args) {
    this.onerror_func = func;
};
JKL.ParseXML.prototype.parse = function() {
    if (!this.http) return;
    if (this.onerror_func) {
        this.http.onerror(this.onerror_func);
    }
    if (this.callback_func) {
        var copy = this;
        var proc = function() {
            if (!copy.http) return;
            var data = copy.parseResponse();
            copy.callback_func(data, copy.callback_arg);
        };
        this.http.async(proc);
    }
    this.http.load();
    if (!this.callback_func) {
        var data = this.parseResponse();
        return data;
    }
};
JKL.ParseXML.prototype.setOutputArrayAll = function() {
    this.setOutputArray(true);
}
JKL.ParseXML.prototype.setOutputArrayAuto = function() {
    this.setOutputArray(null);
}
JKL.ParseXML.prototype.setOutputArrayNever = function() {
    this.setOutputArray(false);
}
JKL.ParseXML.prototype.setOutputArrayElements = function(list) {
    this.setOutputArray(list);
}
JKL.ParseXML.prototype.setOutputArray = function(mode) {
    if (typeof(mode) == "string") {
        mode = [mode];
    }
    if (mode && typeof(mode) == "object") {
        if (mode.length < 0) {
            mode = false;
        } else {
            var hash = {};
            for (var i = 0; i < mode.length; i++) {
                hash[mode[i]] = true;
            }
            mode = hash;
            if (mode["*"]) {
                mode = true;
            }
        }
    }
    this.usearray = mode;
}
JKL.ParseXML.prototype.parseResponse = function() {
    var root = this.http.documentElement();
    var data = this.parseDocument(root);
    return data;
}
JKL.ParseXML.prototype.parseDocument = function(root) {
    if (!root) return;
    var ret = this.parseElement(root);
    if (this.usearray == true) {
        ret = [ret];
    } else if (this.usearray == false) {} else if (this.usearray == null) {} else if (this.usearray[root.nodeName]) {
        ret = [ret];
    }
    var json = {};
    json[root.nodeName] = ret;
    return json;
};
JKL.ParseXML.prototype.parseElement = function(elem) {
    if (elem.nodeType == 7) {
        return;
    }
    if (elem.nodeType == 3 || elem.nodeType == 4) {
        var bool = elem.nodeValue.match(/[^\x00-\x20]/);
        if (bool == null) return;
        return elem.nodeValue;
    }
    var retval;
    var cnt = {};
    if (elem.attributes && elem.attributes.length) {
        retval = {};
        for (var i = 0; i < elem.attributes.length; i++) {
            var key = elem.attributes[i].nodeName;
            if (typeof(key) != "string") continue;
            var val = elem.attributes[i].nodeValue;
            if (!val) continue;
            if (typeof(cnt[key]) == "undefined") cnt[key] = 0;
            cnt[key]++;
            this.addNode(retval, key, cnt[key], val);
        }
    }
    if (elem.childNodes && elem.childNodes.length) {
        var textonly = true;
        if (retval) textonly = false;
        for (var i = 0; i < elem.childNodes.length && textonly; i++) {
            var ntype = elem.childNodes[i].nodeType;
            if (ntype == 3 || ntype == 4) continue;
            textonly = false;
        }
        if (textonly) {
            if (!retval) retval = "";
            for (var i = 0; i < elem.childNodes.length; i++) {
                retval += elem.childNodes[i].nodeValue;
            }
        } else {
            if (!retval) retval = {};
            for (var i = 0; i < elem.childNodes.length; i++) {
                var key = elem.childNodes[i].nodeName;
                if (typeof(key) != "string") continue;
                var val = this.parseElement(elem.childNodes[i]);
                if (!val) continue;
                if (typeof(cnt[key]) == "undefined") cnt[key] = 0;
                cnt[key]++;
                this.addNode(retval, key, cnt[key], val);
            }
        }
    }
    return retval;
};
JKL.ParseXML.prototype.addNode = function(hash, key, cnts, val) {
    if (this.usearray == true) {
        if (cnts == 1) hash[key] = [];
        hash[key][hash[key].length] = val;
    } else if (this.usearray == false) {
        if (cnts == 1) hash[key] = val;
    } else if (this.usearray == null) {
        if (cnts == 1) {
            hash[key] = val;
        } else if (cnts == 2) {
            hash[key] = [hash[key], val];
        } else {
            hash[key][hash[key].length] = val;
        }
    } else if (this.usearray[key]) {
        if (cnts == 1) hash[key] = [];
        hash[key][hash[key].length] = val;
    } else {
        if (cnts == 1) hash[key] = val;
    }
};
JKL.ParseXML.Text = function(url, query, method) {
    this.http = new JKL.ParseXML.HTTP(url, query, method, true);
    return this;
};
JKL.ParseXML.Text.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.Text.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.Text.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.Text.prototype.parseResponse = function() {
    var data = this.http.responseText();
    return data;
}
JKL.ParseXML.JSON = function(url, query, method) {
    this.http = new JKL.ParseXML.HTTP(url, query, method, true);
    return this;
};
JKL.ParseXML.JSON.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.JSON.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.JSON.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.JSON.prototype.parseResponse = function() {
    var text = this.http.responseText();
    if (typeof(text) == 'undefined') return;
    if (!text.length) return;
    var data = eval("(" + text + ")");
    return data;
}
JKL.ParseXML.DOM = function(url, query, method) {
    this.http = new JKL.ParseXML.HTTP(url, query, method, false);
    return this;
};
JKL.ParseXML.DOM.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.DOM.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.DOM.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.DOM.prototype.parseResponse = function() {
    var data = this.http.documentElement();
    return data;
}
JKL.ParseXML.CSV = function(url, query, method) {
    this.http = new JKL.ParseXML.HTTP(url, query, method, true);
    return this;
};
JKL.ParseXML.CSV.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.CSV.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.CSV.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.CSV.prototype.parseResponse = function() {
    var text = this.http.responseText();
    var data = this.parseCSV(text);
    return data;
}
JKL.ParseXML.CSV.prototype.parseCSV = function(text) {
    text = text.replace(/\r\n?/g, "\n");
    var pos = 0;
    var len = text.length;
    var table = [];
    while (pos < len) {
        var line = [];
        while (pos < len) {
            if (text.charAt(pos) == '"') {
                var nextquote = text.indexOf('"', pos + 1);
                while (nextquote < len && nextquote > -1) {
                    if (text.charAt(nextquote + 1) != '"') {
                        break;
                    }
                    nextquote = text.indexOf('"', nextquote + 2);
                }
                if (nextquote < 0) {} else if (text.charAt(nextquote + 1) == ",") {
                    var quoted = text.substr(pos + 1, nextquote - pos - 1);
                    quoted = quoted.replace(/""/g, '"');
                    line[line.length] = quoted;
                    pos = nextquote + 2;
                    continue;
                } else if (text.charAt(nextquote + 1) == "\n" || len == nextquote + 1) {
                    var quoted = text.substr(pos + 1, nextquote - pos - 1);
                    quoted = quoted.replace(/""/g, '"');
                    line[line.length] = quoted;
                    pos = nextquote + 2;
                    break;
                } else {}
            }
            var nextcomma = text.indexOf(",", pos);
            var nextnline = text.indexOf("\n", pos);
            if (nextnline < 0) nextnline = len;
            if (nextcomma > -1 && nextcomma < nextnline) {
                line[line.length] = text.substr(pos, nextcomma - pos);
                pos = nextcomma + 1;
            } else {
                line[line.length] = text.substr(pos, nextnline - pos);
                pos = nextnline + 1;
                break;
            }
        }
        if (line.length >= 0) {
            table[table.length] = line;
        }
    }
    if (table.length < 0) return;
    return table;
};
JKL.ParseXML.CSVmap = function(url, query, method) {
    this.http = new JKL.ParseXML.HTTP(url, query, method, true);
    return this;
};
JKL.ParseXML.CSVmap.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.CSVmap.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.CSVmap.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.CSVmap.prototype.parseCSV = JKL.ParseXML.CSV.prototype.parseCSV;
JKL.ParseXML.CSVmap.prototype.parseResponse = function() {
    var text = this.http.responseText();
    var source = this.parseCSV(text);
    if (!source) return;
    if (source.length < 0) return;
    var title = source.shift();
    var data = [];
    for (var i = 0; i < source.length; i++) {
        var hash = {};
        for (var j = 0; j < title.length && j < source[i].length; j++) {
            hash[title[j]] = source[i][j];
        }
        data[data.length] = hash;
    }
    return data;
}
JKL.ParseXML.LoadVars = function(url, query, method) {
    this.http = new JKL.ParseXML.HTTP(url, query, method, true);
    return this;
};
JKL.ParseXML.LoadVars.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.LoadVars.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.LoadVars.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.LoadVars.prototype.parseResponse = function() {
    var text = this.http.responseText();
    text = text.replace(/\r\n?/g, "\n");
    var hash = {};
    var list = text.split("&");
    for (var i = 0; i < list.length; i++) {
        var eq = list[i].indexOf("=");
        if (eq > -1) {
            var key = decodeURIComponent(list[i].substr(0, eq).replace("+", "%20"));
            var val = decodeURIComponent(list[i].substr(eq + 1).replace("+", "%20"));
            hash[key] = val;
        } else {
            hash[list[i]] = "";
        }
    }
    return hash;
};
JKL.ParseXML.HTTP = function(url, query, method, textmode) {
    this.url = url;
    if (typeof(query) == "string") {
        this.query = query;
    } else {
        this.query = "";
    }
    if (method) {
        this.method = method;
    } else if (typeof(query) == "string") {
        this.method = "POST";
    } else {
        this.method = "GET";
    }
    this.textmode = textmode ? true : false;
    this.req = null;
    this.xmldom_flag = false;
    this.onerror_func = null;
    this.callback_func = null;
    this.already_done = null;
    return this;
};
JKL.ParseXML.HTTP.REQUEST_TYPE = "application/x-www-form-urlencoded";
JKL.ParseXML.HTTP.ACTIVEX_XMLDOM = "Microsoft.XMLDOM";
JKL.ParseXML.HTTP.ACTIVEX_XMLHTTP = "Microsoft.XMLHTTP";
JKL.ParseXML.HTTP.EPOCH_TIMESTAMP = "Thu, 01 Jun 1970 00:00:00 GMT"
JKL.ParseXML.HTTP.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.HTTP.prototype.async = function(func) {
    this.async_func = func;
}
JKL.ParseXML.HTTP.prototype.load = function() {
    if (window.ActiveXObject) {
        var activex = JKL.ParseXML.HTTP.ACTIVEX_XMLHTTP;
        if (this.method == "GET" && !this.textmode) {
            activex = JKL.ParseXML.HTTP.ACTIVEX_XMLDOM;
        }
        this.req = new ActiveXObject(activex);
    } else if (window.XMLHttpRequest) {
        this.req = new XMLHttpRequest();
    }
    var async_flag = this.async_func ? true : false;
    if (typeof(this.req.send) != "undefined") {
        this.req.open(this.method, this.url, async_flag);
    }
    if (typeof(this.req.setRequestHeader) != "undefined") {
        this.req.setRequestHeader("Content-Type", JKL.ParseXML.HTTP.REQUEST_TYPE);
    }
    if (typeof(this.req.overrideMimeType) != "undefined" && !this.textmode) {
        this.req.overrideMimeType(JKL.ParseXML.MIME_TYPE_XML);
    }
    if (async_flag) {
        var copy = this;
        copy.already_done = false;
        var check_func = function() {
            if (copy.req.readyState != 4) return;
            var succeed = copy.checkResponse();
            if (!succeed) return;
            if (copy.already_done) return;
            copy.already_done = true;
            copy.async_func();
        };
        this.req.onreadystatechange = check_func;
    }
    if (typeof(this.req.send) != "undefined") {
        this.req.send(this.query);
    } else if (typeof(this.req.load) != "undefined") {
        this.req.async = async_flag;
        this.req.load(this.url);
    }
    if (async_flag) return;
    var succeed = this.checkResponse();
}
JKL.ParseXML.HTTP.prototype.checkResponse = function() {
    if (this.req.parseError && this.req.parseError.errorCode != 0) {
        if (this.onerror_func) this.onerror_func(this.req.parseError.reason);
        return false;
    }
    if (this.req.status - 0 > 0 && this.req.status != 200 && this.req.status != 206 && this.req.status != 304) {
        if (this.onerror_func) this.onerror_func(this.req.status);
        return false;
    }
    return true;
}
JKL.ParseXML.HTTP.prototype.documentElement = function() {
    if (!this.req) return;
    if (this.req.responseXML) {
        return this.req.responseXML.documentElement;
    } else {
        return this.req.documentElement;
    }
}
JKL.ParseXML.HTTP.prototype.responseText = function() {
    if (!this.req) return;
    if (navigator.appVersion.match("KHTML")) {
        var esc = escape(this.req.responseText);
        if (!esc.match("%u") && esc.match("%")) {
            return decodeURIComponent(esc);
        }
    }
    return this.req.responseText;
}
