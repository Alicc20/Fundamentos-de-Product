// Data object with book information
const DATA = {
  "books": [
    {
      "id": "inspired",
      "title": "Inspired – Marty Cagan",
      "coverImage": "https://covers.openlibrary.org/b/ISBN/9781119387506-L.jpg",
      "summary": "Inspired distingue entre output (las funcionalidades que produces) y outcome (el impacto que logras). Cagan insiste en que los equipos de producto exitosos se enfocan en outcomes, validan hipótesis e iteran para generar valor real.",
      "insights": [
        "Output ≠ Outcome: lo que entregas no garantiza valor.",
        "Visión clara como brújula para priorizar problemas.",
        "Equipos empoderados que descubren soluciones, no sólo construyen especificaciones.",
        "Proceso de discovery continuo con prototipos rápidos y tests de usuario."
      ],
      "examples": [
        "Lanzar una nueva feature (output) que reduce en 20% el churn (outcome).",
        "Prototipo de pago móvil que valida en 48 h la intención de compra antes de invertir en desarrollo backend."
      ],
      "additional_notes": "Cagan describe técnicas como story mapping, prototypes InVision, y tests de desirabilidad para asegurar fit antes de escribir código."
    },
    {
      "id": "buildtrap",
      "title": "Escaping the Build Trap – Melissa Perri",
      "coverImage": "https://covers.openlibrary.org/b/ISBN/9781491973790-L.jpg",
      "summary": "Perri define la 'trampa del build': medir éxito por cantidad de features. Para salir, propone una estrategia viva orientada a outcomes y una cultura de experimentación que valide problemas y soluciones.",
      "insights": [
        "La estrategia es un marco de decisión adaptable, no un plan rígido.",
        "Los equipos deben enlazar cada iniciativa a resultados de negocio medibles.",
        "Experimentar reduce incertidumbre y alinea aprendizaje con la visión.",
        "Sin estrategia clara, la experimentación es caótica; sin experimentación, la estrategia es teoría."
      ],
      "examples": [
        "Test 'Wizard of Oz' para validar si los usuarios pagan por recomendación personalizada antes de automatizar IA.",
        "Matriz impacto-esfuerzo para priorizar oportunidades alineadas a OKRs."
      ],
      "additional_notes": "Incluye frameworks como Opportunity Solution Tree y Product Kata para institucionalizar el aprendizaje continuo."
    },
    {
      "id": "leanplaybook",
      "title": "The Lean Product Playbook – Dan Olsen",
      "coverImage": "https://covers.openlibrary.org/b/ISBN/9781118960875-L.jpg",
      "summary": "Olsen presenta la pirámide de Product-Market Fit y un proceso Lean de seis pasos que recorre de cliente objetivo a test con usuarios, iterando hasta lograr encaje producto-mercado.",
      "insights": [
        "Pirámide: cliente objetivo → necesidades no satisfechas → propuesta de valor → feature set → UX.",
        "Separar problem space de solution space para evitar sesgos internos.",
        "MVP definido por hipótesis críticas, no por recortar aleatoriamente features.",
        "Bucle hipotesis-diseño-test-aprendizaje acelera el encaje y minimiza desperdicio."
      ],
      "examples": [
        "Priorización con Importance vs. Satisfaction para detectar pain points.",
        "Iterar prototipo clickable con 5-8 usuarios por ronda hasta que la tasa de éxito supere 80 %."
      ],
      "additional_notes": "El libro detalla métricas AARRR y cohortes para validar retención tras el lanzamiento del MVP."
    },
    {
      "id": "pmcareer",
      "title": "Cracking the PM Career – Bavaro & Laakmann",
      "coverImage": "https://covers.openlibrary.org/b/ISBN/9780984782895-L.jpg",
      "summary": "Guía exhaustiva de habilidades, marcos y prácticas para crecer en la carrera de Product Management, desde PM asociado hasta liderazgo ejecutivo.",
      "insights": [
        "Visión estratégica: conectar roadmap con objetivos de negocio.",
        "Manejo de ambigüedad: decidir con información incompleta.",
        "Product mindset: curiosidad, empatía y liderazgo sin autoridad.",
        "Tres fases de la carrera PM: shipping → strategy → organizational excellence."
      ],
      "examples": [
        "Uso de OKRs para alinear métricas de impacto antes de definir features.",
        "Facilitar talleres de story mapping para reducir la ambigüedad inicial de un proyecto '0→1'."
      ],
      "additional_notes": "Incluye testimonios de >50 PMs de empresas como Google, Asana y Netflix sobre sus aprendizajes y errores comunes."
    }
  ]
};

// Global variables
let currentBookId = 'inspired';

// Initialize the application
function init() {
    console.log('🚀 Initializing Product Fundamentals Library...');
    
    // Setup tab event listeners
    setupTabNavigation();
    
    // Load initial content
    loadBookContent('inspired');
    
    console.log('✅ Application initialized successfully');
}

// Setup tab navigation
function setupTabNavigation() {
    const bookTabs = document.querySelectorAll('.book-tab');
    
    bookTabs.forEach((tab) => {
        // Click events
        tab.addEventListener('click', handleTabClick);
        
        // Keyboard events
        tab.addEventListener('keydown', handleKeyNavigation);
    });
    
    console.log(`Setup navigation for ${bookTabs.length} tabs`);
}

