let myservers = JSON.parse(data)
let totalplayrs = 0;

let table = document.getElementById("servers_table")
myservers.forEach(element => {
    fetch('https://api.minetools.eu/ping/' + element.ip + '/' + element.port)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        
        //set ip
        let ip = document.createElement("th")
        ip.scope = "row"
        if (element.port == 25565) {
            ip.append(element.ip)
        } else {
            ip.append(element.ip + ':' + element.port)
        } 
        
        //set version
        let version = document.createElement("th")
        version.append(element.version)
        
        //set modpack
        let modpack_link = document.createElement("a")
        modpack_link.append(element.modpack_name)
        modpack_link.href = element.modpack
        modpack_link.target = "_blank"
        let modpack = document.createElement("th")
        if (element.modpack_name != "vanilla") {
            modpack.append(modpack_link)
        } else {
            modpack.append("Vanilla")
        }
        
        //set status and players
        let status = document.createElement("th")
        let players = document.createElement("th")
        if (Object.hasOwn(json, "players")) {
            status.append("Online")
            status.className = "online"
            players.append(json.players.online + '/' + json.players.max)
        } else {
            status.append("Offline")
            status.className = "offline"
            players.append("0/0")
        }
        
        let col = document.createElement("tr")
        col.scope = "col"
        col.append(ip, version, modpack, status, players)

        table.append(col)
    });
});


let DarkMode = () => {
    let body = document.getElementById("site");
    let thead = document.getElementById("head");
    if (body.className == "light") {
        body.className = "dark"
        thead.className = "dark_table"
    } else {
        body.className = "light"
        thead.className = "light_table"
    }
}