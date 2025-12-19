// Gallery Functionality - Complete self-contained version
const galleryData = {
    items: [
        {
            id: 1,
            title: "Modern Living Room Concept",
            description: "Contemporary living room design with minimalist approach and natural lighting",
            image_url: "https://glamofashion.com/Portfolio/Poonam/images/1000035884.jpg",
            category: "interior",
            tags: ["modern", "living-room", "minimalist"],
            featured: true,
            display_order: 1
        },
        {
            id: 2,
            title: "Luxury Fashion Boutique",
            description: "High-end fashion retail space with custom displays and ambient lighting",
            image_url: "https://glamofashion.com/Portfolio/Poonam/images/1000035889.jpg",
            category: "fashion",
            tags: ["retail", "luxury", "fashion"],
            featured: true,
            display_order: 2
        },
        {
            id: 3,
            title: "E-commerce Dashboard Design",
            description: "Modern UI/UX for fashion e-commerce platform with user-friendly interface",
            image_url: "https://glamofashion.com/Portfolio/Poonam/images/1000035896.jpg",
            category: "ecommerce",
            tags: ["ui/ux", "dashboard", "modern"],
            featured: false,
            display_order: 3
        },
        {
            id: 4,
            title: "Residential Villa Design",
            description: "Complete architectural and interior design for luxury villa with panoramic views",
            image_url: "https://glamofashion.com/Portfolio/Poonam/images/1000035900.jpg",
            category: "real-estate",
            tags: ["residential", "luxury", "villa"],
            featured: true,
            display_order: 4
        },
        {
            id: 5,
            title: "Design Sketch Collection",
            description: "Hand-drawn sketches and concept art for various interior design projects",
            image_url: "https://glamofashion.com/Portfolio/Poonam/images/1000035885.jpg",
            category: "sketch",
            tags: ["sketch", "concept", "art"],
            featured: false,
            display_order: 5
        },
        {
            id: 6,
            title: "Modern Kitchen Design",
            description: "Sleek kitchen design with smart storage solutions and premium finishes",
            image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "interior",
            tags: ["kitchen", "modern", "smart"],
            featured: true,
            display_order: 6
        },
        {
            id: 7,
            title: "Fashion Store Layout",
            description: "Strategic store layout design maximizing customer flow and product visibility",
            image_url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "fashion",
            tags: ["store", "layout", "strategic"],
            featured: false,
            display_order: 7
        },
        {
            id: 8,
            title: "Mobile App Interface",
            description: "Responsive mobile app design for fashion e-commerce platform",
            image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "ecommerce",
            tags: ["mobile", "app", "responsive"],
            featured: true,
            display_order: 8
        },
        {
            id: 9,
            title: "Commercial Office Space",
            description: "Innovative office design promoting collaboration and productivity",
            image_url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "real-estate",
            tags: ["office", "commercial", "innovative"],
            featured: false,
            display_order: 9
        }
    ],
    currentFilter: 'all',
    currentPage: 1,
    itemsPerPage: 6,
    isLoading: false
};

// Load gallery items (no API needed)
function loadGalleryItems() {
    galleryData.isLoading = true;
    
    // Simulate loading delay
    setTimeout(() => {
        const allItems = galleryData.items;
        const startIndex = (galleryData.currentPage - 1) * galleryData.itemsPerPage;
        const endIndex = startIndex + galleryData.itemsPerPage;
        
        let filteredItems = galleryData.currentFilter === 'all' 
            ? allItems 
            : allItems.filter(item => item.category === galleryData.currentFilter);
        
        // Get items for current page
        const pageItems = filteredItems.slice(startIndex, endIndex);
        
        if (galleryData.currentPage === 1) {
            galleryData.items = pageItems;
        } else {
            galleryData.items = [...galleryData.items, ...pageItems];
        }
        
        renderGallery();
        
        // Check if more items exist
        const hasMore = endIndex < filteredItems.length;
        updateLoadMoreButton(hasMore);
        
        galleryData.isLoading = false;
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Designs';
        }
    }, 300);
}

