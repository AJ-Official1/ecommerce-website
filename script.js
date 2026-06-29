// DATABASE: Python scripts data repository array live tracking lists
const myPythonLibrary = [
    {
        title: "Offline AI Script Engine", 
        description: "Runs open-source machine learning models locally on your machine without requiring an active internet connection.", 
        installGuide: "pip install ollama", 
        photoUrl: "offline_ai.jpg", 
        fileLocation: "pyzone-marketplace/offline_AI.py" 
    },
    {
        title: "10 Cool Text and Visual Effects", 
        description: "Suggest a font combination for this sentence Provide a longer definition of design Show how to style this text using CSS", 
        installGuide: "pip install pygame", 
        photoUrl: "cool_effects.jpg", 
        fileLocation: "pyzone-marketplace/10_cool_effects.py" 
    },
    {
        title: "Rock, Paper and Scissors", 
        description: "Rock Paper Scissors is a simple, two-player hand game of chance and strategy. Players simultaneously form one of three hand shapes", 
        installGuide: "pip install pygame", 
        photoUrl: "rps.jpg", 
        fileLocation: "pyzone-marketplace/rock pap.py" 
    }
];

// Pagination Settings for Handling Large Quantities of Files
let currentItems = [...myPythonLibrary];
let itemsToDisplay = 20; 

// High-performance file downloader that forces a save prompt
async function forceFileDownload(fileUrl, fileName) {
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('File fetch failed');
        
        const fileBlob = await response.blob();
        const blobUrl = window.URL.createObjectURL(fileBlob);
        
        const hiddenAnchor = document.createElement('a');
        hiddenAnchor.href = blobUrl;
        hiddenAnchor.download = fileName.split('/').pop(); 
        
        document.body.appendChild(hiddenAnchor);
        hiddenAnchor.click();
        
        document.body.removeChild(hiddenAnchor);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Download fallback triggered:", error);
        const fallbackAnchor = document.createElement('a');
        fallbackAnchor.href = fileUrl;
        fallbackAnchor.download = fileName.split('/').pop();
        fallbackAnchor.click();
    }
}

// Injects the dynamic grid cards into the screen
function loadCatalogItems(filteredItems = myPythonLibrary, append = false) {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid) return;

    if (!append) {
        catalogGrid.innerHTML = '';
        currentItems = filteredItems;
        itemsToDisplay = 20; 
    }

    if (currentItems.length === 0) {
        catalogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #8fa0b5; padding: 40px; border: 1px dashed #1f2d3d; border-radius: 8px;">No records located.</p>';
        return;
    }

    const loadedCount = catalogGrid.children.length;
    const batch = currentItems.slice(loadedCount, loadedCount + itemsToDisplay);
    
    const cardHTML = batch.map(item => `
        <div class="amazon-product-card">
            <div>
                <div class="card-image-box">
                    <img src="${item.photoUrl ? item.photoUrl : ''}" alt="${item.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="placeholder-fallback" style="display:none; width:100%; height:100%; background:#05070a; color:#00ffff; align-items:center; justify-content:center; text-align:center; font-weight:bold; font-size:14px; padding:15px; font-family:monospace; border: 1px solid #161f30;">
                        Preview Content
                    </div>
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-description">
                    ${item.description}
                    <div style="margin-top: 10px; color: #00ffff; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">🔧 Initialize Setup:</div>
                    <code class="install-box">${item.installGuide}</code>
                </div>
            </div>
            <button onclick="forceFileDownload('${item.fileLocation}', '${item.fileLocation}')" class="amazon-download-button">
                Download Script
            </button>
        </div>
    `).join('');

    catalogGrid.insertAdjacentHTML('beforeend', cardHTML);
}

// Debounce Filter
function debounce(func, delay) {
    let timeoutTimer;
    return function (...args) {
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Live search configuration
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        const matchedItems = myPythonLibrary.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm) ||
            item.installGuide.toLowerCase().includes(searchTerm)
        );
        
        switchToHomeView();
        loadCatalogItems(matchedItems);
    }, 200)); 
}

// Infinite Scrolling setup
function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        const homeSection = document.getElementById('home-page-section');
        if (homeSection && homeSection.classList.contains('hidden')) return;

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
            const catalogGrid = document.getElementById('catalog-grid');
            if (catalogGrid && catalogGrid.children.length < currentItems.length) {
                loadCatalogItems(currentItems, true);
            }
        }
    });
}

// MANDATORY SECTION VIEW SWITCHING FUNCTIONS WITH LIVE SEARCH CONTAINER VISIBILITY MANAGER
function switchToHomeView() {
    const homeSection = document.getElementById('home-page-section');
    const aboutSection = document.getElementById('about-page-section');
    const searchWrapper = document.getElementById('mainSearchWrapper');
    
    document.getElementById('navHomeLink').classList.add('active');
    document.getElementById('navAboutLink').classList.remove('active');
    
    aboutSection.classList.add('hidden');
    homeSection.classList.remove('hidden');
    
    if (searchWrapper) searchWrapper.classList.remove('hidden-search');
    
    homeSection.classList.remove('page-transition-active');
    void homeSection.offsetWidth; 
    homeSection.classList.add('page-transition-active');
}

function switchToAboutView() {
    const homeSection = document.getElementById('home-page-section');
    const aboutSection = document.getElementById('about-page-section');
    const searchWrapper = document.getElementById('mainSearchWrapper');
    
    document.getElementById('navAboutLink').classList.add('active');
    document.getElementById('navHomeLink').classList.remove('active');
    
    homeSection.classList.add('hidden');
    aboutSection.classList.remove('hidden');
    
    if (searchWrapper) searchWrapper.classList.add('hidden-search');
    
    aboutSection.classList.remove('page-transition-active');
    void aboutSection.offsetWidth; 
    aboutSection.classList.add('page-transition-active');
}

function setupSinglePageNavigation() {
    const navHome = document.getElementById('navHomeLink');
    const navAbout = document.getElementById('navAboutLink');
    const logoBtn = document.getElementById('headerLogoBtn');

    if (navHome) {
        navHome.addEventListener('click', function(e) {
            e.preventDefault();
            switchToHomeView();
        });
    }

    if (navAbout) {
        navAbout.addEventListener('click', function(e) {
            e.preventDefault();
            switchToAboutView();
        });
    }

    if (logoBtn) {
        logoBtn.addEventListener('click', function() {
            switchToHomeView();
        });
    }
}

// Initialize system engines
window.onload = function() {
    loadCatalogItems();
    setupSearch();
    setupInfiniteScroll();
    setupSinglePageNavigation();
};
