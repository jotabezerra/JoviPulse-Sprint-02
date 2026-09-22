let mapaPrincipal = null;
let mapaCriacao = null;
let etapaAtual = 1;
const totalEtapas = 4;

const dadosEventos = [
  {
    id: 1, nome: 'Festa na Vila', local: 'Bela Vista, São Paulo', autor: '@mariana.souza',
    imagem: 'assets/images/festa-na-vila.jpg', curtidas: 1254, vistas: 5892, comentarios: 108,
    aoVivo: true,
    legenda: 'Que noite incrível! Energia lá no alto e momentos que ficam pra sempre!',
    curtidoPor: ['lucasvaz', 'biafernandes'], curtidorAvatares: [12, 22, 33],
    comentariosLista: [
      { avatar: 12, usuario: 'lucasvaz',     texto: 'Que festa incrível, energia inexplicável!', curtidas: 24, tempo: 'Agora' },
      { avatar: 22, usuario: 'biafernandes', texto: 'Amei cada segundo!',                        curtidas: 18, tempo: 'Agora' },
      { avatar: 33, usuario: 'gabrielrocha', texto: 'Organização perfeita e vibe única!',         curtidas: 12, tempo: 'Agora' },
    ]
  },
  {
    id: 2, nome: 'Noite Inesquecível', local: 'Consolação, São Paulo', autor: '@lucasvaz',
    imagem: 'assets/images/noite-inesquecivel.jpg', curtidas: 987, vistas: 9143, comentarios: 73,
    aoVivo: true,
    legenda: 'A banda está arrasando! Um show que vai ficar marcado pra sempre.',
    curtidoPor: ['mariana.souza', 'juliacampos'], curtidorAvatares: [47, 15, 25],
    comentariosLista: [
      { avatar: 47, usuario: 'mariana.souza', texto: 'A banda está arrasando demais!',     curtidas: 31, tempo: 'Agora' },
      { avatar: 15, usuario: 'juliacampos',   texto: 'Melhor show do ano, sem dúvida!',     curtidas: 19, tempo: 'Agora' },
      { avatar: 25, usuario: 'gabrielrocha',  texto: 'Esse set está insano!',               curtidas: 11, tempo: 'Agora' },
    ]
  },
  {
    id: 3, nome: 'Vibes São Paulo', local: 'Liberdade, São Paulo', autor: '@biafernandes',
    imagem: 'assets/images/vibes-sp.jpg', curtidas: 842, vistas: 6731, comentarios: 45,
    aoVivo: false,
    legenda: 'Já estou no local! Preparada para mais uma noite épica.',
    curtidoPor: ['lucasvaz', 'mariana.souza'], curtidorAvatares: [12, 47, 31],
    comentariosLista: [
      { avatar: 12, usuario: 'lucasvaz',     texto: 'Mal posso esperar pelo começo!',              curtidas: 15, tempo: 'há 20 min' },
      { avatar: 47, usuario: 'mariana.souza', texto: 'Esse DJ é incrível, vai ser épico!',          curtidas: 9,  tempo: 'há 45 min' },
      { avatar: 31, usuario: 'juliacampos',   texto: 'Já comprei meu ingresso semanas atrás!',      curtidas: 7,  tempo: 'há 1h' },
    ]
  },
  {
    id: 4, nome: 'Electro Night', local: 'Sé, São Paulo', autor: '@gabrielrocha',
    imagem: 'assets/images/electro-night.jpg', curtidas: 623, vistas: 4210, comentarios: 31,
    aoVivo: false,
    legenda: 'DJ Headliner em São Paulo é muito raro. Não percam essa chance!',
    curtidoPor: ['biafernandes', 'lucasvaz'], curtidorAvatares: [22, 12, 36],
    comentariosLista: [
      { avatar: 22, usuario: 'biafernandes', texto: 'DJ Headliner em SP é muito raro!',     curtidas: 21, tempo: 'há 30 min' },
      { avatar: 12, usuario: 'lucasvaz',     texto: 'Vai ser a melhor noite do ano!',        curtidas: 14, tempo: 'há 1h' },
      { avatar: 36, usuario: 'mariana.souza', texto: 'Comprei o ingresso semana passada!',   curtidas: 8,  tempo: 'há 2h' },
    ]
  },
  {
    id: 5, nome: 'Sunset Vibes', local: 'Mooca, São Paulo', autor: '@juliacampos',
    imagem: 'assets/images/sunset-vibes.jpg', curtidas: 512, vistas: 3842, comentarios: 22,
    aoVivo: false,
    legenda: 'After party imperdível! Julia Campos sempre entrega muito.',
    curtidoPor: ['mariana.souza', 'gabrielrocha'], curtidorAvatares: [47, 33, 18],
    comentariosLista: [
      { avatar: 47, usuario: 'mariana.souza', texto: 'Julia Campos sempre entrega muito!',   curtidas: 17, tempo: 'há 10 min' },
      { avatar: 33, usuario: 'gabrielrocha',  texto: 'After party imperdível!',               curtidas: 11, tempo: 'há 35 min' },
      { avatar: 18, usuario: 'biafernandes',  texto: 'Mal posso esperar pelo after!',         curtidas: 6,  tempo: 'há 1h' },
    ]
  },
];

