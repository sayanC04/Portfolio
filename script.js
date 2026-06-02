(function () {
  'use strict';

  /* ========== PRELOADER ========== */
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.getElementById('preloader').classList.add('hidden');
    }, 2400);
  });

  /* ========== CURSOR GLOW ========== */
  var glow = document.getElementById('cursor-glow');
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      if (!glow.classList.contains('on')) glow.classList.add('on');
    });
  }

  /* ========== PARTICLES ========== */
  (function () {
    var c = document.getElementById('particles');
    var ctx = c.getContext('2d');
    var particles = [];
    var W, H;

    function resize() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function Particle() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.5;
      this.dx = (Math.random() - 0.5) * 0.3;
      this.dy = (Math.random() - 0.5) * 0.3;
      this.o = Math.random() * 0.5 + 0.1;
    }

    for (var i = 0; i < 60; i++) particles.push(new Particle());

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,211,238,' + p.o + ')';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx = -p.dx;
        if (p.y < 0 || p.y > H) p.dy = -p.dy;
        // connections
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(34,211,238,' + (1 - dist / 120) * 0.12 + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ========== NAVBAR ========== */
  var nav = document.getElementById('navbar');
  var ham = document.getElementById('hamburger');
  var mob = document.getElementById('mob-overlay');
  var sections = document.querySelectorAll('.section, .hero');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('btt').classList.toggle('visible', window.scrollY > 500);
    // Active section
    var scrollPos = window.scrollY + 200;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
        var id = sec.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('data-s') === id);
        });
      }
    });
  });

  // Hamburger
  ham.addEventListener('click', function () {
    ham.classList.toggle('active');
    mob.classList.toggle('active');
    document.body.style.overflow = mob.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mob-nav a').forEach(function (l) {
    l.addEventListener('click', function () {
      ham.classList.remove('active');
      mob.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Back to top
  document.getElementById('btt').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ========== TYPING EFFECT ========== */
  (function () {
    var roles = [
      'Cloud Engineer',
      'DevOps Engineer',
      'Infrastructure Architect',
      'CI/CD Specialist',
      'Kubernetes Expert',
      'Automation Engineer',
    ];
    var el = document.getElementById('typed');
    var ri = 0,
      ci = 0,
      deleting = false;

    function type() {
      var current = roles[ri];
      if (deleting) {
        el.textContent = current.substring(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 40);
      } else {
        el.textContent = current.substring(0, ci + 1);
        ci++;
        if (ci === current.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
        setTimeout(type, 80);
      }
    }
    setTimeout(type, 2800);
  })();

  /* ========== COUNTER ANIMATION ========== */
  function animateCounters() {
    document.querySelectorAll('.stat-n[data-target]').forEach(function (el) {
      if (el.dataset.done) return;
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.dataset.done = '1';
        var target = parseInt(el.dataset.target);
        var duration = 1500;
        var start = performance.now();
        function step(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      }
    });
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  /* ========== SCROLL ANIMATIONS ========== */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.aos').forEach(function (el) {
    observer.observe(el);
  });

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ========== CONTACT FORM — opens mailto ========== */
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('form-name').value;
    var email = document.getElementById('form-email').value;
    var subject = document.getElementById('form-subject').value || 'Portfolio Contact';
    var message = document.getElementById('form-message').value;

    var body =
      'Hi Sayan,%0D%0A%0D%0A' +
      encodeURIComponent(message) +
      '%0D%0A%0D%0AFrom: ' +
      encodeURIComponent(name) +
      '%0D%0AEmail: ' +
      encodeURIComponent(email);

    var mailto =
      'mailto:chakrabortysayan918@gmail.com?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      body;

    window.location.href = mailto;

    // Show success message
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  });

  /* ========== TILT EFFECT ON CARDS ========== */
  document.querySelectorAll('.p-card, .sk-cat').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        'perspective(1000px) rotateY(' + x * 3 + 'deg) rotateX(' + -y * 3 + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  });

  /* ========== PIPELINE STAGE ANIMATION ========== */
  (function () {
    var stages = document.querySelectorAll('.pipe-stage');
    var arrows = document.querySelectorAll('.pipe-arrow');
    var idx = 0;
    function pulse() {
      stages.forEach(function (s) {
        s.classList.remove('active-stage');
      });
      arrows.forEach(function (a) {
        a.classList.remove('active-arrow');
      });
      
      if (stages[idx]) {
        stages[idx].classList.add('active-stage');
      }
      if (arrows[idx]) {
        arrows[idx].classList.add('active-arrow');
      }
      idx = (idx + 1) % stages.length;
    }
    setInterval(pulse, 1500);
  })();

  /* ========== SKILL TOOL HOVER ========== */
  document.querySelectorAll('.tool').forEach(function (t) {
    t.addEventListener('mouseenter', function () {
      this.style.transition = 'all .15s cubic-bezier(.34,1.56,.64,1)';
    });
    t.addEventListener('mouseleave', function () {
      this.style.transition = 'all .25s cubic-bezier(.4,0,.2,1)';
    });
  });
})();
