import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../api/apiConfig';
import Swal from 'sweetalert2';

const Registro = () => {
    const navegar = useNavigate();

    // Validacion!
    const esquemaRegistro = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre debe tener al menos 3 caracteres')
            .required('El nombre es obligatorio'),
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('El correo es obligatorio'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('La contraseña es obligatoria'),
        confirmarPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
            .required('Debes confirmar tu contraseña')
    });

    return (
        <main style={{ padding: '50px 20px', maxWidth: '450px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#1b5e20', marginBottom: '10px' }}>Crear Cuenta 🌿</h2>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
                Únete a la comunidad de Vivero Raíces
            </p>

            <Formik
                initialValues={{ nombre: '', email: '', password: '', confirmarPassword: '' }}
                validationSchema={esquemaRegistro}
                onSubmit={async (valores, { setSubmitting }) => {
                    try {
                        //Ruta al servidor
                        const respuesta = await api.post('/auth/register', {
                            nombre: valores.nombre,
                            email: valores.email,
                            password: valores.password
                        });

                        if (respuesta.data.ok) {
                            Swal.fire('¡Éxito!', 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.', 'success');
                            navegar('/login');
                        }
                    } catch (error) {
                        const mensajeError = error.response?.data?.mensaje || 'Error al registrar usuario';
                        Swal.fire('Error', mensajeError, 'error');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Nombre Completo</label>
                            <Field 
                                name="nombre" 
                                placeholder="Ej: Juan Pérez"
                                style={{ padding: '12px', borderRadius: '6px', border: `1px solid ${errors.nombre && touched.nombre ? '#d32f2f' : '#ccc'}` }}
                            />
                            <ErrorMessage name="nombre" component="span" style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: '5px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Correo Electrónico</label>
                            <Field 
                                name="email" 
                                type="email"
                                placeholder="correo@ejemplo.com"
                                style={{ padding: '12px', borderRadius: '6px', border: `1px solid ${errors.email && touched.email ? '#d32f2f' : '#ccc'}` }}
                            />
                            <ErrorMessage name="email" component="span" style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: '5px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Contraseña</label>
                            <Field 
                                name="password" 
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                style={{ padding: '12px', borderRadius: '6px', border: `1px solid ${errors.password && touched.password ? '#d32f2f' : '#ccc'}` }}
                            />
                            <ErrorMessage name="password" component="span" style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: '5px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Confirmar Contraseña</label>
                            <Field 
                                name="confirmarPassword" 
                                type="password"
                                placeholder="Repite tu contraseña"
                                style={{ padding: '12px', borderRadius: '6px', border: `1px solid ${errors.confirmarPassword && touched.confirmarPassword ? '#d32f2f' : '#ccc'}` }}
                            />
                            <ErrorMessage name="confirmarPassword" component="span" style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: '5px' }} />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            style={{ 
                                backgroundColor: '#1b5e20', 
                                color: 'white', 
                                padding: '14px', 
                                border: 'none', 
                                borderRadius: '6px', 
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}
                        >
                            {isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
                        </button>
                    </Form>
                )}
            </Formik>
        </main>
    );
};

export default Registro;
