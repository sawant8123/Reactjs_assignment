import React, { useContext, useState } from 'react';
import { ItemContext } from '../context/ItemContext';
import ItemModal from '../components/ItemModal';

const ViewItems = () => {
  const { items, removeItem } = useContext(ItemContext);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="container mt-4">
      <h2>View Items</h2>
      <div className="row">
        {items.map(item => (
          <div className="col-md-3 mb-4 d-flex" key={item.id}>
            <div
              className="card shadow-sm h-100 w-100 d-flex flex-column"
              style={{ borderRadius: '16px', overflow: 'hidden', minHeight: 420, cursor: 'pointer' }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="text-center" style={{ background: '#f8f9fa' }}>
                <img
                  src={item.cover}
                  alt={item.name}
                  className="img-fluid p-3"
                  style={{ maxHeight: '260px', objectFit: 'contain' }}
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between flex-grow-1">
                <h5
                  className="card-title mb-3"
                  style={{
                    minHeight: '3em',
                    maxHeight: '3em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </h5>
                <div className="mt-auto">
                  <button
                    className="btn btn-danger"
                    onClick={e => {
                      e.stopPropagation();
                      if (window.confirm('Delete this item?')) {
                        removeItem(item.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default ViewItems;
