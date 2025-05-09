import React from 'react';

const services = [
  {
    id: 1,
    name: 'SEO Optimization',
    date: '2025-05-07',
    price: 200,
    status: 'In Progress'
  },
  {
    id: 2,
    name: 'Website Audit',
    date: '2025-05-08',
    price: 150,
    status: 'Completed'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'green';
    case 'In Progress':
      return '#ffae42'; // orange shade
    default:
      return '#999';
  }
};

const cardStyle = {
  backgroundColor: '#e3f6f5',
  border: '1px solid #bae8e8',
  borderRadius: '12px',
  padding: '1rem',
  marginBottom: '1rem',
  color: '#1d1d2f',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
};

const ServiceCard = ({ service }) => {
  return (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: '0.5rem' }}>{service.name}</h3>
      <p><strong>Date:</strong> {service.date}</p>
      <p><strong>Price:</strong> ${service.price}</p>
      <p><strong>Status:</strong> <span style={{ color: getStatusColor(service.status) }}>{service.status}</span></p>
    </div>
  );
};

const service = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>Ordered Services</h2>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default service;
