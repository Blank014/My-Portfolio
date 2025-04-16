import React, { useState, useEffect } from 'react';
import '../../styles/PhotoGallery.css';
import { useLanguage } from '../../context/LanguageContext';
import TranslatedText from '../shared/TranslatedText';

// Sample photos - replace with your actual photos
const samplePhotos = [
    {
        id: 1,
        src: '/placeholder1.jpg', // Replace with your actual image paths
        alt: 'Nature Photography',
        title: {
            en: 'Forest Path',
            de: 'Waldweg'
        },
        description: {
            en: 'A serene path through a misty forest captured at dawn.',
            de: 'Ein ruhiger Weg durch einen nebligen Wald, aufgenommen bei Sonnenaufgang.'
        }
    },
    {
        id: 2,
        src: '/placeholder2.jpg',
        alt: 'Urban Photography',
        title: {
            en: 'City Lights',
            de: 'Stadtlichter'
        },
        description: {
            en: 'Urban landscape at night with vibrant city lights.',
            de: 'Urbane Landschaft bei Nacht mit lebendigen Stadtlichtern.'
        }
    },
    {
        id: 3,
        src: '/placeholder3.jpg',
        alt: 'Portrait Photography',
        title: {
            en: 'Contemplation',
            de: 'Betrachtung'
        },
        description: {
            en: 'A portrait capturing a moment of deep contemplation.',
            de: 'Ein Porträt, das einen Moment tiefer Betrachtung einfängt.'
        }
    },
    {
        id: 4,
        src: '/placeholder4.jpg',
        alt: 'Macro Photography',
        title: {
            en: 'Morning Dew',
            de: 'Morgentau'
        },
        description: {
            en: 'Macro shot of morning dew on a spider web.',
            de: 'Makroaufnahme von Morgentau auf einem Spinnennetz.'
        }
    },
    {
        id: 5,
        src: '/placeholder5.jpg',
        alt: 'Landscape Photography',
        title: {
            en: 'Mountain Vista',
            de: 'Bergblick'
        },
        description: {
            en: 'Panoramic view of mountains at sunset.',
            de: 'Panoramablick auf Berge bei Sonnenuntergang.'
        }
    },
    {
        id: 6,
        src: '/placeholder6.jpg',
        alt: 'Street Photography',
        title: {
            en: 'Street Life',
            de: 'Straßenleben'
        },
        description: {
            en: 'Candid capture of daily life in the city streets.',
            de: 'Spontane Aufnahme des täglichen Lebens in den Straßen der Stadt.'
        }
    }
];

const PhotoGallery = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const { language } = useLanguage();
    const [photos, setPhotos] = useState(samplePhotos);

    // Handle opening the lightbox
    const openLightbox = (photo) => {
        setSelectedPhoto(photo);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    };

    // Handle closing the lightbox
    const closeLightbox = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    // Navigate to previous photo
    const prevPhoto = () => {
        const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
        if (currentIndex > 0) {
            setSelectedPhoto(photos[currentIndex - 1]);
        }
    };

    // Navigate to next photo
    const nextPhoto = () => {
        const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
        if (currentIndex < photos.length - 1) {
            setSelectedPhoto(photos[currentIndex + 1]);
        }
    };

    // Close lightbox on ESC key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedPhoto) {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && selectedPhoto) {
                prevPhoto();
            } else if (e.key === 'ArrowRight' && selectedPhoto) {
                nextPhoto();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPhoto]);

    return (
        <div className="photo-gallery">
            <h3><TranslatedText en="My Photography Portfolio" de="Mein Fotografie-Portfolio" /></h3>
            <div className="gallery-grid">
                {photos.map(photo => (
                    <div
                        key={photo.id}
                        className="gallery-item"
                        onClick={() => openLightbox(photo)}
                    >
                        <img src={photo.src} alt={photo.alt} />
                        <div className="photo-caption">
                            {photo.title[language]}
                        </div>
                    </div>
                ))}
            </div>

            {selectedPhoto && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>×</button>

                        <button
                            className="lightbox-nav prev"
                            onClick={prevPhoto}
                            disabled={photos.findIndex(photo => photo.id === selectedPhoto.id) === 0}
                        >
                            ‹
                        </button>

                        <img src={selectedPhoto.src} alt={selectedPhoto.alt} />

                        <button
                            className="lightbox-nav next"
                            onClick={nextPhoto}
                            disabled={photos.findIndex(photo => photo.id === selectedPhoto.id) === photos.length - 1}
                        >
                            ›
                        </button>

                        <div className="lightbox-caption">{selectedPhoto.title[language]}</div>
                        <div className="lightbox-description">{selectedPhoto.description[language]}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;