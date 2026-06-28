// DATABASE: Both of your original Python scripts live here together perfectly at the top!
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
        description: "A collection of beautiful terminal text animations, color gradients, and loading effects for your command line tools.", 
        installGuide: "pip install pygame", 
        photoUrl: "cool_effects.jpg", 
        fileLocation: "pyzone-marketplace/10_cool_effects.py" 
    },
        {
        title: "10 Cool Text and Visual Effects", 
        description: "A collection of beautiful terminal text animations, color gradients, and loading effects for your command line tools.", 
        installGuide: "pip install pygame", 
        photoUrl: "cool_effects.jpg", 
        fileLocation: "pyzone-marketplace/10_cool_effects.py" 
    }
];

// Pagination Settings for Handling Large Quantities of Files
let currentItems = [...myPythonLibrary];
let itemsToDisplay = 20; 

// High-performance file downloader that forces a true hard-drive save prompt
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
        
        // Clean up memory resources
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
        catalogGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; color: #bdc4c9; padding: 40px; border: 1px dashed #3a3f45; border-radius: 8px;">
                No matching Python scripts found.
            </p>`;
        return;
    }

    const loadedCount = catalogGrid.children.length;
    const batch = currentItems.slice(loadedCount, loadedCount + itemsToDisplay);
    
    const cardHTML = batch.map(item => `
        <div class="amazon-product-card">
            <div>
                <!-- Photo Container with Placeholder fallback system -->
                <div class="card-image-box">
                    <img src="${item.photoUrl ? item.photoUrl : ''}" alt="${item.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="placeholder-fallback" style="display:none; width:100%; height:100%; background:#131921; color:#febd69; align-items:center; justify-content:center; text-align:center; font-weight:bold; font-size:14px; padding:15px; font-family:monospace;">
                        &lt; ${item.title} /&gt;
                    </div>
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-description">
                    ${item.description}
                    <div style="margin-top: 10px; color: #ffffff; font-weight: 600; font-size: 11px;">🔧 Required Installation:</div>
                    <code class="install-box">${item.installGuide}</code>
                </div>
            </div>
            <!-- Intercepted action click button to prevent opening as page text -->
            <button onclick="forceFileDownload('${item.fileLocation}', '${item.fileLocation}')" class="amazon-download-button">
                Download .py File
            </button>
        </div>
    `).join('');

    catalogGrid.insertAdjacentHTML('beforeend', cardHTML);
}

// Debounce Filter: Prevents typing lagging across large lists
function debounce(func, delay) {
    let timeoutTimer;
    return function (...args) {
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Live real-time search configuration
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
        
        loadCatalogItems(matchedItems);
    }, 200)); 
}

// Infinite Scrolling setup to seamlessly append items as you scroll down
function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
            const catalogGrid = document.getElementById('catalog-grid');
            if (catalogGrid && catalogGrid.children.length < currentItems.length) {
                loadCatalogItems(currentItems, true);
            }
        }
    });
}

// Initialize system engines
window.onload = function() {
    loadCatalogItems();
    setupSearch();
    setupInfiniteScroll();
};
