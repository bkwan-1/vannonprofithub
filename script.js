// Initialize with sample data if localStorage is empty
function initializeData() {
    if (!localStorage.getItem('nonprofits')) {
        const sampleData = [
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
        localStorage.setItem('nonprofits', JSON.stringify(sampleData));
    }
}

// Get all nonprofits from localStorage
function getNonprofits() {
    initializeData();
    const data = localStorage.getItem('nonprofits');
    const nonprofits = data ? JSON.parse(data) : [];
    // Sort by most recent first
    return nonprofits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Add a new nonprofit to localStorage
function addNonprofit(nonprofit) {
    const nonprofits = getNonprofits();
    nonprofits.unshift(nonprofit); // Add to beginning
    localStorage.setItem('nonprofits', JSON.stringify(nonprofits));
}

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    console.log('Vancouver Nonprofit Hub loaded');
});