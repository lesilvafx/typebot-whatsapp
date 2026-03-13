function criarBarra(nome, avatar, urlWhatsapp, urlBack, mensagemTopo){

const container = document.querySelector("typebot-standard")

if(!container) return

const shadow = container.shadowRoot

/* ===== BARRA SUPERIOR ===== */

const userBar = document.createElement("div")

userBar.innerHTML = `
<div class="wa-header">

<a class="wa-back" href="${urlBack}">
←
</a>

<img class="wa-avatar" src="${avatar}">

<div class="wa-info">
<div class="wa-name">${nome} ✔</div>
<div class="wa-status">online</div>
</div>

<a class="wa-call" href="${urlWhatsapp}">
📞
</a>

</div>
`

shadow.querySelector(".typebot-container").prepend(userBar)

/* ===== MENSAGEM INICIAL ===== */

const info = document.createElement("div")

info.innerHTML = `
<div class="wa-info-box">
${mensagemTopo}
</div>
`

shadow.querySelector(".typebot-chat-view").prepend(info)

/* ===== SOM ===== */

const audio = new Audio("https://produto.comunidadeecom.com/audio_whatsapp.mp3")

/* ===== HORÁRIO ===== */

function getHora(){

const d = new Date()

let h = d.getHours().toString().padStart(2,"0")
let m = d.getMinutes().toString().padStart(2,"0")

return h+":"+m

}

/* ===== OBSERVAR MENSAGENS ===== */

let total = 0

setInterval(()=>{

const msgs = shadow.querySelectorAll(".typebot-host-bubble")

if(msgs.length > total){

for(let i=total;i<msgs.length;i++){

const span = document.createElement("span")

span.className = "wa-time"

span.innerText = getHora()

msgs[i].append(span)

audio.play()

}

total = msgs.length

}

},500)

/* ===== CSS ===== */

const style = document.createElement("style")

style.innerHTML = `

/* header */

.wa-header{
position:fixed;
top:0;
left:0;
right:0;
height:60px;
background:#075E54;
display:flex;
align-items:center;
padding:10px;
z-index:999;
color:white;
font-family:sans-serif;
}

.wa-avatar{
width:38px;
height:38px;
border-radius:50%;
margin-right:10px;
}

.wa-name{
font-weight:bold;
font-size:14px;
}

.wa-status{
font-size:12px;
opacity:.8;
}

.wa-call{
margin-left:auto;
font-size:20px;
text-decoration:none;
color:white;
}

.wa-back{
color:white;
text-decoration:none;
margin-right:10px;
font-size:20px;
}

/* mensagem topo */

.wa-info-box{
background:#d9fdd3;
padding:8px 12px;
border-radius:8px;
font-size:13px;
max-width:80%;
margin:80px auto 10px auto;
text-align:center;
}

/* balões */

.typebot-host-bubble,
.typebot-guest-bubble{
padding:12px 50px 12px 12px !important;
font-size:15px !important;
line-height:1.5 !important;
border-radius:10px !important;
max-width:75% !important;
position:relative;
}

/* horário */

.wa-time{
position:absolute;
bottom:4px;
right:8px;
font-size:11px;
color:#667781;
}

`

shadow.append(style)

}