// script.js
const uploadArea = document.getElementById('uploadArea');
const photoPreview = document.getElementById('photoPreview');
const fileInput = document.getElementById('fileInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const results = document.getElementById('results');
const loader = document.getElementById('loader');
const aiStatus = document.getElementById('aiStatus');

let currentImageBase64 = null;

function processImageFile(file) {
    if (!file.type.startsWith('image/')) {
        aiStatus.textContent = '❌ Please upload an image file (jpg, png, etc).';
        aiStatus.classList.add('error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        // Show preview
        photoPreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded photo">`;
        currentImageBase64 = e.target.result;
        
        // Enable analyze button
        analyzeBtn.disabled = false;
        aiStatus.textContent = '🧠 Ready to check your vibe!';
        aiStatus.classList.remove('error');
    };
    reader.readAsDataURL(file);
}

function displayResults(data) {
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth' });

    // Animate vibe score
    animateScore(data.vibeScore);

    document.getElementById('category').textContent = data.category;
    document.getElementById('roastText').textContent = data.roast;

    // Animate meters
    setTimeout(() => {
        document.getElementById('pookieMeter').style.width = `${data.pookieLevel}%`;
        document.getElementById('cringeMeter').style.width = `${data.cringeFactor}%`;
        document.getElementById('sassMeter').style.width = `${data.sassLevel}%`;
        document.getElementById('ghostMeter').style.width = `${data.ghostEnergy}%`;
    }, 300);
}

function animateScore(targetScore) {
    const scoreElement = document.getElementById('vibeScore');
    let currentScore = 0;
    const duration = 1500;
    const stepTime = 20;
    const increment = targetScore / (duration / stepTime);

    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.floor(currentScore);
    }, stepTime);
}

async function checkVibeWithAI() {
    if (!currentImageBase64) {
        alert("Please upload a photo first!");
        return;
    }

    loader.classList.remove('hidden');
    analyzeBtn.disabled = true;

    try {
        const mode = document.getElementById('roastMode').value;
        const response = await fetch('https://vibechecker-uusu.onrender.com/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: currentImageBase64,
                mode: mode,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'The server had a problem.');
        }

        const analysisResult = await response.json();
        displayResults(analysisResult);

    } catch (error) {
        console.error('Error:', error);
        aiStatus.textContent = `😭 Error: ${error.message}`;
        aiStatus.classList.add('error');
    } finally {
        loader.classList.add('hidden');
        analyzeBtn.disabled = false;
    }
}


// --- Event Listeners ---

// File input
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        processImageFile(file);
    }
});

// Drag and drop
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
        processImageFile(file);
    }
});

// Analyze button

analyzeBtn.addEventListener('click', checkVibeWithAI);
