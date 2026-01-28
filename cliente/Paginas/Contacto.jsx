import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';// Import del FORMIK
import * as Yup from 'yup';// Import del YUP.

const Contacto = () => {
    // Validacion 
    const esquemaContacto = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'Mínimo 3 caracteres')
            .required('El nombre es obligatorio'),
        apellido: Yup.string()
            .min(3, 'Mínimo 3 caracteres')
            .required('El apellido es obligatorio'),
        email: Yup.string()
            .email('Email inválido')
            .required('El email es obligatorio'),
        asunto: Yup.string()
            .min(10, 'El asunto debe tener al menos 10 caracteres')
            .required('El asunto es obligatorio'),
    });

    return (
        <main style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#20232a', marginBottom: '20px' }}>Contacto</h2>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
                ¿Tienes alguna duda? Completa el formulario y te responderemos a la brevedad.
            </p>

            <Formik
                initialValues={{ nombre: '', apellido: '', email: '', asunto: '' }}
                validationSchema={esquemaContacto}
                onSubmit={(valores, { resetearFormulario }) => {
                    
                    console.log('Datos del formulario:', valores);
                    alert('¡Mensaje enviado correctamente! Gracias por contactarnos.');
                    resetearFormulario();
                }}
            >
                {({ errors, touched }) => (
                    <Form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                                name="nombre"
                                placeholder="Tu nombre"
                                style={{ padding: '10px', borderRadius: '4px', border: `1px solid ${errors.nombre && touched.nombre ? 'red' : '#ccc'}` }}
                            />
                            <ErrorMessage name="nombre" component="span" style={{ color: 'red', fontSize: '0.8rem' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="apellido">Apellido</label>
                            <Field
                                name="apellido"
                                placeholder="Tu apellido"
                                style={{ padding: '10px', borderRadius: '4px', border: `1px solid ${errors.apellido && touched.apellido ? 'red' : '#ccc'}` }}
                            />
                            <ErrorMessage name="apellido" component="span" style={{ color: 'red', fontSize: '0.8rem' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="email">Email</label>
                            <Field
                                name="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                style={{ padding: '10px', borderRadius: '4px', border: `1px solid ${errors.email && touched.email ? 'red' : '#ccc'}` }}
                            />
                            <ErrorMessage name="email" component="span" style={{ color: 'red', fontSize: '0.8rem' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="asunto">Asunto</label>
                            <Field
                                name="asunto"
                                as="textarea"
                                placeholder="¿En qué podemos ayudarte?"
                                style={{ padding: '10px', borderRadius: '4px', height: '100px', border: `1px solid ${errors.asunto && touched.asunto ? 'red' : '#ccc'}` }}
                            />
                            <ErrorMessage name="asunto" component="span" style={{ color: 'red', fontSize: '0.8rem' }} />
                        </div>

                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#20232a',
                                color: 'white',
                                padding: '12px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                marginTop: '10px'
                            }}
                        >
                            Enviar Mensaje
                        </button>
                    </Form>
                )}
            </Formik>
        </main>
    );
};

export default Contacto;
