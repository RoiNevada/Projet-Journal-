const articlesDB = {
    1: {
        category: "Scoop",
        title: "Riccardo obtient ENFIN son niveau B1+ en français",
        image: "https://via.placeholder.com/800x400/151922/38bdf8?text=Duolingo+Leak",
        body: `
            <p><strong>Arles, IUT Informatique</strong> — Le Bâtiment C est sous le choc. Alors que la rumeur affirmait depuis des années que le niveau de français de notre cher Riccardo stagnait aux alentours du niveau A2 (et encore, les jours de clémence), un groupe d'étudiants en cybersécurité a récemment fait une découverte fracassante.</p>
            <p>En interceptant des paquets réseau suspects sur le Wifi de l'IUT, ces "hackers" éthiques ont mis la main sur les données d'un compte Duolingo Premium. Le couperet est tombé : Riccardo a secrètement validé son niveau B1+ la semaine dernière avec un score parfait sur l'exercice du subjonctif imparfait.</p>
            <p>Finies les confusions légendaires en plein TP. L'administration envisage même de lui confier les cours d'Expression Communication l'année prochaine. "Nous sommes très fiers de lui", a déclaré la direction, encore un peu abasourdie.</p>
        `
    },
    2: {
        category: "Droit",
        title: "Coup de tonnerre : M. Chikhaoui perd un procès contre un première année",
        image: "https://via.placeholder.com/800x400/151922/38bdf8?text=Objection!",
        body: `
            <p>C'est une page de l'histoire de l'IUT qui se tourne. M. Chikhaoui, réputé invincible lors de ses tristement célèbres procès fictifs d'introduction au droit de l'informatique, a mordu la poussière. Et pas face à n'importe qui : face à un étudiant de première année (qui avait pourtant oublié sa clé USB le matin même).</p>
            <p>D'après les fuites organisées par un procureur étudiant prétendument "corrompu" (acheté avec deux cafés de la machine), la défaite repose sur un vice de procédure exceptionnel. L'étudiant aurait invoqué une jurisprudence obscure datant de Windows 95, rendant caduque toute l'accusation de M. Chikhaoui concernant le piratage d'une base de données.</p>
            <p>Le professeur a quitté le tribunal (la salle 104) sans faire de déclaration, mais la rumeur veut qu'il prépare activement l'appel pour le second semestre. Le droit ne dort jamais.</p>
        `
    },
    3: {
        category: "Scandale / IA",
        title: "M. Rémy pris la main dans le sac : L'IA corrigeait les SAE !",
        image: "https://via.placeholder.com/800x400/151922/38bdf8?text=Grok+AI+Scandal",
        body: `
            <p>C'est la chute d'une véritable icône. M. Rémy, fervent défenseur du "code tapé à la main sur un clavier mécanique sans auto-complétion" et membre honoraire de l'Association Anti-IA de l'IUT, a été démasqué.</p>
            <p>Mardi dernier, à 3h du matin, un étudiant insomniaque s'est connecté au serveur de l'école et a remarqué une activité anormale sur le compte de l'enseignant. Après analyse, le verdict est sans appel : M. Rémy utilisait <strong>Grok Pro</strong>, l'intelligence artificielle d'Elon Musk, pour corriger en masse les rendus de la dernière SAE de développement.</p>
            <p>Confronté aux preuves (des commentaires de correction finissant par "beep boop"), l'enseignant s'est défendu en plaidant la recherche scientifique : <em>"C'était uniquement pour faire de la rétro-ingénierie sur l'ennemi afin de mieux vous préparer aux dangers de l'automatisation !"</em>. Une excuse qui peine à convaincre les étudiants qui ont obtenu 18/20 grâce à ChatGPT.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // Animation d'apparition
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 80);
    });

    setTimeout(typeWriterEffect, 500);

    // Spotlight JS
    const grid = document.getElementById('journal-grid');
    if (grid) {
        grid.addEventListener('mousemove', (e) => {
            for(const card of document.getElementsByClassName("grid-item")) {
                const rect = card.getBoundingClientRect(),
                      x = e.clientX - rect.left,
                      y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        });
    }

    // Curseur personnalisé
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.documentElement.style.setProperty('--cursor-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${mouseY}px`);
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15; 
        ringY += (mouseY - ringY) * 0.15;
        document.documentElement.style.setProperty('--ring-x', `${ringX}px`);
        document.documentElement.style.setProperty('--ring-y', `${ringY}px`);
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactives = document.querySelectorAll('.interactive');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
});

// Bandeau en boucle
const newsText = "Synchronisation des bases de données de l'IUT... Succès.";
let charIndex = 0;
let isDeleting = false;

function typeWriterEffect() {
    const el = document.getElementById("breaking-news");
    if (!el) return;

    let typeSpeed = isDeleting ? 20 : 50;

    if (!isDeleting && charIndex < newsText.length) {
        el.innerHTML = newsText.substring(0, charIndex + 1) + "<span class='cursor'>_</span>";
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        el.innerHTML = newsText.substring(0, charIndex - 1) + "<span class='cursor'>_</span>";
        charIndex--;
    } else {
        isDeleting = !isDeleting;
        typeSpeed = isDeleting ? 3000 : 500;
    }
    setTimeout(typeWriterEffect, typeSpeed);
}

// Modale
const modal = document.getElementById('article-modal');
const modalContent = document.getElementById('modal-content');

function openModal(articleId) {
    const article = articlesDB[articleId];
    if (!article) return;

    modalContent.innerHTML = `
        <span class="tech-label">${article.category}</span>
        <h2 style="margin-top: 10px;">${article.title}</h2>
        <img src="${article.image}" alt="Illustration de l'article" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
        ${article.body}
    `;

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}