function irPara(idTela) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  const destino = document.getElementById(idTela);
  if (!destino) return;
  destino.classList.add('ativa');
  destino.querySelector('.corpo-tela')?.scrollTo(0, 0);
  fecharNotificacoes();
  if (idTela === 'tela-inicio') {
    if (!mapaPrincipal) iniciarMapaPrincipal();
    else mapaPrincipal.invalidateSize();
  }
  if (idTela === 'tela-ranking') {
    document.getElementById('aba-curtidas')?.classList.add('ativa');
    document.getElementById('aba-vistas')?.classList.remove('ativa');
    renderizarRanking('curtidas');
  }
  if (idTela === 'tela-criar-evento') {
    etapaAtual = 1;
    renderizarEtapa(1);
    setTimeout(() => { if (!mapaCriacao) iniciarMapaCriacao(); }, 150);
  }
}

function mostrarAviso(mensagem) {
  const aviso = document.getElementById('aviso');
  aviso.textContent = mensagem;
  aviso.classList.add('visivel');
  clearTimeout(aviso._temporizador);
  aviso._temporizador = setTimeout(() => aviso.classList.remove('visivel'), 2400);
}

function alternarSenha() {
  const entrada = document.getElementById('entrada-senha');
  const icone = document.getElementById('icone-olho');
  if (entrada.type === 'password') {
    entrada.type = 'text';
    icone.className = 'bi bi-eye-slash';
  } else {
    entrada.type = 'password';
    icone.className = 'bi bi-eye';
  }
}

function definirFiltro(botao) {
  botao.closest('.abas-filtro').querySelectorAll('.aba-filtro').forEach(t => t.classList.remove('ativa'));
  botao.classList.add('ativa');
  const filtro = botao.dataset.filtro;
  document.getElementById('conteudo-em-alta').style.display = filtro === 'em-alta' ? 'block' : 'none';
  document.getElementById('conteudo-perto').style.display   = filtro === 'perto'   ? 'block' : 'none';
  document.getElementById('conteudo-lineup').style.display  = filtro === 'lineup'  ? 'block' : 'none';
}

function alternarAbaRanking(aba) {
  document.getElementById('aba-curtidas').classList.toggle('ativa', aba === 'curtidas');
  document.getElementById('aba-vistas').classList.toggle('ativa', aba === 'vistas');
  renderizarRanking(aba);
}

