import React, { useState, useContext, useEffect } from 'react';
import { ItemContext } from '../context/ItemContext';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ Added

const AddItem = () => {
  const { addItem } = useContext(ItemContext);
  const navigate = useNavigate(); // ✅ Navigation hook

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const [coverInputType, setCoverInputType] = useState('url');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  const [galleryInputType, setGalleryInputType] = useState('url');
  const [galleryUrlsInput, setGalleryUrlsInput] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  useEffect(() => {
    if (coverInputType === 'file' && coverImageFile) {
      const reader = new FileReader();
      reader.onload = (e) => setCoverPreview(e.target.result);
      reader.readAsDataURL(coverImageFile);
    } else {
      setCoverPreview(coverImageUrl);
    }
  }, [coverInputType, coverImageFile, coverImageUrl]);

  useEffect(() => {
    if (galleryInputType === 'file' && galleryFiles.length) {
      Promise.all(
        Array.from(galleryFiles).map(
          (f) =>
            new Promise((res) => {
              const r = new FileReader();
              r.onload = (e) => res(e.target.result);
              r.readAsDataURL(f);
            })
        )
      ).then(setGalleryPreviews);
    } else {
      const urls = galleryUrlsInput
        .split(',')
        .map((u) => u.trim())
        .filter(Boolean);
      setGalleryPreviews(urls);
    }
  }, [galleryInputType, galleryFiles, galleryUrlsInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cover =
      coverInputType === 'url' ? coverImageUrl : coverPreview || '';

    if (!name || !type || !cover) {
      alert('Please complete the required fields.');
      return;
    }

    const gallery = galleryPreviews.map((url) => ({
      id: uuidv4(),
      url,
    }));

    addItem({
      id: uuidv4(),
      name,
      type,
      description,
      cover,
      gallery,
      createdAt: new Date().toISOString(),
    });

    setSuccess(true);

    // Reset form
    setName('');
    setType('');
    setDescription('');
    setCoverInputType('url');
    setCoverImageUrl('');
    setCoverImageFile(null);
    setCoverPreview('');
    setGalleryInputType('url');
    setGalleryUrlsInput('');
    setGalleryFiles([]);
    setGalleryPreviews([]);

    // ✅ Redirect after 1 second
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="container my-4">
      {success && (
        <div className="alert alert-success text-center">
          Item successfully added
        </div>
      )}

      <div className="row g-4">
        {/* Form card */}
        <div className="col-lg-7">
          <div className="card shadow-sm p-4 rounded-3">
            <h3 className="mb-4">
              <FaPlus className="me-2" />
              Add New Item
            </h3>

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              {/* Name */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  placeholder="Item Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="itemName">Item Name *</label>
              </div>

              {/* Type */}
              <div className="mb-3">
                <label className="form-label">Item Type *</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">-- Select Type --</option>
                  <option>Shirt</option>
                  <option>Pant</option>
                  <option>Shoes</option>
                  <option>Sports Gear</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="itemDesc"
                  style={{ height: 120 }}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="itemDesc">Item Description</label>
              </div>

              {/* Cover image input */}
              <div className="mb-4">
                <label className="form-label">Cover Image *</label>
                <div className="btn-group mb-2">
                  <button
                    type="button"
                    className={`btn btn-sm ${coverInputType === 'url' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setCoverInputType('url')}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${coverInputType === 'file' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setCoverInputType('file')}
                  >
                    Upload
                  </button>
                </div>

                {coverInputType === 'url' ? (
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://example.com/cover.jpg"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    required
                  />
                ) : (
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setCoverImageFile(e.target.files[0])}
                    required
                  />
                )}
              </div>

              {/* Gallery input */}
              <div className="mb-4">
                <label className="form-label">Gallery Images (you can upload one or more images)</label>
                <div className="btn-group mb-2">
                  <button
                    type="button"
                    className={`btn btn-sm ${galleryInputType === 'url' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => setGalleryInputType('url')}
                  >
                    URLs
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${galleryInputType === 'file' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => setGalleryInputType('file')}
                  >
                    Upload
                  </button>
                </div>

                {galleryInputType === 'url' ? (
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="https://img1.jpg, https://img2.jpg"
                    value={galleryUrlsInput}
                    onChange={(e) => setGalleryUrlsInput(e.target.value)}
                  />
                ) : (
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={(e) => setGalleryFiles(e.target.files)}
                  />
                )}
              </div>

              <button type="submit" className="btn btn-success w-100">
                <FaPlus className="me-2" />
                Add Item
              </button>
            </form>
          </div>
        </div>

        {/* Live Preview */}
        <div className="col-lg-5">
          <div className="card shadow-sm p-3">
            <h5 className="text-center mb-3">Live Preview</h5>
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="cover"
                className="w-100 rounded"
                style={{ objectFit: 'cover', maxHeight: 260 }}
              />
            ) : (
              <div className="bg-light d-flex flex-column align-items-center justify-content-center rounded"
                   style={{ height: 260 }}>
                <FaImage size={40} className="text-muted" />
                <small className="text-muted">Cover image</small>
              </div>
            )}

            {galleryPreviews.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {galleryPreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="gallery preview"
                    style={{
                      width: '70px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                  />
                ))}
              </div>
            )}

            <hr />
            <h6>{name || 'Item name…'}</h6>
            <p className="mb-1 text-muted">{type || 'Type…'}</p>
            <p className="small text-secondary">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
