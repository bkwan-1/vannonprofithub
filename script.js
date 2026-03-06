// Initialize with sample data if localStorage is empty
function initializeData() {
    if (!localStorage.getItem('nonprofits')) {
        const sampleData = [
            {
                name: "Ocean Wise Conservation Association",
                category: "Environment",
                description: "Protecting and restoring our oceans through research, education, and community action.",
                website: "https://ocean.org",
                email: "info@ocean.org",
                createdAt: new Date().toISOString()
            },
            {
                name: "Greater Vancouver Food Bank",
                category: "Food Security",
                description: "Providing nutritious food to those in need across Metro Vancouver.",
                website: "https://foodbank.bc.ca",
                email: "info@foodbank.bc.ca",
                createdAt: new Date().toISOString()
            },
            {
                name: "Covenant House Vancouver",
                category: "Youth & Housing",
                description: "Serving homeless and at-risk youth with shelter, crisis care, and support services.",
                website: "https://covenanthousebc.org",
                email: "info@covenanthousebc.org",
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('nonprofits', JSON.stringify(sampleData));
    }
}

// Get all nonprofits from localStorage
function getNonprofits() {
    initializeData();
    const data = localStorage.getItem('nonprofits');
    return data ? JSON.parse(data) : [];
}

// Add a new nonprofit to localStorage
function addNonprofit(nonprofit) {
    const nonprofits = getNonprofits();
    nonprofits.push(nonprofit);
    localStorage.setItem('nonprofits', JSON.stringify(nonprofits));
}

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    console.log('Vancouver Nonprofit Hub loaded');
});