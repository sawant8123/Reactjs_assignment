import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import emailjs from 'emailjs-com';
import 'react-image-gallery/styles/css/image-gallery.css';

const ItemModal = ({ item, onClose }) => {
  if (!item) return null;

  const images = [item.cover, ...item.gallery.map(img => img.url)];
  const [mainImage, setMainImage] = useState(images[0]);

  const handleEnquire = () => {
    const templateParams = {
      item_name: item.name,
      item_type: item.type,
      item_description: item.description,
    };
    emailjs.send(
      'service_ghwf0rv',
      'template_peugar9',
      templateParams,
      'ZQEVxjI28TYxbFaEK'
    )
      .then(() => alert('Enquiry email sent!'))
      .catch(() => alert('Failed to send enquiry.'));
  };

  return (
    <div
      className="modal d-block"
      onClick={onClose}
      style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div
        className="modal-dialog modal-lg"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 900 }}
      >
        <div className="modal-content p-4" style={{ borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
          <button
            type="button"
            className="btn-close position-absolute"
            aria-label="Close"
            style={{ top: 16, right: 16, zIndex: 2, position: 'absolute' }}
            onClick={onClose}
          ></button>
          <div className="modal-body">
            <div className="row align-items-center">
              <div className="col-6 d-flex">
                <div className="d-flex flex-column align-items-center gap-2 me-3">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="thumbnail"
                      className={`img-thumbnail ${mainImage === img ? 'border-primary' : ''}`}
                      style={{ width: 60, height: 60, objectFit: 'cover', cursor: 'pointer', borderWidth: mainImage === img ? 2 : 1 }}
                      onMouseEnter={() => setMainImage(img)}
                    />
                  ))}
                </div>
                <div className="flex-grow-1 text-center">
                  <img
                    src={mainImage}
                    alt={item.name}
                    className="img-fluid"
                    style={{ maxHeight: 350, objectFit: 'contain', borderRadius: 12 }}
                  />
                </div>
              </div>
              <div className="col-6">
                <h2 className="fw-bold mb-4" style={{ fontSize: '2rem' }}>{item.name}</h2>
                <p><strong>Type:</strong> {item.type}</p>
                <div>
                  <strong>Description:</strong>
                  <div style={{ maxHeight: 200, overflowY: 'auto', marginTop: 4 }}>
                    {item.description && (item.description.includes('\n') || /\d\./.test(item.description)) ? (
                      <ul style={{ marginBottom: 0 }}>
                        {item.description
                          .split(/\n|\d\./)
                          .map(point => point.trim())
                          .filter(Boolean)
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>
                    ) : (
                      <span> {item.description || 'N/A'}</span>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button className="btn btn-primary" onClick={handleEnquire}>
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
