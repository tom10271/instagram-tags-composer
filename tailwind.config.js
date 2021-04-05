module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            borderColor: {
                DEFAULT: 'var(--border-color)',
                input: 'var(--border-color-input)',
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: 'var(--color-body)',
                        maxWidth: 'auto',
                        fontSize: 'var(--font-size-base)',
                        'ul > li::before': {
                            backgroundColor: 'var(--color-dark)',
                        },
                        'ol > li::before': {
                            color: 'var(--color-dark)',
                        },
                        h1: {
                            fontSize: '32px',
                            color: 'var(--color-black)',
                            textTransform: 'uppercase',
                        },
                        h2: {
                            fontSize: '24px',
                            color: 'var(--color-black)',
                            textTransform: 'uppercase',
                        },
                        h3: {
                            fontSize: '18px',
                            color: 'var(--color-black)',
                            textTransform: 'uppercase',
                        },
                        h4: {
                            fontSize: '16px',
                            color: 'var(--color-black)',
                            textTransform: 'uppercase',
                        },
                    },
                },
            },
            spacing: {
                0: '0',
                xs: '5px',
                sm: '10px',
                md: '15px',
                lg: '20px',
                xl: '30px',
                '2xl': '50px',
                '-xs': '-5px',
                '-sm': '-10px',
                '-md': '-15px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')({
            modifiers: [], // Disable size modifier
        }),
    ],
    future: {
        removeDeprecatedGapUtilities: true,
    },
};
