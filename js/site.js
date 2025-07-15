 particlesJS("particles-js", {
     "particles": {
         "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
         "color": { "value": "#FFD700" },
         "shape": { "type": "star" },
         "size": { "value": 4, "random": true },
         "move": { "enable": true, "speed": 1.2, "direction": "none", "out_mode": "out" },
         "opacity": { "value": 1 }
     },
     "retina_detect": true
 });   
   
   
   const modal = document.getElementById('lightboxModal');
   const modalImg = document.getElementById('lightboxImg');

   modal.addEventListener('show.bs.modal', function (event) {
       const trigger = event.relatedTarget;
       const imgSrc = trigger.getAttribute('data-img');

       // Limpiar estado previo
       modalImg.classList.remove('loaded');
       modalImg.src = '';
       modalImg.alt = 'Cargando...';

       // Previsualizar imagen cargada
       const loader = new Image();
       loader.onload = function () {
           modalImg.src = imgSrc;
           modalImg.alt = 'Imagen ampliada';
           modalImg.classList.add('loaded');
       };
       loader.onerror = function () {
           modalImg.alt = 'Imagen no disponible 🧙‍♂️';
       };
       loader.src = imgSrc;
   });

       const lightboxModal = document.getElementById('lightboxModal');

   if (lightboxModal) {
       lightboxModal.addEventListener('show.bs.modal', function () {
           lightboxModal.querySelector('.modal-content').classList.add('modal-magic-show');
           lightboxModal.querySelector('.modal-content').classList.remove('modal-magic-hide');
       });

       lightboxModal.addEventListener('hide.bs.modal', function () {
           lightboxModal.querySelector('.modal-content').classList.add('modal-magic-hide');
           lightboxModal.querySelector('.modal-content').classList.remove('modal-magic-show');
       });

       lightboxModal.addEventListener('hidden.bs.modal', function () {
           lightboxModal.querySelector('.modal-content').classList.remove('modal-magic-hide');
       });
   }


 document.getElementById('btnSoplar').addEventListener('click', function () {
  const container = document.getElementById('hechizoChispas');
  const audio = document.getElementById('audioSoplido');
  const pastel = document.getElementById('pastelImg');
  const velitas = document.getElementById('velitas');
  const canvas = document.getElementById('confetiCanvas');

  // Temblor pastel
  if (pastel) {
    pastel.classList.add('temblor');
    setTimeout(() => pastel.classList.remove('temblor'), 1000);
  }

  // Parar parpadeo de velitas
  if (velitas) {
    velitas.style.animation = 'none';
    velitas.textContent = '💨'; // velas apagadas
  }

  // Sonido
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }

  // Chispas
  container.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const chispa = document.createElement('div');
    chispa.className = 'chispa';
    chispa.style.left = Math.random() * 100 + 'px';
    chispa.style.top = Math.random() * 30 + 'px';
    container.appendChild(chispa);
  }

  // Humo
  const humo = document.createElement('div');
  humo.className = 'humo';
  container.appendChild(humo);

  // Confeti
  showConfetti(canvas);

  // Mensaje
  Swal.fire({
  title: '¡Feliz cumpleaños, Isis! 🎂✨',
  html: `
    <p style="font-size:1.2rem; font-family: 'Cinzel Decorative', cursive;">
      Tus velitas se han apagado...<br>
      Pero la luz que llevas dentro nunca se apaga 💖<br><br>
      ¡Que todos tus deseos se hagan realidad, preciosa! 🌟<br>
    </p>
  `, 
  background: 'rgba(0, 0, 0, 0.85)',
  color: '#fffacd',
  confirmButtonText: 'Gracias ✨',
  confirmButtonColor: '#FFD700',
  customClass: {
    popup: 'animated fadeInDown'
  }
});

});



function showConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.style.display = 'block';

  let confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 100,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.floor(Math.random() * 10) - 10
  }));

  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((p, i) => {
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });

    update();
    requestAnimationFrame(draw);
  }

  function update() {
    angle += 0.01;
    confetti.forEach(p => {
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle);
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();

  setTimeout(() => {
    canvas.style.display = 'none';
  }, 5000);
}