function renderizarRanking(criterio) {
  const lista = document.getElementById('lista-ranking');
  if (!lista) return;
  const classesPosicao = ['pos1', 'pos2', 'pos3', 'pos4', 'pos5'];
  const ordenados = [...dadosEventos].sort((a, b) => b[criterio] - a[criterio]);
  lista.innerHTML = ordenados.map((ev, i) => `
    <div class="item-ranking" onclick="abrirEvento(${ev.id})">
      <div class="badge-ranking ${classesPosicao[i]}">${i + 1}</div>
      <img class="miniatura-ranking" src="${ev.imagem}" alt="">
      <div class="info-ranking">
        <div class="nome-ranking">${ev.nome}</div>
        <div class="local-ranking"><i class="bi bi-geo-alt-fill"></i> ${ev.local}</div>
        <div class="por-ranking">por ${ev.autor}</div>
      </div>
      <div class="stats-ranking">
        <div class="linha-stat curtidas"><i class="bi bi-heart-fill"></i> ${ev.curtidas.toLocaleString('pt-BR')}</div>
        <div class="linha-stat visualizacoes"><i class="bi bi-eye-fill"></i> ${ev.vistas.toLocaleString('pt-BR')}</div>
      </div>
    </div>
  `).join('');
}

function abrirEvento(id) {
  const ev = dadosEventos.find(e => e.id === id);
  if (!ev) return;
  document.getElementById('detalhe-thumb').src = ev.imagem;
  document.getElementById('detalhe-nome').textContent = ev.nome;
  document.getElementById('detalhe-local').innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${ev.local}`;
  document.getElementById('detalhe-badge').innerHTML = ev.aoVivo
    ? `<div class="badge-ao-vivo">AO VIVO · AGORA</div>`
    : `<div class="badge-ao-vivo" style="background:rgba(120,120,120,0.15);color:#aaa;border-color:rgba(120,120,120,0.2);">EM BREVE</div>`;
  document.getElementById('carrossel-foto').src = ev.imagem;
  document.getElementById('stat-curtidas-num').textContent = ev.curtidas.toLocaleString('pt-BR');
  document.getElementById('stat-comentarios-num').textContent = ev.comentarios.toLocaleString('pt-BR');
  document.getElementById('stat-vistas-num').textContent = ev.vistas.toLocaleString('pt-BR');
  const outrasQtd = (ev.curtidas - 2).toLocaleString('pt-BR');
  document.getElementById('liked-avatares').innerHTML = ev.curtidorAvatares.map(n => `<img src="https://i.pravatar.cc/40?img=${n}" alt="">`).join('');
  document.getElementById('liked-por-texto').innerHTML = `Curtido por <strong>${ev.curtidoPor[0]}, ${ev.curtidoPor[1]}</strong> e outras <strong>${outrasQtd} pessoas</strong>`;
  const autorSemArroba = ev.autor.replace('@', '');
  document.getElementById('legenda-autor').textContent = autorSemArroba + ' ';
  document.getElementById('legenda-texto').textContent = ev.legenda;
  const linkVerTodos = document.getElementById('ver-todos-link');
  linkVerTodos.textContent = `Ver todos os ${ev.comentarios} comentários`;
  linkVerTodos.onclick = () => mostrarAviso('Ver todos os comentários');
  document.getElementById('lista-comentarios-evento').innerHTML = ev.comentariosLista.map(c => `
    <div class="item-comentario">
      <img class="avatar-comentario" src="https://i.pravatar.cc/40?img=${c.avatar}" alt="">
      <div class="corpo-comentario">
        <span class="usuario-comentario">${c.usuario}</span>
        <span class="texto-comentario">${escaparHtml(c.texto)}</span>
        <div class="acoes-comentario">
          <span class="tempo-comentario">${ev.aoVivo ? 'Agora' : c.tempo}</span>
          <button class="btn-responder">Responder</button>
          <button class="btn-curtir-comentario"><i class="bi bi-heart"></i> ${c.curtidas}</button>
        </div>
      </div>
    </div>
  `).join('');
  irPara('tela-comentarios');
}

function alternarCurtida(el) {
  const numEl = el.querySelector('.num-stat');
  const iconeEl = el.querySelector('i');
  if (el.classList.contains('curtida')) {
    el.classList.remove('curtida');
    iconeEl.className = 'bi bi-heart';
    numEl.textContent = (parseInt(numEl.textContent.replace(/\./g, '')) - 1).toLocaleString('pt-BR');
  } else {
    el.classList.add('curtida');
    iconeEl.className = 'bi bi-heart-fill';
    numEl.textContent = (parseInt(numEl.textContent.replace(/\./g, '')) + 1).toLocaleString('pt-BR');
  }
}

function publicarComentario() {
  const entrada = document.getElementById('entrada-comentario');
  const texto = entrada.value.trim();
  if (!texto) { mostrarAviso('Digite um comentário!'); return; }
  const lista = document.getElementById('lista-comentarios-evento');
  const novoComentario = document.createElement('div');
  novoComentario.className = 'item-comentario';
  novoComentario.innerHTML = `
    <img class="avatar-comentario" src="https://i.pravatar.cc/40?img=47" alt="">
    <div class="corpo-comentario">
      <span class="usuario-comentario">mariana.souza</span>
      <span class="texto-comentario">${escaparHtml(texto)}</span>
      <div class="acoes-comentario">
        <span class="tempo-comentario">Agora</span>
        <button class="btn-responder">Responder</button>
        <button class="btn-curtir-comentario"><i class="bi bi-heart"></i> 0</button>
      </div>
    </div>`;
  lista.prepend(novoComentario);
  entrada.value = '';
  mostrarAviso('Comentário publicado!');
}

function escaparHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderizarEtapa(etapa) {
  for (let i = 1; i <= totalEtapas; i++) {
    const divEtapa = document.getElementById(`criar-etapa-${i}`);
    const itemEtapa = document.getElementById(`etapa-${i}`);
    if (divEtapa) divEtapa.style.display = i === etapa ? 'block' : 'none';
    if (itemEtapa) {
      itemEtapa.classList.toggle('ativa', i === etapa);
      itemEtapa.classList.toggle('concluida', i < etapa);
    }
  }
  const botao = document.getElementById('botao-proxima-etapa');
  if (botao) botao.textContent = etapa === totalEtapas ? 'Publicar Evento' : 'Continuar';
}

function proximaEtapa() {
  if (etapaAtual < totalEtapas) {
    etapaAtual++;
    renderizarEtapa(etapaAtual);
    if (etapaAtual === 2 && mapaCriacao) mapaCriacao.invalidateSize();
  } else {
    mostrarAviso('Evento publicado com sucesso!');
    setTimeout(() => irPara('tela-inicio'), 1200);
  }
}

function selecionarLocal(el) {
  const local = el.dataset.local;
  document.getElementById('busca-local').value = local;
  mostrarAviso(`Local selecionado: ${local}`);
}

function selecionarCategoria(el) {
  el.closest('.grade-categoria').querySelectorAll('.opcao-categoria').forEach(o => o.classList.remove('selecionada'));
  el.classList.add('selecionada');
}

function alternarNotificacoes(evento) {
  evento.stopPropagation();
  document.getElementById('painel-notificacoes').classList.toggle('aberto');
}

function fecharNotificacoes() {
  document.getElementById('painel-notificacoes')?.classList.remove('aberto');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#painel-notificacoes') && !e.target.closest('.btn-notif')) {
    fecharNotificacoes();
  }
});

function iniciarMapaPrincipal() {
  mapaPrincipal = L.map('mapa-principal', {
    center: [-23.558, -46.662],
    zoom: 13,
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(mapaPrincipal);

  const pontosEventos = [
    { id: 1, lat: -23.558, lng: -46.662, icone: 'bi-music-note-beamed', contagem: 12, nome: 'Festa na Vila',      local: 'Bela Vista, São Paulo',  img1: 'assets/images/festa-na-vila.jpg',      img2: 'assets/images/noite-inesquecivel.jpg' },
    { id: 2, lat: -23.545, lng: -46.644, icone: 'bi-cup-straw',         contagem: 8,  nome: 'Noite Inesquecível', local: 'Consolação, São Paulo',  img1: 'assets/images/noite-inesquecivel.jpg', img2: 'assets/images/vibes-sp.jpg' },
    { id: 3, lat: -23.570, lng: -46.635, icone: 'bi-ticket-perforated', contagem: 6,  nome: 'Vibes São Paulo',    local: 'Liberdade, São Paulo',   img1: 'assets/images/vibes-sp.jpg',           img2: 'assets/images/festa-na-vila.jpg' },
    { id: 4, lat: -23.547, lng: -46.690, icone: 'bi-camera',            contagem: 9,  nome: 'Electro Night',      local: 'Pinheiros, São Paulo',   img1: 'assets/images/electro-night.jpg',      img2: 'assets/images/sunset-vibes.jpg' },
    { id: 5, lat: -23.580, lng: -46.648, icone: 'bi-globe2',            contagem: 7,  nome: 'Sunset Vibes',       local: 'Mooca, São Paulo',       img1: 'assets/images/sunset-vibes.jpg',       img2: 'assets/images/vibes-sp.jpg' },
  ];

  pontosEventos.forEach(ev => {
    const elemento = document.createElement('div');
    elemento.className = 'pino-mapa';
    elemento.innerHTML = `<i class="bi ${ev.icone}"></i><span class="contagem-pino">${ev.contagem}</span>`;

    const marcador = L.marker([ev.lat, ev.lng], {
      icon: L.divIcon({ html: elemento, className: '', iconSize: [36, 36], iconAnchor: [18, 18] })
    }).addTo(mapaPrincipal);

    marcador.bindPopup(`
      <div class="popup-mapa">
        <div class="badge-ao-vivo">EVENTO AO VIVO</div>
        <h4>${ev.nome}</h4>
        <div class="popup-mapa-local">${ev.local}</div>
        <div class="popup-mapa-fotos">
          <img src="${ev.img1}" alt="">
          <img src="${ev.img2}" alt="">
        </div>
        <div class="popup-mapa-meta">
          <i class="bi bi-people-fill"></i> 23 · Atualizado agora
        </div>
        <button class="btn-primario" onclick="abrirEvento(${ev.id})">Ver fotos</button>
      </div>
    `, { maxWidth: 240, className: '' });
  });
}

function iniciarMapaCriacao() {
  const elementoMapa = document.getElementById('mapa-criar');
  if (!elementoMapa || mapaCriacao) return;

  mapaCriacao = L.map('mapa-criar', {
    center: [-23.558, -46.662],
    zoom: 13,
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(mapaCriacao);

  const elementoPin = document.createElement('div');
  elementoPin.className = 'pino-mapa';
  elementoPin.innerHTML = `<i class="bi bi-geo-alt-fill"></i>`;

  L.marker([-23.558, -46.662], {
    icon: L.divIcon({ html: elementoPin, className: '', iconSize: [36, 36], iconAnchor: [18, 18] })
  }).addTo(mapaCriacao);

  mapaCriacao.on('click', e => {
    mapaCriacao.eachLayer(l => { if (l instanceof L.Marker) mapaCriacao.removeLayer(l); });
    const novoPin = document.createElement('div');
    novoPin.className = 'pino-mapa';
    novoPin.innerHTML = `<i class="bi bi-geo-alt-fill"></i>`;
    L.marker(e.latlng, {
      icon: L.divIcon({ html: novoPin, className: '', iconSize: [36, 36], iconAnchor: [18, 18] })
    }).addTo(mapaCriacao);
    mostrarAviso('Localização atualizada!');
  });
}