// Handle tab clicks
function handleTabClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const bookId = event.currentTarget.getAttribute('data-book');
    
    if (!bookId) {
        console.error('No book ID found on clicked tab');
        return;
    }
    
    console.log(`Switching to book: ${bookId}`);
    
    // Update active tab
    updateActiveTab(event.currentTarget);
    
    // Load book content
    loadBookContent(bookId);
    
    // Update current book ID
    currentBookId = bookId;
}

// Handle keyboard navigation
function handleKeyNavigation(event) {
    const tabs = Array.from(document.querySelectorAll('.book-tab'));
    const currentIndex = tabs.indexOf(event.currentTarget);
    let targetIndex = currentIndex;
    
    switch(event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            targetIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
            break;
        case 'ArrowRight':
            event.preventDefault();
            targetIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
            break;
        case 'Home':
            event.preventDefault();
            targetIndex = 0;
            break;
        case 'End':
            event.preventDefault();
            targetIndex = tabs.length - 1;
            break;
        case 'Enter':
        case ' ':
            event.preventDefault();
            handleTabClick(event);
            return;
        default:
            return;
    }
    
    // Focus and activate target tab
    const targetTab = tabs[targetIndex];
    if (targetTab) {
        targetTab.focus();
        targetTab.click();
    }
}

// Update active tab visual state
function updateActiveTab(activeTab) {
    const allTabs = document.querySelectorAll('.book-tab');
    
    // Remove active state from all tabs
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
    });
    
    // Add active state to current tab
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
    activeTab.setAttribute('tabindex', '0');
    
    console.log(`Updated active tab to: ${activeTab.getAttribute('data-book')}`);
}

// Load and display book content
function loadBookContent(bookId) {
    console.log(`Loading content for book: ${bookId}`);
    
    const book = DATA.books.find(b => b.id === bookId);
    
    if (!book) {
        console.error(`Book not found: ${bookId}`);
        showError('Libro no encontrado');
        return;
    }
    
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) {
        console.error('Main content container not found');
        return;
    }
    
    // Create book content HTML
    const contentHTML = createBookContentHTML(book);
    
    // Update content with fade effect
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
        mainContent.innerHTML = contentHTML;
        mainContent.style.opacity = '1';
        
        // Setup accordion after content is loaded
        setupAccordion();
        
        console.log(`✅ Content loaded for: ${book.title}`);
    }, 150);
}

// Create HTML for book content
function createBookContentHTML(book) {
    return `
        <div class="book-content active" role="tabpanel" id="${book.id}-content" aria-labelledby="tab-${book.id}">
            <div class="book-header">
                <img src="${book.coverImage}" 
                     alt="${book.title} portada" 
                     class="book-cover" 
                     loading="lazy"
                     onerror="this.style.display='none'">
                <div class="book-info">
                    <h2>${book.title}</h2>
                    <p class="book-summary">${book.summary}</p>
                </div>
            </div>

            <div class="content-section">
                <h3>💡 Insights Clave</h3>
                <ul class="insights-list">
                    ${book.insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>

            <div class="content-section">
                <h3>📋 Ejemplos</h3>
                <ul class="examples-list">
                    ${book.examples.map(example => `<li>${example}</li>`).join('')}
                </ul>
            </div>

            <div class="more-info">
                <details class="accordion">
                    <summary class="accordion-summary">
                        <span class="accordion-title">Más información</span>
                        <span class="accordion-icon">▶</span>
                    </summary>
                    <div class="more-info-content">
                        ${book.additional_notes}
                    </div>
                </details>
            </div>
        </div>
    `;
}

// Setup accordion functionality
function setupAccordion() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const summary = accordion.querySelector('.accordion-summary');
        const icon = accordion.querySelector('.accordion-icon');
        
        if (summary && icon) {
            // Remove any existing listeners
            const newSummary = summary.cloneNode(true);
            summary.parentNode.replaceChild(newSummary, summary);
            
            // Add click listener
            newSummary.addEventListener('click', function(e) {
                e.preventDefault();
                
                const isOpen = accordion.hasAttribute('open');
                
                if (isOpen) {
                    accordion.removeAttribute('open');
                    newSummary.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
                } else {
                    accordion.setAttribute('open', '');
                    newSummary.querySelector('.accordion-icon').style.transform = 'rotate(90deg)';
                }
                
                console.log(`Accordion ${isOpen ? 'closed' : 'opened'}`);
            });
            
            // Add keyboard support
            newSummary.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    newSummary.click();
                }
            });
        }
    });
    
    console.log(`Setup ${accordions.length} accordions`);
}

// Show error message
function showError(message) {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="book-content active">
                <div style="text-align: center; padding: 2rem; color: var(--color-error);">
                    <h3>❌ Error</h3>
                    <p>${message}</p>
                </div>
            </div>
        `;
    }
}

// Smooth scroll to content
function scrollToContent() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Small delay to ensure everything is loaded
        setTimeout(init, 100);
    } catch (error) {
        console.error('❌ Initialization error:', error);
        showError('Error al inicializar la aplicación');
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('Page became visible - refreshing current content');
        if (currentBookId) {
            loadBookContent(currentBookId);
        }
    }
});

// Export for testing
if (typeof window !== 'undefined') {
    window.ProductFundamentalsApp = {
        DATA,
        init,
        loadBookContent,
        handleTabClick,
        setupAccordion,
        currentBookId
    };
}