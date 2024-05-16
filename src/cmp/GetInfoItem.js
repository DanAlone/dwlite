export default function GetInfoItem(type, data) {

    var output = "";

    switch (type) {
        case "icon":
            switch (data) {
                case "db-server":
                case "app-server":
                case "app-server-dmz":
                case "front-end":
                case "front-end-dmz":
                    output = "server";
                    break;
                case "balancer":
                case "balancer-dmz":
                    output = "sitemap";
                    break;
                case "db-instance":
                    output = "database";
                    break;
                case "app-instance":
                    output = "window maximize";
                    break;
                case "soap-call":
                    output = "cloud";
                    break;
                case "end-point":
                case "end-point-dmz":
                    output = "globe";
                    break;
                default: break;
            }
            break;
        case "color":
            switch (data) {
                case "old": output = "yellow"; break;
                case "ok": output = "green"; break;
                case "ko": output = "red"; break;
                case "partial": output = "orange"; break;
                case "disabled": output = "grey"; break;
                case "noitems": output = "blue"; break;
                default: output = "secondary"; break;
            }
            break;
        case "order":
            switch (data) {
                case "ko": output = "4"; break;
                case "partial": output = "3"; break;
                case "old": output = "2"; break;
                case "ok": output = "1"; break;
                case "disabled": output = "0"; break;
                case "noitems": output = "-1"; break;
                default: break;
            }
            break;
        case "type":
            switch (data) {
                case "SERVER_UNIX": output = "linux"; break;
                case "SERVER_WINDOWS": output = "windows"; break;
                default: break;
            }
            break;
        case "instance":
            switch (data) {
                case "DB_ORACLE": output = "Oracle"; break;
                case "DB_POSTGRESQL": output = "PostgreSQL"; break;
                case "DB_MSSQL": output = "MSSQL"; break;
                case "DB_MYSQL": output = "MySQL"; break;
                case "APP_WEBLOGIC": output = "Weblogic"; break;
                case "APP_JBOSS": output = "JBoss"; break;
                default: break;
            }
            break;
        default: break;
    }

    return output;
}