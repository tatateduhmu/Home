/* =====================================================================
   carousel.js | hanya dimuat index.html | mekanisme gulir ASLI (tidak diubah)
   Slider testimoni: kecepatan = angka 3000 (ms) pada resetTestiInterval.
   Carousel klien: klienStepMs = jeda geser (ms), klienTransitionMs = lama animasi. Jumlah klien dihitung otomatis dari HTML.
   Tampilan (warna/ukuran) diatur di style.css bagian 6 & 7.
   ===================================================================== */
// JS SLIDER TESTIMONI
        const testiSlides = document.querySelectorAll('.testi-slide');
        const testiDots = document.querySelectorAll('.testi-dot');
        const prevTesti = document.getElementById('prev-testi');
        const nextTesti = document.getElementById('next-testi');
        let currentTesti = 0;
        let testiAutoSlide;

        function showTesti(index) {
            testiSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('opacity-0', 'z-0');
                    slide.classList.add('opacity-100', 'z-10');
                } else {
                    slide.classList.remove('opacity-100', 'z-10');
                    slide.classList.add('opacity-0', 'z-0');
                }
            });
            testiDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('opacity-20');
                    dot.classList.add('opacity-100');
                } else {
                    dot.classList.add('opacity-20');
                    dot.classList.remove('opacity-100');
                }
            });
        }

        function resetTestiInterval() {
            clearInterval(testiAutoSlide);
            testiAutoSlide = setInterval(() => {
                currentTesti = (currentTesti === testiSlides.length - 1) ? 0 : currentTesti + 1;
                showTesti(currentTesti);
            }, 3000);
        }

        resetTestiInterval();

        prevTesti.addEventListener('click', () => {
            currentTesti = (currentTesti === 0) ? testiSlides.length - 1 : currentTesti - 1;
            showTesti(currentTesti);
            resetTestiInterval();
        });

        nextTesti.addEventListener('click', () => {
            currentTesti = (currentTesti === testiSlides.length - 1) ? 0 : currentTesti + 1;
            showTesti(currentTesti);
            resetTestiInterval();
        });

        testiDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTesti = index;
                showTesti(currentTesti);
                resetTestiInterval();
            });
        });

        // CAROUSEL KLIEN
        const klienTrack = document.getElementById('klien-track');
        const klienWindow = document.getElementById('klien-window');
        const klienTotal = klienTrack.querySelectorAll('.klien-item').length;   // item asli + salinan
        const klienCount = Math.max(1, Math.floor(klienTotal / 2));              // jumlah klien asli (otomatis)
        const klienStepPct = 100 / klienTotal;                                   // lebar satu langkah
        klienWindow.style.setProperty('--klien-total', klienTotal);
        const klienStepMs = 2500;
        const klienTransitionMs = 700;
        let klienIndex = 0;
        let klienTransitioning = false;
        let klienAutoTimer;
        let lastScrollY = window.scrollY;
        let scrollStepQueued = false;

        let lastWidth = window.innerWidth;

        function getVisibleKlienCount() {
            const value = getComputedStyle(klienWindow).getPropertyValue('--visible-logos').trim();
            return Math.max(1, Number(value) || 5);
        }

        function updateKlienOpacity() {
            const visible = getVisibleKlienCount();
            klienTrack.querySelectorAll('.klien-item').forEach((item) => {
                const itemIndex = Number(item.dataset.klienIndex);
                const relative = (itemIndex - (klienIndex % klienCount) + klienCount) % klienCount;
                const isVisible = relative < visible;
                const isEdge = isVisible && (relative === 0 || relative === visible - 1);
                item.classList.toggle('is-edge', isEdge);
                item.style.opacity = isVisible ? (isEdge ? '.28' : '1') : '0';
            });
        }

        function applyKlienPosition(animate = true) {
            klienTrack.style.transition = animate ? `transform ${klienTransitionMs}ms ease-in-out` : 'none';
            klienTrack.style.transform = `translateX(-${klienIndex * klienStepPct}%)`;
            updateKlienOpacity();
        }

        function stepKlienCarousel() {
            if (klienTransitioning) return;
            klienTransitioning = true;
            klienIndex += 1;
            applyKlienPosition(true);
            if (klienIndex === klienCount) {
                window.setTimeout(() => {
                    klienTrack.style.transition = 'none';
                    klienIndex = 0;
                    klienTrack.style.transform = 'translateX(0)';
                    updateKlienOpacity();
                    void klienTrack.offsetWidth;
                    klienTransitioning = false;
                }, klienTransitionMs);
            } else {
                window.setTimeout(() => { klienTransitioning = false; }, klienTransitionMs);
            }
        }

        function resetKlienTimer() {
            window.clearInterval(klienAutoTimer);
            klienAutoTimer = window.setInterval(stepKlienCarousel, klienStepMs);
        }

        applyKlienPosition(false);
        resetKlienTimer();

        window.addEventListener('scroll', () => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY + 30 && !scrollStepQueued) {
                scrollStepQueued = true;
                stepKlienCarousel();
                resetKlienTimer();   // langkah berikutnya tetap 2,5 detik setelah gulir, siklus otomatis tidak kacau
                window.setTimeout(() => { scrollStepQueued= false; }, 500);
            }
            lastScrollY = currentY;
        }, { passive: true });

        window.addEventListener('resize', () => {
            if (window.innerWidth !== lastWidth) {
                lastWidth = window.innerWidth;
                if (!klienTransitioning) {
                    klienTrack.style.transition = 'none';
                    klienTrack.style.transform = `translateX(-${klienIndex * klienStepPct}%)`;
                }
            }
        }, { passive: true });
