function initData() {
    if (!localStorage.getItem('nonprofits')) {
        const initial = [
            {
                name: "Ocean Wise Conservation Association",
                category: "Environment",
                description: "Protecting and restoring our oceans through cutting-edge research, impactful education programs, and direct community action across British Columbia and beyond.",
                website: "https://ocean.org",
                email: "info@ocean.org",
                createdAt: new Date('2024-01-15').toISOString()
            },
            {
                name: "Greater Vancouver Food Bank",
                category: "Food Security",
                description: "Providing nutritious food and essential support to those experiencing food insecurity across Metro Vancouver, serving over 28,000 people weekly.",
                website: "https://foodbank.bc.ca",
                email: "info@foodbank.bc.ca",
                createdAt: new Date('2024-01-20').toISOString()
            },
            {
                name: "Covenant House Vancouver",
                category: "Youth & Children",
                description: "Serving homeless and at-risk youth aged 16-24 with crisis shelter, transitional housing, and wraparound support services to help them build better futures.",
                website: "https://covenanthousebc.org",
                email: "info@covenanthousebc.org",
                createdAt: new Date('2024-01-25').toISOString()
            },
            {
                name: "Arts Umbrella",
                category: "Arts & Culture",
                description: "Transforming the lives of young people through professional arts education in dance, theatre, and visual arts on Granville Island.",
                website: "https://artsumbrella.com",
                email: "info@artsumbrella.com",
                createdAt: new Date('2024-02-01').toISOString()
            },
            {
                name: "BC SPCA Vancouver",
                category: "Animal Welfare",
                description: "Protecting and enhancing the quality of life for domestic, farm and wild animals through rescue, rehabilitation, adoption and advocacy programs.",
                website: "https://spca.bc.ca",
                email: "vancouver@spca.bc.ca",
                createdAt: new Date('2024-02-05').toISOString()
            }
        ];
        localStorage.setItem('nonprofits', JSON.stringify(initial));
    }
}

function getNonprofits() {
    initData();
    const data = localStorage.getItem('nonprofits');
    const orgs = data ? JSON.parse(data) : [];
    return orgs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function addNonprofit(org) {
    const orgs = getNonprofits();
    orgs.unshift(org);
    localStorage.setItem('nonprofits', JSON.stringify(orgs));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

if (window.location.pathname.includes('browse.html') || window.location.pathname.endsWith('/browse')) {
    let allOrgs = [];

    document.addEventListener('DOMContentLoaded', () => {
        allOrgs = getNonprofits();
        displayOrgs(allOrgs);

        document.getElementById('search-input').addEventListener('input', filterOrgs);
        document.getElementById('category-filter').addEventListener('change', filterOrgs);
    });

    function displayOrgs(orgs) {
        const grid = document.getElementById('nonprofits-grid');
        const count = document.getElementById('results-count');

        count.textContent = orgs.length;

        if (orgs.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No organizations found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = orgs.map(org => `
            <div class="nonprofit-card">
                <div class="card-category">${escapeHtml(org.category)}</div>
                <h3>${escapeHtml(org.name)}</h3>
                <p>${escapeHtml(org.description)}</p>
                <div class="card-links">
                    ${org.website ? `
                        <a href="${escapeHtml(org.website)}" target="_blank" rel="noopener noreferrer" class="card-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Visit website
                        </a>
                    ` : ''}
                    <a href="mailto:${escapeHtml(org.email)}" class="card-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Contact
                    </a>
                </div>
            </div>
        `).join('');
    }

    function filterOrgs() {
        const search = document.getElementById('search-input').value.toLowerCase();
        const category = document.getElementById('category-filter').value;

        const filtered = allOrgs.filter(org => {
            const matchSearch = org.name.toLowerCase().includes(search) || org.description.toLowerCase().includes(search);
            const matchCategory = category === 'all' || org.category === category;
            return matchSearch && matchCategory;
        });

        displayOrgs(filtered);
    }
}

if (window.location.pathname.includes('submit.html') || window.location.pathname.endsWith('/submit')) {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('submit-form');
        const descInput = document.getElementById('description');
        const charCount = document.getElementById('char-count');
        const formMessage = document.getElementById('form-message');

        descInput.addEventListener('input', () => {
            const len = descInput.value.length;
            charCount.textContent = len;

            if (len > 500) {
                descInput.value = descInput.value.substring(0, 500);
                charCount.textContent = 500;
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById('name').value.trim(),
                category: document.getElementById('category').value,
                description: document.getElementById('description').value.trim(),
                website: document.getElementById('website').value.trim(),
                email: document.getElementById('email').value.trim(),
                createdAt: new Date().toISOString()
            };

            if (data.description.length < 20) {
                showMessage('Please provide a more detailed description (at least 20 characters).', 'error');
                return;
            }

            addNonprofit(data);
            showMessage('Success! Your organization has been submitted.', 'success');

            form.reset();
            charCount.textContent = '0';

            setTimeout(() => {
                window.location.href = 'browse.html';
            }, 1500);
        });

        function showMessage(text, type) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
        }
    });
}

if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', () => {
        const orgs = getNonprofits();
        const countEl = document.getElementById('org-count');
        if (countEl) {
            countEl.textContent = orgs.length;
        }
    });
}