// Render gallery items
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;
    
    if (galleryData.items.length === 0) {
        galleryGrid.innerHTML = `
            <div class="gallery-empty">
                <div class="gallery-empty-icon">
                    <i class="fas fa-images"></i>
                </div>
                <h3>No Designs Found</h3>
                <p>There are no gallery items to display for the selected category.</p>
            </div>
        `;
        return;
    }
    
    galleryGrid.innerHTML = '';
    
    const filteredItems = galleryData.currentFilter === 'all' 
        ? galleryData.items 
        : galleryData.items.filter(item => item.category === galleryData.currentFilter);
    
    filteredItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = item.category;
        galleryItem.dataset.id = item.id;
        
        const tags = item.tags ? item.tags.map(tag => `<span class="gallery-tag">${tag}</span>`).join('') : '';
        
        galleryItem.innerHTML = `
            <div class="gallery-item-inner">
                <div class="gallery-image">
                    <img src="${item.image_url}" alt="${item.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="gallery-icons">
                            <button class="gallery-icon view-btn" title="View Full Size" data-index="${index}">
                                <i class="fas fa-expand"></i>
                            </button>
                            <button class="gallery-icon like-btn" title="Like Design" data-id="${item.id}">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.description || ''}</p>
                    <div class="gallery-tags">
                        ${tags}
                        <span class="gallery-tag">${item.category}</span>
                    </div>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Add event listeners for new items
    attachGalleryEventListeners();
    
    // Restore liked states
    restoreLikedStates();
}

// Filter gallery items
function filterGallery(category) {
    galleryData.currentFilter = category;
    galleryData.currentPage = 1;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // Show loading state
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = `
            <div class="gallery-item loading"></div>
            <div class="gallery-item loading"></div>
            <div class="gallery-item loading"></div>
        `;
    }
    
    // Load filtered items
    setTimeout(() => {
        galleryData.items = [];
        loadGalleryItems();
    }, 300);
}

// Update load more button state
function updateLoadMoreButton(hasMore) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (!hasMore) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
}

// Lightbox functionality
let currentLightboxIndex = 0;

function openLightbox(index) {
    const filteredItems = galleryData.currentFilter === 'all' 
        ? galleryData.items 
        : galleryData.items.filter(item => item.category === galleryData.currentFilter);
    
    if (filteredItems.length === 0) return;
    
    currentLightboxIndex = index;
    const item = filteredItems[index];
    
    // Update lightbox content
    document.getElementById('lightboxImage').src = item.image_url;
    document.getElementById('lightboxImage').alt = item.title;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxDescription').textContent = item.description || '';
    
    // Update tags
    const tagsContainer = document.getElementById('lightboxTags');
    tagsContainer.innerHTML = '';
    
    if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'gallery-tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    }
    
    // Add category tag
    const categoryTag = document.createElement('span');
    categoryTag.className = 'gallery-tag';
    categoryTag.textContent = item.category;
    tagsContainer.appendChild(categoryTag);
    
    // Update navigation buttons
    document.getElementById('lightboxPrev').disabled = index === 0;
    document.getElementById('lightboxNext').disabled = index === filteredItems.length - 1;
    
    // Show lightbox
    document.getElementById('lightboxModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightboxModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    const filteredItems = galleryData.currentFilter === 'all' 
        ? galleryData.items 
        : galleryData.items.filter(item => item.category === galleryData.currentFilter);
    
    let newIndex = currentLightboxIndex + direction;
    
    if (newIndex >= 0 && newIndex < filteredItems.length) {
        openLightbox(newIndex);
    }
}

// Like functionality
function toggleLike(itemId) {
    const likeBtn = document.querySelector(`.like-btn[data-id="${itemId}"]`);
    if (!likeBtn) return;
    
    const isLiked = likeBtn.classList.contains('liked');
    
    if (isLiked) {
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="far fa-heart"></i>';
        // Remove from localStorage
        const likedItems = JSON.parse(localStorage.getItem('likedGalleryItems') || '[]');
        const updatedLikes = likedItems.filter(id => id !== itemId);
        localStorage.setItem('likedGalleryItems', JSON.stringify(updatedLikes));
    } else {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
        // Add to localStorage
        const likedItems = JSON.parse(localStorage.getItem('likedGalleryItems') || '[]');
        likedItems.push(itemId);
        localStorage.setItem('likedGalleryItems', JSON.stringify(likedItems));
    }
}

// Restore liked states from localStorage
function restoreLikedStates() {
    const likedItems = JSON.parse(localStorage.getItem('likedGalleryItems') || '[]');
    likedItems.forEach(itemId => {
        const likeBtn = document.querySelector(`.like-btn[data-id="${itemId}"]`);
        if (likeBtn) {
            likeBtn.classList.add('liked');
            likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
        }
    });
}

// Attach event listeners
function attachGalleryEventListeners() {
    // View buttons
    document.querySelectorAll('.view-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => openLightbox(index));
    });
    
    // Like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleLike(btn.dataset.id));
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterGallery(btn.dataset.filter));
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (galleryData.isLoading) return;
            
            galleryData.currentPage++;
            loadMoreBtn.disabled = true;
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            loadGalleryItems();
        });
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery
    loadGalleryItems();
    
    // Lightbox event listeners
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));
    
    // Close lightbox on overlay click
    document.getElementById('lightboxModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightboxModal')) {
            closeLightbox();
        }
    });
    
    // Close lightbox on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('lightboxModal').classList.contains('active')) {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft' && document.getElementById('lightboxModal').classList.contains('active')) {
            navigateLightbox(-1);
        }
        if (e.key === 'ArrowRight' && document.getElementById('lightboxModal').classList.contains('active')) {
            navigateLightbox(1);
        }
    });
});

// Initialize Swiper with responsive settings
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 25,
            centeredSlides: false,
        },
        992: {
            slidesPerView: 2,
            spaceBetween: 30,
            centeredSlides: true,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
        }
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const projectType = contactForm.querySelector('select').value;
        
        // In a real application, you would send this data to a server
        alert(`Thank you, ${name}! Your ${projectType} project inquiry has been received. I'll review your requirements and contact you at ${email} within 24 hours.`);
        
        // Reset form
        contactForm.reset();
        contactForm.querySelector('select').selectedIndex = 0;
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });
});

// Add animation to specialty cards on scroll
const specialtyCards = document.querySelectorAll('.specialty-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

specialtyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(card);
});

// Animate timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 300);
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    timelineObserver.observe(item);
});

// Animate showcase items
const showcaseItems = document.querySelectorAll('.showcase-item');
const showcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 400);
        }
    });
}, { threshold: 0.1 });

showcaseItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    showcaseObserver.observe(item);
});

// Fix for mobile viewport height
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);