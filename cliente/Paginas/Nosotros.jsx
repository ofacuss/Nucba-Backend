import React from 'react';
// Declaracion Nosotros.
const AcercaDe = () => {
    return (
        <main style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
            {}
            <section style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#20232a' }}>Nuestra Historia</h2>
                <div style={{ width: '60px', height: '4px', backgroundColor: '#007bff', margin: '10px auto' }}></div>
            </section>

            {}
            <section style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {}
                <div style={{ flex: '1 1 400px' }}>
                    <img
                        src="/Nosotros.JPG"
                        alt="Nuestro equipo de trabajo"
                        style={{ width: '100%', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    />
                </div>

                {}
                <div style={{ flex: '1 1 400px' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Naturaleza y Vida en tu Hogar</h3>
                    <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '15px' }}>
                        En <strong>Raices</strong>,  creemos que las plantas no son solo decoración, sino una forma de mejorar nuestra conexión con el mundo y nuestra calidad de vida. Nacimos en 2026 con el sueño de llevar un pedazo de oasis natural a cada rincón de Argentina.
                    </p>
                    <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '15px' }}>
                        Nuestra misión es simple: curar una selección de especies premium y herramientas de cuidado que combinen belleza, salud y armonía. Trabajamos con los mejores cultivadores locales para asegurar que cada ejemplar que llega a tus manos sea una experiencia llena de vida.
                    </p>
                    <p style={{ lineHeight: '1.6', color: '#555' }}>
                        Hoy contamos con un equipo apasionado por el diseño botánico que trabaja día a día para que tu experiencia en nuestra tienda online sea segura, rápida y, sobre todo, inspiradora. Queremos que cultivar tu propio jardín sea tan gratificante como verlo crecer.
                    </p>
                </div>
            </section>

            {}
            <section style={{
                marginTop: '60px',
                padding: '40px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                textAlign: 'center'
            }}>
                <div>
                    <h4 style={{ color: '#007bff' }}>Calidad</h4>
                    <p style={{ fontSize: '0.9rem' }}>Solo ofrecemos productos testeados por expertos.</p>
                </div>
                <div>
                    
                    <h4 style={{ color: '#007bff' }}>Seguridad</h4>
                    <p style={{ fontSize: '0.9rem' }}>Tus datos y compras están protegidos con JWT.</p>
                </div>
                <div>
                    <h4 style={{ color: '#007bff' }}>Pasión</h4>
                    <p style={{ fontSize: '0.9rem' }}>Amamos lo que hacemos y se nota en el servicio.</p>
                </div>
            </section>
        </main>
    );
};

export default AcercaDe;
